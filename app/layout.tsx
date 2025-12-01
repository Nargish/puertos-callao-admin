import "./globals.css";
import { ReactQueryProvider } from "@/components/ReactQueryProvider";

export const metadata = {
  title: "Puertos Callao Admin",
  description: "Panel operador de carriles",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-gray-50">
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
