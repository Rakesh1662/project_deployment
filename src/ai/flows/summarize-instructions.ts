'use server';

/**
 * @fileOverview An AI agent that summarizes deployment instructions based on the user's skill level.
 *
 * - summarizeInstructions - A function that summarizes deployment instructions.
 * - SkillLevel - The skill level of the user.
 * - SummarizeInstructionsInput - The input type for the summarizeInstructions function.
 * - SummarizeInstructionsOutput - The return type for the summarizeInstructions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SkillLevelSchema = z.enum(['beginner', 'intermediate', 'advanced']);
export type SkillLevel = z.infer<typeof SkillLevelSchema>;

const SummarizeInstructionsInputSchema = z.object({
  instructions: z.string().describe('The deployment instructions to summarize.'),
  skillLevel: SkillLevelSchema.describe('The skill level of the user.'),
});
export type SummarizeInstructionsInput = z.infer<typeof SummarizeInstructionsInputSchema>;

const SummarizeInstructionsOutputSchema = z.object({
  summary: z.string().describe('The summarized deployment instructions.'),
});
export type SummarizeInstructionsOutput = z.infer<typeof SummarizeInstructionsOutputSchema>;

export async function summarizeInstructions(input: SummarizeInstructionsInput): Promise<SummarizeInstructionsOutput> {
  return summarizeInstructionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeInstructionsPrompt',
  input: {
    schema: SummarizeInstructionsInputSchema,
  },
  output: {
    schema: SummarizeInstructionsOutputSchema,
  },
  prompt: `You are an expert at summarizing technical instructions.  You will summarize the following deployment instructions based on the user's skill level. The summary should be tailored to the user's skill level so that they can quickly grasp the essential steps without unnecessary details or overly complex explanations.

Skill Level: {{{skillLevel}}}

Instructions: {{{instructions}}}
`,
});

const summarizeInstructionsFlow = ai.defineFlow(
  {
    name: 'summarizeInstructionsFlow',
    inputSchema: SummarizeInstructionsInputSchema,
    outputSchema: SummarizeInstructionsOutputSchema,
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
