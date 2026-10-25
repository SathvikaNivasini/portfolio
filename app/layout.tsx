import type { Metadata } from "next";
import { Fraunces, Inter, Caveat } from "next/font/google";
import "./globals.css";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import { profile } from "@/lib/content";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["SOFT", "WONK", "opsz"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sathvika.dev"),
  title: {
    default: `${profile.short} — Builder, Speaker, Founder`,
    template: `%s · ${profile.short}`,
  },
  description: profile.intro,
  openGraph: {
    title: `${profile.short} — Builder, Speaker, Founder`,
    description: profile.intro,
    type: "website",
  },
  robots: { index: true, follow: true },
};

/**
 * Applies the stored theme before first paint so the page never flashes
 * the wrong palette. Dark is the default.
 */
const themeScript = `
(function () {
  try {
    var stored = localStorage.getItem("theme");
    if (stored === "light" || stored === "dark") {
      document.documentElement.setAttribute("data-theme", stored);
    }
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body
        className={`${fraunces.variable} ${inter.variable} ${caveat.variable}`}
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:px-4 focus:py-2"
          style={{ background: "var(--surface-solid)", color: "var(--text)" }}
        >
          Skip to content
        </a>
        <Nav />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
