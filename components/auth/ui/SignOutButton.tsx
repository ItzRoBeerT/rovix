'use client';

import { signOutAction } from '@/actions/auth';

export default function SignOutButton() {
	return (
		<button className="bg-red-500 p-4 rounded" onClick={signOutAction}>
			Cerrar sesión
		</button>
	);
}
