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
			// const { Resend } = await import('resend');
			// const resend = new Resend(process.env.RESEND_API_KEY);
			// await resend.emails.send({
			//     from: 'noreply@rovix.com',
			//     to: user.email,
			//     subject: 'Verify your Rovix account',
			//     html: `
			//         <h1>Welcome to Rovix, ${user.name}!</h1>
			//         <p>Click the link below to verify your email:</p>
			//         <a href="${url}">Verify Email</a>
			//     `
			// });
		},
		sendOnSignUp: true,
		autoSignInAfterVerification: true,
		expiresIn: 3600, // 1 hour
	},
});
