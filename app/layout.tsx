import type {Metadata} from 'next';
import {Plus_Jakarta_Sans} from 'next/font/google';
import './globals.css';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-plus-jakarta',
});

export const metadata: Metadata = {
  title: 'Genesis Hub - Intranet Corporativa',
  description: 'Portal corporativo integrado com feed da comunidade, diretório de pessoas e times, central de atendimento e solicitações com SLA.',
  openGraph: {
    title: 'Genesis Hub - Intranet Corporativa',
    description: 'Portal corporativo integrado com feed da comunidade, diretório de pessoas e times, central de atendimento e solicitações com SLA.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Genesis Hub - Intranet Corporativa',
    description: 'Portal corporativo integrado com feed da comunidade, diretório de pessoas e times, central de atendimento e solicitações com SLA.',
  },
};

import { AppProvider } from '@/hooks/use-app-state';
import QueryProvider from '@/providers/QueryProvider';

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="pt-BR" className={plusJakartaSans.variable}>
      <body className={`${plusJakartaSans.className} bg-[#f8f9ff] text-[#0b1c30] antialiased min-h-screen`} suppressHydrationWarning>
        <QueryProvider>
          <AppProvider>
            {children}
          </AppProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
