'use server';

import { auth } from '@/lib/auth';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';

export async function signOutAction() {
	try {
		await auth.api.signOut({
			headers: await headers(), 
		});

		revalidatePath('/', 'layout');
		redirect('/');
	} catch (error) {
		console.error('SignOut error:', error);
		throw error;
	}
}

/* ✅ TODO futuro Server Action debe seguir este pattern:
	1. Validate authentication FIRST
	2. Validate input data  
	3. Perform operation
	4. Revalidate paths
	5. Return typed response
*/

