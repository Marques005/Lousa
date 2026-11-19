import '@/components/styles/globals.css';
import { Toaster } from '@/components/ui/sonner';
import Shell from './shell';

export const metadata = { title: 'Lousa' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='pt' data-theme='vercel'>
      <body>
        <Shell>{children}</Shell>
        <Toaster toastOptions={{ classNames: { description: '!text-current opacity-75' } }} />
      </body>
    </html>
  );
}
