# MathQuest - Multiplication Learning Adventure

MathQuest is an engaging web application designed to help children learn multiplication tables through a fun, quest-based adventure. The app combines education with entertainment to make learning multiplication an exciting journey!

## Features

- 🎮 Quest-based learning system
- ⭐ Star rewards for completing challenges
- ⏱️ Timer to encourage quick thinking
- 🗺️ Visual progress map
- 🎨 Kid-friendly interface
- 📱 Mobile and tablet friendly

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd mathquest
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The app will open in your default browser at `http://localhost:3000`.

## How to Play

1. Start at "The Beginning" challenge
2. Select the multiplication tables you want to practice
3. Answer the multiplication problems correctly to progress
4. Complete all challenges to become a multiplication master!
5. Earn stars for your achievements

## Development

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App

## Deployment

### GitHub Pages

1. Update the `homepage` field in `package.json` with your GitHub username:
   ```json
   "homepage": "https://[your-github-username].github.io/mathquest"
   ```

2. Install the gh-pages package:
   ```bash
   npm install --save-dev gh-pages
   ```

3. Deploy to GitHub Pages:
   ```bash
   npm run deploy
   ```

4. Go to your GitHub repository settings and ensure the GitHub Pages section is configured to deploy from the `gh-pages` branch.

### Netlify

1. Create a Netlify account at [netlify.com](https://www.netlify.com/)
2. Connect your GitHub repository
3. Configure the build settings:
   - Build command: `npm run build`
   - Publish directory: `build`
4. Deploy!

### Vercel

1. Create a Vercel account at [vercel.com](https://vercel.com/)
2. Import your GitHub repository
3. Vercel will automatically detect that it's a React app and configure the build settings
4. Deploy!

## Technologies Used

- React
- TypeScript
- Material-UI
- Framer Motion
- Emotion (Styled Components)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
