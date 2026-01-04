# Guardian Angel

Guardian Angel is a personal safety application that allows you to quickly send an SOS message to your emergency contacts. It uses your current location and an AI-powered message generator to create a clear and concise alert, which is then sent via email.

## Features

-   **One-Tap SOS:** Send an emergency alert with a single button press.
-   **AI-Powered Messages:** Uses Genkit to generate an empathetic and informative emergency message based on the situation.
-   **Location Sharing:** Automatically includes a Google Maps link to your current location in the SOS message.
-   **Customizable Emergency Types:** Select from predefined templates like "Medical Emergency," "Feeling Unsafe," or "In an Accident."
-   **Contact Management:** Easily add and remove emergency contacts directly within the app.
-   **Direct Emailing:** Uses Nodemailer to send emails directly from the backend, ensuring reliability.

## Tech Stack

-   [Next.js](https://nextjs.org/) (App Router)
-   [React](https://reactjs.org/)
-   [TypeScript](https://www.typescriptlang.org/)
-   [Tailwind CSS](https://tailwindcss.com/)
-   [ShadCN UI](https://ui.shadcn.com/)
-   [Genkit](https://firebase.google.com/docs/genkit)
-   [Nodemailer](https://nodemailer.com/)

## Getting Started

### Prerequisites

-   Node.js (v18 or later)
-   npm, yarn, or pnpm

### 1. Installation

Clone the repository and install the dependencies:

```bash
npm install
```

### 2. Environment Variables

For the application to send emails, you need to set up credentials for a Gmail account.

1.  Create a file named `.env` in the root of your project.
2.  Add the following variables to the `.env` file:

    ```
    EMAIL_USER="your-email@gmail.com"
    EMAIL_APP_PASSWORD="your-gmail-app-password"
    ```

3.  **Replace the placeholder values:**
    -   `EMAIL_USER`: Your full Gmail address.
    -   `EMAIL_APP_PASSWORD`: A **Gmail App Password**. You cannot use your regular Gmail password.

    > **How to get a Gmail App Password:**
    > 1.  Go to your Google Account settings: [myaccount.google.com](https://myaccount.google.com/).
    > 2.  Enable 2-Step Verification for your account if you haven't already.
    > 3.  Navigate to **Security** > **2-Step Verification** > **App passwords**.
    > 4.  Generate a new app password. Select "Mail" for the app and "Other (Custom name)" for the device. Give it a name like "Guardian Angel App".
    > 5.  Google will generate a 16-character password. Copy this password (without spaces) and paste it as the value for `EMAIL_APP_PASSWORD`.

### 3. Running the Application

Run the development server:

```bash
npm run dev
```

The application will be available at [http://localhost:9002](http://localhost:9002).

## How to Use

1.  **Grant Location Access:** When you first open the app, your browser will ask for permission to access your location. Please allow it, as this is crucial for the SOS message.
2.  **Add Contacts:** Click on "Add Contact" to add the name and email address of people you want to notify in an emergency.
3.  **Select Emergency Type:** Choose the card that best describes your situation. This will be used by the AI to compose the message.
4.  **Send SOS:** Press the large red SOS button at the bottom of the screen. The app will confirm when the alert has been successfully sent.
