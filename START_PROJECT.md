# Start Project Guide

This is a frontend-only portfolio website.

It uses:

- Next.js
- React
- Three.js / React Three Fiber
- Framer Motion
- Tailwind CSS

There is no backend, no login, no sign out, and no database.

## Project Location

```powershell
\\fs01-dev\Home_Folder\bjain\Desktop\doc\chinetworks
```

## Start The Website Locally

Open PowerShell, then run:

```powershell
pushd "\\fs01-dev\Home_Folder\bjain\Desktop\doc\chinetworks"
npm run dev
```

Then open this in your browser:

```text
http://localhost:3000
```

## Why Use `pushd`?

The project is stored on a network path. Windows sometimes has trouble running Node/Next directly from a UNC path like `\\fs01-dev\...`.

`pushd` temporarily maps the network folder to a drive letter for that terminal window, so `npm run dev` works correctly.

## Stop The Website

In the PowerShell window where the server is running, press:

```text
Ctrl + C
```

If it asks whether to terminate the batch job, type:

```text
Y
```

Then press Enter.

## Build For Deployment

```powershell
pushd "\\fs01-dev\Home_Folder\bjain\Desktop\doc\chinetworks"
npm run build
```

The static deployment files will be created here:

```text
out
```

## Run Lint Check

```powershell
pushd "\\fs01-dev\Home_Folder\bjain\Desktop\doc\chinetworks"
npm run lint
```

## Important Files

- `src/app/page.tsx` - main portfolio page
- `src/app/layout.tsx` - page title and metadata
- `src/app/globals.css` - global styles
- `src/components/HeroScene.tsx` - Three.js hero scene
- `src/data/portfolio.ts` - editable portfolio content
- `next.config.ts` - static export configuration
- `package.json` - project scripts

## Current Scripts

```json
{
  "dev": "next dev --webpack",
  "build": "next build --webpack",
  "start": "next start",
  "lint": "eslint"
}
```

## Resume PDF

The website does not need a resume PDF to run. The public GitHub version does not include your resume PDF.

## Notes

The `--webpack` option is used because Turbopack had issues with this Windows network-share path. Webpack works correctly for both local preview and production build.

Before final deployment, confirm the public contact links in `src/data/portfolio.ts`:

- Email link
- GitHub link
- LinkedIn link