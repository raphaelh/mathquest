#!/bin/bash

# Exit on error
set -e

echo "🚀 Deploying MathQuest to GitHub Pages..."

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
  echo "📦 Installing dependencies..."
  npm install
fi

# Install gh-pages if not already installed
if ! npm list gh-pages > /dev/null 2>&1; then
  echo "📦 Installing gh-pages..."
  npm install --save-dev gh-pages
fi

# Update homepage in package.json if needed
# Replace [your-github-username] with your actual GitHub username
# Uncomment the following line and replace [your-github-username] with your actual GitHub username
# sed -i 's/"homepage": "https:\/\/\[your-github-username\]\.github\.io\/mathquest"/"homepage": "https:\/\/YOUR-ACTUAL-USERNAME.github.io\/mathquest"/' package.json

# Build the app
echo "🔨 Building the app..."
npm run build

# Deploy to GitHub Pages
echo "🚀 Deploying to GitHub Pages..."
npm run deploy

echo "✅ Deployment complete! Your app should be live at https://[your-github-username].github.io/mathquest"
echo "⚠️ Make sure to replace [your-github-username] with your actual GitHub username in the package.json file!" 