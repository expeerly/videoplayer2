import { Skeleton } from '@/src/app/components/client/Skeleton';
import { ReviewGridSkeleton } from '@/src/app/components/server/ReviewGrid';

export default function Loading() {
  return (
    <div className="md:max-w-[532px] mx-auto py-10">
      <Skeleton className="h-10 w-1/2 mb-2.5" />
      <Skeleton className="h-20 w-full" />

      <ReviewGridSkeleton />
    </div>
  );
}
