function SmartContracts() {
	const contracts = [
		{
			name: 'Student Registry Contract',
			address: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
			network: 'Ethereum Mainnet',
			description: 'Manages student enrollment and academic records on-chain',
		},
		{
			name: 'Payment Processing Contract',
			address: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
			network: 'Polygon',
			description: 'Handles tuition payments and financial transactions',
		},
		{
			name: 'Credential Verification Contract',
			address: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
			network: 'Ethereum Mainnet',
			description: 'Issues and verifies academic credentials and certificates',
		},
	]

	return (
		<div className="min-h-screen bg-white">
			<div className="bg-gradient-to-br from-[#1457d2] to-[#0f3d9e] py-16 text-white">
				<div className="mx-auto max-w-[1280px] px-5 lg:px-10">
					<h1 className="mb-4 text-[36px] font-bold">Smart Contracts</h1>
					<p className="text-[16px] text-neutral-200">
						Explore ExcelSchool's blockchain infrastructure and smart contract addresses
					</p>
				</div>
			</div>

			<div className="mx-auto max-w-[1280px] px-5 py-16 lg:px-10">
				<div className="mb-12">
					<h2 className="mb-4 text-[24px] font-semibold text-[#161c25]">Deployed Contracts</h2>
					<p className="text-[15px] text-neutral-600">
						All ExcelSchool smart contracts are open-source and verified on blockchain explorers
					</p>
				</div>

				<div className="space-y-6">
					{contracts.map((contract) => (
						<div key={contract.name} className="rounded-xl border border-neutral-200 p-6 shadow-sm">
							<div className="mb-4 flex items-start justify-between">
								<div>
									<h3 className="mb-1 text-[18px] font-semibold text-[#161c25]">{contract.name}</h3>
									<span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-[12px] font-medium text-green-700">
										<span className="h-2 w-2 rounded-full bg-green-500" />
										{contract.network}
									</span>
								</div>
							</div>

							<p className="mb-4 text-[14px] text-neutral-600">{contract.description}</p>

							<div className="rounded-lg bg-neutral-50 p-4">
								<p className="mb-1 text-[12px] font-medium uppercase tracking-wide text-neutral-500">Contract Address</p>
								<div className="flex items-center gap-2">
									<code className="flex-1 font-mono text-[14px] text-[#161c25]">{contract.address}</code>
									<button
										type="button"
										className="rounded-lg border border-neutral-200 bg-white px-3 py-2 text-[13px] font-medium text-neutral-700 transition hover:bg-neutral-50"
									>
										Copy
									</button>
									<a
										href={`https://etherscan.io/address/${contract.address}`}
										target="_blank"
										rel="noopener noreferrer"
										className="rounded-lg border border-neutral-200 bg-white px-3 py-2 text-[13px] font-medium text-neutral-700 transition hover:bg-neutral-50"
									>
										View on Explorer
									</a>
								</div>
							</div>
						</div>
					))}
				</div>

				<div className="mt-12 rounded-xl border border-[#1457d2]/20 bg-[#1457d2]/5 p-8">
					<h3 className="mb-2 text-[20px] font-semibold text-[#161c25]">Developer Resources</h3>
					<p className="mb-4 text-[15px] text-neutral-600">
						Access our GitHub repository for contract source code, ABIs, and integration examples
					</p>
					<a
						href="https://github.com/excelschool"
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center gap-2 rounded-lg bg-[#1457d2] px-6 py-3 text-[15px] font-semibold text-white transition hover:bg-[#0f3d9e]"
					>
						<svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
							<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
						</svg>
						View on GitHub
					</a>
				</div>
			</div>
		</div>
	)
}

export default SmartContracts
