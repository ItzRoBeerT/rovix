import Link from 'next/link';

export default function Header() {
	return (
		<header className="sticky top-0 z-50 border-amber-50/20 p-4 border-b backdrop-blur-md">
			<nav className="flex justify-between">
				<Link href="/" className="text-2xl font-bold">
					Rovix
				</Link>
				<div>
					<Link href="/signin" className="">
						SignIn
					</Link>
				</div>
			</nav>
		</header>
	);
}
