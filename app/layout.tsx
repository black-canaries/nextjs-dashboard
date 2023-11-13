import { inter } from '@/ui/fonts';
import '@/ui/global.css';
import { Providers } from './providers'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body className={`${inter.className} antialiased h-full bg-gray-100 dark:bg-gray-800`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
