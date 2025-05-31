// components/auth/SignIn.tsx - OPTIMIZED Next.js way
'use client';

import { signInAction } from '@/actions/auth';
import { useActionState } from 'react';

export default function SignIn() {
	const [state, formAction, isPending] = useActionState(signInAction, null);

	return (
		<form action={formAction} className="flex flex-col gap-4 bg-muted p-4 rounded">
			<label htmlFor="email">Email:</label>
			<input
				type="text"
				id="email"
				name="email"
				required
				placeholder="Introduce tu email"
				disabled={isPending}
				className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 hover:border-primary/50"
			/>

			<label htmlFor="password">Password:</label>
			<input
				type="password"
				id="password"
				name="password"
				required
				placeholder="Introduce tu contraseña"
				disabled={isPending}
				className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 hover:border-primary/50"
			/>

			{state?.error && <p className="text-red-500">{state.error}</p>}
			<button
				type="submit"
				disabled={isPending}
				className="w-full bg-primary hover:bg-primary-hover text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center min-h-[64px]"
			>
				{isPending ? (
					<div className="flex flex-col items-center justify-center space-y-2">
						<div className="loader scale-75"></div>
						<span>Iniciando sesión...</span>
					</div>
				) : (
					'Iniciar Sesión'
				)}
			</button>
		</form>
	);
}
