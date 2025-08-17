<p align="center">
  <img src="/Public/LearnWisdom-AI-Banner.png" alt="LearnWisdomAI Logo"/>
</p>


> **Transform any topic into a complete learning experience with the power of AI**

An advanced AI-powered learning management system that automatically creates comprehensive courses with video content, intelligent summaries, and interactive quizzes - all from just a topic input.

## 🌟 Features

### 🤖 **AI-Powered Course Generation**
- **One-Click Course Creation**: Enter a topic, get a complete course structure
- **Intelligent Content Curation**: Automatically sources relevant YouTube videos
- **Smart Summarization**: AI-generated chapter summaries from video transcripts
- **Interactive Quizzes**: Auto-generated multiple-choice questions for each chapter

### 💎 **Modern Learning Experience**
- **Progress Tracking**: Real-time learning progress visualization
- **Mobile-First Design**: Responsive interface that works everywhere
- **Smooth Animations**: Polished UI with Framer Motion
- **Multi-Language Support**: Transcript processing in multiple languages

### 💳 **Flexible Subscription Model**
- **Free Tier**: 10 course generations to get started
- **Pro Plan**: ₹4.99/month for unlimited courses
- **Enterprise**: ₹17.49/month with advanced features

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL database
- Docker (optional)

### Local Development
```bash
# Fork and Clone the repository
git clone www.github.com/yourusername/learnwisdomai.git

cd learnwisdom-ai

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Add your API keys and database URL

# Run database migrations
npx prisma migrate dev
npx prisma generate

# Start development server
npm run dev
```

## Running with Docker 🐳

### Production with Docker
> NOTE: You should have downloaded the `Docker Desktop`: [https://docs.docker.com/get-docker/](https://docs.docker.com/get-docker/)

### Build and run with Docker Compose

```bash
# Build production image
docker compose up --build
```

Acess the app at [http://localhost:3000](http://localhost:3000)


## System Architecture
![System Architecture](/Public/LearnWisdomAI-System-Architecture.png)


## Tech Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Frontend** | Next.js 15.4, React 18, TypeScript | Modern web application |
| **Styling** | TailwindCSS, Radix UI, Framer Motion | Beautiful, responsive UI |
| **Backend** | Node.js, Prisma ORM | API and database operations |
| **Database** | PostgreSQL | Data persistence |
| **Authentication** | NextAuth.js | Secure user management |
| **AI/APIs** | Google Gemini, YouTube APIs, Unsplash | Content generation & sourcing |
| **Payments** | Razorpay | Subscription management |
| **DevOps** | Docker, Docker Compose | Containerized deployment |

## Course Creation Flow

![Course Creation Flow](/Public/LearnWisdomAI-course-creation-flow.png)

## Database Schema

<img src="/Public/LearnWisdomAI-Database-Schema.png" alt="Database Schema" width="500" />

## Key Features in Detail

### **Intelligent Course Generation**
- Input any topic and desired number of units
- AI creates detailed chapter breakdown
- Automatically sources relevant educational videos
- Generates comprehensive summaries from video transcripts

### **Smart Content Processing**
- Multi-language transcript support
- Fallback content generation when transcripts unavailable
- Context-aware quiz generation
- Real-time progress tracking

### **Subscription Management**
- Credit-based system with usage tracking
- Seamless Razorpay payment integration
- Automatic feature unlocking based on subscription tier

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

***

**[🌐 Live Demo](https://learn-wisdom-ai-m8wv.vercel.app/) -  [🐛 Report Bug](https://github.com/DevsDialogue/learnwisdomai/issues)**

