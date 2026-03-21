import multiuserImg from '../../assets/landing/multiuser-img2.webp'
import chatImg from '../../assets/landing/chat2.webp'
import reportImg from '../../assets/landing/report7.webp'
import smsImg from '../../assets/landing/sms-gateway.webp'
import liveImg from '../../assets/landing/live-classes.webp'

function FeaturesSection() {
	return (
		<section id="features" className="overflow-hidden bg-white py-20 lg:py-28">
			<div className="mx-auto max-w-[1280px] px-5 lg:px-10">
				<div className="mb-12">
					<span className="mb-3 inline-block rounded-full bg-[#eef3fc] px-4 py-1 text-[13px] font-bold text-[#1457d2]">
						What We Offer
					</span>
					<div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
						<div className="max-w-[620px]">
							<h3 className="text-[30px] font-medium leading-[1.1] text-[#161c25] md:text-[36px]">
								Everything your institution needs — delivered <span className="font-semibold">on-chain</span>, fast, and future-proof
							</h3>
						</div>
						<p className="max-w-[460px] text-[15px] leading-[22px] text-neutral-500">
							ExcelSchool's robust feature set covers every aspect of academic management with blockchain-powered transparency and security.
						</p>
					</div>
				</div>

				{/* Bento grid */}
				<div className="grid gap-5 lg:grid-cols-3">
					{/* Column 1 */}
					<div className="flex flex-col gap-5">
						<div className="group relative overflow-hidden rounded-3xl bg-[#f8f0ff] p-8 pb-[200px]">
							<span className="mb-3 inline-block rounded-full bg-[#0b1d4f] px-4 py-1 text-[13px] font-bold text-white">
								Multi-user Access
							</span>
							<h4 className="mb-4 max-w-[360px] text-[20px] font-medium leading-[1.2] text-[#161c25]">
								Dedicated <span className="font-semibold">portals</span> for{' '}
								<span className="text-[#1457d2]">admin</span>,{' '}
								<span className="text-[#1457d2]">students</span>, and{' '}
								<span className="text-[#1457d2]">staff</span>.
							</h4>
							<a href="#" className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0b1d4f] text-white transition hover:bg-[#1457d2]">
								<svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5">
									<path d="M7 17L17 7M17 7H7M17 7v10" />
								</svg>
							</a>
							<img src={multiuserImg} alt="Multi-user portal illustration" className="absolute bottom-0 right-0 max-h-[220px] transition duration-300 group-hover:scale-105" loading="lazy" />
						</div>

						<div className="group relative overflow-hidden rounded-3xl bg-[#eef3fc] p-8 pb-[200px]">
							<span className="mb-3 inline-block rounded-full bg-[#0b1d4f] px-4 py-1 text-[13px] font-bold text-white">
								Stay Connected
							</span>
							<h4 className="mb-4 max-w-[360px] text-[20px] font-medium leading-[1.2] text-[#161c25]">
								<span className="font-semibold">Built-in</span> real-time{' '}
								<span className="text-[#1457d2]">notifications</span> and secure{' '}
								<span className="text-[#1457d2]">on-chain records</span>.
							</h4>
							<a href="#" className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0b1d4f] text-white transition hover:bg-[#1457d2]">
								<svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5">
									<path d="M7 17L17 7M17 7H7M17 7v10" />
								</svg>
							</a>
							<img src={chatImg} alt="Chat and communication" className="absolute bottom-0 right-0 max-h-[220px] transition duration-300 group-hover:scale-105" loading="lazy" />
						</div>
					</div>

					{/* Column 2 — tall card */}
					<div className="flex flex-col gap-5">
						<div className="group relative overflow-hidden rounded-3xl p-8 pb-[420px]" style={{ background: '#0b1d4f' }}>
							<span className="mb-3 inline-block rounded-full bg-[#1457d2] px-4 py-1 text-[13px] font-bold text-white">
								Smart Contract Reports
							</span>
							<h4 className="mb-4 max-w-[360px] text-[20px] font-medium leading-[1.2] text-white">
								Blockchain-powered{' '}
								<span className="text-[#6ea8ff]">performance</span> reports with{' '}
								<span className="text-[#6ea8ff]">transparent</span> audit trails and{' '}
								<span className="text-[#6ea8ff]">immutable</span> record keeping.
							</h4>
							<a href="#" className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1457d2] text-white transition hover:bg-[#2563eb]">
								<svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5">
									<path d="M7 17L17 7M17 7H7M17 7v10" />
								</svg>
							</a>
							<img src={reportImg} alt="Smart contract report dashboard" className="absolute bottom-0 left-4 right-4 mx-auto mb-8 transition duration-300 group-hover:scale-105" loading="lazy" />
						</div>
					</div>

					{/* Column 3 */}
					<div className="flex flex-col gap-5">
						<div className="group relative overflow-hidden rounded-3xl bg-[#eef3fc] p-8 pb-[200px]">
							<span className="mb-3 inline-block rounded-full bg-[#0b1d4f] px-4 py-1 text-[13px] font-bold text-white">
								Token Claims
							</span>
							<h4 className="mb-4 max-w-[360px] text-[20px] font-medium leading-[1.2] text-[#161c25]">
								Secure <span className="font-semibold">faucet</span>{' '}
								<span className="text-[#1457d2]">token</span> distribution and{' '}
								<span className="text-[#1457d2]">wallet-verified</span> claims.
							</h4>
							<a href="#" className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0b1d4f] text-white transition hover:bg-[#1457d2]">
								<svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5">
									<path d="M7 17L17 7M17 7H7M17 7v10" />
								</svg>
							</a>
							<img src={smsImg} alt="Token distribution" className="absolute bottom-0 right-0 max-h-[220px] transition duration-300 group-hover:scale-105" loading="lazy" />
						</div>

						<div className="group relative overflow-hidden rounded-3xl bg-[#f8f0ff] p-8 pb-[200px]">
							<span className="mb-3 inline-block rounded-full bg-[#0b1d4f] px-4 py-1 text-[13px] font-bold text-white">
								Automated Payroll
							</span>
							<h4 className="mb-4 max-w-[360px] text-[20px] font-medium leading-[1.2] text-[#161c25]">
								Smart contract{' '}
								<span className="text-[#1457d2]">salary disbursement</span> with{' '}
								<span className="font-semibold">transparent</span> ledger tracking.
							</h4>
							<a href="#" className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0b1d4f] text-white transition hover:bg-[#1457d2]">
								<svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5">
									<path d="M7 17L17 7M17 7H7M17 7v10" />
								</svg>
							</a>
							<img src={liveImg} alt="Automated payroll" className="absolute bottom-0 right-0 max-h-[220px] transition duration-300 group-hover:scale-105" loading="lazy" />
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default FeaturesSection
