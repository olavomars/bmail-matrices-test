# BMail Replica

This repository contains my implementation of the BMail replica challenge - a pixel-perfect recreation of BMail's functionality built with React and TypeScript.

## 🎯 Challenge Overview

The goal was to perfectly replicate all of BMail's behavior, focusing on identical operations and interactions down to every edge case. While the visual design doesn't need to be pixel-perfect, the functional behavior must be completely accurate.

## ✅ Requirements Met

- **React + TypeScript**: Built using modern React 18 with full TypeScript support
- **In-memory Database**: All data is stored in deterministic JavaScript objects that reset to the same state on every refresh
- **Frozen Time**: The application always behaves as if it's **March 14th, 2030 @ 3:14 PM**
- **Deterministic Dataset**: Consistent email data and threading across all sessions
- **Code Quality**: Clean, maintainable code with proper TypeScript types and component structure

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, shadcn/ui components
- **Routing**: React Router DOM
- **State Management**: React Query (TanStack Query)
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **Build Tool**: Vite

## 📦 Installation & Setup

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Steps

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd clone-mail-zen
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

## 📝 Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint for code quality checks

## 📧 Email Data Structure

The application includes sample emails with various characteristics:

- Different senders and recipients
- Email threads and conversations
- Starred and unread states
- Spam filtering
- Multiple folder organization

## 🔧 Development Notes

- All dates are relative to the frozen timestamp
- Email threads are automatically grouped by threadId
- The UI is built with modern React patterns and hooks
- TypeScript ensures type safety throughout the application

---
