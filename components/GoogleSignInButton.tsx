"use client";
import { useSignIn, useSignUp } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Image from "next/image";


type GoogleSignInButtonProps = {
  mode: "sign-in" | "sign-up";
};

export function GoogleSignInButton({ mode }: GoogleSignInButtonProps) {
  const { signIn, isLoaded: isSignInLoaded } = useSignIn();
  const { signUp, isLoaded: isSignUpLoaded } = useSignUp();

  const handleGoogleAuth = async () => {
    if (mode === "sign-in") {
      if (!isSignInLoaded) return;
      try {
        await signIn?.authenticateWithRedirect({
          strategy: "oauth_google",
          redirectUrl: "/sign-in",
          redirectUrlComplete: "/"
        });
      } catch (err) {
        console.error(err);
      }
    } else {
      if (!isSignUpLoaded) return;
      try {
        await signUp?.authenticateWithRedirect({
          strategy: "oauth_google",
          redirectUrl: "/sign-in",
          redirectUrlComplete: "/"
        });
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <Button
      variant="outline"
      className="w-80 h-12 flex items-center justify-center gap-2 bg-white border border-gray hover:bg-[#232321] hover:border-transparent"
      onClick={handleGoogleAuth}
      aria-label={mode === "sign-in" ? "Sign in with Google" : "Sign up with Google"}
      
    >
      <Image src="/google.svg" alt="Google logo" width={24} height={24} className="mr-2" />
      <span className="text-lg font-bold text-black">Continue with Google</span>
    </Button>
  );
}
