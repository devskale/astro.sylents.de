#!/bin/bash
set -e

echo "🔨 Building Astro..."
pnpm run build

echo "📦 Deploying to all-inkl (sylents.de)..."
# Deploys into the v2/ docroot, which is shared with the WordPress /shop/.
# scp -r overwrites Astro output only — it never deletes, so /shop/ and the
# root .htaccess (legacy → /shop/ 301s) are preserved untouched.
scp -r dist/* all-inkl:/www/htdocs/w01973ad/sylents.de/v2/

echo "✅ Done! → https://www.sylents.de"
