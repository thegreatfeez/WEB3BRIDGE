function TokenPolicy() {
	return (
		<div className="min-h-screen bg-white">
			<div className="mx-auto max-w-[900px] px-5 py-16 lg:px-10">
				<h1 className="mb-8 text-[36px] font-bold text-[#161c25]">Token Policy</h1>
				<p className="mb-6 text-[14px] text-neutral-500">Last updated: {new Date().toLocaleDateString()}</p>

				<div className="space-y-8 text-[15px] leading-relaxed text-neutral-700">
					<section>
						<h2 className="mb-4 text-[24px] font-semibold text-[#161c25]">1. Token Overview</h2>
						<p>
							ExcelSchool utilizes blockchain tokens for various platform operations including payments, rewards, and governance.
							This policy outlines the terms and conditions governing token usage.
						</p>
					</section>

					<section>
						<h2 className="mb-4 text-[24px] font-semibold text-[#161c25]">2. Token Utility</h2>
						<p className="mb-3">Platform tokens can be used for:</p>
						<ul className="ml-6 list-disc space-y-2">
							<li>Payment of tuition fees and institutional charges</li>
							<li>Access to premium platform features</li>
							<li>Participation in governance decisions</li>
							<li>Rewards and incentive programs</li>
						</ul>
					</section>

					<section>
						<h2 className="mb-4 text-[24px] font-semibold text-[#161c25]">3. Token Acquisition</h2>
						<p>
							Tokens can be acquired through authorized exchanges, direct purchase from the platform, or earned through platform activities.
							All token transactions are subject to applicable laws and regulations.
						</p>
					</section>

					<section>
						<h2 className="mb-4 text-[24px] font-semibold text-[#161c25]">4. Regulatory Compliance</h2>
						<p>
							Users must comply with all applicable laws and regulations in their jurisdiction regarding cryptocurrency and token usage.
							ExcelSchool is not responsible for users' compliance with local regulations.
						</p>
					</section>

					<section>
						<h2 className="mb-4 text-[24px] font-semibold text-[#161c25]">5. Risk Disclosure</h2>
						<p className="mb-3">Token holders should be aware of the following risks:</p>
						<ul className="ml-6 list-disc space-y-2">
							<li>Token value may fluctuate significantly</li>
							<li>Blockchain transactions are irreversible</li>
							<li>Smart contract vulnerabilities may exist</li>
							<li>Regulatory changes may affect token utility</li>
						</ul>
					</section>

					<section>
						<h2 className="mb-4 text-[24px] font-semibold text-[#161c25]">6. Token Security</h2>
						<p>
							Users are responsible for securing their private keys and wallet credentials. ExcelSchool cannot recover lost tokens or
							reverse unauthorized transactions.
						</p>
					</section>
				</div>
			</div>
		</div>
	)
}

export default TokenPolicy
