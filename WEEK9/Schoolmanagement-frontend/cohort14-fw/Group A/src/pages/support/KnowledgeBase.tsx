import { useState } from 'react'

const categories = [
	{
		title: 'Getting Started',
		articles: [
			{ title: 'How to create an account', link: '#' },
			{ title: 'Connecting your wallet', link: '#' },
			{ title: 'Platform overview', link: '#' },
			{ title: 'First steps guide', link: '#' },
		],
	},
	{
		title: 'Student Management',
		articles: [
			{ title: 'Registering new students', link: '#' },
			{ title: 'Managing student records', link: '#' },
			{ title: 'Bulk import students', link: '#' },
			{ title: 'Student verification', link: '#' },
		],
	},
	{
		title: 'Payments & Billing',
		articles: [
			{ title: 'Processing tuition payments', link: '#' },
			{ title: 'Setting up payment plans', link: '#' },
			{ title: 'Refund procedures', link: '#' },
			{ title: 'Transaction history', link: '#' },
		],
	},
	{
		title: 'Blockchain & Security',
		articles: [
			{ title: 'Understanding blockchain records', link: '#' },
			{ title: 'Smart contract interactions', link: '#' },
			{ title: 'Security best practices', link: '#' },
			{ title: 'Wallet management', link: '#' },
		],
	},
]

function KnowledgeBase() {
	const [searchQuery, setSearchQuery] = useState('')

	return (
		<div className="min-h-screen bg-[#f8f9fb]">
			<div className="bg-gradient-to-br from-[#1457d2] to-[#0f3d9e] py-16 text-white">
				<div className="mx-auto max-w-[1280px] px-5 lg:px-10">
					<h1 className="mb-4 text-[36px] font-bold">Knowledge Base</h1>
					<p className="mb-8 text-[16px] text-neutral-200">Find answers to common questions and learn how to use ExcelSchool</p>
					
					<div className="relative max-w-[600px]">
						<input
							type="text"
							placeholder="Search for articles..."
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							className="w-full rounded-lg border-0 px-5 py-4 text-[15px] text-neutral-800 shadow-lg focus:outline-none focus:ring-2 focus:ring-white/50"
						/>
						<svg viewBox="0 0 24 24" className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-400" fill="none" stroke="currentColor" strokeWidth="2">
							<circle cx="11" cy="11" r="8" />
							<path d="m21 21-4.35-4.35" />
						</svg>
					</div>
				</div>
			</div>

			<div className="mx-auto max-w-[1280px] px-5 py-16 lg:px-10">
				<div className="grid gap-8 md:grid-cols-2">
					{categories.map((category) => (
						<div key={category.title} className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
							<h2 className="mb-4 text-[20px] font-semibold text-[#161c25]">{category.title}</h2>
							<ul className="space-y-3">
								{category.articles.map((article) => (
									<li key={article.title}>
										<a
											href={article.link}
											className="flex items-center gap-2 text-[15px] text-neutral-600 transition hover:text-[#1457d2]"
										>
											<svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2">
												<path d="M9 18l6-6-6-6" />
											</svg>
											{article.title}
										</a>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>

				<div className="mt-12 rounded-xl border border-[#1457d2]/20 bg-[#1457d2]/5 p-8 text-center">
					<h3 className="mb-2 text-[20px] font-semibold text-[#161c25]">Can't find what you're looking for?</h3>
					<p className="mb-4 text-[15px] text-neutral-600">Our support team is here to help</p>
					<a
						href="mailto:support@excelschool.io"
						className="inline-flex items-center gap-2 rounded-lg bg-[#1457d2] px-6 py-3 text-[15px] font-semibold text-white transition hover:bg-[#0f3d9e]"
					>
						Contact Support
					</a>
				</div>
			</div>
		</div>
	)
}

export default KnowledgeBase
