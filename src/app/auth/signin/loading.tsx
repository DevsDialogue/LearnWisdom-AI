export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-purple-50 dark:from-gray-900 dark:to-purple-900">
      <div className="absolute inset-0 dark:bg-grid-white/5 bg-grid-black/5 z-0" />
      <div className="relative z-10">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    </div>
  );
}
