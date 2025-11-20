#!/bin/bash
# Production deployment script for Meta H2O ICO Frontend

set -e  # Exit on error

echo "🚀 Starting deployment..."

# Pull latest changes from git (if using git)
# git pull origin main

# Install dependencies if package.json changed
# npm install

# Build the production bundle
echo "📦 Building production bundle..."
npm run build

# Copy built files to web server directory
echo "📂 Deploying to /var/www/metah20.io..."
rm -rf /var/www/metah20.io/*
cp -r dist/* /var/www/metah20.io/

# Set proper permissions
chown -R www-data:www-data /var/www/metah20.io
chmod -R 755 /var/www/metah20.io

# Optional: Clear Nginx cache if any
# nginx -s reload

echo "✅ Deployment complete!"
echo "🌐 Site live at: https://metah20.io"
