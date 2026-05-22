<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/b4429952-cf4f-4a2d-a2b9-a8a742f64e9c

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Deploy to GitHub Pages

1. Make sure the repo is initialized and pushed to GitHub.
2. Build and publish with:
   `npm run deploy`

The site will be published from the `dist` folder using `gh-pages`. If your repository is a project page, GitHub Pages will serve it automatically.