'use client'

import { GoogleSignInButton } from "@/components/GoogleSignInButton";
import { GithubSignInButton } from "@/components/GithubSignInButton";
import { SignInSkeleton } from "@/components/SignInSkeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import * as React from "react";
import type { EmblaCarouselType } from "embla-carousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useSignUp, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";

function CarouselDemo() {
  const [api, setApi] = React.useState<EmblaCarouselType | undefined>(undefined);
  const slideCount = 5;
  React.useEffect(() => {
    if (!api) return;
    let interval: NodeJS.Timeout | null = null;
    let resetTimeout: NodeJS.Timeout | null = null;

    function startInterval() {
      if (interval) clearInterval(interval);
      interval = setInterval(() => {
        if (document.hidden) return;
        if (!api) return;
        const selected = api.selectedScrollSnap ? api.selectedScrollSnap() : 0;
        if (selected === slideCount - 1) {
          resetTimeout = setTimeout(() => {
            if (!document.hidden && api.scrollTo) {
              api.scrollTo(0);
            }
          }, 1000);
        } else {
          if (api.scrollNext) {
            api.scrollNext();
          }
        }
      }, 5000);
    }

    function handleVisibility() {
      if (document.hidden) {
        if (interval) clearInterval(interval);
        if (resetTimeout) clearTimeout(resetTimeout);
      } else {
        startInterval();
      }
    }

    startInterval();
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      if (interval) clearInterval(interval);
      if (resetTimeout) clearTimeout(resetTimeout);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [api]);
  return (
    <Carousel className="w-full h-full bg-white flex items-center justify-center" setApi={setApi}>
      <CarouselContent>
        {Array.from({ length: slideCount }).map((_, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-4xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

export default function Page() {
  const { signUp, isLoaded } = useSignUp();
  const { isSignedIn, isLoaded: isUserLoaded } = useUser();
  const router = useRouter();
  const [loadingAuth, setLoadingAuth] = React.useState(true);
  
  React.useEffect(() => {
    if (isUserLoaded && isSignedIn) {
      router.replace("/");
    } else if (isUserLoaded) {
      setLoadingAuth(false);
    }
  }, [isUserLoaded, isSignedIn, router]);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      const response = await signUp.create({
        emailAddress: email,
      });
      
      // Check if we need to verify the email
      if (response.status === "complete") {
        // If sign up is complete, redirect to home page
        router.push("/");
      } else if (response.status === "missing_requirements") {
        // Need to verify email
        setIsVerifying(true);
      }
    } catch (err: unknown) {
      console.error("Error during sign up:", err);
      if (err instanceof Error) {
        setError(err.message);
      } else if (typeof err === 'object' && err !== null && 'errors' in err) {
        const errorObj = err as { errors?: Array<{ message: string }> };
        setError(errorObj.errors?.[0]?.message || "Something went wrong during sign up");
      } else {
        setError("Something went wrong during sign up");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      const response = await signUp.attemptEmailAddressVerification({
        code,
      });
      
      if (response.status === "complete") {
        // Verification was successful
        router.push("/");
      } else {
        setError("Verification failed. Please try again.");
      }
    } catch (err: unknown) {
      console.error("Error during verification:", err);
      if (err instanceof Error) {
        setError(err.message);
      } else if (typeof err === 'object' && err !== null && 'errors' in err) {
        const errorObj = err as { errors?: Array<{ message: string }> };
        setError(errorObj.errors?.[0]?.message || "Something went wrong during verification");
      } else {
        setError("Something went wrong during verification");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show loading skeleton while checking auth state
  if (loadingAuth) {
    return <SignInSkeleton />;
  }

  return (
    <div className="relative flex min-h-screen flex-row items-center bg-white pt-8">
      <div className="flex justify-start w-full max-w-2xl ml-64 z-10">
        <Card className="w-full max-w-sm bg-beige border-gray shadow-none mr-auto">
          <CardContent>
            <div className="flex flex-col gap-3 mb-6">
              <GoogleSignInButton mode="sign-in" />
              <GithubSignInButton />
            </div>
            <div className="flex items-center my-4">
              <div className="flex-grow border-t border-white/20" />
              <span className="mx-3 text-xs text-white/60 tracking-widest">OR</span>
              <div className="flex-grow border-t border-white/20" />
            </div>
            {!isVerifying ? (
              <form className="flex flex-col gap-3 text-white" onSubmit={handleSignUp}>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your personal or work email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-transparent border border-white/20 text-white placeholder:text-white/40 focus:border-white/40"
                />
                <Button 
                  type="submit" 
                  className="w-full bg-black text-white font-medium hover:bg-orange/90 mt-1 mb-2"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Creating Account..." : "Continue with Email"}
                </Button>
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
              </form>
            ) : (
              <form className="flex flex-col gap-3" onSubmit={handleVerification}>
                <Input
                  id="code"
                  type="text"
                  placeholder="Verification code"
                  required
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="bg-transparent border border-white/20 text-white placeholder:text-white/40 focus:border-white/40"
                />
                <Button 
                  type="submit" 
                  className="w-full bg-orange text-black font-medium hover:bg-orange/90 mt-1 mb-2"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Verifying..." : "Verify Email"}
                </Button>
                <Button 
                  type="button" 
                  variant="link" 
                  className="text-white/60 hover:text-white" 
                  onClick={() => setIsVerifying(false)}
                >
                  Back to sign up
                </Button>
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
              </form>
            )}
          </CardContent>
          <div className="text-center text-xs text-white/50 px-6 pb-6 pt-2">
            By clicking continue, you agree to our{' '}
            <a href="#" className="underline">Terms of Service</a> and{' '}
            <a href="#" className="underline">Privacy Policy</a>.
          </div>
        </Card>
      </div>
      <div className="flex-1 z-10" />
      <div className="absolute right-0 top-0 h-full w-1/2 min-h-screen z-0 flex items-center justify-center">
        <CarouselDemo />
      </div>
    </div>
  );
}