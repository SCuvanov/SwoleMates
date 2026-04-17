import Link from "next/link";

const navItems = [
  { href: "/", label: "Products" },
  { href: "/", label: "Learn" },
  { href: "/", label: "Safety" },
  { href: "/discover", label: "Discover" },
];

export function AppNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-zinc-800/80 bg-zinc-950/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-lg font-bold tracking-tight text-zinc-100 transition hover:text-rose-300"
        >
          <svg viewBox="0 0 64 64" aria-hidden="true" className="h-5 w-5 shrink-0">
            <defs>
              <linearGradient id="barbell-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f43f5e" />
                <stop offset="100%" stopColor="#fb923c" />
              </linearGradient>
            </defs>
            <rect x="4" y="18" width="8" height="28" rx="2" fill="url(#barbell-gradient)" />
            <rect x="14" y="22" width="6" height="20" rx="2" fill="url(#barbell-gradient)" />
            <rect x="44" y="22" width="6" height="20" rx="2" fill="url(#barbell-gradient)" />
            <rect x="52" y="18" width="8" height="28" rx="2" fill="url(#barbell-gradient)" />
            <rect x="20" y="30" width="24" height="4" rx="2" fill="url(#barbell-gradient)" />
          </svg>
          <span>SWOLEMATES</span>
        </Link>
        <nav className="hidden items-center gap-2 md:flex">
          {navItems.map((item) => (
            <Link
              key={`${item.href}-${item.label}`}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-zinc-200 transition hover:bg-zinc-900 hover:text-zinc-50"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link
            href="/settings"
            className="rounded-full border border-zinc-700 px-4 py-2 text-sm text-zinc-100 transition hover:border-zinc-500 hover:bg-zinc-900"
          >
            Log in
          </Link>
          <Link
            href="/discover"
            className="rounded-full bg-gradient-to-r from-rose-500 to-orange-400 px-4 py-2 text-sm font-semibold text-white transition hover:from-rose-400 hover:to-orange-300"
          >
            Sign up
          </Link>
        </div>
      </div>
    </header>
  );
}
