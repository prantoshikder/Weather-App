import { siteConfig } from "@/lib/site";

const internalLinks = [
  { href: "#main-content", label: "Current conditions" },
  { href: "#hourly", label: "Next 24 hours" },
  { href: "#daily", label: "7-day forecast" },
  { href: "#about", label: "About" },
  { href: "#faq", label: "FAQ" },
];

/**
 * Rendered on every load regardless of the forecast state, so the attribution
 * required by the data providers is always present — and the in-page links give
 * crawlers a route to the static copy further down.
 */
export default function Footer() {
  // Server-rendered once per build; no per-request or client drift.
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto pt-10">
      <div className="glass mx-auto w-full max-w-6xl rounded-3xl p-6 sm:p-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2">
              <span className="text-xl" aria-hidden="true">
                🌤️
              </span>
              <span className="text-lg font-semibold tracking-tight text-white">
                {siteConfig.name}
              </span>
            </div>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/60">
              {siteConfig.shortDescription} Free, no account required, and
              installable on your home screen.
            </p>
          </div>

          <nav aria-labelledby="footer-explore">
            <h2
              id="footer-explore"
              className="text-xs font-semibold uppercase tracking-wide text-white/50"
            >
              Explore
            </h2>
            <ul className="mt-3 space-y-2 text-sm">
              {internalLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-white/70 transition hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-8 flex flex-col items-center gap-3 border-t border-white/10 pt-5 text-xs text-white/50 sm:flex-row sm:justify-between">
          <p>
            © {year} {siteConfig.name}. Built with Next.js by{" "}
            <a
              href={siteConfig.author.url}
              target="_blank"
              rel="me noopener noreferrer"
              className="underline underline-offset-4 transition hover:text-white/80"
            >
              {siteConfig.author.name}
            </a>
            .
          </p>
          <p>
            Forecasts are model estimates — always check an official warning
            service before travelling.
          </p>
        </div>
      </div>
    </footer>
  );
}
