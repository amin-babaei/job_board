export default function ProfileHeaderSkeleton() {
  return (
    <div className="bg-card rounded-2xl shadow-soft p-8 animate-pulse">
      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="bg-muted/30 rounded-full w-32 h-32" />

        <div className="flex-1 text-center md:text-right space-y-4">
          <div className="h-10 bg-muted/30 rounded w-64 mx-auto md:mx-0" />
          <div className="h-6 bg-muted/30 rounded w-48 mx-auto md:mx-0" />
        </div>

        <div className="bg-muted/30 rounded-full w-12 h-12" />
      </div>
    </div>
  );
}