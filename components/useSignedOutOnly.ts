import { useUser } from "@clerk/nextjs";

export function useSignedOutOnly() {
  const { isSignedIn, isLoaded } = useUser();
  return isLoaded && !isSignedIn;
}
