import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import Link from 'next/link';
import { UserNav } from './UserNav';

export default async function Header() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	const initialUser = session?.user || null;
	console.log({initialUser});
	
	return (
		<header className="sticky top-0 z-50 border-amber-50/20 p-4 border-b backdrop-blur-md">
			<nav className="flex justify-between">
				<Link href="/" className="text-2xl font-bold">
					Rovix
				</Link>
				<div>
					<UserNav initialUser={initialUser}/>
				</div>
			</nav>
		</header>
	);
}
