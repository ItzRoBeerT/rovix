// components/auth/user-nav.tsx
'use client';

import Link from 'next/link';
import { useSession } from '@/lib/auth-client';
import { User } from 'better-auth';
import { signOutAction } from '@/actions/auth';
import { useEffect } from 'react';

export function UserNav({ initialUser }: { initialUser: User | null }) {
	const { data: session, refetch } = useSession();

	// Detectar cuando server eliminó la sesión
	useEffect(() => {
		if (initialUser === null && session?.user) {
			// Server dice "no hay usuario" pero cliente dice "sí hay"
			// → Server Action eliminó la sesión, refetch del cliente
			refetch();
		}
	}, [initialUser, session?.user, refetch]);

	const user = session?.user ?? initialUser;

	return (
		<div className="flex items-center gap-4">
			{!user ? (
				<Link href="/sign-in">Inicia sesión</Link>
			) : (
				<div className="flex items-center gap-4">
					<Link href="/profile">Perfil</Link>
					<form action={signOutAction}>
						<button type="submit">Cerrar sesión</button>
					</form>
				</div>
			)}
		</div>
	);
}
