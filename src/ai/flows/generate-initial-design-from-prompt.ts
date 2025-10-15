
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
  prompt: `You are a system architect expert. You will generate a system architecture design in JSON format based on the user's prompt. The JSON should represent the nodes and edges of a directed graph.

The available component types are: 'load-balancer', 'web-server', 'cache', 'database', 'message-queue', 'cdn', 'api-gateway', 'auth-service', 'object-storage', 'firewall', 'vpn-gateway', 'client-device', 'ci-cd-pipeline', 'graphql-api'.

The JSON structure must conform to the following schema:
{
  "nodes": [
    {
      "id": "dnd-node_1",
      "type": "default",
      "position": { "x": 100, "y": 100 },
      "data": {
        "label": "Component Label",
        "type": "component-type", // e.g., 'load-balancer'
        "config": {
          // component-specific config with default values
        }
      }
    }
  ],
  "edges": [
    {
      "id": "reactflow__edge-dnd-node_1-dnd-node_2",
      "source": "dnd-node_1",
      "target": "dnd-node_2"
    }
  ]
}

- Each node must have a unique 'id' starting with 'dnd-node_'.
- Each node's 'type' must be 'default'.
- 'position' should be approximated to lay out the components logically. For example, a client device should be at the top, followed by a load balancer, then web servers, etc.
- The 'data.type' must be one of the available component types.
- The 'data.config' object should contain valid configuration for the component type, with default values if not specified.
- Each edge must have a unique 'id' and connect two nodes via 'source' and 'target'.
- Always include a 'client-device' as the entry point for user traffic unless the prompt specifies otherwise.
- Infer connections logically. For example, a client connects to a load balancer, which connects to web servers, which connect to a database.

Generate a complete and valid JSON object for the following prompt. Do not include any explanations, just the raw JSON.

Prompt: {{{prompt}}}
`,
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

    