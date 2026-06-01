export default function Loading() {
  return (
    <div className="min-h-screen bg-black px-6 py-24 flex flex-col gap-12">
      <div className="animate-pulse flex space-x-4 max-w-7xl mx-auto w-full">
        <div className="flex-1 space-y-6 py-1">
          <div className="h-8 bg-zinc-900 rounded w-1/4"></div>
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
              <div className="h-4 bg-zinc-900 rounded col-span-2"></div>
              <div className="h-4 bg-zinc-900 rounded col-span-1"></div>
            </div>
            <div className="h-4 bg-zinc-900 rounded"></div>
            <div className="h-64 bg-zinc-900 rounded mt-12"></div>
            <div className="h-64 bg-zinc-900 rounded mt-6"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
