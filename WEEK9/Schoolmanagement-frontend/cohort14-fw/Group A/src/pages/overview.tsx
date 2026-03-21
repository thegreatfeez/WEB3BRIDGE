import { studentIcon, staffIcon, walletIcon } from './../components/icons'
import { mockContractBalance, mockStaff, mockStudents } from '../data/mockData'
import { NavLink } from 'react-router-dom'

function Overview() {
	const firstStudent = mockStudents[0]
	const secondStudent = mockStudents[1]
	const firstStaff = mockStaff[0]

	return (
		<main className="px-5 py-7 sm:px-9 lg:px-[56px] lg:py-7">
					<p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#1459d3]">Dashboard</p>
					<h2 className="mt-1.5 text-[50px] font-semibold leading-none tracking-[-0.02em] text-[#161c25]">
						Institutional Overview
					</h2>
					<p className="mt-4 max-w-[780px] text-[13px] leading-8 text-[#4d5562]">
						Manage your academic ecosystem with precision and clarity.
					</p>

					<div className="mt-9 grid gap-5 md:grid-cols-3">
						<article className="rounded-lg border border-[#dde2e9] bg-white px-7 py-8">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#8a919d]">Total Students</p>
									<h3 className="mt-3 text-[48px] font-semibold leading-none text-[#161c25]">
										{mockStudents.length}
									</h3>
									<p className="mt-2 text-[12px] font-semibold text-[#4e88de]">Institutional Growth</p>
								</div>
								<div className="grid h-[60px] w-[60px] place-items-center rounded-lg bg-[#e8f0fe] text-[#4e88de]">
									<img src={studentIcon} alt="Students" className="h-6 w-6" />
								</div>
							</div>
						</article>

						<article className="rounded-lg border border-[#dde2e9] bg-white px-7 py-8">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#8a919d]">Total Staff</p>
									<h3 className="mt-3 text-[48px] font-semibold leading-none text-[#161c25]">
										{mockStaff.length}
									</h3>
									<p className="mt-2 text-[12px] font-semibold text-[#4e88de]">Active Faculty</p>
								</div>
								<div className="grid h-[60px] w-[60px] place-items-center rounded-lg bg-[#e8f0fe] text-[#4e88de]">
									<img src={staffIcon} alt="Staff" className="h-6 w-6" />
								</div>
							</div>
						</article>

						<article className="rounded-lg border border-[#dde2e9] bg-white px-7 py-8">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#8a919d]">Contract Balance</p>
									<h3 className="mt-3 text-[40px] font-semibold leading-none text-[#161c25]">
										{mockContractBalance.toLocaleString('en-US', {
											style: 'currency',
											currency: 'USD',
											maximumFractionDigits: 0,
										})}
									</h3>
									<p className="mt-2 text-[12px] font-semibold text-[#d9651f]">Q4 Projected Revenue</p>
								</div>
								<div className="grid h-[60px] w-[60px] place-items-center rounded-lg bg-[#ffe5d5] text-[#d9651f]">
									<img src={walletIcon} alt="Wallet" className="h-6 w-6" />
								</div>
							</div>
						</article>
					</div>

					<div className="mt-9 grid gap-6 lg:grid-cols-[1fr_280px]">
						<section>
							<div className="mb-5 flex items-center justify-between">
								<h4 className="text-[24px] font-semibold text-[#161c25]">Recent Activity</h4>
								<NavLink to="/ledger" className="text-[14px] font-semibold text-[#4e88de] hover:underline">
									View All Ledger
								</NavLink>
							</div>

							<div className="space-y-3 rounded-lg border border-[#dde2e9] bg-white p-6">
								<div className="flex items-center justify-between border-b border-[#eaedf1] py-4 first:pt-0 last:border-b-0 last:pb-0">
									<div className="flex items-center gap-4">
										<div className="grid h-10 w-10 place-items-center rounded-full bg-[#f0d4b8]">
											<span className="text-[12px] font-bold text-[#a0713a]">
												{firstStudent ? firstStudent.name.slice(0, 2).toUpperCase() : 'ST'}
											</span>
										</div>
										<div>
											<p className="text-[14px] font-semibold text-[#161c25]">
												{firstStudent ? `${firstStudent.name} paid fees` : 'Student paid fees'}
											</p>
											<p className="mt-0.5 text-[12px] text-[#8a919d]">Tuition Receipt #TR-9921 • 2 hours ago</p>
										</div>
									</div>
									<span className="inline-block rounded-full bg-[#e8fff2] px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-[#2d9b6f]">
										Credit
									</span>
								</div>

								<div className="flex items-center justify-between border-b border-[#eaedf1] py-4 first:pt-0 last:border-b-0 last:pb-0">
									<div className="flex items-center gap-4">
										<div className="grid h-10 w-10 place-items-center rounded-full bg-[#d9e4f8]">
											<span className="text-[12px] font-bold text-[#4e88de]">
												{firstStaff ? firstStaff.name.split(' ').slice(0, 2).map((part) => part[0]).join('').toUpperCase() : 'ST'}
											</span>
										</div>
										<div>
											<p className="text-[14px] font-semibold text-[#161c25]">
												{firstStaff ? `${firstStaff.name} updated profile` : 'Staff updated profile'}
											</p>
											<p className="mt-0.5 text-[12px] text-[#8a919d]">Faculty Credential Audit • 5 hours ago</p>
										</div>
									</div>
									<span className="inline-block rounded-full bg-[#e8ebf9] px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-[#7b82d4]">
										System
									</span>
								</div>

								<div className="flex items-center justify-between border-b border-[#eaedf1] py-4 first:pt-0 last:border-b-0 last:pb-0">
									<div className="flex items-center gap-4">
										<div className="grid h-10 w-10 place-items-center rounded-full bg-[#fef0d9]">
											<span className="text-[12px] font-bold text-[#b89a55]">
												{secondStudent ? secondStudent.name.slice(0, 2).toUpperCase() : 'ST'}
											</span>
										</div>
										<div>
											<p className="text-[14px] font-semibold text-[#161c25]">New Student Enrollment</p>
											<p className="mt-0.5 text-[12px] text-[#8a919d]">
												{secondStudent ? `${secondStudent.name} registered` : 'Student registered'} • Yesterday
											</p>
										</div>
									</div>
									<span className="inline-block rounded-full bg-[#fef3e8] px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-[#b89a55]">
										New
									</span>
								</div>
							</div>
						</section>

						<aside>
							<h4 className="mb-5 text-[24px] font-semibold text-[#161c25]">Institutional Actions</h4>

							<div className="space-y-4">
								<NavLink
									to="/students"
									className="w-full rounded-lg bg-[#1457d2] px-6 py-4 flex items-center justify-between text-white font-semibold text-[14px] shadow-[0_4px_8px_rgba(20,87,210,0.28)] transition hover:bg-[#1048b3]"
								>
									<span className="flex items-center gap-2">
										<svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
											<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
										</svg>
										Go to Students
									</span>
									<svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
										<path d="M5 12h14M12 5l7 7-7 7" />
									</svg>
								</NavLink>

								<NavLink
									to="/faculty"
									className="w-full rounded-lg bg-white border border-[#dde2e9] px-6 py-4 flex items-center justify-between text-[#161c25] font-semibold text-[14px] transition hover:bg-[#f8f9fa]"
								>
									<span className="flex items-center gap-2">
										<svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
											<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
											<circle cx="12" cy="7" r="4" />
										</svg>
										Go to Staff
									</span>
									<svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
										<path d="M5 12h14M12 5l7 7-7 7" />
									</svg>
								</NavLink>

								<div className="rounded-lg bg-white border border-[#dde2e9] p-6 text-center">
									<h5 className="text-[14px] font-semibold text-[#d9651f]">Annual Report 2024</h5>
									<p className="mt-2 text-[12px] leading-6 text-[#7d8590]">
										Your institution's performance metrics are ready for review.
									</p>
									<button
										type="button"
										className="mt-4 inline-flex items-center gap-1 text-[13px] font-semibold text-[#d9651f] hover:underline"
									>
										Download PDF
										<svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
											<path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
										</svg>
									</button>
								</div>
							</div>
						</aside>
					</div>
		</main>
	)
}

export default Overview
