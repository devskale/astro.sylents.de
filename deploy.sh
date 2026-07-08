#!/bin/bash
set -e

echo "🔨 Building Astro..."
pnpm run build

echo "📦 Deploying to all-inkl (astro.sylents.de)..."
ssh all-inkl 'rm -f /www/htdocs/w01973ad/astro.sylents.de/index.htm'
scp -r dist/* all-inkl:/www/htdocs/w01973ad/astro.sylents.de/

echo "✅ Done! → https://astro.sylents.de"
