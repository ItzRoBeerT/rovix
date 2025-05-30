import type { Metadata } from 'next';
import { Inter, Poppins, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import Header from '@/components/header/Header';

const inter = Inter({
	variable: '--font-inter',
	subsets: ['latin'],
	display: 'swap',
});

const poppins = Poppins({
	variable: '--font-poppins',
	subsets: ['latin'],
	weight: ['400', '500', '600', '700'],
	display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
	variable: '--font-jetbrains-mono',
	subsets: ['latin'],
	display: 'swap',
});

export const metadata: Metadata = {
	title: '3D Print Shop - Custom 3D Printing Services',
	description:
		'Professional 3D printing services, custom designs, and high-quality prints. Order online with secure PayPal checkout.',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="es">
			<body className={`${inter.variable} ${poppins.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
				<Header />
				<main className='container mx-auto px-4 lg:px-8 py-8 min-h-screen '>
          {children}
        </main>
			</body>
		</html>
	);
}
