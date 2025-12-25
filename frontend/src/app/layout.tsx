
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/sonner";
import { AuthStoreProvider } from "@/providers/auth-store-provider";
import { JournalStoreProvider } from "@/providers/journal-store-provider";
import { ChatStoreProvider } from "@/providers/chat-store-provider";
import ProtectedRoute from "@/components/ProtectedRoute";
import { ChatWidget } from "@/components/ChatWidget";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background">

        <AuthStoreProvider>
          <JournalStoreProvider>
            <ChatStoreProvider>
          <ProtectedRoute>
            <Navbar />
            {children}
            <Toaster position="top-right" richColors />
            <ChatWidget/>
          </ProtectedRoute>
          </ChatStoreProvider>
          </JournalStoreProvider>
        </AuthStoreProvider>

      </body>
    </html>
  );
}
