
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { cn } from "@/lib/utils";
import { Space_Grotesk } from "next/font/google";
import GridPattern from "@/components/magicui/animated-grid-pattern";
import { Analytics } from "@vercel/analytics/next";
import Clouds from "@/components/ui/Clouds";
import { hero, site } from "@/constants";


const Glancyr = localFont({
  src: "./fonts/glancyr.ttf",
  variable: "--font-glancyr",
  weight: "100 900",
});

const Glancyr700 = localFont({
  src: "./fonts/glancyr700.ttf",
  variable: "--font-glancyr700",
  weight: "100 900",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-spaceGrotesk",
});

export const metadata: Metadata = {
  title: site.title,
  description: site.description,
  metadataBase: new URL(site.url),
  authors: [{ name: hero.name }],
  keywords: [
    "Variz",
    "automation engineer",
    "n8n workflows",
    "AI automation",
    "Chrome extensions",
    "workflow automation",
    "no-code automation",
    "LLM pipelines",
    "portfolio",
    "Chandigarh University",
    "Next.js portfolio",
  ],
  creator: hero.name,
  publisher: hero.name,
  category: "Automation Engineering Portfolio",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: site.url,
    title: site.title,
    description: site.description,
    images: [
      {
        url: "/assets/pfp.jpg",
        width: 1200,
        height: 630,
        alt: `${hero.name} — ${hero.role}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    images: ["/assets/pfp.jpg"],
    creator: site.twitterHandle,
    site: site.twitterHandle,
  },
  alternates: {
    canonical: site.url,
  },
  icons: [
    { rel: "icon", url: "/favicon.ico" },
    {
      rel: "icon",
      url: "/favicon-16x16.png",
      sizes: "16x16",
      type: "image/png",
    },
    {
      rel: "icon",
      url: "/favicon-32x32.png",
      sizes: "32x32",
      type: "image/png",
    },
    { rel: "apple-touch-icon", url: "/apple-touch-icon.png" },
  ],
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        cz-shortcut-listen="true"
        className={cn(
          Glancyr.variable,
          Glancyr700.variable,
          spaceGrotesk.variable,
          "bg-dark-1 dark:bg-white"
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="light">
          {children}
          <Analytics />
          <div className="absolute inset-0 size-full overflow-hidden dark:hidden ">
            <GridPattern
              numSquares={45}
              maxOpacity={0.1}
              duration={5}
              repeatDelay={0}
              className={cn(
                "[mask-image:radial-gradient(800px_circle_at_center,white,transparent)] w-full",
                "inset-x-0 inset-y-[-0%] h-[105%] max-sm:h-[90%] skew-y-12"
              )}
            />
          </div>
          <Clouds />
        </ThemeProvider>
      </body>
    </html>
  );
}
