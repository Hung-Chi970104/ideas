
"use client";
import { GoogleSignInButton } from "@/components/GoogleSignInButton";
import { GithubSignInButton } from "@/components/GithubSignInButton";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
            if (!document.hidden) api.scrollTo && api.scrollTo(0);
          }, 1000);
        } else {
          api.scrollNext && api.scrollNext();
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
  return (
    <div className="relative flex min-h-screen flex-row items-center bg-blue pt-8">
      <div className="absolute left-0 top-0 h-full w-1/2 min-h-screen z-0 flex items-center justify-center">
        <CarouselDemo />
      </div>
      <div className="flex-1 z-10" />
      <div className="flex justify-end w-full max-w-2xl mr-64 z-10">
        <Card className="w-full max-w-sm bg-black border-none shadow-none ml-auto">
          <CardHeader className="items-center">
            <CardTitle className="text-2xl font-bold text-white mb-2 mt-8 text-center w-full">Create an account</CardTitle>
            <CardDescription className="text-center text-white/80 mb-2">
              Enter your email below to create your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="flex flex-col gap-3">
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                required
                className="bg-transparent border border-white/20 text-white placeholder:text-white/40 focus:border-white/40"
              />
              <Button type="submit" className="w-full bg-orange text-black font-medium hover:bg-orange/90 mt-1 mb-2">
                Sign In with Email
              </Button>
            </form>
            <div className="flex items-center my-4">
              <div className="flex-grow border-t border-white/20" />
              <span className="mx-3 text-xs text-white/60 tracking-widest">OR CONTINUE WITH</span>
              <div className="flex-grow border-t border-white/20" />
            </div>
            <div className="flex flex-col gap-3">
              <GoogleSignInButton />
              <GithubSignInButton />
            </div>
          </CardContent>
          <div className="text-center text-xs text-white/50 px-6 pb-6 pt-2">
            By clicking continue, you agree to our{' '}
            <a href="#" className="underline">Terms of Service</a> and{' '}
            <a href="#" className="underline">Privacy Policy</a>.
          </div>
        </Card>
      </div>
    </div>
  );
}
