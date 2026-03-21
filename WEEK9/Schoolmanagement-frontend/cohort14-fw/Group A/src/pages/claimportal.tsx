import {
	approveIcon,
	dropIcon,
	staffIcon,
	studentIcon,
} from './../components/icons'

function ClaimPortal() {
	return (
		<main className="px-5 py-7 sm:px-9 lg:px-[56px] lg:py-7">
					<p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#1459d3]">Institutional Portal</p>
					<h2 className="mt-1.5 text-[50px] font-semibold leading-none tracking-[-0.02em] text-[#161c25]">Claim Portal</h2>
					<p className="mt-4 max-w-[780px] text-[13px] leading-8 text-[#4d5562]">
						Securely access your academic grants and institutional tokens. Follow the verified multi-step process to
						authorize your identity.
					</p>

					<div className="mt-9 flex items-center gap-4">
						<div className="h-2 flex-1 rounded-full bg-[#d5d9de]">
							<div className="h-2 w-[33%] rounded-full bg-[#1458d7]" />
						</div>
						<span className="text-[14px] font-semibold text-[#1458d7]">Step 1 of 3</span>
					</div>

					<section className="mt-11 rounded-lg border border-[#dde2e9] bg-[#f3f5f8] p-7">
						<div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
							<div className="flex items-center gap-8">
								<div className="grid h-[78px] w-[78px] place-items-center rounded-xl bg-[#d6dfed] text-[#1554d1]">
									<img src={dropIcon} alt="Drop" className="h-6 w-6" />
								</div>

								<div>
									<h3 className="text-[39px] font-semibold leading-none text-[#1f232b]">Claim Faucet Tokens</h3>
									<p className="mt-2 max-w-[560px] text-[13px] leading-8 text-[#4f5663]">
										Initialize your wallet with institutional test tokens required for claim verification fees.
									</p>
									<a
										href="https://cloud.google.com/application/web3/faucet/ethereum/sepolia"
										target="_blank"
										rel="noreferrer"
										className="mt-4 inline-flex rounded-md bg-[#1457d2] px-8 py-2.5 text-[14px] font-semibold text-white shadow-[0_4px_8px_rgba(20,87,210,0.28)] transition hover:bg-[#1048b3]"
									>
										Claim Tokens
									</a>
								</div>
							</div>

							<div className="h-[122px] w-full rounded bg-gradient-to-r from-[#8d9198] via-[#c3c8ce] to-[#8d9198] md:w-[154px]" />
						</div>
					</section>

					<section className="mt-9 grid gap-6 md:grid-cols-2">
						<article className="rounded-lg border border-[#dfe4ea] bg-[#f3f5f8] px-6 py-8 text-center">
							<div className="mx-auto grid h-[64px] w-[64px] place-items-center rounded-xl bg-[#e2e5ea] text-[#8e949e]">
								<img src={studentIcon} alt="Student Portal" className="h-6 w-6" />
							</div>
							<h4 className="mt-5 text-[30px] font-semibold leading-none text-[#616875]">I'm a Student</h4>
							<p className="mx-auto mt-3 max-w-[360px] text-[13px] leading-8 text-[#9197a2]">
								Claims require an active Student ID and a one-time verification fee.
							</p>
						</article>

						<article className="rounded-lg border border-[#dfe4ea] bg-[#f3f5f8] px-6 py-8 text-center">
							<div className="mx-auto grid h-[64px] w-[64px] place-items-center rounded-xl bg-[#e2e5ea] text-[#8e949e]">
								<img src={staffIcon} alt="Staff Portal" className="h-5 w-5" />
							</div>
							<h4 className="mt-5 text-[30px] font-semibold leading-none text-[#616875]">I'm Staff</h4>
							<p className="mx-auto mt-3 max-w-[360px] text-[13px] leading-8 text-[#9197a2]">
								Faculty claims are instantly verified against the payroll ledger.
							</p>
						</article>
					</section>

					<section className="mt-7 rounded-lg border border-[#dfe4ea] bg-[#f3f5f8] p-8">
						<div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
							<div className="flex-1">
								<h5 className="flex items-center gap-3 text-[35px] font-semibold leading-none text-[#6b717a]">
									<span className="grid h-8 w-8 place-items-center rounded-full border-2 border-[#4e88de] text-[13px] font-semibold text-[#4e88de]">
										3
									</span>
									Verify Institutional Identity
								</h5>

								<label htmlFor="student-id" className="mt-7 block text-[13px] font-semibold uppercase tracking-wide text-[#7b818c]">
									Student ID Number
								</label>
								<input
									id="student-id"
									type="text"
									placeholder="e.g., EXCEL-2024-XXXX"
									className="mt-2 w-full rounded-md border border-[#e5e7eb] bg-[#e6e8eb] px-5 py-4 text-[15px] text-[#9aa0ab] outline-none placeholder:text-[#9aa0ab]"
								/>

								<div className="mt-5 flex items-start gap-3 rounded-md border border-[#f0cfbd] bg-[#f7e0d5] px-4 py-3 text-[13px] leading-6 text-[#b37457]">
									<svg viewBox="0 0 24 24" className="mt-0.5 h-5 w-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8">
										<circle cx="12" cy="12" r="9" />
										<line x1="12" y1="8" x2="12" y2="12" />
										<circle cx="12" cy="16" r="1" fill="currentColor" stroke="none" />
									</svg>
									<p>Verification for Student accounts requires a small 0.001 EXL gas fee for smart contract execution.</p>
								</div>

								<div className="mt-6 grid gap-3 sm:grid-cols-2">
                                    <button
                                        type="button"
                                        className="flex items-center justify-center gap-2 rounded-md bg-[#d5d9de] px-4 py-3 text-[14px] font-semibold text-8a919d"
                                    >
                                        <img src={approveIcon} alt="Approve" className="h-4 w-4" />
                                        Approve Fee
                                    </button>
									<button
										type="button"
										className="rounded-md bg-[#d5d9de] px-4 py-3 text-[14px] font-semibold text-[#8a919d]"
									>
										Claim Funds
									</button>
								</div>
							</div>

							<aside className="w-full rounded-md bg-[#eceff3] p-5 lg:max-w-[220px]">
								<h6 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#868c96]">Account Snapshot</h6>
								<div className="mt-4 space-y-3">
									<p className="flex items-center justify-between text-[15px] text-[#79808a]">
										<span>Balance</span>
										<strong className="font-semibold text-[#5f6670]">0.00 EXL</strong>
									</p>
									<p className="flex items-center justify-between text-[15px] text-[#79808a]">
										<span>Status</span>
										<span className="rounded-full bg-[#f4d8d8] px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-[#b36f72]">
											Not Linked
										</span>
									</p>
								</div>

								<div className="mt-5 grid h-10 place-items-center rounded-md bg-[#e4e7eb] text-[#b9bec7]">
									<svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
										<rect x="4" y="5" width="16" height="14" rx="2" />
										<line x1="8" y1="9" x2="16" y2="9" />
										<line x1="8" y1="13" x2="14" y2="13" />
									</svg>
								</div>
							</aside>
						</div>
					</section>

					<section className="mt-9 grid items-start gap-4 lg:grid-cols-[1fr_255px]">
						<article className="rounded-3xl bg-gradient-to-r from-[#2f65d6] via-[#2f66da] to-[#356ee5] px-9 py-10 text-white">
							<h6 className="text-[43px] font-semibold leading-none">Need Assistance?</h6>
							<p className="mt-4 max-w-[590px] text-[13px] leading-8 text-[#d9e6ff]">
								If you encounter issues with your Student ID or claiming process, please visit the Academic Ledger office
								during hours.
							</p>
							<button type="button" className="mt-7 text-[15px] font-semibold text-white">
								Open Support Ticket -&gt;
							</button>
						</article>

						<article className="self-start rounded-3xl bg-[#d8dbe0] px-6 py-6">
							<h6 className="text-[37px] font-semibold leading-none text-[#1f2937]">Claim Policy</h6>
							<p className="mt-3 text-[13px] leading-7 text-[#4f5762]">
								Claims are processed once per academic quarter. Institutional fees are non-refundable.
							</p>
							<button type="button" className="mt-4 flex items-center gap-2 text-[14px] font-semibold text-[#1254cf]">
								<span>
									<svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
										<path d="M6 3h9l5 5v13H6z" />
										<path d="M15 3v5h5" />
										<path d="M9 14h6" />
									</svg>
								</span>
								Read Terms
							</button>
						</article>
					</section>
		</main>
	)
}

export default ClaimPortal
