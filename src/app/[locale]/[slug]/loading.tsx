import { Skeleton } from '@/src/app/components/client/Skeleton';

export default function Loading() {
  return (
    <div className="w-full bg-white">
      <div className="w-full mx-auto md:max-w-[532px] pt-5 md:pt-10">
        <section>
          <div className="px-5 md:px-0">
            <div className="flex gap-4 mb-6">
              <Skeleton className="h-10 w-10 md:h-14 md:w-14 rounded-full" />
              <div className="flex flex-1 flex-col">
                <Skeleton className="h-8 w-48" />
                <div className="flex gap-1 mt-2">
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
            </div>
            <Skeleton className="h-32 w-full mt-4" />
          </div>
        </section>
        <div className="mt-8">
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    </div>
  );
}
