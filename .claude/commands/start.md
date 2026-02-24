# /start — Initialize Project

Run this flow when the user writes "Start" or "/start".

## Flow

### Step 1 — Collect project basics

Call `AskUserQuestion` with these **4 questions in a single call**:

**Question 1** — header: "Project name"
"What should your project be called? (Tip: choose 'Other' to enter a custom name)"
- Options: `["TaskFlow", "MyApp"]`

**Question 2** — header: "Product type"
"What kind of product are you building?"
- Web App / SaaS — browser-based, for end users
- E-Commerce / Marketplace — buy and sell online
- Dashboard / internal tool — data, reports, admin
- AI-powered / Automation — chatbot, workflow, agent

**Question 3** — header: "Target audience"
"Who will use the product?"
- Consumers (B2C) — private individuals
- Businesses & Teams (B2B) — professional users
- Internal team / Admins — own employees
- Developers / technical users

**Question 4** — header: "Primary goal"
"What should the product mainly achieve?"
- Save time & costs / Automate
- Generate revenue / Sell
- Make data visible / Analyse
- Manage users / Build a platform

---

### Step 2 — Collect tech details

Call `AskUserQuestion` with these **3 questions in a second call**:

**Question 1** — header: "Backend"
"Where does the data come from / how does the backend work?"
- Own database (e.g. Supabase, Postgres)
- Connect external API (REST / GraphQL)
- No backend needed (static / client-side)
- Not decided yet

**Question 2** — header: "Auth"
"How will users log in?"
- No login needed (publicly accessible)
- Email + Password
- OAuth (Google, GitHub, ...)
- API Key / Token

**Question 3** — header: "Deployment"
"Where should the app run later?"
- Vercel (recommended for Next.js)
- Self-hosted / VPS
- Docker / Kubernetes
- Not decided yet

---

### Step 3 — Collect brand & visual details

Call `AskUserQuestion` with these **3 questions in a third call**:

**Question 1** — header: "Visual style & tone"
"How should the product look and feel?"
- Clean & minimal — lots of whitespace, simple shapes
- Bold & energetic — strong colors, expressive typography
- Professional & trustworthy — corporate, structured
- Playful & friendly — rounded shapes, warm tones

**Question 2** — header: "Primary color direction"
"What color palette fits the brand best?"
- Blues & greys — calm, tech, trustworthy
- Greens & teals — growth, health, sustainability
- Purples & violets — creative, premium, innovative
- Warm tones (orange, red, yellow) — energetic, approachable
- Monochrome / neutral — timeless, flexible

**Question 3** — header: "Logo"
"Do you need a logo?"
- Yes — generate a logo as part of setup
- No — we already have a logo
- Not sure yet — skip for now

---

### Step 4 — Fill specialization.md, brand.md and package.json

Open `.docs/project/specialization.md` and replace **all** `<PLACEHOLDER>` values with the collected answers. Derive missing values sensibly from context. Do not write back any `<...>` placeholders.

Then open `.docs/project/brand.md` and fill all placeholders using the brand and visual answers collected in Step 3:
- `<BRAND_NAME>` — from project name (Step 1, Q1)
- `<COLOR_DIRECTION>` — from primary color direction answer
- `<LOGO_STYLE>` — derive from visual style answer
- `<SHAPE_LANGUAGE>` — derive from visual style answer
- Leave remaining placeholders with a sensible derived default rather than leaving `<...>` syntax.

Then update `package.json`:
- Set `"name"` to the slugified project name (lowercase, spaces → hyphens, remove special chars)
- Example: "My Cool App" → `"my-cool-app"`
- Use the Edit tool to update only the `name` field, leave everything else unchanged.

---

### Step 5 — Validate & launch

1. Run: `npm run ai:check-specialization`
2. If successful: inform the user that the project is set up.
3. Run `npm install` to install/update all dependencies.
4. Run `npm run dev` in the background (use Bash with `run_in_background: true`).
4. Wait ~3 seconds, then detect the actual port Next.js chose:
   ```bash
   # Next.js auto-selects the next free port (3000, 3001, ...)
   # Find it by checking which port the next.js process is listening on:
   ss -tlnp 2>/dev/null | grep -oP '(?<=:)\d+' | grep -E '^300[0-9]$' | head -1
   ```
   If that returns nothing, fall back to `3000`.
5. Open the detected URL in the browser:
   - Linux: `xdg-open http://localhost:<PORT>`
   - macOS: `open http://localhost:<PORT>`
   - Windows: `start http://localhost:<PORT>`
6. Tell the user: **"Your app is running at http://localhost:PORT"** (use the actual port)
7. Then ask: "What should the first feature of your app be?" — to move directly into feature planning.
