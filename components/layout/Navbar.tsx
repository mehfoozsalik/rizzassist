import Link from "next/link";
import Image from "next/image";
import { MobileMenu, type NavLink } from "./MobileMenu";
import { ToolsMegaMenu } from "./ToolsMegaMenu";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

const NAV_LINKS: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/personality-test", label: "Personality" },
  { href: "/face-shape-detector", label: "Face shape" },
  { href: "/blog", label: "Blog" },
  { href: "/tools", label: "Tools" },
  { href: "/profile", label: "Profile" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/95 shadow-sm backdrop-blur-sm dark:border-white/5 dark:bg-ink-900/95 dark:shadow-lg dark:shadow-black/20">
      <nav
        aria-label="Main navigation"
        className="relative mx-auto flex max-w-6xl items-center justify-between px-4 py-3"
      >
        <Link
          href="/"
          className="flex cursor-pointer items-center gap-2.5 transition-opacity duration-200 hover:opacity-90"
          aria-label="Rizz Assist brand home"
        >
          <Image
            src="/assets/logo.svg"
            alt="Rizz Assist logo"
            width={36}
            height={36}
            className="rounded-full"
            priority
          />
          <span className="text-lg font-semibold tracking-wide text-ink-900 dark:text-white">
            Rizz
            <span className="text-brand-600 dark:text-brand-400">Assist</span>
          </span>
        </Link>

        <ul className="hidden items-center gap-1 text-sm font-medium lg:flex">
          {NAV_LINKS.map((link) =>
            link.label === "Tools" ? (
              <ToolsMegaMenu key="tools-mega" />
            ) : (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="cursor-pointer rounded-lg px-3 py-1.5 text-ink-600 transition-colors duration-200 hover:bg-ink-100 hover:text-ink-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 dark:text-white/70 dark:hover:bg-white/5 dark:hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ),
          )}
          <li>
            <Link
              href="/report"
              className="ml-2 cursor-pointer rounded-lg bg-brand-600 px-4 py-1.5 font-semibold text-white transition-colors duration-200 hover:bg-brand-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400"
            >
              My report
            </Link>
          </li>
          <li>
            <ThemeToggle />
          </li>
        </ul>

        <MobileMenu links={NAV_LINKS} />
      </nav>
    </header>
  );
}
