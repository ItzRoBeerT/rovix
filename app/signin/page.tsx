import SignIn from '@/components/auth/SignIn';

export default function LoginPage() {
	return (
		<div className='flex items-center flex-col gap-4'>
			<h1 className='text-4xl font-bold'>Inicio de Sesión</h1>
			<SignIn />
		</div>
	);
}
