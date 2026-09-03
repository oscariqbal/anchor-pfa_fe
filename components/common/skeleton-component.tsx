// ui components
import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonComponent({className}: {className?: string}) {
  return (
    <div className="flex flex-col gap-2">
      <Skeleton className={`min-h-4 rounded-md ${className}`} />
    </div>
  )
}