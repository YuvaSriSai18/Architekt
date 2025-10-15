'use server';

/**
 * @fileOverview A Genkit flow for loading and validating system designs from Firestore using a GenAI model.
 *
 * - loadAndValidateDesign - A function that handles loading a design and validating it against a schema.
 * - LoadAndValidateDesignInput - The input type for the loadAndValidateDesign function.
 * - LoadAndValidateDesignOutput - The return type for the loadAndValidateDesign function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const LoadAndValidateDesignInputSchema = z.object({
  designJson: z.string().describe('The system design as a JSON string.'),
  componentsSchema: z.string().describe('The schema to validate the design against, as a JSON string.'),
});
export type LoadAndValidateDesignInput = z.infer<typeof LoadAndValidateDesignInputSchema>;

const LoadAndValidateDesignOutputSchema = z.object({
  isValid: z.boolean().describe('Whether the design is valid according to the schema.'),
  validationFeedback: z.string().describe('Feedback from the AI model regarding the validity of the design.'),
});
export type LoadAndValidateDesignOutput = z.infer<typeof LoadAndValidateDesignOutputSchema>;

export async function loadAndValidateDesign(input: LoadAndValidateDesignInput): Promise<LoadAndValidateDesignOutput> {
  return loadAndValidateDesignFlow(input);
}

const prompt = ai.definePrompt({
  name: 'loadAndValidateDesignPrompt',
  input: {schema: LoadAndValidateDesignInputSchema},
  output: {schema: LoadAndValidateDesignOutputSchema},
  prompt: `You are a system design expert.  You are given a system design as a JSON string, and a schema as a JSON string.  Your job is to validate the design against the schema, and provide feedback on whether the design is valid, and any issues you find.

System Design:
{{designJson}}

Schema:
{{componentsSchema}}

Respond using the following JSON format:
{
  "isValid": true or false,
  "validationFeedback": "A detailed explanation of whether the design is valid, and if not, what the issues are."
}`,
});

const loadAndValidateDesignFlow = ai.defineFlow(
  {
    name: 'loadAndValidateDesignFlow',
    inputSchema: LoadAndValidateDesignInputSchema,
    outputSchema: LoadAndValidateDesignOutputSchema,
  },
  async input => {
    try {
      JSON.parse(input.designJson);
      JSON.parse(input.componentsSchema);
    } catch (e: any) {
      return {
        isValid: false,
        validationFeedback: `The design JSON or schema JSON is not valid JSON: ${e.message}`,
      };
    }
    const {output} = await prompt(input);
    return output!;
  }
);
