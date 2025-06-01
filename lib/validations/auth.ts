import { z } from 'zod';

export const signUpSchemaComplete = z
	.object({
		email: z.string().email('Please enter a valid email'),

		name: z
			.string()
			.max(50, 'Name must be at most 50 characters long')
			.min(2, 'Name must be at least 2 characters long'),

		password: z
			.string()
			.min(8, 'Password must be at least 8 characters long') 
			.max(128, 'Password is too long')
			.refine((password) => {
				const hasUppercase = /[A-Z]/.test(password);
				const hasLowercase = /[a-z]/.test(password);
				const hasNumber = /\d/.test(password);
				const hasSpecial = /[@$!%*?&]/.test(password);

				return hasUppercase || hasLowercase || hasNumber || hasSpecial;
			}, 'Password should contain at least one: uppercase letter, lowercase letter, number, or special character'),

		confirmPassword: z.string(),
		acceptTerms: z.boolean().refine((val) => val === true, 'You must accept terms'),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ['confirmPassword'],
	});

export type SignUpFormData = z.infer<typeof signUpSchemaComplete>;
