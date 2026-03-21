import checkImg from '../../assets/landing/check.png'
import securityImg from '../../assets/landing/data-security3.webp'
import { landingSecurityChecks as securityChecks, landingStats as stats } from '../../data/mockData'

function StatsSection() {
	return (
		<>
			{/* Stats bar */}
			<section className="relative overflow-hidden py-16 lg:py-20" style={{ background: 'linear-gradient(90deg, #0b1d4f 0%, #132d6b 50%, #0b1d4f 100%)' }}>
				<div className="mx-auto max-w-[1280px] px-5 lg:px-10">
					<div className="grid grid-cols-2 gap-8 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-white/15">
						{stats.map((stat) => (
							<div key={stat.id} id={stat.id} className="text-center">
								<p className="text-[38px] font-bold leading-none tracking-tight text-white md:text-[46px]">
									{stat.value}
								</p>
								<p className="mt-3 text-[14px] font-medium text-[#94a3c4]">
									{stat.label}
								</p>
							</div>
						))}
					</div>
				</div>
				<div className="pointer-events-none absolute left-1/2 top-1/2 h-[300px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#1457d2]/15 blur-[120px]" />
			</section>

			{/* Security + Why Choose Us */}
			<section className="bg-[#f5f7fa] py-0">
				<div className="mx-auto max-w-[1280px] px-5 lg:px-10">
					<div className="overflow-hidden rounded-3xl" style={{ background: '#0b1d4f' }}>
						<div className="flex flex-col gap-16 p-8 lg:flex-row lg:p-12">
							<div className="flex-1">
								<div className="pb-4 pt-8">
									<h3 className="mb-5 text-[32px] font-semibold leading-[1.1] text-white md:text-[38px]">
										Why ExcelSchool Stands Out
									</h3>
									<p className="mb-6 max-w-[430px] text-[14px] leading-[20px] text-neutral-400">
										Fortified by smart contract audits and blockchain immutability, ExcelSchool encrypts every record and ensures instant, limitless scale — your data is safer on-chain.
									</p>
									<ul className="space-y-3">
										{securityChecks.map((item, i) => (
											<li key={i} className="flex items-center gap-3 text-[14px] font-semibold text-white">
												<img src={checkImg} alt="" className="h-[14px]" />
												{item}
											</li>
										))}
									</ul>
									<div className="mt-10 flex flex-wrap items-center gap-6">
										<a
											href="/overview"
											className="inline-flex rounded-full bg-[#1457d2] px-10 py-4 text-[15px] font-semibold text-white transition hover:bg-[#2563eb]"
										>
											Get Started
										</a>
									</div>
								</div>
							</div>
							<div className="flex flex-1 items-center justify-center">
								<img src={securityImg} alt="Data security illustration" className="max-w-[460px]" loading="lazy" />
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	)
}

export default StatsSection
