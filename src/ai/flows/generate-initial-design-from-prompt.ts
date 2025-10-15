'use server';
/**
 * @fileOverview A flow that generates an initial system architecture diagram from a text prompt.
 *
 * - generateInitialDesignFromPrompt - A function that handles the generation of the initial system architecture diagram.
 * - GenerateInitialDesignFromPromptInput - The input type for the generateInitialDesignFromPrompt function.
 * - GenerateInitialDesignFromPromptOutput - The return type for the generateInitialDesignFromPrompt function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateInitialDesignFromPromptInputSchema = z.object({
  prompt: z.string().describe('A text prompt describing the desired system architecture.'),
});
export type GenerateInitialDesignFromPromptInput = z.infer<typeof GenerateInitialDesignFromPromptInputSchema>;

const GenerateInitialDesignFromPromptOutputSchema = z.object({
  design: z.string().describe('A JSON string representing the initial system architecture design.'),
});
export type GenerateInitialDesignFromPromptOutput = z.infer<typeof GenerateInitialDesignFromPromptOutputSchema>;

export async function generateInitialDesignFromPrompt(input: GenerateInitialDesignFromPromptInput): Promise<GenerateInitialDesignFromPromptOutput> {
  return generateInitialDesignFromPromptFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateInitialDesignFromPromptPrompt',
  input: {schema: GenerateInitialDesignFromPromptInputSchema},
  output: {schema: GenerateInitialDesignFromPromptOutputSchema},
  prompt: `You are a system architect expert. You will generate a system architecture design in JSON format based on the user's prompt. The JSON should represent the nodes and edges of a directed graph. The nodes should have an id, a type, and configuration parameters (algorithm, TTL, replicas, etc.). The edges should have a source and target node id. The JSON structure must conform to the following schema:\n\n{
  "nodes": [
    {
      "id": string,
      "type": string, // Component type (e.g., 'load-balancer', 'cache', 'database')
      "data": {
        "label": string, // Display name for the node
        "config": object // Configuration parameters for the component
      }
    }
  ],
  "edges": [
    {
      "id": string, // Unique edge ID
      "source": string, // Source node ID
      "target": string // Target node ID
    }
  ]
}\n\nGenerate a system architecture design in JSON format based on the following prompt:\n\nPrompt: {{{prompt}}}`,
});

const generateInitialDesignFromPromptFlow = ai.defineFlow(
  {
    name: 'generateInitialDesignFromPromptFlow',
    inputSchema: GenerateInitialDesignFromPromptInputSchema,
    outputSchema: GenerateInitialDesignFromPromptOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
