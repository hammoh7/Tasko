# Tasko

### Getting Started
1. Clone the project:
   ```
   git clone https://github.com/hammoh7/Tasko.git
   ```
2. Run:
   ```
   npm install
   ```
3. Create a .env.local (No need to create if already exist). Copy below things with your appropriate data:
   ```
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
   CLERK_SECRET_KEY=
   
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/login
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/register
   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
   
   DATABASE_URL=""
   
   NEXT_PUBLIC_UNSPLASH_ACCESS_KEY=
   ```
4. Then, run the development server:
   ```
   npm run dev
   ```
5. Open http://localhost:3000 with your browser to see the result
