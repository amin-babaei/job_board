export default function ApplicationsSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-2 animate-pulse">
      {[1, 2].map((i) => (
        <div key={i} className="bg-card rounded-lg shadow-soft p-6">
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-4" />
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-6" />
          <div className="flex justify-between">
            <div className="h-8 bg-gray-200 rounded-full w-24" />
            <div className="h-4 bg-gray-200 rounded w-32" />
          </div>
        </div>
      ))}
    </div>
  );
}