// auth.ts - Minimal Better Auth Configuration
import { betterAuth } from 'better-auth';
import { Pool } from 'pg';

export const auth = betterAuth({
	database: new Pool({
		connectionString: process.env.DIRECT_URL,
	}),
	emailAndPassword: {
		enabled: true,
		requireEmailVerification: true,
	},
	emailVerification: {
		sendVerificationEmail: async ({ user, url, token }) => {
			// Send verification email to user
			// For development: Log to console
			console.log('📧 VERIFICATION EMAIL for:', user.email);
			console.log('👤 User Name:', user.name);
			console.log('🔗 Verification URL:', url);
			console.log('🎫 Token:', token);
			console.log('');
			console.log('🚀 Click this link to verify:', url);
			console.log('=====================================');

			// TODO: For production, replace with real email sending:
		},
		sendOnSignUp: true,
		autoSignInAfterVerification: true,
		expiresIn: 3600, // 1 hour
	},
});
