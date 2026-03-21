import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import AuthModal from './AuthModal'

const navLinks = [
	{ label: 'Home', href: '#', id: 'nav-home' },
	{ label: 'Features', href: '#features', id: 'nav-features' },
	{ label: 'About', href: '#about', id: 'nav-about' },
	{ label: 'Contact', href: '#contact', id: 'nav-contact' },
]

function Navbar() {
	const [mobileOpen, setMobileOpen] = useState(false)
	const [authOpen, setAuthOpen] = useState(false)

	return (
		<>
			<header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md" style={{ borderBottom: '1px solid #e8ecf1' }}>
				<div className="mx-auto flex h-[72px] max-w-[1280px] items-center justify-between px-5 lg:px-10">
					<NavLink to="/home" className="text-[26px] font-bold tracking-[-0.02em] text-[#161c25]">
						ExcelSchool
					</NavLink>

					<nav className="hidden items-center gap-9 md:flex">
						{navLinks.map((link) => (
							<a
								key={link.id}
								id={link.id}
								href={link.href}
								className="text-[15px] font-semibold text-[#333] transition hover:text-[#1457d2]"
							>
								{link.label}
							</a>
						))}
					</nav>

					<div className="flex items-center gap-3">
						<button
							type="button"
							onClick={() => setAuthOpen(true)}
							className="hidden text-[14px] font-semibold text-[#333] transition hover:text-[#1457d2] sm:inline-flex"
						>
							Login
						</button>
						<button
							type="button"
							id="signup-nav"
							onClick={() => setAuthOpen(true)}
							className="rounded-lg bg-[#1457d2] px-6 py-2.5 text-[14px] font-semibold text-white transition hover:bg-[#0f3d9e]"
						>
							Sign Up
						</button>
						<button
							type="button"
							className="ml-2 grid h-10 w-10 place-items-center rounded-lg text-[#333] transition hover:bg-[#f0f2f5] md:hidden"
							onClick={() => setMobileOpen(!mobileOpen)}
						>
							<svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
								{mobileOpen
									? <path d="M6 18L18 6M6 6l12 12" />
									: <path d="M4 6h16M4 12h16M4 18h16" />
								}
							</svg>
						</button>
					</div>
				</div>
			</header>

			{/* Mobile menu */}
			{mobileOpen && (
				<div className="fixed inset-0 z-[60] bg-black/40 md:hidden" onClick={() => setMobileOpen(false)}>
					<div className="absolute right-0 top-0 h-full w-[280px] bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
						<div className="mb-8 flex items-center justify-between">
							<span className="text-[20px] font-bold text-[#161c25]">ExcelSchool</span>
							<button type="button" onClick={() => setMobileOpen(false)} className="grid h-8 w-8 place-items-center rounded-full bg-[#f0f2f5]">
								<svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
									<path d="M6 18L18 6M6 6l12 12" />
								</svg>
							</button>
						</div>
						<nav className="flex flex-col gap-4">
							{navLinks.map((link) => (
								<a key={link.id} href={link.href} className="rounded-lg px-4 py-3 text-[16px] font-semibold text-[#333] transition hover:bg-[#f0f2f5]" onClick={() => setMobileOpen(false)}>
									{link.label}
								</a>
							))}
						</nav>
						<div className="mt-8 flex flex-col gap-3">
							<button type="button" onClick={() => { setMobileOpen(false); setAuthOpen(true) }} className="rounded-lg border border-[#1457d2] px-5 py-3 text-center text-[14px] font-semibold text-[#1457d2]">
								Login
							</button>
							<button type="button" onClick={() => { setMobileOpen(false); setAuthOpen(true) }} className="rounded-lg bg-[#1457d2] px-5 py-3 text-center text-[14px] font-semibold text-white">
								Sign Up
							</button>
						</div>
					</div>
				</div>
			)}

			<AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
		</>
	)
}

export default Navbar
