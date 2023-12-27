import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ReduxProvider } from "@/redux/provider";
import AuthProvider from "./(context)/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Patients Records Web",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ReduxProvider>
            {/* <div>
              <NavBar />
              <div className="p-4 sm:ml-64">
                <div className="p-0 rounded-lg dark:border-gray-700 mt-14">
                  {children}
                </div>
              </div>
            </div> */}
            {children}
          </ReduxProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
