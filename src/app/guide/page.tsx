import { GuideClient } from './guide-client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { DeployWaveIcon } from '@/components/icons';
import Link from 'next/link';

export default function GuidePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-20 bg-background/80 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold font-headline">
            <DeployWaveIcon className="w-8 h-8 text-primary" />
            <span>DeployWave</span>
          </Link>
          <span className="text-sm text-muted-foreground">by Next Wave</span>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <Card className="mb-8 shadow-lg animate-fade-in">
          <CardHeader>
            <CardTitle className="text-3xl font-headline">Welcome to the Deployment Guide</CardTitle>
            <CardDescription className="text-lg">
              Follow these steps to get your Firebase Studio project live on the web.
            </CardDescription>
          </CardHeader>
        </Card>
        <GuideClient />
      </main>
    </div>
  );
}
