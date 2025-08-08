'use client'
import Link from "next/link";
import { Authenticated, Unauthenticated } from 'convex/react';
import { UserButton } from '@clerk/nextjs';
import { useQuery } from 'convex/react';
import { api } from '../convex/_generated/api';

function Dashboard() {
  const messages = useQuery(api.messages.getForCurrentUser);
  
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <UserButton />
      </div>
      <div className="bg-white/5 p-6 rounded-lg">
        <h2 className="text-xl mb-4">Your Content</h2>
        {messages?.length ? (
          <div>You have {messages.length} messages</div>
        ) : (
          <div>No content yet. Start creating!</div>
        )}
      </div>
    </div>
  );
}

function LandingPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <Link
        href="/sign-in"
        className="px-6 py-3 bg-blue text-black rounded-lg font-semibold hover:bg-blue/80 transition"
      >
        Sign In
      </Link>
    </main>
  );
}

export default function Home() {
  return (
    <>
      <Authenticated>
        <Dashboard />
      </Authenticated>
      <Unauthenticated>
        <LandingPage />
      </Unauthenticated>
    </>
  );
}