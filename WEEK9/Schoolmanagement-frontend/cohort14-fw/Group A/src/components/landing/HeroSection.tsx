import dashboardImg from '../../assets/landing/dashboard-trim.webp'
import graphImg from '../../assets/landing/graph.webp'
import bgLinesImg from '../../assets/landing/bg-lines.webp'
import verifiedIcon from '../../assets/landing/verified-icon.svg'
import starImg from '../../assets/landing/star.png'
import starHalfImg from '../../assets/landing/star-half.png'
import user1 from '../../assets/landing/user1.png'
import user2 from '../../assets/landing/user2.png'
import user3 from '../../assets/landing/user3.png'

function HeroSection() {
	return (
		<section className="relative overflow-hidden py-16 md:py-20 lg:py-28" style={{ background: 'linear-gradient(135deg, #0b1d4f 0%, #132d6b 40%, #1457d2 100%)' }}>
			<img src={bgLinesImg} alt="" className="pointer-events-none absolute right-0 top-0 hidden opacity-20 sm:block" />

			<div className="mx-auto max-w-[1280px] px-5 lg:px-10">
				<div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-20">
					{/* Left content */}
					<div className="flex-1 text-white">
						<div className="mb-6 flex items-center gap-2">
							<span className="text-[28px] font-medium">#1</span>
							<span className="text-[12px] leading-[14px]">On-Chain<br />Platform</span>
							<span className="ml-1 text-[13px]">Verified</span>
							<img src={verifiedIcon} alt="Verified" className="ml-1 h-4 w-4" />
						</div>

						<h1 className="text-[38px] font-light leading-[1.08] md:text-[48px] lg:text-[56px]">
							<span className="font-light">Decentralized </span>
							<span className="font-semibold">Academic </span>
							<span className="font-light">Management </span>
							<span className="font-semibold">Software</span>
						</h1>

						<p className="mt-7 max-w-[500px] text-[15px] font-medium leading-[22px] text-neutral-200">
							Manage your school, college, or educational institution seamlessly with ExcelSchool — powered by blockchain for transparency, security, and trust.
						</p>

						<div className="mt-10 flex flex-wrap items-center gap-4">
							<a
								href="/signup"
								className="inline-flex items-center rounded-full bg-[#1457d2] px-10 py-4 text-[15px] font-semibold text-white shadow-[0_8px_24px_rgba(20,87,210,0.4)] transition hover:bg-[#0f3d9e]"
								style={{ background: '#1457d2' }}
							>
								Sign Up Now
							</a>
						</div>

						<div className="mt-10 flex flex-wrap items-center gap-5">
							<span className="text-[14px] leading-[20px]">
								Trusted by <span className="font-bold">1,000+</span> institutions
							</span>
							<div className="flex items-center gap-1">
								<span className="mr-1 text-[14px] font-medium">Rated 4.8</span>
								{[1, 2, 3, 4].map((i) => (
									<img key={i} src={starImg} alt="Star" className="h-[14px]" />
								))}
								<img src={starHalfImg} alt="Half star" className="h-[14px]" />
							</div>
						</div>
					</div>

					{/* Right — Dashboard screenshot */}
					<div className="relative flex-1">
						<div className="relative z-[1]">
							<img
								src={dashboardImg}
								alt="ExcelSchool dashboard preview"
								className="rounded-lg shadow-[0_20px_60px_rgba(0,0,0,0.3)]"
							/>
						</div>

						{/* Floating revenue card */}
						<div className="absolute -bottom-4 left-0 z-[2] flex items-center gap-6 rounded-2xl border border-white/20 bg-white/90 px-6 py-5 shadow-[0_8px_30px_rgba(0,0,0,0.12)] backdrop-blur-md">
							<div>
								<span className="text-[12px] font-medium uppercase tracking-wide text-neutral-500">Revenue</span>
								<h5 className="text-[22px] font-bold text-[#161c25]">$985,000</h5>
							</div>
							<img src={graphImg} alt="Revenue graph" className="h-[80px]" />
						</div>

						{/* Floating user avatars */}
						<div className="absolute -right-2 top-4 z-[2] flex items-center gap-3 rounded-xl border border-white/20 bg-white/90 px-4 py-3 shadow-[0_8px_24px_rgba(0,0,0,0.1)] backdrop-blur-md">
							<div className="flex -space-x-2">
								<img src={user1} alt="" className="h-8 w-8 rounded-full border-2 border-white object-cover" />
								<img src={user2} alt="" className="h-8 w-8 rounded-full border-2 border-white object-cover" />
								<img src={user3} alt="" className="h-8 w-8 rounded-full border-2 border-white object-cover" />
							</div>
							<div>
								<p className="text-[14px] font-bold text-[#161c25]">2.3K+</p>
								<p className="text-[11px] text-neutral-500">Active Users</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default HeroSection
