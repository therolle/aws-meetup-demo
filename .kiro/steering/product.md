# Product Overview

A full-stack Todo application demonstrating AWS Amplify Gen2 capabilities. Users authenticate via email/password and manage personal todo lists with real-time updates.

## Core Features

- Email/password authentication (Cognito User Pools)
- Create, read, and delete todos
- Real-time synchronization across sessions
- Per-user data isolation (owner-based authorization)

## User Flow

1. Sign up or sign in with email/password
2. View personal todo list
3. Add new todos via prompt dialog
4. Delete todos with inline button
5. Sign out when done

## Key Characteristics

- Single-page application (SPA)
- Real-time data updates via GraphQL subscriptions
- Mobile-responsive design
- Minimal UI focused on core functionality
