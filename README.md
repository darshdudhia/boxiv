# boXiv

A comprehensive archive of biology olympiads — question papers, solutions, answer booklets, and grading schemes from the IBO, INBO, ABO, and more international, regional, and national competitions.

This project is forked from [phoxiv](https://phoxiv.org), adapted for biology olympiad archives.

## Development

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build
```

(`npm` or `bun` work too — use whichever you have.)

Browsing works without any configuration. Authentication (login / profile /
contribute / admin) stays disabled until the environment variables below are set.

### Environment variables

| Variable | Purpose |
| --- | --- |
| `DATABASE_URL` | Postgres connection string (Neon). Stores users, sessions, and roles only — archive content is file-based. |
| `BETTER_AUTH_SECRET` | Secret used by BetterAuth to sign sessions. |
| `BETTER_AUTH_URL` | Public base URL of the site (e.g. `https://boxiv.vercel.app`). |
| `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET` | GitHub OAuth app credentials for sign-in. |
| `TRUSTED_ORIGINS` | Optional. Comma-separated list of extra origins allowed to call the auth API. |
| `SUPERADMIN_EMAIL` | Optional. This account's role and ban status can't be changed from the admin panel. |

Database schema commands (Drizzle): `pnpm db:generate`, `pnpm db:migrate`, `pnpm db:push`, `pnpm db:studio`.

## Adding more competitions

The archive data lives in `static/boxiv/`. Each competition is one folder, and each year is a subfolder with one year YAML.

### Directory structure

Use this shape:

```text
static/boxiv/
  <competition-id>/
    index.yaml
    2026/
      2026.yaml
      <pdf files...>
    2025/
      2025.yaml
      <pdf files...>
```

Rules:

- `competition-id` should be lowercase and stable (e.g. `ibo`, `inbo`, `abo`).
- Year folders must be 4-digit years (`2024`, `2025`, ...).
- The year YAML filename must match the folder name exactly (`2025/2025.yaml`).
- PDF paths referenced in YAML should use `/boxiv/<competition-id>/<year>/<file>.pdf`.
- Keep filenames short and mechanical: `th.pdf`, `th_sol.pdf`, `th_a.pdf` / `th_b.pdf` for two-part exams, `pr1.pdf`, `pr2.pdf` for numbered practicals, `<stem>_ans.pdf` for answer sheets/booklets, `<stem>_hi.pdf` for alternate-language versions.

### `index.yaml` format (competition metadata)

Keep keys in this order for consistency:

```yaml
id: inbo
name: Indian National Biology Olympiad
shortName: INBO
website: 'https://olympiads.hbcse.tifr.res.in/'
summary: National-level biology olympiad exam in India's science olympiad selection pipeline.
icon: '🇮🇳'
tag: National
url: 'https://olympiads.hbcse.tifr.res.in/how-to-prepare/past-papers/'
desc: |
  Short multi-line description of the competition, who runs it, and what the exam looks like.
```

Required keys used by the app:

- `id`, `name`, `shortName`, `website`
- `summary`, `icon`, `tag`, `url`, `desc`

Allowed `tag` values:

- `International`
- `Regional`
- `National`
- `Open`

### Year YAML format (`<year>/<year>.yaml`)

Typical example:

```yaml
name: INBO 2025
location: Mumbai, India # optional

papers:
  - category: Question Paper (English)
    link: /boxiv/inbo/2025/th.pdf
    solutionLink: /boxiv/inbo/2025/th_sol.pdf
    answerSheet: /boxiv/inbo/2025/th_ans.pdf # optional
    additionalFiles: [/boxiv/inbo/2025/th_hi.pdf] # optional, e.g. Hindi version
    majorCategory: Theory
    examDuration: 120 # minutes, optional
    note: 'Optional free-text note about anything unusual about this paper.'

problems: []
```

Notes:

- `majorCategory` should be one of `Theory`, `Practical`, `Observation`, `Team`/`Group`, or `Overall`, so filtering works across competitions.
- `link` is the question paper (omit it if only solutions survive). `solutionLink` is the single most useful solutions document. Put extra files (other languages, supplements) in `additionalFiles` rather than inventing extra `papers` entries.
- If several papers share one solutions file, point each `solutionLink` at the same file.
- Use `note` for anything a reader would otherwise be confused by (missing files, combined papers, embedded answer keys). Never invent data to fill a gap.
- The first `papers` item without `category` acts as a base template for all categories.
- Paper/problem resources may include `link`, `solutionLink`, `gradingScheme`, `additionalFiles`, `answerSheet`, and `results`.
- `problems` is optional per-question data (`id`, `number`, `name`, `category`, `maxScore`, ...). Only fill it in if you verified the details from the actual paper; otherwise leave it as `[]` (the key must still exist). Editions with no problems are searchable at the paper level.
- Optional statistics fields on a paper: `scores` (row 1 = total scores, then per-problem rows), `n` (use `n: ~` when unknown), `gold`, `silver`, `bronze`, `hm`, `camp`.

### After adding or editing data

Nothing extra is needed: `competitions-data.json` and `site-config.json` are regenerated automatically at the start of every `pnpm dev` and `pnpm build` (via a Vite plugin). To regenerate manually, run:

```bash
pnpm pregen
```

## Blog

Blog posts are `.svx` (Markdown) files in `src/lib/posts/`. The filename becomes the URL slug, and each file starts with frontmatter:

```text
---
title: Your post title
date: 2026-09-16
description: One-line summary shown on the blog list.
tags: [meta, update]
author: boXiv
---
```

## Contributing

Want to add papers or help maintain the site? Open a PR or an issue.

## License

MIT
