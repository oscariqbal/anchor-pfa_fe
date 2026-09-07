"use client"
import { Button } from "@/components/ui/button"

export default function Error({ error, reset }: { error: Error & { digest?: string }, reset: () => void }) {
  return (
    <div className="border border-border rounded-sm bg-destructive/10 p-8 flex flex-col gap-4 justify-center items-center">
      <h1 className="text-xl md:text-2xl text-center text-destructive">{error.message}</h1>
      <Button className="cursor-pointer" onClick={() => reset()}>
        Try again
      </Button>
    </div>
  )
}