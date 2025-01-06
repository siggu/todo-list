import type { Metadata } from 'next';
import './globals.css';
import localFont from 'next/font/local';

const nanumSquareBold = localFont({
  src: '../public/fonts/NanumSquare-Bold.ttf',
  variable: '--font-nanumSquareBold',
});

const nanumSquareRegular = localFont({
  src: '../public/fonts/NanumSquare-Regular.ttf',
  variable: '--font-nanumSquareRegular',
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${nanumSquareBold.variable} ${nanumSquareRegular.variable} antialiased`}>{children}</body>
    </html>
  );
}
