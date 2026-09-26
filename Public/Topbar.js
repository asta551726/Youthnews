export default function Topbar() {
  return (
    <div className="flex flex-col gap-3 border-b border-white/10 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8">
      <div className="flex flex-1 items-center gap-2">
        <input
          type="search"
          placeholder="Search news, people, or topics..."
          className="w-full max-w-md rounded-lg border border-white/10 bg-panel px-4 py-2 text-sm text-white placeholder-white/40 outline-none focus:border-accent"
        />
        <button className="shrink-0 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-black">
          Search
        </button>
      </div>

      <div className="flex items-center gap-3 text-white/70">
        <button aria-label="Notifications" className="rounded-full border border-white/10 p-2 text-sm">
          🔔
        </button>
        <button aria-label="Messages" className="rounded-full border border-white/10 p-2 text-sm">
          💬
        </button>
        <span className="h-8 w-8 rounded-full bg-white/10" aria-hidden="true" />
      </div>
    </div>
  );
}
