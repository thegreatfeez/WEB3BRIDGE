function TermsOfService() {
	return (
		<div className="min-h-screen bg-white">
			<div className="mx-auto max-w-[900px] px-5 py-16 lg:px-10">
				<h1 className="mb-8 text-[36px] font-bold text-[#161c25]">Terms of Service</h1>
				<p className="mb-6 text-[14px] text-neutral-500">Last updated: {new Date().toLocaleDateString()}</p>

				<div className="space-y-8 text-[15px] leading-relaxed text-neutral-700">
					<section>
						<h2 className="mb-4 text-[24px] font-semibold text-[#161c25]">1. Acceptance of Terms</h2>
						<p>
							By accessing and using ExcelSchool's platform, you accept and agree to be bound by the terms and provision of this agreement.
							If you do not agree to these terms, please do not use our services.
						</p>
					</section>

					<section>
						<h2 className="mb-4 text-[24px] font-semibold text-[#161c25]">2. Use of Service</h2>
						<p className="mb-3">
							ExcelSchool provides a decentralized academic management platform. You agree to use the service only for lawful purposes and in accordance with these Terms.
						</p>
						<ul className="ml-6 list-disc space-y-2">
							<li>You must be at least 18 years old to use this service</li>
							<li>You are responsible for maintaining the security of your account</li>
							<li>You must not use the service for any illegal or unauthorized purpose</li>
						</ul>
					</section>

					<section>
						<h2 className="mb-4 text-[24px] font-semibold text-[#161c25]">3. Blockchain & Smart Contracts</h2>
						<p>
							Our platform utilizes blockchain technology and smart contracts. You acknowledge that blockchain transactions are irreversible
							and that you are responsible for the accuracy of all transaction details.
						</p>
					</section>

					<section>
						<h2 className="mb-4 text-[24px] font-semibold text-[#161c25]">4. Limitation of Liability</h2>
						<p>
							ExcelSchool shall not be liable for any indirect, incidental, special, consequential or punitive damages resulting from your use
							or inability to use the service.
						</p>
					</section>

					<section>
						<h2 className="mb-4 text-[24px] font-semibold text-[#161c25]">5. Changes to Terms</h2>
						<p>
							We reserve the right to modify these terms at any time. We will notify users of any material changes via email or through the platform.
						</p>
					</section>
				</div>
			</div>
		</div>
	)
}

export default TermsOfService
