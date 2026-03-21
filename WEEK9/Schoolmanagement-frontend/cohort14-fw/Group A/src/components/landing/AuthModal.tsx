import { useConnectModal } from '@rainbow-me/rainbowkit'
import { useWeb3AuthConnect } from '@web3auth/modal/react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface AuthModalProps {
	isOpen: boolean
	onClose: () => void
}

function AuthModal({ isOpen, onClose }: AuthModalProps) {
	const { openConnectModal } = useConnectModal()
	const { connect, loading } = useWeb3AuthConnect()
	const [loginError, setLoginError] = useState<string | null>(null)
	const navigate = useNavigate()

	if (!isOpen) return null

	const handleWeb3AuthLogin = async () => {
		try {
			setLoginError(null)
			const provider = await connect()
			if (provider) {
				onClose()
				// Navigate to dashboard after successful login
				navigate('/overview')
			}
		} catch (error) {
			console.error('Web3Auth login failed:', error)
			setLoginError('Failed to login. Please try again.')
		}
	}

	const handleConnectWallet = () => {
		onClose()
		if (openConnectModal) {
			openConnectModal()
		}
	}

	return (
		<div
			className="fixed inset-0 z-[100] flex items-center justify-center"
			onClick={onClose}
		>
			{/* Blurred backdrop */}
			<div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

			{/* Modal */}
			<div
				className="relative z-[1] w-[90%] max-w-[420px] rounded-2xl bg-white p-8 shadow-[0_20px_60px_rgba(0,0,0,0.3)]"
				onClick={(e) => e.stopPropagation()}
				style={{ animation: 'modalIn 0.2s ease-out' }}
			>
				{/* Close button */}
				<button
					type="button"
					onClick={onClose}
					className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full text-neutral-400 transition hover:bg-neutral-100 hover:text-neutral-600"
				>
					<svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
						<path d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>

				{/* Header */}
				<div className="mb-8 text-center">
					<h3 className="text-[22px] font-bold text-[#161c25]">You're one step away</h3>
					<p className="mt-1 text-[14px] text-neutral-500">From managing your institution on-chain</p>
					{loginError && (
						<p className="mt-2 text-[13px] text-red-500">{loginError}</p>
					)}
				</div>

				{/* Continue with Web3Auth (Social Login) */}
				<button
					type="button"
					onClick={handleWeb3AuthLogin}
					disabled={loading}
					className="flex w-full items-center justify-center gap-3 rounded-lg bg-[#1457d2] px-6 py-3.5 text-[15px] font-semibold text-white transition hover:bg-[#0f3d9e] disabled:opacity-50 disabled:cursor-not-allowed"
				>
					{loading ? (
						<>
							<svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
								<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
								<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
							</svg>
							Connecting...
						</>
					) : (
						<>
							<svg viewBox="0 0 24 24" className="h-5 w-5">
								<path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#fff" />
								<path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#fff" />
								<path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#fff" />
								<path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#fff" />
							</svg>
							Continue with Social Login
						</>
					)}
				</button>

				{/* Divider */}
				<div className="my-6 flex items-center gap-4">
					<div className="h-px flex-1 bg-neutral-200" />
					<span className="text-[13px] font-medium text-neutral-400">OR</span>
					<div className="h-px flex-1 bg-neutral-200" />
				</div>

				{/* Connect Wallet — triggers RainbowKit */}
				<button
					type="button"
					onClick={handleConnectWallet}
					className="flex w-full items-center justify-center gap-3 rounded-lg border border-neutral-200 bg-white px-6 py-3.5 text-[15px] font-semibold text-[#161c25] transition hover:bg-neutral-50"
				>
					<svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5">
						<path d="M21 12V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2h14a2 2 0 002-2v-1" strokeLinecap="round" />
						<path d="M16 12h5v4h-5a2 2 0 010-4z" strokeLinecap="round" />
						<circle cx="18" cy="14" r="0.5" fill="currentColor" />
					</svg>
					Connect Wallet
				</button>

				{/* Terms */}
				<p className="mt-6 text-center text-[12px] text-neutral-400">
					By continuing, you agree to our{' '}
					<a href="#" className="font-medium text-[#161c25] underline">Terms of Use</a>
					{' '}and our{' '}
					<a href="#" className="font-medium text-[#161c25] underline">Privacy Policy</a>.
				</p>

				<p className="mt-3 text-center text-[12px] text-neutral-400">
					Need help? Reach out to us at{' '}
					<a href="mailto:support@excelschool.io" className="text-[#1457d2] underline">support@excelschool.io</a>
				</p>
			</div>
		</div>
	)
}

export default AuthModal
