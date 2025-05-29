'use client';

import { authClient } from '@/lib/auth-client';
import { useState } from 'react';

export default function SignIn() {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);

	// region Functions
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
            // TODO: Optionally redirect or perform additional actions on success
          },
        }
			);
		} catch (error) {
			console.error('Error during sign-in:', error);
			setError('An error occurred while signing in. Please try again.');
		}
	};

	// endregion

	return (
		<form onSubmit={handleSubmit}>
			<label htmlFor="email">Email:</label>
			<input type="text" id="email" name="email" required onChange={handleChange} />

			<label htmlFor="password">Password:</label>
			<input type="password" id="password" name="password" required onChange={handleChange} />

			{error && <p className="error">{error}</p>}
      {success && <p className="success">Sign-in successful!</p>}

			<button type="submit">{loading ? 'Signing in...' : 'Sign In'}</button>
		</form>
	);
}
