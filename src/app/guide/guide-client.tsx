'use client';

import { useState, useTransition, type FC } from 'react';
import Image from 'next/image';
import { summarizeInstructions } from '@/ai/flows/summarize-instructions';
import { analyzeError } from '@/ai/flows/analyze-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { githubGuide, deploymentGuides, type Guide, securityNote } from '@/lib/content';
import { cn } from '@/lib/utils';
import { Terminal, UploadCloud, Rocket, GitBranch, Sparkles, User, Users, BrainCircuit, Loader2, HelpCircle, AlertTriangle } from 'lucide-react';
import type { SkillLevel } from '@/ai/flows/summarize-instructions';
import { ImportantNote } from '@/components/important-note';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const platformIcons = {
  vercel: <UploadCloud className="w-6 h-6" />,
  netlify: <GitBranch className="w-6 h-6" />,
  render: <Rocket className="w-6 h-6" />,
};

type Platform = keyof typeof deploymentGuides;

const DeploymentGuide: FC<{ guide: Guide }> = ({ guide }) => (
  <div className="space-y-6">
    {guide.steps.map((step, index) => (
      <Card key={index} className="overflow-hidden transition-all hover:shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 font-headline">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary font-bold">
              {index + 1}
            </span>
            {step.title}
          </CardTitle>
          <CardDescription>{step.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="aspect-video bg-muted rounded-lg overflow-hidden">
            <Image
              src={step.imageSrc}
              alt={step.title}
              width={1280}
              height={720}
              className="w-full h-full object-contain"
              data-ai-hint={step.imageHint}
            />
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
);

function ErrorAnalyzer() {
  const [errorMessage, setErrorMessage] = useState('');
  const [explanation, setExplanation] = useState('');
  const [isPending, startTransition] = useTransition();

  const handleAnalyzeError = () => {
    if (!errorMessage.trim()) return;
    setExplanation('');
    startTransition(async () => {
      try {
        const result = await analyzeError({ errorMessage });
        setExplanation(result.explanation);
      } catch (error) {
        console.error('Error analyzing message:', error);
        setExplanation('Sorry, I was unable to analyze this error. Please try again.');
      }
    });
  };
  
  return (
      <Card className="shadow-lg mt-8" id="error-analyzer">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-headline">
            <HelpCircle className="text-accent"/>
            Facing an issue?
          </CardTitle>
          <CardDescription>
            Paste your error message below and our AI will try to explain it.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea 
            placeholder="Paste your error message here..."
            value={errorMessage}
            onChange={(e) => setErrorMessage(e.target.value)}
            className="min-h-[100px]"
            />
        </CardContent>
        <CardFooter>
            <Button onClick={handleAnalyzeError} disabled={isPending || !errorMessage.trim()} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Ask AI
            </Button>
        </CardFooter>
        {isPending && (
            <CardContent className="flex items-center justify-center">
              <Loader2 className="mr-2 h-6 w-6 animate-spin text-accent" />
              <p>Analyzing error...</p>
            </CardContent>
        )}
        {explanation && !isPending && (
          <CardContent>
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>AI Explanation</AlertTitle>
              <AlertDescription className="prose prose-sm max-w-none text-foreground whitespace-pre-wrap">
                {explanation}
              </AlertDescription>
            </Alert>
          </CardContent>
        )}
      </Card>
  );
}


export function GuideClient() {
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | null>(null);
  const [skillLevel, setSkillLevel] = useState<SkillLevel>('beginner');
  const [summary, setSummary] = useState('');
  const [isPending, startTransition] = useTransition();

  const handlePlatformSelect = (platform: Platform) => {
    setSelectedPlatform(platform);
    setSummary('');
  };

  const handleSummarize = () => {
    if (!selectedPlatform) return;

    const guide = deploymentGuides[selectedPlatform];
    const fullInstructions = guide.steps.map(step => `${step.title}: ${step.description}`).join('\n\n');

    startTransition(async () => {
      const result = await summarizeInstructions({ instructions: fullInstructions, skillLevel });
      setSummary(result.summary);
    });
  };

  const selectedGuide = selectedPlatform ? deploymentGuides[selectedPlatform] : null;

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2 font-headline">
                <Terminal />
                {githubGuide.title}
              </CardTitle>
              <CardDescription>{githubGuide.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <DeploymentGuide guide={githubGuide} />
            </CardContent>
          </Card>

          <ImportantNote
            title={securityNote.title}
            description={securityNote.description}
            content={securityNote.content}
          />

          <Card className="shadow-lg" id="deployment-platforms">
            <CardHeader>
              <CardTitle className="text-2xl font-headline">Where do you want to deploy?</CardTitle>
              <CardDescription>Select a platform to view the deployment steps.</CardDescription>
            </CardHeader>
            <CardContent className="grid sm:grid-cols-3 gap-4">
              {Object.keys(deploymentGuides).map((key) => {
                const platformKey = key as Platform;
                return (
                  <Button
                    key={platformKey}
                    variant={selectedPlatform === platformKey ? 'default' : 'outline'}
                    size="lg"
                    className="h-20 flex-col gap-2 text-lg"
                    onClick={() => handlePlatformSelect(platformKey)}
                  >
                    {platformIcons[platformKey]}
                    <span className="capitalize">{platformKey}</span>
                  </Button>
                );
              })}
            </CardContent>
          </Card>

          {selectedGuide && (
            <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <DeploymentGuide guide={selectedGuide} />
            </div>
          )}
        </div>

        <aside className="lg:col-span-1">
          <div className="sticky top-24 space-y-8">
            <Card className={cn('shadow-lg transition-opacity', !selectedPlatform && 'opacity-50 pointer-events-none')}>
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2 font-headline">
                  <Sparkles className="text-accent" />
                  AI-Powered Summary
                </CardTitle>
                <CardDescription>
                  Let our AI summarize the steps for you based on your skill level.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Label>Select your skill level:</Label>
                  <RadioGroup
                    value={skillLevel}
                    onValueChange={(value) => setSkillLevel(value as SkillLevel)}
                    className="flex flex-col space-y-1"
                  >
                    <div className="flex items-center space-x-3 space-y-0">
                      <RadioGroupItem value="beginner" id="beginner" />
                      <Label htmlFor="beginner" className="font-normal flex items-center gap-2"><User size={16}/>Beginner</Label>
                    </div>
                    <div className="flex items-center space-x-3 space-y-0">
                      <RadioGroupItem value="intermediate" id="intermediate" />
                      <Label htmlFor="intermediate" className="font-normal flex items-center gap-2"><Users size={16}/>Intermediate</Label>
                    </div>
                    <div className="flex items-center space-x-3 space-y-0">
                      <RadioGroupItem value="advanced" id="advanced" />
                      <Label htmlFor="advanced" className="font-normal flex items-center gap-2"><BrainCircuit size={16}/>Advanced</Label>
                    </div>
                  </RadioGroup>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSummarize} disabled={isPending || !selectedPlatform} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                  {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Summarize Steps
                </Button>
              </CardFooter>
            </Card>
            
            {isPending && (
              <Card className="shadow-lg animate-fade-in">
                <CardContent className="p-6 flex items-center justify-center">
                  <Loader2 className="mr-2 h-6 w-6 animate-spin text-accent" />
                  <p>Generating summary...</p>
                </CardContent>
              </Card>
            )}

            {summary && !isPending && (
              <Card className="shadow-lg animate-fade-in">
                <CardHeader>
                  <CardTitle className="text-xl font-headline">Summary for {skillLevel}s</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-sm max-w-none text-foreground whitespace-pre-wrap">{summary}</div>
                </CardContent>
              </Card>
            )}
          </div>
        </aside>
      </div>
      <ErrorAnalyzer />
    </>
  );
}
