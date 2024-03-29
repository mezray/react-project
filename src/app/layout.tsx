import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import HomePage from "./HomePage/HomePage";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div style={{ display: "flex" }}>
          <div
            style={{
              flex: "0 0 200px",
              height: "100vh",
              overflow: "auto",
              backgroundColor: "#f5f5f5",
            }}
          >
            <HomePage />
          </div>
          <div style={{ flex: "1", overflow: "auto" }}>{children}</div>
        </div>
      </body>
    </html>
  );
}
