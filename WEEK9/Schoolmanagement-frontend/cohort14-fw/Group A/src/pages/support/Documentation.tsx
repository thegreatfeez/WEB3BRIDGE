function Documentation() {
	const sections = [
		{
			title: 'Platform Overview',
			description: 'Learn about ExcelSchool\'s core features and capabilities',
			icon: '📚',
		},
		{
			title: 'Student Registry',
			description: 'Complete guide to managing student records and enrollment',
			icon: '👥',
		},
		{
			title: 'Faculty Portal',
			description: 'Tools and features for faculty management',
			icon: '🎓',
		},
		{
			title: 'Claims & Billing',
			description: 'Payment processing and financial management',
			icon: '💳',
		},
		{
			title: 'Smart Contracts',
			description: 'Understanding blockchain integration and smart contracts',
			icon: '⛓️',
		},
		{
			title: 'API Reference',
			description: 'Developer documentation for platform integration',
			icon: '🔧',
		},
	]

	return (
		<div className="min-h-screen bg-white">
			<div className="bg-gradient-to-br from-[#1457d2] to-[#0f3d9e] py-16 text-white">
				<div className="mx-auto max-w-[1280px] px-5 lg:px-10">
					<h1 className="mb-4 text-[36px] font-bold">Documentation</h1>
					<p className="text-[16px] text-neutral-200">Comprehensive guides and references for using ExcelSchool</p>
				</div>
			</div>

			<div className="mx-auto max-w-[1280px] px-5 py-16 lg:px-10">
				<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
					{sections.map((section) => (
						<a
							key={section.title}
							href="#"
							className="group rounded-xl border border-neutral-200 p-6 transition hover:border-[#1457d2] hover:shadow-lg"
						>
							<div className="mb-4 text-[32px]">{section.icon}</div>
							<h3 className="mb-2 text-[18px] font-semibold text-[#161c25] group-hover:text-[#1457d2]">
								{section.title}
							</h3>
							<p className="text-[14px] text-neutral-600">{section.description}</p>
							<div className="mt-4 flex items-center gap-2 text-[14px] font-medium text-[#1457d2]">
								Read more
								<svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
									<path d="M5 12h14M12 5l7 7-7 7" />
								</svg>
							</div>
						</a>
					))}
				</div>
			</div>
		</div>
	)
}

export default Documentation
