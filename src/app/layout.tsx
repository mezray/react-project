"use client"

import { Inter } from "next/font/google";
import "./globals.css";
import LoggoutButton from "@/components/LogoutButton";
import { TricountContextProvider } from "@/context/tricount";

const inter = Inter({ subsets: ["latin"] });

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
          <div>
          <LoggoutButton />
          </div>
          </div>
          <div style={{ flex: "1", overflow: "auto" }}>
            <TricountContextProvider>
            {children}
            </TricountContextProvider>

            </div>
        </div>
      </body>
    </html>
  );
}
