import Link from 'next/link';

export default function Header() {
	return (
		<header>
			<nav>
				<Link href="/signup" className="text-2xl font-bold">
					SignUP
				</Link>
			</nav>
		</header>
	);
}
