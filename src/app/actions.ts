'use server';

import {
  composeEmergencyMessage,
  type ComposeEmergencyMessageInput,
} from '@/ai/flows/compose-emergency-message';
import type { Contact } from '@/lib/types';
import nodemailer from 'nodemailer';

export async function sendSosAction(
  composeInput: ComposeEmergencyMessageInput,
  contacts: Contact[],
  subject: string
) {
  try {
    const { EMAIL_USER, EMAIL_APP_PASSWORD } = process.env;
    if (!EMAIL_USER || !EMAIL_APP_PASSWORD) {
      console.error('Email credentials not configured in .env file');
      return {
        success: false,
        message: 'Server is not configured to send emails. Please contact support.',
      };
    }

    const result = await composeEmergencyMessage(composeInput);
    
    if (!result?.message) {
      console.error('AI failed to generate a message.');
      return {
        success: false,
        message: 'There was a problem generating the emergency message. Please try again.',
      };
    }
    const message = result.message;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_APP_PASSWORD,
      },
    });

    const emails = contacts.map((c) => c.email);

    await transporter.sendMail({
      from: `"Guardian Angel" <${EMAIL_USER}>`,
      to: emails.join(','),
      subject: subject,
      text: message,
      html: `<p>${message.replace(/\n/g, '<br>')}</p>`,
    });

    return { success: true, message: 'SOS email sent successfully.' };
  } catch (error) {
    console.error('Error sending SOS email:', error);
    return {
      success: false,
      message: 'An error occurred while sending the email. Please try again.',
    };
  }
}
