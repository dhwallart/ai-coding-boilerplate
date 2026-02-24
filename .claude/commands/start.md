# /start — Initialize Project

Run this flow when the user writes "Start" or "/start".

## Flow

### Step 1 — Two questions, that's it

Call `AskUserQuestion` with these **2 questions in a single call**:

**Question 1** — header: "Project name"
"What should your project be called?"
- Options: `["TaskFlow", "MyApp"]`
(User can pick "Other" to enter a custom name)

**Question 2** — header: "Goal"
"What should your app do? Describe it in one sentence."
- Options:
  - "Manage tasks, projects, or to-dos"
  - "Visualize data in a dashboard"
  - "Automate a workflow or process"
  - "Sell products or services online"
(User can pick "Other" to describe in their own words)

---

### Step 2 — Fill specialization.md, brand.md and package.json

Open `.docs/project/specialization.md` and replace the three placeholders:
- `<PROJECT_NAME>` — from Question 1
- `<PRIMARY_GOAL>` — from Question 2 (use the user's own words, not a category label)
- `<TARGET_USERS>` — derive from the goal (e.g. "teams managing projects", "data analysts", "small business owners")

Do not leave any `<...>` placeholders in the file.

Then open `.docs/project/brand.md` and replace:
- `<BRAND_NAME>` — from Question 1 (project name)

Then update `package.json`:
- Set `"name"` to the slugified project name (lowercase, spaces → hyphens, remove special chars)
- Example: "My Cool App" → `"my-cool-app"`
- Use the Edit tool to update only the `name` field, leave everything else unchanged.

---

### Step 3 — Validate & launch

1. Run: `npm run ai:check-specialization`
2. If successful: inform the user that the project is set up.
3. Run `npm install` to install/update all dependencies.
4. Run `npm run dev` in the background (use Bash with `run_in_background: true`).
5. Wait ~3 seconds, then detect the actual port Next.js chose:
   ```bash
   # Next.js auto-selects the next free port (3000, 3001, ...)
   ss -tlnp 2>/dev/null | grep -oP '(?<=:)\d+' | grep -E '^300[0-9]$' | head -1
   ```
   If that returns nothing, fall back to `3000`.
6. Open the detected URL in the browser:
   - Linux: `xdg-open http://localhost:<PORT>`
   - macOS: `open http://localhost:<PORT>`
   - Windows: `start http://localhost:<PORT>`
7. Tell the user: **"Your app is running at http://localhost:PORT"** (use the actual port)
8. Then ask: "What should the first feature of your app be?" — to move directly into feature planning.
