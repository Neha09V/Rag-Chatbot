"use client";
import Link from "next/link";
import {
  SignInButton,
  SignOutButton,
  SignUpButton,
  useUser,

} from "@clerk/nextjs";

import { Button } from "@/components/ui/button";

export const Navigation = () => {
  const { isSignedIn } = useUser();

  return (
      <nav className="sticky top-0 z-50 backdrop-blur-md border-b bg-background/80">
      <div className="flex container h-16 items-center justify-between px-4 mx-auto">
       <Link
  href="/"
  className="text-xl font-bold cursor-pointer hover:opacity-80"
>
  🤖 RAG Chatbot
</Link>

        <div className="flex gap-2">
          {!isSignedIn ? (
            <>
              <SignInButton mode="modal">
                <Button variant="ghost">
                  Sign In
                </Button>
              </SignInButton>

              <SignUpButton mode="modal">
                <Button>
                  Sign Up
                </Button>
              </SignUpButton>
            </>
          ) : (
            <SignOutButton>
              <Button variant="outline">
                Sign Out
              </Button>
            </SignOutButton>
          )}
        </div>
      </div>
    </nav>
  );
};