'use client';

import { authClient } from '@/lib/auth-client';
import React, { useState } from 'react';

export default function SignUp() {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
	});

	const [error, setError] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(false);
	const [success, setSuccess] = useState<boolean>(false);

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

		const { name, email, password } = formData;

		try {
			if (!name.trim()) {
				setError('Please enter your full name');
				setLoading(false);
				return;
			}

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

			const { data, error: authError } = await authClient.signUp.email(
				{
					email: email.trim(),
					password,
					name: name.trim(),
					callbackURL: '/',
				},
				{
					onError(context) {
						console.error('Error during sign up:', context.error);
						setError(context.error.message || 'An error occurred during sign up.');
						setLoading(false);
					},
					onSuccess(context) {
						console.log('Sign up successful:', context);

						setFormData({ name: '', email: '', password: '' });
						setLoading(false);
						setSuccess(true);
					},
				}
			);
		} catch (error) {
			console.error('Unexpected error:', error);
			setError('An unexpected error occurred. Please try again.');
			setLoading(false);
		}
	};
	// endregion

	return (
		<form className="border rounded p-4" onSubmit={handleSubmit}>
			<div>
				<label htmlFor="name">Full Name:</label>
				<input type="text" id="name" name="name" required onChange={handleChange} value={formData.name} />
			</div>

			<div>
				<label htmlFor="email">Email:</label>
				<input type="email" id="email" name="email" required onChange={handleChange} value={formData.email} />
			</div>

			<div>
				<label htmlFor="password">Password:</label>
				<input
					type="password"
					id="password"
					name="password"
					required
					onChange={handleChange}
					value={formData.password}
				/>
			</div>

			{/* Display error message with better styling */}
			{error && (
				<div className="text-red-500">
					<strong>Error:</strong> {error}
				</div>
			)}

			{success && (
				<div className="text-green-500">
					<strong>Success:</strong> Account created! Please check your email and click the verification link
					to complete your registration.
				</div>
			)}
			<button type="submit" disabled={loading}>
				{loading ? 'Creating Account...' : 'Create Account'}
			</button>
		</form>
	);
}
