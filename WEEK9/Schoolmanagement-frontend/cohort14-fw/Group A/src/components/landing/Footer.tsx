import { useState } from 'react'
import { NavLink } from 'react-router-dom'

const footerLinks = {
	legal: [
		{ label: 'Terms of Service', path: '/terms' },
		{ label: 'Privacy Policy', path: '/privacy' },
		{ label: 'Token Policy', path: '/token-policy' },
	],
}

function Footer() {
	const [email, setEmail] = useState('')
	const [subscribeStatus, setSubscribeStatus] = useState<'idle' | 'success' | 'error'>('idle')
	return (
		<>
			{/* CTA Section */}
			<section className="py-20" style={{ background: '#0b1d4f' }}>
				<div className="mx-auto max-w-[1280px] px-5 text-center lg:px-10">
					<h3 className="mx-auto max-w-[600px] text-[30px] font-semibold leading-[1.1] text-white md:text-[38px]">
						Ready to Transform Your <span className="font-semibold">Institution?</span>
					</h3>
					<p className="mx-auto mt-5 max-w-[500px] text-[16px] leading-[22px] text-neutral-300">
						With ExcelSchool, you're not just managing a school — you're building a transparent future for education on the blockchain.
					</p>
					<a
						href="/overview"
						className="mt-10 inline-flex rounded-lg bg-[#1457d2] px-10 py-4 text-[15px] font-semibold text-white shadow-[0_8px_24px_rgba(20,87,210,0.4)] transition hover:bg-[#2563eb]"
					>
						Get Started Today
					</a>
				</div>
			</section>

			{/* Footer */}
			<footer id="contact" className="border-t border-neutral-200 bg-[#e9eefc] text-[#555]">
				<div className="mx-auto max-w-[1280px] px-5 py-16 lg:px-10">
					<div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
						{/* Brand */}
						<div>
							<NavLink to="/home" className="text-[24px] font-bold tracking-[-0.02em] text-[#161c25]">
								ExcelSchool
							</NavLink>
							<p className="mt-3 max-w-[280px] text-[14px] leading-[18px] font-light text-neutral-600">
								The decentralized academic management platform — empowering institutions worldwide with blockchain transparency and trust.
							</p>
							<div className="mt-5 flex items-center gap-4">
								<a
									href="https://github.com/thegreatfeez/schoolmanagementUI"
									target="_blank"
									rel="noopener noreferrer"
									className="grid h-9 w-9 place-items-center rounded-full bg-[#d8dfef] text-[#1457d2] transition hover:bg-[#1457d2] hover:text-white"
									aria-label="GitHub"
								>
									<svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
										<path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
									</svg>
								</a>
							</div>
						</div>

						{/* Legal */}
						<div>
							<h5 className="mb-4 text-[16px] font-semibold text-[#161c25]">Legal</h5>
							<ul className="space-y-2">
								{footerLinks.legal.map((link) => (
									<li key={link.label}>
										<NavLink to={link.path} className="text-[14px] text-neutral-500 transition hover:text-[#1457d2]">
											{link.label}
										</NavLink>
									</li>
								))}
							</ul>
						</div>

						{/* Newsletter */}
						<div>
							<h5 className="mb-2 text-[16px] font-semibold text-[#1457d2]">Get updates from ExcelSchool</h5>
							<p className="mb-4 text-[13px] text-neutral-500">Subscribe to stay in the know</p>
							<form 
								className="flex gap-2" 
								onSubmit={(e) => {
									e.preventDefault()
									if (email && email.includes('@')) {
										setSubscribeStatus('success')
										setEmail('')
										setTimeout(() => setSubscribeStatus('idle'), 5000)
									} else {
										setSubscribeStatus('error')
										setTimeout(() => setSubscribeStatus('idle'), 3000)
									}
								}}
							>
								<input
									type="email"
									placeholder="Email Address"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									required
									className="flex-1 rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-[14px] outline-none focus:border-[#1457d2]"
								/>
								<button
									type="submit"
									className="rounded-lg bg-[#1457d2] px-5 py-2.5 text-[14px] font-semibold text-white transition hover:bg-[#0f3d9e]"
								>
									Subscribe
								</button>
							</form>
							{subscribeStatus === 'success' && (
								<p className="mt-2 text-[12px] text-green-600 font-medium">
									✓ Successfully subscribed! Check your email.
								</p>
							)}
							{subscribeStatus === 'error' && (
								<p className="mt-2 text-[12px] text-red-600 font-medium">
									✗ Please enter a valid email address.
								</p>
							)}
							{subscribeStatus === 'idle' && (
								<p className="mt-2 text-[11px] text-neutral-400">
									By subscribing, you accept our{' '}
									<NavLink to="/privacy" className="font-medium text-[#161c25] underline">Privacy Policy</NavLink>
								</p>
							)}
						</div>
					</div>

					<div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-neutral-300 pt-6 sm:flex-row">
						<p className="text-[13px] text-neutral-500">
							© 2026 <span className="font-semibold text-[#1457d2]">ExcelSchool</span> — All rights reserved.
						</p>
						<p className="text-[13px] text-neutral-500">Built on Ethereum • Powered by Smart Contracts</p>
					</div>
				</div>
			</footer>
		</>
	)
}

export default Footer
