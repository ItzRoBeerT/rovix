// components/auth/SignIn.tsx - OPTIMIZED Next.js way
'use client';

import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SignIn() {
	const router = useRouter();

	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	const [error, setError] = useState<string>('');
	const [success, setSuccess] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));

		if (error) {
			setError('');
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError('');
		setLoading(true);

		const { email, password } = formData;

		try {
			if (!email.trim()) {
				setError('Please enter your email address');
				setLoading(false);
				return;
			}

			if (password.length < 6) {
				setError('Password must be at least 6 characters long');
				setLoading(false);
				return;
			}

			await authClient.signIn.email(
				{
					email,
					password,
					rememberMe: false,
				},
				{
					onError(context) {
						console.error('Sign-in error:', context.error);
						setError('Invalid email or password. Please try again.');
						setLoading(false);
					},
					onSuccess(context) {
						console.log('Sign-in successful:', context);
						setLoading(false);
						setSuccess(true);

						// 1. Refresh server components data
						router.refresh();

						// 2. Small delay to ensure server state is updated
						setTimeout(() => {
							router.push('/');
						}, 100);
					},
				}
			);
		} catch (error) {
			console.error('Error during sign-in:', error);
			setError('An error occurred while signing in. Please try again.');
			setLoading(false);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-muted p-4 rounded">
			<label htmlFor="email">Email:</label>
			<input
				type="text"
				id="email"
				name="email"
				required
				onChange={handleChange}
				placeholder="Introduce tu email"
				className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 hover:border-primary/50"
			/>

			<label htmlFor="password">Password:</label>
			<input
				type="password"
				id="password"
				name="password"
				required
				onChange={handleChange}
				placeholder="Introduce tu contraseña"
				className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 hover:border-primary/50"
			/>

			{error && <p className="error text-red-500">{error}</p>}
			{success && <p className="success text-green-500">Sign-in successful!</p>}

			<button
				type="submit"
				disabled={loading}
				className="w-full bg-primary hover:bg-primary-hover text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center min-h-[64px]"
			>
				{loading ? (
					<div className="flex flex-col items-center justify-center space-y-2">
						<div className="loader scale-75"></div>
					</div>
				) : (
					'Iniciar Sesión'
				)}
			</button>
		</form>
	);
}
