export type Step = {
  title: string;
  description: string;
  imageSrc: string;
  imageHint: string;
};

export type Guide = {
  title: string;
  description: string;
  steps: Step[];
};

export const githubGuide: Guide = {
  title: 'From Firebase to GitHub',
  description: 'First, let\'s get your code into a GitHub repository. This is a crucial step for continuous deployment.',
  steps: [
    {
      title: 'Step 1: Initialize Git',
      description: 'If you haven\'t already, open a terminal in your project directory and run `git init` to create a new Git repository.',
      imageSrc: 'https://placehold.co/800x400.png',
      imageHint: 'terminal code',
    },
    {
      title: 'Step 2: Create a GitHub Repository',
      description: 'Go to GitHub and create a new, empty repository. Do not initialize it with a README, .gitignore, or license.',
      imageSrc: 'https://placehold.co/800x400.png',
      imageHint: 'github repository',
    },
    {
      title: 'Step 3: Connect to GitHub',
      description: 'Copy the remote URL from your new GitHub repository. In your terminal, run `git remote add origin <your-repo-url>` to link your local repository to the one on GitHub.',
      imageSrc: 'https://placehold.co/800x400.png',
      imageHint: 'code snippet',
    },
    {
      title: 'Step 4: Commit and Push',
      description: 'Add your files, commit them, and push to GitHub using the following commands: `git add .`, `git commit -m "Initial commit"`, and `git push -u origin main` (or `master`).',
      imageSrc: 'https://placehold.co/800x400.png',
      imageHint: 'command line',
    },
  ],
};

export const vercelGuide: Guide = {
  title: 'Deploying to Vercel',
  description: 'Vercel is a great platform for deploying Next.js applications with zero configuration.',
  steps: [
    {
      title: 'Step 1: Sign Up and Connect GitHub',
      description: 'Create a Vercel account and connect it to your GitHub account.',
      imageSrc: 'https://placehold.co/800x400.png',
      imageHint: 'vercel dashboard',
    },
    {
      title: 'Step 2: Import Your Project',
      description: 'From the Vercel dashboard, click "Add New... > Project". Select your GitHub repository.',
      imageSrc: 'https://placehold.co/800x400.png',
      imageHint: 'import project',
    },
    {
      title: 'Step 3: Add API Keys',
      description: 'In the project configuration, expand the "Environment Variables" section. Add a new variable for your API key, such as `GOOGLEAI_API_KEY`, and paste your key in the value field.',
      imageSrc: 'https://placehold.co/800x400.png',
      imageHint: 'environment variables',
    },
    {
      title: 'Step 4: Deploy',
      description: 'Vercel will automatically detect that it\'s a Next.js app. Click "Deploy". Vercel will build and deploy your project. Once complete, you\'ll get a URL to your live site. Congratulations!',
      imageSrc: 'https://placehold.co/800x400.png',
      imageHint: 'celebration success',
    },
  ],
};

export const netlifyGuide: Guide = {
  title: 'Deploying to Netlify',
  description: 'Netlify provides a powerful serverless platform with a great free tier for hosting web projects.',
  steps: [
    {
      title: 'Step 1: Connect to GitHub',
      description: 'Sign up for a Netlify account and authorize it to access your GitHub repositories.',
      imageSrc: 'https://placehold.co/800x400.png',
      imageHint: 'netlify dashboard',
    },
    {
      title: 'Step 2: Add New Site',
      description: 'From your Netlify dashboard, click "Add new site > Import an existing project" and choose GitHub as your provider.',
      imageSrc: 'https://placehold.co/800x400.png',
      imageHint: 'import repository',
    },
    {
      title: 'Step 3: Select Repository and Add API Keys',
      description: 'Pick the GitHub repository. Before deploying, go to "Site configuration" > "Build & deploy" > "Environment variables". Add your API key here, like `GOOGLEAI_API_KEY`.',
      imageSrc: 'https://placehold.co/800x400.png',
      imageHint: 'api keys',
    },
    {
      title: 'Step 4: Deploy Site',
      description: 'Click "Deploy site". Netlify will handle the build process using your settings and provide you with a live URL upon completion.',
      imageSrc: 'https://placehold.co/800x400.png',
      imageHint: 'success confetti',
    },
  ],
};

export const renderGuide: Guide = {
  title: 'Deploying to Render',
  description: 'Render offers a flexible cloud platform for hosting static sites, web apps, and more.',
  steps: [
    {
      title: 'Step 1: Create a New Web Service',
      description: 'Sign up for Render. From the dashboard, click "New + > Web Service".',
      imageSrc: 'https://placehold.co/800x400.png',
      imageHint: 'render dashboard',
    },
    {
      title: 'Step 2: Connect Your Repository',
      description: 'Connect your GitHub account and select the repository you want to deploy.',
      imageSrc: 'https://placehold.co/800x400.png',
      imageHint: 'connect github',
    },
    {
      title: 'Step 3: Add API Keys',
      description: 'In the service configuration, navigate to the "Environment" section. Click "Add Environment Variable" to add your keys, such as `GOOGLEAI_API_KEY`.',
      imageSrc: 'https://placehold.co/800x400.png',
      imageHint: 'secret keys',
    },
    {
      title: 'Step 4: Configure and Create Web Service',
      description: 'Give your service a name, set Build Command to `npm run build` and Start Command to `npm run start`. Click "Create Web Service". Render will start the deployment, and your site will be live shortly.',
      imageSrc: 'https://placehold.co/800x400.png',
      imageHint: 'celebration rocket',
    },
  ],
};

export const deploymentGuides = {
  vercel: vercelGuide,
  netlify: netlifyGuide,
  render: renderGuide,
};
