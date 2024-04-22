"use client"

import { Inter } from "next/font/google";
import "./globals.css";
import { TricountContextProvider } from "@/context/tricount";
import { TransactionContextProvider } from "@/context/transaction";
import { TokenContextProvider } from "@/context/TokenContext";
import Sidebar from "@/components/SideeBar";


const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TokenContextProvider>
          <div style={{ display: "flex" }}>
            <div
              style={{
                flex: "0 0 200px",
                height: "100vh",
                overflow: "auto",
                backgroundColor: "#f5f5f5",
              }}
            >
              <Sidebar />
              <div>
              </div>
            </div>
            <div style={{ flex: "1", overflow: "auto" }}>
              <TricountContextProvider>
                <TransactionContextProvider>
                  {children}
                </TransactionContextProvider>
              </TricountContextProvider>
            </div>
          </div>
        </TokenContextProvider>
      </body>
    </html>
  );
}
