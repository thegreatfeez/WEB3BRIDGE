import { useMemo, useState, type FormEvent } from 'react'
import { mockStaff, mockStudents } from '../data/mockData'

const dates = ['Oct 24, 2025', 'Oct 23, 2026', 'Oct 22, 2025', 'Oct 21, 2026', 'Oct 20, 2025']

const getInitials = (name: string) =>
	name
		.split(' ')
		.filter(Boolean)
		.slice(0, 2)
		.map((part) => part[0])
		.join('')
		.toUpperCase()

function AcademicLedger() {
	const totalPeople = mockStudents.length + mockStaff.length
	const unpaidStudents = mockStudents.filter((student) => student.paymentStatus === 'unpaid').length
	const activeStaff = mockStaff.filter((staff) => staff.status === 'active').length
	const tuitionByLevel = useMemo(
		() => ({
			100: 3000,
			200: 4500,
			300: 5000,
			400: 5600,
			500: 6300,
		}),
		[]
	)

	const baseRows = useMemo(() => {
		const studentRows = mockStudents.map((student, index) => ({
			id: `stu-${index}`,
			entity: student.name,
			category: 'Tuition',
			amount: tuitionByLevel[student.level as keyof typeof tuitionByLevel] ?? 0,
			status: student.paymentStatus === 'paid' ? 'Completed' : 'Pending',
			badge: student.paymentStatus === 'paid' ? 'text-[#1f5fd7]' : 'text-[#c3473c]',
			indicator: student.paymentStatus === 'paid' ? 'bg-[#1f5fd7]' : 'bg-[#c3473c]',
		}))
		const staffRows = mockStaff.map((staff, index) => ({
			id: `staff-${index}`,
			entity: staff.name,
			category: 'Salary',
			amount: staff.salary,
			status: staff.status === 'active' ? 'Completed' : 'Failed',
			badge: staff.status === 'active' ? 'text-[#1f5fd7]' : 'text-[#c3473c]',
			indicator: staff.status === 'active' ? 'bg-[#1f5fd7]' : 'bg-[#c3473c]',
		}))
		return [...studentRows, ...staffRows]
	}, [tuitionByLevel])

	const [entries, setEntries] = useState(baseRows)
	const [isAdding, setIsAdding] = useState(false)
	const [editingId, setEditingId] = useState<string | null>(null)
	const [openMenuId, setOpenMenuId] = useState<string | null>(null)
	const [formState, setFormState] = useState({
		entity: '',
		category: 'Tuition',
		level: '100',
		amount: '',
		status: 'Completed',
	})

	const ledgerRows = entries.slice(0, 5)

	const handleChange = (field: keyof typeof formState, value: string) => {
		setFormState((prev) => ({ ...prev, [field]: value }))
	}

	const resolveAmount = () => {
		if (formState.category === 'Tuition') {
			return tuitionByLevel[Number(formState.level) as keyof typeof tuitionByLevel] ?? 0
		}
		return Number(formState.amount) || 0
	}

	const handleAddEntry = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		if (!formState.entity.trim()) return

		const amount = resolveAmount()
		const status = formState.status
		const isCompleted = status === 'Completed'
		const isPending = status === 'Pending'

		const newEntry = {
			id: `custom-${Date.now()}`,
			entity: formState.entity.trim(),
			category: formState.category,
			amount,
			status,
			badge: isCompleted ? 'text-[#1f5fd7]' : isPending ? 'text-[#d9651f]' : 'text-[#c3473c]',
			indicator: isCompleted ? 'bg-[#1f5fd7]' : isPending ? 'bg-[#d9651f]' : 'bg-[#c3473c]',
		}

		setEntries((prev) => [newEntry, ...prev])
		setFormState({
			entity: '',
			category: 'Tuition',
			level: '100',
			amount: '',
			status: 'Completed',
		})
		setIsAdding(false)
	}

	const startEdit = (id: string) => {
		const entry = entries.find((row) => row.id === id)
		if (!entry) return
		setEditingId(id)
		setIsAdding(false)
		setFormState({
			entity: entry.entity,
			category: entry.category,
			level: '100',
			amount: entry.amount.toString(),
			status: entry.status,
		})
	}

	const handleEditEntry = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		if (!editingId || !formState.entity.trim()) return

		const amount = resolveAmount()
		const status = formState.status
		const isCompleted = status === 'Completed'
		const isPending = status === 'Pending'

		setEntries((prev) =>
			prev.map((row) =>
				row.id === editingId
					? {
							...row,
							entity: formState.entity.trim(),
							category: formState.category,
							amount,
							status,
							badge: isCompleted ? 'text-[#1f5fd7]' : isPending ? 'text-[#d9651f]' : 'text-[#c3473c]',
							indicator: isCompleted ? 'bg-[#1f5fd7]' : isPending ? 'bg-[#d9651f]' : 'bg-[#c3473c]',
						}
					: row
			)
		)
		setEditingId(null)
		setFormState({
			entity: '',
			category: 'Tuition',
			level: '100',
			amount: '',
			status: 'Completed',
		})
	}

	const handleDelete = (id: string) => {
		setEntries((prev) => prev.filter((row) => row.id !== id))
		setOpenMenuId(null)
		if (editingId === id) {
			setEditingId(null)
		}
	}

	return (
		<main className="px-5 py-7 sm:px-9 lg:px-[56px] lg:py-7">
			<div className="max-w-[720px]">
				<h2 className="text-[36px] font-semibold text-[#161c25]">Academic Ledger</h2>
				<p className="mt-3 text-[14px] leading-7 text-[#5b6370]">
					Financial oversight and transaction records for the 2025/26 Academic Session.
				</p>
			</div>

			<div className="mt-10 grid gap-6 lg:grid-cols-3">
				<div className="rounded-2xl border border-[#e5e8ee] bg-white p-6 shadow-sm">
					<p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#1f5fd7]">Total Revenue</p>
					<p className="mt-3 text-[30px] font-semibold text-[#1f2937]">
						${entries.reduce((sum, row) => sum + row.amount, 0).toLocaleString()}
					</p>
					<p className="mt-3 text-[12px] text-[#7b8696]">Based on {totalPeople} active records</p>
				</div>
				<div className="rounded-2xl border border-[#e5e8ee] bg-white p-6 shadow-sm">
					<p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#d03f2f]">Outstanding Dues</p>
					<p className="mt-3 text-[30px] font-semibold text-[#1f2937]">${unpaidStudents.toLocaleString()}</p>
					<p className="mt-3 text-[12px] text-[#7b8696]">{unpaidStudents} students with pending tuition</p>
				</div>
				<div className="rounded-2xl border border-[#e5e8ee] bg-white p-6 shadow-sm">
					<p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#d9651f]">Scholarship Fund</p>
					<p className="mt-3 text-[30px] font-semibold text-[#1f2937]">${activeStaff.toLocaleString()}</p>
					<p className="mt-3 text-[12px] text-[#7b8696]">Allocated for excellence grants</p>
				</div>
			</div>

			<section className="mt-10 rounded-3xl border border-[#e5e8ee] bg-white">
				<div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#edf0f5] px-6 py-5">
					<div className="flex flex-wrap items-center gap-3">
						<button className="rounded-lg border border-[#e2e6ed] bg-white px-4 py-2 text-[13px] font-semibold text-[#1f2937]">
							Last 30 Days
						</button>
						<button className="rounded-lg border border-[#e2e6ed] bg-white px-4 py-2 text-[13px] font-semibold text-[#1f2937]">
							All Categories
						</button>
					</div>
					<div className="flex items-center gap-3">
						<button className="rounded-lg border border-[#e2e6ed] bg-white px-4 py-2 text-[13px] font-semibold text-[#1f2937]">
							Export PDF
						</button>
						<button
							type="button"
							onClick={() => setIsAdding(true)}
							className="rounded-lg bg-[#1f5fd7] px-4 py-2 text-[13px] font-semibold text-white"
						>
							+ New Entry
						</button>
					</div>
				</div>

				{isAdding && (
					<div className="border-b border-[#edf0f5] px-6 py-5">
						<form className="grid gap-4 md:grid-cols-5" onSubmit={handleAddEntry}>
							<label className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#6c7584] md:col-span-2">
								Entity
								<input
									value={formState.entity}
									onChange={(event) => handleChange('entity', event.target.value)}
									className="mt-2 w-full rounded-lg border border-[#e2e6ed] bg-[#f9fafc] px-3 py-2 text-[13px] text-[#1f2937] outline-none"
									placeholder="Name or org"
								/>
							</label>
							<label className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#6c7584]">
								Category
								<select
									value={formState.category}
									onChange={(event) => handleChange('category', event.target.value)}
									className="mt-2 w-full rounded-lg border border-[#e2e6ed] bg-[#f9fafc] px-3 py-2 text-[13px] text-[#1f2937] outline-none"
								>
									<option>Tuition</option>
									<option>Salary</option>
									<option>Grant</option>
									<option>Fee</option>
								</select>
							</label>
							<label className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#6c7584]">
								{formState.category === 'Tuition' ? 'Level' : 'Amount'}
								{formState.category === 'Tuition' ? (
									<select
										value={formState.level}
										onChange={(event) => handleChange('level', event.target.value)}
										className="mt-2 w-full rounded-lg border border-[#e2e6ed] bg-[#f9fafc] px-3 py-2 text-[13px] text-[#1f2937] outline-none"
									>
										<option value="100">100 Level</option>
										<option value="200">200 Level</option>
										<option value="300">300 Level</option>
										<option value="400">400 Level</option>
										<option value="500">500 Level</option>
									</select>
								) : (
									<input
										value={formState.amount}
										onChange={(event) => handleChange('amount', event.target.value)}
										type="number"
										className="mt-2 w-full rounded-lg border border-[#e2e6ed] bg-[#f9fafc] px-3 py-2 text-[13px] text-[#1f2937] outline-none"
										placeholder="0"
									/>
								)}
							</label>
							<label className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#6c7584]">
								Status
								<select
									value={formState.status}
									onChange={(event) => handleChange('status', event.target.value)}
									className="mt-2 w-full rounded-lg border border-[#e2e6ed] bg-[#f9fafc] px-3 py-2 text-[13px] text-[#1f2937] outline-none"
								>
									<option>Completed</option>
									<option>Pending</option>
									<option>Failed</option>
								</select>
							</label>
							<div className="flex items-end gap-2 md:col-span-5">
								<button
									type="submit"
									className="rounded-lg bg-[#1f5fd7] px-5 py-2 text-[13px] font-semibold text-white"
								>
									Save Entry
								</button>
								<button
									type="button"
									onClick={() => setIsAdding(false)}
									className="rounded-lg border border-[#e2e6ed] px-5 py-2 text-[13px] font-semibold text-[#5b6370]"
								>
									Cancel
								</button>
							</div>
						</form>
					</div>
				)}

				{editingId && (
					<div className="border-b border-[#edf0f5] px-6 py-5">
						<form className="grid gap-4 md:grid-cols-5" onSubmit={handleEditEntry}>
							<label className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#6c7584] md:col-span-2">
								Entity
								<input
									value={formState.entity}
									onChange={(event) => handleChange('entity', event.target.value)}
									className="mt-2 w-full rounded-lg border border-[#e2e6ed] bg-[#f9fafc] px-3 py-2 text-[13px] text-[#1f2937] outline-none"
									placeholder="Name or org"
								/>
							</label>
							<label className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#6c7584]">
								Category
								<select
									value={formState.category}
									onChange={(event) => handleChange('category', event.target.value)}
									className="mt-2 w-full rounded-lg border border-[#e2e6ed] bg-[#f9fafc] px-3 py-2 text-[13px] text-[#1f2937] outline-none"
								>
									<option>Tuition</option>
									<option>Salary</option>
									<option>Grant</option>
									<option>Fee</option>
								</select>
							</label>
							<label className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#6c7584]">
								{formState.category === 'Tuition' ? 'Level' : 'Amount'}
								{formState.category === 'Tuition' ? (
									<select
										value={formState.level}
										onChange={(event) => handleChange('level', event.target.value)}
										className="mt-2 w-full rounded-lg border border-[#e2e6ed] bg-[#f9fafc] px-3 py-2 text-[13px] text-[#1f2937] outline-none"
									>
										<option value="100">100 Level</option>
										<option value="200">200 Level</option>
										<option value="300">300 Level</option>
										<option value="400">400 Level</option>
										<option value="500">500 Level</option>
									</select>
								) : (
									<input
										value={formState.amount}
										onChange={(event) => handleChange('amount', event.target.value)}
										type="number"
										className="mt-2 w-full rounded-lg border border-[#e2e6ed] bg-[#f9fafc] px-3 py-2 text-[13px] text-[#1f2937] outline-none"
										placeholder="0"
									/>
								)}
							</label>
							<label className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#6c7584]">
								Status
								<select
									value={formState.status}
									onChange={(event) => handleChange('status', event.target.value)}
									className="mt-2 w-full rounded-lg border border-[#e2e6ed] bg-[#f9fafc] px-3 py-2 text-[13px] text-[#1f2937] outline-none"
								>
									<option>Completed</option>
									<option>Pending</option>
									<option>Failed</option>
								</select>
							</label>
							<div className="flex items-end gap-2 md:col-span-5">
								<button
									type="submit"
									className="rounded-lg bg-[#1f5fd7] px-5 py-2 text-[13px] font-semibold text-white"
								>
									Save Changes
								</button>
								<button
									type="button"
									onClick={() => setEditingId(null)}
									className="rounded-lg border border-[#e2e6ed] px-5 py-2 text-[13px] font-semibold text-[#5b6370]"
								>
									Cancel
								</button>
							</div>
						</form>
					</div>
				)}

				<div className="grid grid-cols-[1fr_1.6fr_1fr_0.9fr_0.9fr_0.5fr] gap-4 border-b border-[#edf0f5] px-6 py-4 text-[12px] font-semibold uppercase tracking-[0.2em] text-[#5b6370]">
					<span>Date</span>
					<span>Entity</span>
					<span>Category</span>
					<span>Amount</span>
					<span>Status</span>
					<span>Actions</span>
				</div>

				<div className="divide-y divide-[#eef1f5] px-6">
					{ledgerRows.map((row, index) => (
						<div
							key={row.id}
							className="grid grid-cols-[1fr_1.6fr_1fr_0.9fr_0.9fr_0.5fr] items-center gap-4 py-5 text-[14px] text-[#1f2937]"
						>
							<span className="text-[#5b6370]">{dates[index] ?? 'Oct 2023'}</span>
							<div className="flex items-center gap-3">
								<div className="grid h-10 w-10 place-items-center rounded-full bg-[#e8edf9] text-[12px] font-semibold text-[#1f5fd7]">
									{getInitials(row.entity)}
								</div>
								<span className="font-semibold">{row.entity}</span>
							</div>
							<span className="inline-flex w-fit rounded-full bg-[#eef1f5] px-3 py-1 text-[12px] font-semibold text-[#3a4c86]">
								{row.category}
							</span>
							<span className="font-semibold">${row.amount.toLocaleString()}</span>
							<span className={`inline-flex items-center gap-2 text-[13px] font-semibold ${row.badge}`}>
								<span className={`h-2 w-2 rounded-full ${row.indicator}`} />
								{row.status}
							</span>
							<div className="relative">
								<button
									type="button"
									onClick={() => setOpenMenuId((prev) => (prev === row.id ? null : row.id))}
									className="grid h-9 w-9 place-items-center rounded-full hover:bg-[#f3f5f7]"
								>
								<svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
									<circle cx="12" cy="5" r="2" />
									<circle cx="12" cy="12" r="2" />
									<circle cx="12" cy="19" r="2" />
								</svg>
								</button>
								{openMenuId === row.id && (
									<div className="absolute right-0 top-11 z-10 w-32 rounded-lg border border-[#e2e6ed] bg-white p-2 shadow-lg">
										<button
											type="button"
											onClick={() => {
												startEdit(row.id)
												setOpenMenuId(null)
											}}
											className="w-full rounded-md px-3 py-2 text-left text-[13px] font-semibold text-[#1f2937] hover:bg-[#f3f5f7]"
										>
											Edit
										</button>
										<button
											type="button"
											onClick={() => handleDelete(row.id)}
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

				<div className="flex flex-col items-start justify-between gap-4 border-t border-[#edf0f5] px-6 py-5 text-[13px] text-[#5b6370] sm:flex-row sm:items-center">
					<span>Showing {ledgerRows.length} of {totalPeople} transactions</span>
					<div className="flex items-center gap-2">
						<button className="grid h-9 w-9 place-items-center rounded-md border border-[#e2e6ed]">
							<svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
								<path d="M15 6l-6 6 6 6" />
							</svg>
						</button>
						<button className="grid h-9 w-9 place-items-center rounded-md bg-[#1f5fd7] text-white">1</button>
						<button className="grid h-9 w-9 place-items-center rounded-md border border-[#e2e6ed]">2</button>
						<button className="grid h-9 w-9 place-items-center rounded-md border border-[#e2e6ed]">3</button>
						<button className="grid h-9 w-9 place-items-center rounded-md border border-[#e2e6ed]">
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

export default AcademicLedger
