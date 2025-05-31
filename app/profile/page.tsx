import SignOutButton from '@/components/auth/ui/SignOutButton';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

export default async function ProfilePage() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});
	const { user } = session || {};

	return (
		<section>
			<h1 className="text-4xl font-bold">Bienvenido, {user?.name}</h1>
			<p className="mt-4 text-lg">
				Aquí puedes ver y editar tu información de perfil, gestionar tus pedidos y acceder a tus configuraciones
				de cuenta.
			</p>

			<SignOutButton />
		</section>
	);
}
