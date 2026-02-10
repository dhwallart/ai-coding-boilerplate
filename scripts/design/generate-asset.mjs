import fs from "node:fs";
import path from "node:path";

const args = parseArgs(process.argv.slice(2));

const type = (args.type || "image").toLowerCase();
const size = args.size || "1024x1024";
const name = args.name || "asset";
const model = process.env.OPENAI_IMAGE_MODEL || "gpt-image-1";
const outputRoot = process.env.DESIGN_OUTPUT_ROOT || "public/.output";
const dryRun = Boolean(args["dry-run"]);

const prompt = resolvePrompt(args);
if (!prompt) {
  console.error("Missing prompt. Use --prompt \"...\" or --prompt-file <path>.");
  process.exit(1);
}

const typeDirectoryMap = {
  logo: "brand/logos",
  icon: "brand/icons",
  image: "marketing/images",
  hero: "marketing/heroes",
  social: "marketing/social",
};

const targetDirectory = typeDirectoryMap[type];
if (!targetDirectory) {
  console.error(`Unsupported type \"${type}\". Use one of: ${Object.keys(typeDirectoryMap).join(", ")}`);
  process.exit(1);
}

const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
const baseName = `${timestamp}-${slugify(name)}`;
const absoluteOutputRoot = path.resolve(process.cwd(), outputRoot);
const assetDirectory = path.join(absoluteOutputRoot, targetDirectory);
const promptDirectory = path.join(absoluteOutputRoot, "_meta", "prompts");
const manifestDirectory = path.join(absoluteOutputRoot, "_meta", "manifests");

ensureDirectory(assetDirectory);
ensureDirectory(promptDirectory);
ensureDirectory(manifestDirectory);

const imagePath = path.join(assetDirectory, `${baseName}.png`);
const promptPath = path.join(promptDirectory, `${baseName}.txt`);
const manifestPath = path.join(manifestDirectory, `${baseName}.json`);

let imageBuffer;
if (dryRun) {
  imageBuffer = Buffer.from(
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+X3f0AAAAASUVORK5CYII=",
    "base64"
  );
} else {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.error("Missing OPENAI_API_KEY environment variable.");
    process.exit(1);
  }

  imageBuffer = await generateImageBuffer({ model, prompt, size, apiKey });
}

fs.writeFileSync(imagePath, imageBuffer);
fs.writeFileSync(promptPath, `${prompt.trim()}\n`);

const manifest = {
  generatedAt: new Date().toISOString(),
  type,
  model,
  size,
  name,
  dryRun,
  prompt,
  output: {
    image: toPosixRelative(process.cwd(), imagePath),
    prompt: toPosixRelative(process.cwd(), promptPath),
  },
};

fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);

console.log("Design asset generated.");
console.log(`- Image: ${manifest.output.image}`);
console.log(`- Prompt: ${manifest.output.prompt}`);
console.log(`- Manifest: ${toPosixRelative(process.cwd(), manifestPath)}`);

async function generateImageBuffer({ model, prompt, size, apiKey }) {
  const response = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      prompt,
      size,
    }),
  });

  const payload = await response.json();
  if (!response.ok) {
    const message = payload?.error?.message || "Image generation failed.";
    throw new Error(message);
  }

  const imageData = payload?.data?.[0];
  if (imageData?.b64_json) {
    return Buffer.from(imageData.b64_json, "base64");
  }

  if (imageData?.url) {
    const imageResponse = await fetch(imageData.url);
    if (!imageResponse.ok) {
      throw new Error("Failed to download generated image URL.");
    }

    const arrayBuffer = await imageResponse.arrayBuffer();
    return Buffer.from(arrayBuffer);
  }

  throw new Error("No image data received from API.");
}

function resolvePrompt(parsedArgs) {
  if (parsedArgs.prompt) {
    return String(parsedArgs.prompt).trim();
  }

  if (parsedArgs["prompt-file"]) {
    const promptPath = path.resolve(process.cwd(), String(parsedArgs["prompt-file"]));
    if (!fs.existsSync(promptPath)) {
      console.error(`Prompt file not found: ${promptPath}`);
      process.exit(1);
    }

    return fs.readFileSync(promptPath, "utf8").trim();
  }

  return "";
}

function ensureDirectory(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function slugify(value) {
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80) || "asset";
}

function parseArgs(rawArgs) {
  const parsed = {};

  for (let i = 0; i < rawArgs.length; i += 1) {
    const arg = rawArgs[i];

    if (!arg.startsWith("--")) {
      continue;
    }

    const key = arg.slice(2);
    const next = rawArgs[i + 1];

    if (!next || next.startsWith("--")) {
      parsed[key] = true;
      continue;
    }

    parsed[key] = next;
    i += 1;
  }

  return parsed;
}

function toPosixRelative(baseDir, absolutePath) {
  const relative = path.relative(baseDir, absolutePath);
  return relative.split(path.sep).join(path.posix.sep);
}
