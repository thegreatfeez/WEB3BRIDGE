import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAccount } from 'wagmi'
import Navbar from '../components/landing/Navbar'
import HeroSection from '../components/landing/HeroSection'
import BrandSlider from '../components/landing/BrandSlider'
import FeaturesSection from '../components/landing/FeaturesSection'
import StatsSection from '../components/landing/StatsSection'
import TestimonialsSection from '../components/landing/TestimonialsSection'
import Footer from '../components/landing/Footer'

function LandingPage() {
	const { isConnected } = useAccount()
	const navigate = useNavigate()

	// Redirect to dashboard when wallet is connected
	useEffect(() => {
		if (isConnected) {
			navigate('/overview')
		}
	}, [isConnected, navigate])

	return (
		<div className="min-h-screen bg-white">
			<Navbar />
			<HeroSection />
			<BrandSlider />
			<FeaturesSection />
			<StatsSection />
			<TestimonialsSection />
			<Footer />
		</div>
	)
}

export default LandingPage
