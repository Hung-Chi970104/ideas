'use client'

import { Skeleton } from "@/components/ui/skeleton"

export function SignInSkeleton() {
  return (
    <div className="relative flex min-h-screen flex-row items-center bg-blue pt-8">
      <div className="absolute left-0 top-0 h-full w-1/2 min-h-screen z-0 flex items-center justify-center">
        <Skeleton className="h-full w-full" />
      </div>
      <div className="flex-1 z-10" />
      <div className="flex justify-end w-full max-w-2xl mr-64 z-10">
        <div className="w-full max-w-sm bg-black border-none shadow-none ml-auto p-6">
          <div className="flex flex-col items-center space-y-4 mb-6 mt-8">
            <Skeleton className="h-8 w-48 rounded-md" />
            <Skeleton className="h-4 w-60 rounded-md" />
          </div>
          <div className="space-y-4 p-4">
            <Skeleton className="h-10 w-full rounded-md" />
            <Skeleton className="h-10 w-full rounded-md" />
            <div className="flex items-center my-4">
              <div className="flex-grow border-t border-white/20" />
              <Skeleton className="h-4 w-32 mx-3 rounded-md" />
              <div className="flex-grow border-t border-white/20" />
            </div>
            <Skeleton className="h-12 w-full rounded-md" />
            <Skeleton className="h-12 w-full rounded-md" />
          </div>
          <div className="mt-6">
            <Skeleton className="h-4 w-full rounded-md" />
          </div>
        </div>
      </div>
    </div>
  )
}
