import type { Metadata } from "next";
import "./globals.css";
import { Outfit } from "next/font/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider } from "../../components/general/theme-provider";

const poppins = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-Roboto",
});

export const metadata: Metadata = {
  title: "SkillSync",
  description: "Job Portal",
  icons: {
    icon: "/logo.png",
  },
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={`${poppins.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string}>
            {children}
          </GoogleOAuthProvider>
        </ThemeProvider>
        <ToastContainer />
      </body>
    </html >
  );
}
