'use client';

import { ShieldAlert } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface ImportantNoteProps {
  title: string;
  description: string;
  content: string;
}

export const ImportantNote: React.FC<ImportantNoteProps> = ({ title, description, content }) => {
  return (
    <Card className="shadow-lg bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 font-headline text-yellow-800 dark:text-yellow-300">
          <ShieldAlert className="w-6 h-6" />
          {title}
        </CardTitle>
        <CardDescription className="text-yellow-700 dark:text-yellow-400">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-foreground/90">{content}</p>
      </CardContent>
    </Card>
  );
};
