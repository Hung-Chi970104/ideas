"use client";

import { useSignIn } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useTheme } from "next-themes";


export function GithubSignInButton() {
  const { signIn, isLoaded } = useSignIn();
  const { resolvedTheme } = useTheme();

  const handleGithubSignIn = async () => {
    if (!isLoaded) return;
    try {
      await signIn?.authenticateWithRedirect({
        strategy: "oauth_github",
        redirectUrl: "/sign-in",
        redirectUrlComplete: "/"
      });
    } catch (err) {
      // handle error
      console.error(err);
    }
  };

  return (
    <Button variant="outline" className="w-80 h-12 flex items-center justify-center gap-2 bg-white border border-gray" onClick={handleGithubSignIn} aria-label="Sign in with GitHub">
      <Image
        src={resolvedTheme === "dark" ? "/github-mark-white.svg" : "/github-mark.svg"}
        alt="GitHub logo"
        width={24}
        height={24}
        className="mr-2"
      />
      <span className="text-lg font-bold text-black">Continue with Github</span>
    </Button>
  );
}
