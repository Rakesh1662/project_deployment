import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { DeployWaveIcon } from '@/components/icons';

export function WelcomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4 text-center">
      <header className="mb-8 animate-fade-in-down">
        <div className="flex items-center justify-center gap-4 mb-4">
          <DeployWaveIcon className="w-16 h-16 text-primary" />
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground font-headline">
            DeployWave
          </h1>
        </div>
        <p className="text-lg md:text-2xl text-muted-foreground max-w-2xl mx-auto">
          Feeling difficulty with deployment? Don't worry when Next Wave is here to guide you.
        </p>
      </header>
      <main className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
        <Link href="/guide" passHref>
          <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
            Get Started
          </Button>
        </Link>
      </main>
      <footer className="absolute bottom-4 text-sm text-muted-foreground">
        <p>A Next Wave Company</p>
      </footer>
    </div>
  );
}
