# Zhyva Voda

My personal app: day, NMT session with a step timer, an NMT tab with a lesson page for every topic (iLearn webinar, real osvita tests, quick check, book pages, mistakes), homework from Claude, 4 Ukrainian words a day, a 21-day Bible verse, dreams, NMT review, books, workouts, progress and kaizen. The interface is in English.

Address: https://petroju.github.io/pult/

- `hw.json` — NMT homework (Claude adds it, I tick it in the app).
- `ua-words.json` — 4 Ukrainian words/phrases a day (Claude writes them).
- Google Drive → Obsidian: ⚙️ → “Google Drive → Obsidian”. A small Google Apps Script (`drive-script.txt`) in my own account writes every change to `My Drive/Absidian/Zhyva Voda/` — `data.json` (everything), `Today.md` (readable in Obsidian), `history/<day>.json`. Claude reads it through Google Drive.
- Sync between phone and computer: ⚙️ → “Phone ↔ computer sync” (a private GitHub gist).
- NMT tab → «Повторити сьогодні»: topic reviews on days 1 · 3 · 7 · 21 (9/10 check) · 51 · then monthly; daily Anki + evening mistakes reminders; quick error log (→ Anki); Saturday mock-score tracker (goals: maths 190, Ukrainian and history 185).

## v23 (26.10.2026)
- NMT rotation: Mon & Thu history · Tue & Fri maths · Wed & Sat Ukrainian · Sun review of the week + the weakest topic.
- ZNOHUB: live lessons go into the day from their times (NMT → ZNOHUB → lesson times); after a lesson enter how many tests it has — the app splits them over the days until the next lesson and counts them.
- English = the C1 plan v4: today's checklist, 2-hour block timer, protocols, commands for Claude, active phrases (4 uses → learned), Words Inbox, English error log, grammar by weeks, measurements, progress points (full day 1 · half ½) to 1 January and 1 July.
- Kaizen = daily scrum (4 questions + one change); Sunday Scrum review in 7 steps; “The week, day by day” page.
- Health (run, strength, football, vegetables, sleep, a free evening), Self-development (communication, spiritual plan, books, thinking on paper, Python), day modes A/B/C, “don't forget” reminders, energy in steps of 10, quick move for tasks, books with daily pages and deadline moves (max 2).
- `inbox.json` — cards Claude puts on the board (each id is imported once).

