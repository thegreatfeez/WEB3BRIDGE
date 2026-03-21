import { useMemo, useState, type FormEvent } from 'react'
import { mockStudents } from '../data/mockData'

type Student = {
	id: number
	name: string
	level: number
	age: number
	paymentStatus: 'paid' | 'unpaid'
	wallet: string
	email: string
}

function StudentRegistry() {
	const [students, setStudents] = useState<Student[]>(
		mockStudents.map((student) => ({
			...student,
			email: `${student.name.toLowerCase().replace(/\s+/g, '.')}@excelschool.edu`,
			paymentStatus: (student.paymentStatus === 'paid' ? 'paid' : 'unpaid') as 'paid' | 'unpaid',
		}))
	)
	const [isAdding, setIsAdding] = useState(false)
	const [editingId, setEditingId] = useState<number | null>(null)
	const [openMenuId, setOpenMenuId] = useState<number | null>(null)
	const [formState, setFormState] = useState({
		name: '',
		email: '',
		level: '100',
		age: '',
		wallet: '',
		paymentStatus: 'paid',
	})
	const [searchTerm, setSearchTerm] = useState('')
	const [levelFilter, setLevelFilter] = useState('all')
	const [statusFilter, setStatusFilter] = useState('all')

	const filteredStudents = useMemo(() => {
		return students.filter((student) => {
			const matchesSearch =
				student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
				student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
				student.wallet.toLowerCase().includes(searchTerm.toLowerCase()) ||
				`${student.id}`.includes(searchTerm.trim())

			const matchesLevel =
				levelFilter === 'all' ? true : student.level === Number(levelFilter)

			const matchesStatus =
				statusFilter === 'all' ? true : student.paymentStatus === statusFilter

			return matchesSearch && matchesLevel && matchesStatus
		})
	}, [students, searchTerm, levelFilter, statusFilter])

	const totalStudents = students.length
	const visibleStudents = filteredStudents.length

	const handleChange = (field: keyof typeof formState, value: string) => {
		setFormState((prev) => ({ ...prev, [field]: value }))
	}

	const handleAddStudent = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		if (!formState.name.trim() || !formState.wallet.trim() || !formState.age.trim()) {
			return
		}

		const nextId = students.length ? Math.max(...students.map((student) => student.id)) + 1 : 0
		const email =
			formState.email.trim() ||
			`${formState.name.toLowerCase().replace(/\s+/g, '.')}@excelschool.edu`

		const newStudent: Student = {
			id: nextId,
			name: formState.name.trim(),
			email,
			level: Number(formState.level),
			age: Number(formState.age),
			paymentStatus: formState.paymentStatus === 'paid' ? 'paid' : 'unpaid',
			wallet: formState.wallet.trim(),
		}

		setStudents((prev) => [newStudent, ...prev])
		setFormState({
			name: '',
			email: '',
			level: '100',
			age: '',
			wallet: '',
			paymentStatus: 'paid',
		})
		setIsAdding(false)
	}

	const startEdit = (student: Student) => {
		setEditingId(student.id)
		setIsAdding(false)
		setFormState({
			name: student.name,
			email: student.email,
			level: student.level.toString(),
			age: student.age.toString(),
			wallet: student.wallet,
			paymentStatus: student.paymentStatus,
		})
	}

	const handleEditStudent = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		if (editingId === null || !formState.name.trim() || !formState.wallet.trim() || !formState.age.trim()) {
			return
		}

		setStudents((prev) =>
			prev.map((student) =>
				student.id === editingId
					? {
							...student,
							name: formState.name.trim(),
							email:
								formState.email.trim() ||
								`${formState.name.toLowerCase().replace(/\s+/g, '.')}@excelschool.edu`,
							level: Number(formState.level),
							age: Number(formState.age),
							wallet: formState.wallet.trim(),
							paymentStatus: formState.paymentStatus === 'paid' ? 'paid' : 'unpaid',
						}
					: student
			)
		)

		setEditingId(null)
		setFormState({
			name: '',
			email: '',
			level: '100',
			age: '',
			wallet: '',
			paymentStatus: 'paid',
		})
	}

	const handleDeleteStudent = (id: number) => {
		setStudents((prev) => prev.filter((student) => student.id !== id))
		setOpenMenuId(null)
		if (editingId === id) {
			setEditingId(null)
		}
	}

	return (
		<main className="px-5 py-7 sm:px-9 lg:px-[56px] lg:py-7">
			<div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
				<div className="max-w-[720px]">
					<h2 className="text-[44px] font-semibold leading-none text-[#161c25]">Student Registry</h2>
					<p className="mt-4 text-[14px] leading-7 text-[#5b6370]">
						The central ledger of academic standing, financial compliance, and institutional identity for the
						current session.
					</p>
				</div>
				<button
					type="button"
					onClick={() => setIsAdding(true)}
					className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#1f5fd7] px-6 py-4 text-[15px] font-semibold text-white shadow-[0_10px_20px_rgba(31,95,215,0.22)] transition hover:bg-[#1a52be]"
				>
					<span className="grid h-8 w-8 place-items-center rounded-full bg-white/20">
						<svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
							<path d="M12 5v14M5 12h14" />
						</svg>
					</span>
					+ Add Student
				</button>
			</div>

			{(isAdding || editingId !== null) && (
				<div className="mt-8 rounded-2xl border border-[#dfe3ea] bg-white p-6">
					<div className="flex items-center justify-between">
						<h3 className="text-[18px] font-semibold text-[#161c25]">
							{editingId !== null ? 'Edit Student' : 'Add New Student'}
						</h3>
						<button
							type="button"
							onClick={() => {
								setIsAdding(false)
								setEditingId(null)
							}}
							className="text-[13px] font-semibold text-[#7b8696] hover:text-[#1f2937]"
						>
							Close
						</button>
					</div>
					<form
						className="mt-5 grid gap-4 md:grid-cols-2"
						onSubmit={editingId !== null ? handleEditStudent : handleAddStudent}
					>
						<label className="text-[12px] font-semibold uppercase tracking-[0.15em] text-[#7b8696]">
							Full Name
							<input
								value={formState.name}
								onChange={(event) => handleChange('name', event.target.value)}
								className="mt-2 w-full rounded-lg border border-[#e2e6ed] bg-[#f9fafc] px-4 py-3 text-[14px] text-[#1f2937] outline-none focus:border-[#1f5fd7]"
								placeholder="e.g. Aisha Bello"
							/>
						</label>
						<label className="text-[12px] font-semibold uppercase tracking-[0.15em] text-[#7b8696]">
							Email
							<input
								value={formState.email}
								onChange={(event) => handleChange('email', event.target.value)}
								className="mt-2 w-full rounded-lg border border-[#e2e6ed] bg-[#f9fafc] px-4 py-3 text-[14px] text-[#1f2937] outline-none focus:border-[#1f5fd7]"
								placeholder="name@excelschool.edu"
							/>
						</label>
						<label className="text-[12px] font-semibold uppercase tracking-[0.15em] text-[#7b8696]">
							Level
							<select
								value={formState.level}
								onChange={(event) => handleChange('level', event.target.value)}
								className="mt-2 w-full rounded-lg border border-[#e2e6ed] bg-[#f9fafc] px-4 py-3 text-[14px] text-[#1f2937] outline-none focus:border-[#1f5fd7]"
							>
								<option value="100">100</option>
								<option value="200">200</option>
								<option value="300">300</option>
								<option value="400">400</option>
								<option value="500">500</option>
							</select>
						</label>
						<label className="text-[12px] font-semibold uppercase tracking-[0.15em] text-[#7b8696]">
							Age
							<input
								value={formState.age}
								onChange={(event) => handleChange('age', event.target.value)}
								type="number"
								className="mt-2 w-full rounded-lg border border-[#e2e6ed] bg-[#f9fafc] px-4 py-3 text-[14px] text-[#1f2937] outline-none focus:border-[#1f5fd7]"
								placeholder="18"
							/>
						</label>
						<label className="text-[12px] font-semibold uppercase tracking-[0.15em] text-[#7b8696] md:col-span-2">
							Wallet Address
							<input
								value={formState.wallet}
								onChange={(event) => handleChange('wallet', event.target.value)}
								className="mt-2 w-full rounded-lg border border-[#e2e6ed] bg-[#f9fafc] px-4 py-3 text-[14px] text-[#1f2937] outline-none focus:border-[#1f5fd7]"
								placeholder="0x..."
							/>
						</label>
						<label className="text-[12px] font-semibold uppercase tracking-[0.15em] text-[#7b8696]">
							Payment Status
							<select
								value={formState.paymentStatus}
								onChange={(event) => handleChange('paymentStatus', event.target.value)}
								className="mt-2 w-full rounded-lg border border-[#e2e6ed] bg-[#f9fafc] px-4 py-3 text-[14px] text-[#1f2937] outline-none focus:border-[#1f5fd7]"
							>
								<option value="paid">Paid</option>
								<option value="unpaid">Unpaid</option>
							</select>
						</label>
						<div className="flex items-end gap-3 md:col-span-2">
							<button
								type="submit"
								className="rounded-lg bg-[#1f5fd7] px-6 py-3 text-[14px] font-semibold text-white transition hover:bg-[#1a52be]"
							>
								{editingId !== null ? 'Save Changes' : 'Save Student'}
							</button>
							<button
								type="button"
								onClick={() => {
									setIsAdding(false)
									setEditingId(null)
								}}
								className="rounded-lg border border-[#dde2e9] px-6 py-3 text-[14px] font-semibold text-[#5b6370] transition hover:bg-[#f1f3f6]"
							>
								Cancel
							</button>
						</div>
					</form>
				</div>
			)}

			<div className="mt-10 rounded-2xl bg-[#f3f5f7] p-6">
				<div className="flex flex-col gap-4 lg:flex-row lg:items-center">
					<div className="flex flex-1 items-center gap-3 rounded-xl bg-white px-4 py-3 text-[#7b8696]">
						<svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
							<circle cx="11" cy="11" r="7" />
							<line x1="16.65" y1="16.65" x2="21" y2="21" />
						</svg>
						<input
							value={searchTerm}
							onChange={(event) => setSearchTerm(event.target.value)}
							placeholder="Search by name, ID or wallet..."
							className="w-full bg-transparent text-[14px] text-[#1f2937] outline-none"
						/>
					</div>
					<label className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-[14px] font-semibold text-[#1f2937]">
						<svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
							<path d="M3 7h18M6 12h12M10 17h4" />
						</svg>
						<select
							value={levelFilter}
							onChange={(event) => setLevelFilter(event.target.value)}
							className="bg-transparent text-[14px] font-semibold text-[#1f2937] outline-none"
						>
							<option value="all">Level</option>
							<option value="100">Level 100</option>
							<option value="200">Level 200</option>
							<option value="300">Level 300</option>
							<option value="400">Level 400</option>
							<option value="500">Level 500</option>
						</select>
					</label>
					<label className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-[14px] font-semibold text-[#1f2937]">
						<svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
							<rect x="3" y="6" width="18" height="12" rx="2" />
							<circle cx="7.5" cy="12" r="1.5" />
							<path d="M13 12h6" />
						</svg>
						<select
							value={statusFilter}
							onChange={(event) => setStatusFilter(event.target.value)}
							className="bg-transparent text-[14px] font-semibold text-[#1f2937] outline-none"
						>
							<option value="all">Payment Status</option>
							<option value="paid">Paid</option>
							<option value="unpaid">Unpaid</option>
						</select>
					</label>
				</div>
			</div>

			<section className="mt-10 rounded-3xl border border-[#e5e8ee] bg-white px-6 py-6">
				<div className="grid grid-cols-[2fr_1fr_0.6fr_1.4fr_0.8fr_0.4fr] gap-4 border-b border-[#e8ecf2] pb-4 text-[12px] font-semibold uppercase tracking-[0.18em] text-[#596171]">
					<span>Student</span>
					<span>ID / Level</span>
					<span>Age</span>
					<span>Wallet Address</span>
					<span>Status</span>
					<span>Actions</span>
				</div>

				<div className="divide-y divide-[#eef1f5]">
					{filteredStudents.map((student) => (
						<div
							key={student.id}
							className="grid grid-cols-[2fr_1fr_0.6fr_1.4fr_0.8fr_0.4fr] items-center gap-4 py-5 text-[14px] text-[#1f2937]"
						>
							<div className="flex items-center gap-3">
								<div className="grid h-12 w-12 place-items-center rounded-full bg-[#f0d7c2] text-[14px] font-semibold text-[#8c5a2d]">
									{student.name
										.split(' ')
										.slice(0, 2)
										.map((part) => part[0])
										.join('')
										.toUpperCase()}
								</div>
								<div>
									<p className="font-semibold text-[#1f2937]">{student.name}</p>
									<p className="text-[12px] text-[#6c7584]">{student.email}</p>
								</div>
							</div>
							<div>
								<p className="font-semibold text-[#1f5fd7]">#{student.id}</p>
								<span className="mt-2 inline-flex rounded-full bg-[#e8edf9] px-3 py-1 text-[12px] font-semibold text-[#3a4c86]">
									Level {student.level}
								</span>
							</div>
							<span className="text-[15px] font-semibold">{student.age}</span>
							<span className="inline-flex w-fit rounded-md bg-[#f2f4f7] px-3 py-2 text-[12px] font-semibold text-[#5b6370]">
								{student.wallet}
							</span>
							<span
								className={`inline-flex w-fit items-center gap-2 rounded-full px-3 py-1 text-[12px] font-semibold ${
									student.paymentStatus === 'paid'
										? 'bg-[#e9f9ef] text-[#1f8f4e]'
										: 'bg-[#fde9e6] text-[#c3473c]'
								}`}
							>
								<span
									className={`h-2 w-2 rounded-full ${
										student.paymentStatus === 'paid' ? 'bg-[#1f8f4e]' : 'bg-[#c3473c]'
									}`}
								/>
								{student.paymentStatus.toUpperCase()}
							</span>
							<div className="relative">
								<button
									type="button"
									onClick={() => setOpenMenuId((prev) => (prev === student.id ? null : student.id))}
									className="grid h-10 w-10 place-items-center rounded-full hover:bg-[#f3f5f7]"
								>
									<svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
										<circle cx="12" cy="5" r="2" />
										<circle cx="12" cy="12" r="2" />
										<circle cx="12" cy="19" r="2" />
									</svg>
								</button>
								{openMenuId === student.id && (
									<div className="absolute right-0 top-11 z-10 w-32 rounded-lg border border-[#e2e6ed] bg-white p-2 shadow-lg">
										<button
											type="button"
											onClick={() => {
												startEdit(student)
												setOpenMenuId(null)
											}}
											className="w-full rounded-md px-3 py-2 text-left text-[13px] font-semibold text-[#1f2937] hover:bg-[#f3f5f7]"
										>
											Edit
										</button>
										<button
											type="button"
											onClick={() => handleDeleteStudent(student.id)}
											className="w-full rounded-md px-3 py-2 text-left text-[13px] font-semibold text-[#c3473c] hover:bg-[#fbecec]"
										>
											Delete
										</button>
									</div>
								)}
							</div>
						</div>
					))}
				</div>

				<div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between text-[14px] text-[#6c7584]">
					<span>Showing {visibleStudents} of {totalStudents} students</span>
					<div className="flex items-center gap-3">
						<button type="button" className="grid h-10 w-10 place-items-center rounded-full border border-[#e1e6ee]">
							<svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
								<path d="M15 6l-6 6 6 6" />
							</svg>
						</button>
						<button type="button" className="grid h-10 w-10 place-items-center rounded-xl bg-[#1f5fd7] text-white">
							1
						</button>
						<button type="button" className="grid h-10 w-10 place-items-center rounded-xl text-[#1f2937]">
							2
						</button>
						<button type="button" className="grid h-10 w-10 place-items-center rounded-xl text-[#1f2937]">
							3
						</button>
						<button type="button" className="grid h-10 w-10 place-items-center rounded-full border border-[#e1e6ee]">
							<svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
								<path d="M9 6l6 6-6 6" />
							</svg>
						</button>
					</div>
				</div>
			</section>
		</main>
	)
}

export default StudentRegistry
