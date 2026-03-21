function PrivacyPolicy() {
	return (
		<div className="min-h-screen bg-white">
			<div className="mx-auto max-w-[900px] px-5 py-16 lg:px-10">
				<h1 className="mb-8 text-[36px] font-bold text-[#161c25]">Privacy Policy</h1>
				<p className="mb-6 text-[14px] text-neutral-500">Last updated: {new Date().toLocaleDateString()}</p>

				<div className="space-y-8 text-[15px] leading-relaxed text-neutral-700">
					<section>
						<h2 className="mb-4 text-[24px] font-semibold text-[#161c25]">1. Information We Collect</h2>
						<p className="mb-3">We collect information that you provide directly to us, including:</p>
						<ul className="ml-6 list-disc space-y-2">
							<li>Account information (email, name, institution details)</li>
							<li>Wallet addresses for blockchain transactions</li>
							<li>Usage data and analytics</li>
							<li>Communication preferences</li>
						</ul>
					</section>

					<section>
						<h2 className="mb-4 text-[24px] font-semibold text-[#161c25]">2. How We Use Your Information</h2>
						<p className="mb-3">We use the information we collect to:</p>
						<ul className="ml-6 list-disc space-y-2">
							<li>Provide, maintain, and improve our services</li>
							<li>Process transactions and send related information</li>
							<li>Send technical notices and support messages</li>
							<li>Respond to your comments and questions</li>
							<li>Protect against fraudulent or illegal activity</li>
						</ul>
					</section>

					<section>
						<h2 className="mb-4 text-[24px] font-semibold text-[#161c25]">3. Data Security</h2>
						<p>
							We implement appropriate technical and organizational measures to protect your personal data. However, no method of transmission
							over the Internet is 100% secure, and we cannot guarantee absolute security.
						</p>
					</section>

					<section>
						<h2 className="mb-4 text-[24px] font-semibold text-[#161c25]">4. Blockchain Data</h2>
						<p>
							Please note that data stored on the blockchain is public and immutable. We cannot delete or modify blockchain records once they
							are confirmed on the network.
						</p>
					</section>

					<section>
						<h2 className="mb-4 text-[24px] font-semibold text-[#161c25]">5. Your Rights</h2>
						<p className="mb-3">You have the right to:</p>
						<ul className="ml-6 list-disc space-y-2">
							<li>Access your personal data</li>
							<li>Correct inaccurate data</li>
							<li>Request deletion of your data (subject to legal requirements)</li>
							<li>Object to processing of your data</li>
							<li>Export your data</li>
						</ul>
					</section>

					<section>
						<h2 className="mb-4 text-[24px] font-semibold text-[#161c25]">6. Contact Us</h2>
						<p>
							If you have any questions about this Privacy Policy, please contact us at{' '}
							<a href="mailto:privacy@excelschool.io" className="text-[#1457d2] underline">
								privacy@excelschool.io
							</a>
						</p>
					</section>
				</div>
			</div>
		</div>
	)
}

export default PrivacyPolicy
