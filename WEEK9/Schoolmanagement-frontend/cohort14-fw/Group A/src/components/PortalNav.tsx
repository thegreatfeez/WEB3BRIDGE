import { useState } from 'react'
import {
	overviewIcon,
	ledgerIcon,
	capIcon,
	cardIcon,
	logoutIcon,
	settingsIcon,
	usersIcon,
} from './icons'
import { navItems as defaultNavItems, type NavItem } from './navItems'
import { NavLink, useNavigate } from 'react-router-dom'
import { useDisconnect } from 'wagmi'
import { useWeb3Auth } from '@web3auth/modal/react'
import WalletInfo from './WalletInfo'

type PortalNavProps = {
	items?: readonly NavItem[]
	title?: string
	subtitle?: string
}

function NavIcon({ icon }: { icon: NavItem['icon'] }) {
	if (icon === 'grid') {
		return (
			<img src={overviewIcon} alt="Overview" className="h-4.5 w-4.5" />
		)
	}

	if (icon === 'ledger') {
		return (
			<img src={ledgerIcon} alt="Academic Ledger" className="h-4.5 w-4.5" />
		)
	}

	if (icon === 'users') {
		return (
			<img src={usersIcon} alt="Student Registry" className="h-4.5 w-4.5" />
		)
	}

	if (icon === 'cap') {
		return (
			<img src={capIcon} alt="Faculty Portal" className="h-4.5 w-4.5" />
		)
	}

	if (icon === 'card') {
		return (
			<img src={cardIcon} alt="Claims & Billing" className="h-4.5 w-4.5" />
		)
	}

	return null
}

function PortalNav({
	items = defaultNavItems,
	title = 'ExcelSchool',
	subtitle = 'Academic Management',
}: PortalNavProps) {
	const { disconnect } = useDisconnect()
	const { web3Auth, isConnected: isWeb3AuthConnected } = useWeb3Auth()
	const navigate = useNavigate()
	const [showDisconnectModal, setShowDisconnectModal] = useState(false)

	const handleDisconnect = async () => {
		try {
			// Disconnect wagmi wallet if connected
			disconnect()
			
			// Logout from Web3Auth if connected
			if (isWeb3AuthConnected && web3Auth) {
				await web3Auth.logout()
			}
			
			// Navigate to home page
			navigate('/home')
		} catch (error) {
			console.error('Error disconnecting:', error)
			// Still navigate even if there's an error
			navigate('/home')
		}
	}

	return (
		<aside className="flex w-full flex-col border-b border-[#dfe3ea] bg-[#eceff3] px-4 py-5 lg:sticky lg:top-0 lg:h-screen lg:w-[236px] lg:self-start lg:border-b-0 lg:border-r lg:px-4 lg:py-4">
			{/* Branding */}
			<div className="mb-6 hidden lg:block">
				<h2 className="text-[18px] font-semibold tracking-tight text-[#2e3240]">
					{title}
				</h2>
				<p className="text-[11px] tracking-wide text-[#79849a]">
					{subtitle}
				</p>
			</div>

			{/* Wallet info */}
			<div className="mb-4 hidden lg:block">
				<WalletInfo />
			</div>

			{/* Nav links */}
			<nav className="flex gap-1 overflow-x-auto lg:flex-col">
				{items.map((item) => (
					<NavLink
						key={item.path}
						to={item.path}
						end={item.path === '/overview'}
						className={({ isActive }) =>
							`flex items-center gap-2.5 rounded-lg border px-3 py-2 text-[16px] font-medium whitespace-nowrap transition ${
								isActive
									? 'border-[#dfe3ea] bg-[#f3f5f8] text-[#2e3240]'
									: 'border-transparent text-[#65748b] hover:border-[#dfe3ea] hover:bg-[#f3f5f8]'
							}`
						}
					>
						<span className="grid h-5 w-5 place-items-center">
							<NavIcon icon={item.icon} />
						</span>
						<span>{item.label}</span>
					</NavLink>
				))}
			</nav>

			<div className="mt-8 grid gap-2 border-t border-[#d8dde5] pt-5 lg:mt-auto">

				<button
					type="button"
					className="flex items-center gap-2.5 rounded-lg border border-transparent px-3 py-2 text-left text-[16px] font-medium text-[#65748b] transition hover:border-[#dfe3ea] hover:bg-[#f3f5f8]"
				>
					<span className="grid h-5 w-5 place-items-center">
						<img src={settingsIcon} alt="Settings" className="h-4.5 w-4.5" />
					</span>
					<span>Settings</span>
				</button>

				<button
					type="button"
					onClick={() => setShowDisconnectModal(true)}
					className="flex items-center gap-2.5 rounded-lg border border-transparent px-3 py-2 text-left text-[16px] font-medium text-[#65748b] transition hover:border-[#dfe3ea] hover:bg-[#f3f5f8]"
				>
					<span className="grid h-5 w-5 place-items-center">
						<img src={logoutIcon} alt="Disconnect" className="h-4.5 w-4.5" />
					</span>
					<span>Disconnect</span>
				</button>
			</div>

			{/* Disconnect confirmation modal */}
			{showDisconnectModal && (
				<div
					className="fixed inset-0 z-[100] flex items-center justify-center"
					onClick={() => setShowDisconnectModal(false)}
				>
					<div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
					<div
						className="relative z-[1] w-[90%] max-w-[380px] rounded-2xl bg-white p-8 shadow-[0_20px_60px_rgba(0,0,0,0.3)]"
						onClick={(e) => e.stopPropagation()}
						style={{ animation: 'modalIn 0.2s ease-out' }}
					>
						<div className="mb-6 text-center">
							<div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-red-50">
								<svg viewBox="0 0 24 24" className="h-7 w-7 text-red-500" fill="none" stroke="currentColor" strokeWidth="1.5">
									<path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" strokeLinecap="round" strokeLinejoin="round" />
								</svg>
							</div>
							<h3 className="text-[18px] font-bold text-[#161c25]">Disconnect Wallet?</h3>
							<p className="mt-2 text-[14px] text-neutral-500">
								Are you sure you want to disconnect your wallet? You'll be redirected to the landing page.
							</p>
						</div>
						<div className="flex gap-3">
							<button
								type="button"
								onClick={() => setShowDisconnectModal(false)}
								className="flex-1 rounded-lg border border-neutral-200 bg-white px-5 py-3 text-[14px] font-semibold text-[#161c25] transition hover:bg-neutral-50"
							>
								Cancel
							</button>
							<button
								type="button"
								onClick={() => {
									setShowDisconnectModal(false)
									handleDisconnect()
								}}
								className="flex-1 rounded-lg bg-red-500 px-5 py-3 text-[14px] font-semibold text-white transition hover:bg-red-600"
							>
								Yes, Disconnect
							</button>
						</div>
					</div>
				</div>
			)}
		</aside>
	)
}

export default PortalNav
