'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { authClient } from '@/lib/auth-client';
import { signUpSchemaComplete, type SignUpFormData } from '@/lib/validations/auth';

export default function SignUp() {
	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm<SignUpFormData>({
		resolver: zodResolver(signUpSchemaComplete),
		mode: 'onBlur',
		reValidateMode: 'onChange',
	});

	const [password, setPassword] = useState('');

	const [error, setError] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(false);
	const [success, setSuccess] = useState<boolean>(false);

	// region FUNCTIONS
	const onSubmit = async (data: SignUpFormData) => {
		setError('');
		setLoading(true);

		try {
			const { name, email, password } = data;

			await authClient.signUp.email(
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

	const getPasswordStrength = (pwd: string) => {
		const criteria = {
			hasUppercase: /[A-Z]/.test(pwd),
			hasLowercase: /[a-z]/.test(pwd),
			hasNumber: /\d/.test(pwd),
			hasSpecial: /[@$!%*?&]/.test(pwd),
			hasLength: pwd.length >= 8,
		};

		const metCriteria = Object.values(criteria).filter(Boolean).length;

		return {
			...criteria,
			score: metCriteria,
			level: metCriteria < 2 ? 'weak' : metCriteria < 4 ? 'medium' : 'strong',
		};
	};
	const getInputClassName = (fieldError: any) =>
		`border rounded px-3 py-2 w-full transition-colors text-black ${
			fieldError
				? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500'
				: 'border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
		}`;

	const ErrorMessage = ({ error, icon }: { error: any; icon: string }) =>
		error && (
			<div className="text-red-500 text-sm mt-1 flex items-center gap-1">
				<span>{icon}</span>
				{error.message}
			</div>
		);
	// endregion

	return (
		<div className="max-w-md mx-auto">
			<form className="border rounded-lg p-6 bg-white shadow-sm" onSubmit={handleSubmit(onSubmit)}>
				<h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Create Your Account</h2>

				{/* NAME FIELD */}
				<div className="mb-4">
					<label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
						Full Name
					</label>
					<input
						type="text"
						id="name"
						{...register('name')}
						className={getInputClassName(errors.name)}
						placeholder="Your full name"
						disabled={loading}
					/>
					<ErrorMessage error={errors.name} icon="⚠️" />
				</div>

				{/* EMAIL FIELD */}
				<div className="mb-4">
					<label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
						Email Address
					</label>
					<input
						type="email"
						id="email"
						{...register('email')}
						className={getInputClassName(errors.email)}
						placeholder="your@email.com"
						disabled={loading}
					/>
					<ErrorMessage error={errors.email} icon="📧" />
				</div>

				{/* PASSWORD FIELD WITH STRENGTH INDICATOR */}
				<div className="mb-4">
					<label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
						Password
					</label>
					<input
						type="password"
						id="password"
						{...register('password')}
						onChange={(e) => {
							register('password').onChange(e); 
							setPassword(e.target.value);
						}}
						className={getInputClassName(errors.password)}
						placeholder="Create a password (at least 8 characters)"
						disabled={loading}
					/>

					{/* PASSWORD STRENGTH INDICATOR */}
					{password && (
						<div className="mt-2 p-3 bg-gray-50 rounded border">
							<div className="text-xs font-medium text-gray-600 mb-2">Password Strength:</div>

							{(() => {
								const strength = getPasswordStrength(password);
								return (
									<>
										{/* Progress Bar */}
										<div className="flex items-center gap-1 mb-2">
											<div className="flex-1 bg-gray-200 rounded-full h-2">
												<div
													className={`h-2 rounded-full transition-all duration-300 ${
														strength.level === 'strong'
															? 'bg-green-500 w-full'
															: strength.level === 'medium'
															? 'bg-yellow-500 w-2/3'
															: 'bg-red-500 w-1/3'
													}`}
												/>
											</div>
											<span
												className={`text-xs font-medium ${
													strength.level === 'strong'
														? 'text-green-600'
														: strength.level === 'medium'
														? 'text-yellow-600'
														: 'text-red-600'
												}`}
											>
												{strength.level === 'strong'
													? '🟢 Strong'
													: strength.level === 'medium'
													? '🟡 Good'
													: '🔴 Weak'}
											</span>
										</div>

										{/* Criteria Checklist */}
										<div className="grid grid-cols-2 gap-1 text-xs">
											<div
												className={`flex items-center gap-1 ${
													strength.hasLength ? 'text-green-600' : 'text-gray-400'
												}`}
											>
												<span>{strength.hasLength ? '✅' : '⬜'}</span>
												<span>8+ characters</span>
											</div>
											<div
												className={`flex items-center gap-1 ${
													strength.hasUppercase ? 'text-green-600' : 'text-gray-400'
												}`}
											>
												<span>{strength.hasUppercase ? '✅' : '⬜'}</span>
												<span>Uppercase (A-Z)</span>
											</div>
											<div
												className={`flex items-center gap-1 ${
													strength.hasLowercase ? 'text-green-600' : 'text-gray-400'
												}`}
											>
												<span>{strength.hasLowercase ? '✅' : '⬜'}</span>
												<span>Lowercase (a-z)</span>
											</div>
											<div
												className={`flex items-center gap-1 ${
													strength.hasNumber ? 'text-green-600' : 'text-gray-400'
												}`}
											>
												<span>{strength.hasNumber ? '✅' : '⬜'}</span>
												<span>Number (0-9)</span>
											</div>
											<div
												className={`flex items-center gap-1 ${
													strength.hasSpecial ? 'text-green-600' : 'text-gray-400'
												}`}
											>
												<span>{strength.hasSpecial ? '✅' : '⬜'}</span>
												<span>Special (@$!%*?&)</span>
											</div>
										</div>
									</>
								);
							})()}
						</div>
					)}

					<ErrorMessage error={errors.password} icon="🔒" />
				</div>

				{/* CONFIRM PASSWORD FIELD */}
				<div className="mb-4">
					<label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
						Confirm Password
					</label>
					<input
						type="password"
						id="confirmPassword"
						{...register('confirmPassword')}
						className={getInputClassName(errors.confirmPassword)}
						placeholder="Confirm your password"
						disabled={loading}
					/>
					<ErrorMessage error={errors.confirmPassword} icon="🔒" />
				</div>

				{/* TERMS ACCEPTANCE */}
				<div className="mb-6">
					<div className="flex items-start gap-2">
						<input
							type="checkbox"
							id="acceptTerms"
							{...register('acceptTerms')}
							className="mt-1 rounded border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
							disabled={loading}
						/>
						<label htmlFor="acceptTerms" className="text-sm text-gray-700">
							I accept the{' '}
							<a href="/terms" className="text-blue-600 hover:underline">
								terms and conditions
							</a>
						</label>
					</div>
					<ErrorMessage error={errors.acceptTerms} icon="📋" />
				</div>

				{/* ERROR MESSAGE */}
				{error && (
					<div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
						<div className="flex items-center gap-2 text-red-700">
							<span>❌</span>
							<span className="font-medium">Error:</span>
							<span>{error}</span>
						</div>
					</div>
				)}

				{/* SUCCESS MESSAGE */}
				{success && (
					<div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md">
						<div className="flex items-center gap-2 text-green-700">
							<span>✅</span>
							<span className="font-medium">Success!</span>
							<span>Account created! Please check your email and click the verification link.</span>
						</div>
					</div>
				)}

				{/* SUBMIT BUTTON */}
				<button
					type="submit"
					disabled={!isValid || loading}
					className={`w-full py-3 px-4 rounded-md font-medium transition-all duration-200 ${
						isValid && !loading
							? 'bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
							: 'bg-gray-300 text-gray-500 cursor-not-allowed'
					}`}
				>
					{loading ? (
						<div className="flex items-center justify-center gap-2">
							<div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
							<span>Creating Account...</span>
						</div>
					) : (
						'Create Account'
					)}
				</button>

				{/* SIGN IN LINK */}
				<div className="mt-4 text-center">
					<span className="text-sm text-gray-600">
						Already have an account?{' '}
						<a href="/sign-in" className="text-blue-600 hover:underline font-medium">
							Sign in
						</a>
					</span>
				</div>
			</form>
		</div>
	);
}
