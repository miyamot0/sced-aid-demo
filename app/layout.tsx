import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/navbar/navigation";
import { cn } from "@/lib/utils";
import ClientSideWrapper from "@/components/provider/client-side-wrapper";

const inter = Inter({ subsets: ["latin"] });

const APP_NAME = "Qualicase Prototype (PWA)";
const APP_DEFAULT_TITLE =
  "This is a prototype for a single-case design decision-making tool";
const APP_TITLE_TEMPLATE = "%s - Qualicse";
const APP_DESCRIPTION = "This is an experimental decision-making aid";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="min-h-screen">
      <body
        className={cn(
          inter.className,
          "w-full bg-gray-100 flex flex-cols justify-center"
        )}
      >
        <ClientSideWrapper>
          <div className="w-full md:w-4/5">
            <Navigation />
            {children}
          </div>
        </ClientSideWrapper>
      </body>
    </html>
  );
}
