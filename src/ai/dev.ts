import { config } from 'dotenv';
config();

import '@/ai/flows/load-and-validate-design.ts';
import '@/ai/flows/generate-initial-design-from-prompt.ts';