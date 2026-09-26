const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'RMUTK News', href: '#' },
  { label: 'General', href: '#' },
  { label: 'Training News', href: '#' },
  { label: 'Career', href: '#' },
  { label: 'Student Voice', href: '#' },
  { label: 'Trending', href: '#' },
];

export default function Sidebar() {
  return (
    <aside className="flex w-full shrink-0 flex-col gap-8 border-white/10 bg-base px-5 py-6 lg:w-60 lg:border-r">
      <div className="flex flex-col gap-1">
        <a href="/" className="flex items-center gap-2" aria-label="YouthNews home">
          <span className="text-lg font-extrabold leading-none tracking-tight">
            YOUTH<span className="text-accent">NEWS</span>
          </span>

          {/*
            Logo requirement: placed directly after the site name, on the
            same line, ~8px gap (Tailwind gap-2), vertically centered via the
            parent's items-center, object-fit: contain so it never stretches
            or blurs, sized proportionally to the wordmark (20px on mobile up
            to 28px on desktop). Swap the src below for a real logo file
            whenever you have one — nothing else here needs to change.
          */}
          <img
            src="/logo.svg"
            alt=""
            aria-hidden="true"
            className="h-5 w-5 shrink-0 object-contain md:h-6 md:w-6 lg:h-7 lg:w-7"
          />
        </a>
        <p className="text-[10px] uppercase tracking-widest text-white/40">
          Campus News Daily
        </p>
      </div>

      <nav className="flex flex-col gap-1">
        {NAV_ITEMS.map((item, index) => (
          <a
            key={item.label}
            href={item.href}
            className={
              index === 0
                ? 'rounded-lg bg-accent px-3 py-2 text-sm font-semibold text-black'
                : 'rounded-lg px-3 py-2 text-sm text-white/70 transition hover:bg-white/5 hover:text-white'
            }
          >
            {item.label}
          </a>
        ))}
      </nav>
    </aside>
  );
}
