function APIReference() {
	const endpoints = [
		{
			method: 'GET',
			path: '/api/students',
			description: 'Retrieve list of students',
		},
		{
			method: 'POST',
			path: '/api/students',
			description: 'Register a new student',
		},
		{
			method: 'GET',
			path: '/api/faculty',
			description: 'Get faculty members',
		},
		{
			method: 'POST',
			path: '/api/payments',
			description: 'Process payment transaction',
		},
	]

	return (
		<div className="min-h-screen bg-white">
			<div className="bg-gradient-to-br from-[#1457d2] to-[#0f3d9e] py-16 text-white">
				<div className="mx-auto max-w-[1280px] px-5 lg:px-10">
					<h1 className="mb-4 text-[36px] font-bold">API Reference</h1>
					<p className="text-[16px] text-neutral-200">
						RESTful API documentation for ExcelSchool platform integration
					</p>
				</div>
			</div>

			<div className="mx-auto max-w-[1280px] px-5 py-16 lg:px-10">
				<div className="mb-12">
					<h2 className="mb-4 text-[24px] font-semibold text-[#161c25]">Authentication</h2>
					<p className="mb-4 text-[15px] text-neutral-600">
						All API requests require authentication using an API key in the header
					</p>
					<div className="rounded-lg bg-neutral-900 p-4">
						<code className="text-[14px] text-green-400">
							Authorization: Bearer YOUR_API_KEY
						</code>
					</div>
				</div>

				<div className="space-y-6">
					<h2 className="text-[24px] font-semibold text-[#161c25]">Endpoints</h2>
					{endpoints.map((endpoint) => (
						<div key={endpoint.path} className="rounded-xl border border-neutral-200 p-6">
							<div className="mb-3 flex items-center gap-3">
								<span
									className={`rounded px-2 py-1 text-[12px] font-bold ${
										endpoint.method === 'GET'
											? 'bg-blue-100 text-blue-700'
											: 'bg-green-100 text-green-700'
									}`}
								>
									{endpoint.method}
								</span>
								<code className="text-[15px] font-medium text-[#161c25]">{endpoint.path}</code>
							</div>
							<p className="text-[14px] text-neutral-600">{endpoint.description}</p>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default APIReference
