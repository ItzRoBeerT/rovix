'use server';

import { auth } from '@/lib/auth';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { APIError } from 'better-auth/api';

export async function signInAction(prevState: any, formData: FormData) {
	let shouldRedirect = false;
	try {
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;

		if (!email || !password) {
			return { error: 'Email and password are required.' };
		}

		if (password.length < 6) {
			return { error: 'Password must be at least 6 characters long.' };
		}

		await auth.api.signInEmail({
			body: {
				email: email.trim(),
				password,
			},
			headers: await headers(),
		});

		revalidatePath('/', 'layout');
		shouldRedirect = true;
	} catch (error) {
		console.error('Error during signInAction:', error);

		if (error instanceof APIError) {
			// Error handling for APIError
			if (error.status === 401) {
				return { error: 'Email o contraseña incorrectos' };
			}
			if (error.status === 403) {
				return { error: 'Por favor verifica tu email antes de iniciar sesión' };
			}
			return { error: error.message || 'Error de autenticación' };
		}
		return { error: 'An error occurred during sign-in.' };
	}

	if (shouldRedirect) {
		redirect('/');
	}
}

export async function signOutAction() {
	try {
		await auth.api.signOut({
			headers: await headers(),
		});

		revalidatePath('/', 'layout');
	} catch (error) {
		console.error('SignOut error:', error);
		throw error;
	}

	redirect('/');
}
