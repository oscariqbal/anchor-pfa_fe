// ui components
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

function SkeletonCard({className}: {className?: string}) {
  return (
    <Card className={`w-full rounded-md ${className}`}>
      <CardHeader>
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-4 w-1/2" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-4 w-full" />
      </CardContent>
    </Card>
  )
}

function SkeletonCardItem({className}: {className?: string}) {
  return (
    <Skeleton className={className}/>
  )
}

function SkeletonText() {
  return (
    <Skeleton className="h-4 w-full" />
  )
}

export {
  SkeletonCard,
  SkeletonCardItem,
  SkeletonText
}