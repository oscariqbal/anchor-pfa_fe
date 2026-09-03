// ui components
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

function SkeletonCard({className}: {className?: string}) {
  return (
    <Card className={`w-full max-w-xs rounded-md ${className}`}>
      <CardHeader>
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-4 w-1/2" />
      </CardHeader>
      <CardContent>
        <Skeleton className="aspect-video w-full" />
      </CardContent>
    </Card>
  )
}

export {
  SkeletonCard,
}