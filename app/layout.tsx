import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ReduxProvider from "../components/providers/ReduxProvider";
import { AuthProvider } from "../components/providers/Auth0Provider";
import GlobalAuthProvider from "../components/providers/GlobalAuthProvider";
import Header from "@/components/Header";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import WebSocketsProvider from "@/components/providers/WebSocketsProvider";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Meduzzen",
  description: `This is social network app. You can create your own company, add admins, members. 
    Also you can make quizzes for your members. Users can pass quiz, get results, analitic. 
    Posibility to export results in JSON/CSV. And many other interesting functionality. Join in!`,
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
            <GlobalAuthProvider>
              <WebSocketsProvider>
                <Header />
                {children}
              </WebSocketsProvider>
            </GlobalAuthProvider>
          </ReduxProvider>
        </AuthProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
