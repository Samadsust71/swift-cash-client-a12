# Swift Cash | Micro Tasking and Earning Platform

![Swift Cash Preview](https://i.ibb.co.com/HD8dTdjK/Screenshot-60.png)

## 📌 Introduction

**Swift Cash** is a web-based micro-tasking platform that enables users to complete small tasks and earn money. Inspired by platforms like **Picoworkers, Clickworker, and SEOClerks**, it provides a structured ecosystem for micro-earning.

The platform supports three distinct user roles:

- **Worker**: Completes tasks, submits work for review, withdraws earnings, and receives notifications.
- **Buyer**: Creates tasks, reviews worker submissions, approves payments, purchases coins, and reports issues.
- **Admin**: Manages users, tasks, disputes, and maintains platform integrity.

---

## 📑 Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Dependencies](#dependencies)
- [Configuration](#configuration)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)

---

## ⚙️ Installation

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (latest stable version)
- [Vite](https://vitejs.dev/) (for development and production builds)
- A package manager (`npm` or `yarn`)

### Steps to Install

1. **Clone the repository**:
   ```sh
   git clone https://github.com/Samadsust71/swift-cash-client-a12.git
   ```

2. **Navigate into the project directory**:
   ```sh
   cd swift-cash-client
   ```

3. **Install dependencies**:
   ```sh
   npm install
   ```

4. **Start the development server**:
   ```sh
   npm run dev
   ```

5. **To build the project for production**:
   ```sh
   npm run build
   ```

6. **To preview the production build**:
   ```sh
   npm run preview
   ```

---

## 🚀 Usage

### Workers Can:
- Browse and apply for tasks.
- Submit work for approval.
- Withdraw earnings.

### Buyers Can:
- Post new tasks.
- Review submissions and approve/reject them.
- Fund their accounts to pay workers.

### Admins Can:
- Monitor platform activities.
- Manage users and disputes.
- Maintain system security.

---

## 🌟 Features

✅ Task creation and management  
✅ User roles with different permissions  
✅ Secure payment system (Stripe integration)  
✅ Task submission and review system  
✅ Notifications for users  
✅ Coin-based reward system  
✅ Admin control panel for moderation  

---

## 📦 Dependencies

This project is built using modern frontend technologies. Below are the key dependencies:

### Core Dependencies
- **Frontend Framework**: `react`, `react-dom`
- **Routing**: `react-router-dom`
- **State Management**: `@tanstack/react-query`, `react-context-api`
- **UI Components**: `@headlessui/react`, `framer-motion`, `swiper`
- **Utilities**: `date-fns`, `match-sorter`, `sort-by`
- **Notifications**: `sweetalert2`, `react-hot-toast`
- **Payments**: `@stripe/react-stripe-js`, `@stripe/stripe-js`

### Development Dependencies
- **Linting & Formatting**: `eslint`, `eslint-plugin-react`, `eslint-plugin-react-hooks`
- **Styling**: `tailwindcss`, `postcss`, `autoprefixer`
- **Build Tools**: `vite`, `@vitejs/plugin-react`

To install all dependencies, run:  
```sh
npm install
```

---

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the root directory and add the following:

```sh
VITE_API_KEY=your_firebase_api_key
VITE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_PROJECT_ID=your_firebase_project_id
VITE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_APP_ID=your_firebase_app_id
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
VITE_API_URL=your_api_endpoint
VITE_ImageHosting_API_KEY=your_ImageBB_api_key
```

Replace values with your actual API keys and configurations.

---

## 🔥 Future Enhancements

- Add real-time updates using Firebase Realtime Database.
- Integrate advanced analytics for platform usage.
- Enhance the notification system with push notifications.

---

## 🙌 Contributing

We welcome contributions to improve **Swift Cash**! Please fork the repository and submit a pull request with your changes.

---

## 💡 Suggestions?

Feel free to share your feedback and suggestions to improve **Swift Cash**! 🚀
