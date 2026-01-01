'use server';

import {
  composeEmergencyMessage,
  type ComposeEmergencyMessageInput,
} from '@/ai/flows/compose-emergency-message';

export async function composeMessageAction(input: ComposeEmergencyMessageInput) {
  try {
    const result = await composeEmergencyMessage(input);
    return { success: true, message: result.message };
  } catch (error) {
    console.error('Error composing emergency message:', error);
    return {
      success: false,
      message: 'An error occurred while generating the message. Please try again.',
    };
  }
}
