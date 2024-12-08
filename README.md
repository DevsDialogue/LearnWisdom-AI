# Learn Wisdom AI

**Learn Wisdom AI** is an AI-powered SaaS content generation web application designed to generate personalized, structured courses based on topics chosen by users. The platform leverages the power of OpenAI as Client and OpenRouter API and integrates various tools for creating, managing, and monetizing educational content.

## Demo

[]()

## Running with Docker

To run the project locally using Docker, follow the steps below:

1. **Pull the docker image**

   ```bash
   docker pull learnwisdom-ai

   ```

2. **Run the Docker container:**

   ```bash
   docker run -p 3000:3000 learnwisdom-ai

   ```

The application should now be accessible on [http://localhost:3000](http://localhost:3000/).

## Setting up the project on your local machine

To get started with the project locally, follow the steps below:

1. **[Install Dependencies:](/CONTRIBUTING.md)**
1. **Run the Application:**

   - After setting up your environment, run the app with the following command:

     ```bash
     npm run dev

     ```

1. **Set up Environment Variables:**

   - Create a `.env` file using below command and add your actual environment variables:

     ```bash
     cp .env.example .env

     ```
## Project Workflow

- **Frontend**: The frontend is built using **Next.js** with **Tailwind CSS** for styling.
- **Backend**: The backend uses **Prisma ORM** to interact with **PostgreSQL**, and **Supabase** serves as the backend platform.
- **Payment Integration**: The project uses **Stripe** for managing payments for course creation and subscription services.

## CI/CD Workflow
