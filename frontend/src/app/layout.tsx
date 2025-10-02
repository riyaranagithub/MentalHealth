
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/sonner";
import { AuthStoreProvider } from "@/providers/auth-store-provider";
import { JournalStoreProvider } from "@/providers/journal-store-provider";
import ProtectedRoute from "@/components/ProtectedRoute";


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
          <ProtectedRoute>
            <Navbar />
            {children}
            <Toaster position="top-right" richColors />
          </ProtectedRoute>
          </JournalStoreProvider>
        </AuthStoreProvider>

      </body>
    </html>
  );
}
