import { BrowserRouter, Route, Routes, Outlet, Navigate } from 'react-router-dom'
import { useAccount } from 'wagmi'
import { useWeb3Auth } from '@web3auth/modal/react'
import PortalNav from './components/PortalNav'
import Overview from './pages/overview'
import FacultyPortal from './pages/FalcutyPortal'
import ClaimPortal from './pages/claimportal'
import StudentRegistry from './pages/studentRegistry'
import LandingPage from './pages/LandingPage'
import AcademicLedger from './pages/academyledger'

// Legal pages
import TermsOfService from './pages/legal/TermsOfService'
import PrivacyPolicy from './pages/legal/PrivacyPolicy'
import TokenPolicy from './pages/legal/TokenPolicy'

// Support pages
import KnowledgeBase from './pages/support/KnowledgeBase'
import Documentation from './pages/support/Documentation'
import SmartContracts from './pages/support/SmartContracts'
import APIReference from './pages/support/APIReference'

function PortalLayout() {
	return (
		<div className="min-h-screen bg-[#eceff3] text-[#5d6470]">
			<div className="mx-auto flex w-full max-w-[1280px] lg:min-h-screen">
				<PortalNav />
				<div className="flex-1">
					<Outlet />
				</div>
			</div>
		</div>
	)
}

// Redirect to landing if neither wallet nor Web3Auth is connected
function ProtectedRoute() {
	const { isConnected } = useAccount()
	const { isConnected: isWeb3AuthConnected, isInitializing } = useWeb3Auth()
	
	// Wait for Web3Auth to finish initializing before checking
	if (isInitializing) {
		return (
			<div className="flex min-h-screen items-center justify-center">
				<div className="text-center">
					<div className="h-8 w-8 animate-spin rounded-full border-4 border-[#1457d2] border-t-transparent mx-auto mb-4" />
					<p className="text-gray-600">Loading...</p>
				</div>
			</div>
		)
	}
	
	if (!isConnected && !isWeb3AuthConnected) {
		return <Navigate to="/home" replace />
	}
	
	return <PortalLayout />
}

function App() {
	return (
		<BrowserRouter>
			<Routes>
				{/* Landing page — public, no sidebar */}
				<Route index element={<LandingPage />} />
				<Route path="home" element={<LandingPage />} />

				{/* Legal pages — public */}
				<Route path="terms" element={<TermsOfService />} />
				<Route path="privacy" element={<PrivacyPolicy />} />
				<Route path="token-policy" element={<TokenPolicy />} />

				{/* Support pages — public */}
				<Route path="knowledge-base" element={<KnowledgeBase />} />
				<Route path="documentation" element={<Documentation />} />
				<Route path="smart-contracts" element={<SmartContracts />} />
				<Route path="api-reference" element={<APIReference />} />

				{/* Dashboard routes — protected, requires wallet */}
				<Route element={<ProtectedRoute />}>
					<Route path="overview" element={<Overview />} />
					<Route path="ledger" element={<AcademicLedger />} />
					<Route path="faculty" element={<FacultyPortal />} />
					<Route path="claims" element={<ClaimPortal />} />
					<Route path="students" element={<StudentRegistry />} />
				</Route>
			</Routes>
		</BrowserRouter>
	)
}

export default App

