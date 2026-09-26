import './globals.css';

export const metadata = {
  title: 'YouthNews — Campus News Daily',
  description: 'Stories for the next generation.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-base text-white antialiased">{children}</body>
    </html>
  );
}
