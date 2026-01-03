'use server';

/**
 * @fileOverview Emergency message composition flow.
 *
 * This file defines a Genkit flow to compose an emergency message including location, situation, and pre-defined templates.
 *
 * @file            compose-emergency-message.ts
 * @exports       composeEmergencyMessage - Function to compose the emergency message.
 * @exports       ComposeEmergencyMessageInput - Input type for the composeEmergencyMessage function.
 * @exports       ComposeEmergencyMessageOutput - Output type for the composeEmergencyMessage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ComposeEmergencyMessageInputSchema = z.object({
  latitude: z.number().describe('The latitude of the user.'),
  longitude: z.number().describe('The longitude of the user.'),
  situation: z.string().describe('A description of the emergency situation.'),
  template: z.string().describe('A pre-defined emergency message template.'),
});
export type ComposeEmergencyMessageInput = z.infer<typeof ComposeEmergencyMessageInputSchema>;

const ComposeEmergencyMessageOutputSchema = z.object({
  message: z.string().describe('The composed emergency message.'),
});
export type ComposeEmergencyMessageOutput = z.infer<typeof ComposeEmergencyMessageOutputSchema>;

export async function composeEmergencyMessage(input: ComposeEmergencyMessageInput): Promise<ComposeEmergencyMessageOutput> {
  return composeEmergencyMessageFlow(input);
}

const composeEmergencyMessagePrompt = ai.definePrompt({
  name: 'composeEmergencyMessagePrompt',
  input: {schema: ComposeEmergencyMessageInputSchema},
  output: {schema: ComposeEmergencyMessageOutputSchema},
  prompt: `You are an AI assistant that composes clear, concise, and empathetic emergency messages.

  Compose an emergency message based on the following information. The tone should be serious and urgent, but calm. Start with a clear statement of the emergency type.

  Template: {{{template}}}
  Situation: {{{situation}}}
  Location: Latitude {{{latitude}}}, Longitude {{{longitude}}}

  Include a direct link to Google Maps for the location. End the message with a clear call to action.

  Example:
  This is an urgent [Template] alert.
  [Situation]
  My current location is: [Link to Google Maps]
  Please contact me or emergency services immediately.
  `,
});

const composeEmergencyMessageFlow = ai.defineFlow(
  {
    name: 'composeEmergencyMessageFlow',
    inputSchema: ComposeEmergencyMessageInputSchema,
    outputSchema: ComposeEmergencyMessageOutputSchema,
  },
  async input => {
    const {output} = await composeEmergencyMessagePrompt(input);
    const googleMapsLink = `https://www.google.com/maps?q=${input.latitude},${input.longitude}`;
    const messageWithLink = `${output!.message}\nMy current location is: ${googleMapsLink}`;

    return { message: messageWithLink };
  }
);
