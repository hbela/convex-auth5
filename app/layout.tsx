import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

//bh
import ConvexClientProvider from "@/app/ConvexClientProvider";
import { auth, signOut } from "@/auth";
import { Navbar } from "./_components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My App Title",
  description: "My app description",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <html lang="en">
      <body className={inter.className}>
        <ConvexClientProvider session={session}>
          <Navbar />
          {children}
        </ConvexClientProvider>
      </body>
    </html>
  );
}
