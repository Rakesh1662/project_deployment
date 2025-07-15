'use server';

/**
 * @fileOverview An AI agent that analyzes error messages and provides explanations.
 *
 * - analyzeError - A function that analyzes an error message.
 * - AnalyzeErrorInput - The input type for the analyzeError function.
 * - AnalyzeErrorOutput - The return type for the analyzeError function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeErrorInputSchema = z.object({
  errorMessage: z.string().describe('The error message to analyze.'),
});
export type AnalyzeErrorInput = z.infer<typeof AnalyzeErrorInputSchema>;

const AnalyzeErrorOutputSchema = z.object({
  explanation: z.string().describe('The explanation of the error message and potential solutions.'),
});
export type AnalyzeErrorOutput = z.infer<typeof AnalyzeErrorOutputSchema>;

export async function analyzeError(input: AnalyzeErrorInput): Promise<AnalyzeErrorOutput> {
  return analyzeErrorFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeErrorPrompt',
  input: {
    schema: AnalyzeErrorInputSchema,
  },
  output: {
    schema: AnalyzeErrorOutputSchema,
  },
  prompt: `You are an expert software developer and a helpful debugging assistant. Your task is to analyze an error message from a Next.js application using Tailwind CSS and Genkit, and provide a clear, easy-to-understand explanation.

The user will provide an error message. You need to:
1.  Identify the most likely cause of the error.
2.  Explain the error in simple terms, avoiding highly technical jargon where possible.
3.  Suggest one or two common solutions to fix the error.
4.  Keep the explanation concise and to the point.

Error Message:
{{{errorMessage}}}
`,
});

const analyzeErrorFlow = ai.defineFlow(
  {
    name: 'analyzeErrorFlow',
    inputSchema: AnalyzeErrorInputSchema,
    outputSchema: AnalyzeErrorOutputSchema,
  },
  async (input) => {
    let retries = 3;
    while (retries > 0) {
      try {
        const {output} = await prompt(input);
        return output!;
      } catch (e: any) {
        if (e.message.includes('503') && retries > 1) {
          retries--;
          // Wait for a second before retrying
          await new Promise(resolve => setTimeout(resolve, 1000)); 
          continue;
        }
        throw e;
      }
    }
    // This part should ideally not be reached if retries are handled correctly,
    // but it's here as a fallback.
    throw new Error('AI model is overloaded. Please try again later.');
  }
);
