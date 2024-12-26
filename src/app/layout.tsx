import "@/styles/globals.css";

import { type Metadata } from "next";

import { TRPCReactProvider } from "@/trpc/react";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner"

export const metadata: Metadata = {
  title: "AmaraHospital Doctor Summary",
  description: "Amara Hospitals Doctor Summary",
  icons: [{ rel: "icon", url: "https://xewnjhdnjxlaadjthrex.supabase.co/storage/v1/object/public/amarahospital/amaralogo.png?t=2024-12-26T20%3A48%3A03.068Z" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={cn("max-w-[100%] overflow-x-hidden")}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <TRPCReactProvider>{children}</TRPCReactProvider>{" "}

        </ThemeProvider>
        <Toaster richColors position="top-right" closeButton />

      </body>
    </html>
  );
}
