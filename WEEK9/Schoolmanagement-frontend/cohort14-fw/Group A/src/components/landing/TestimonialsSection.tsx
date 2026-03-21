import reviewImg from '../../assets/landing/review.png'
import { landingTestimonials as testimonials } from '../../data/mockData'

function TestimonialsSection() {
	return (
		<section id="about" className="relative z-[1] overflow-hidden bg-neutral-50 py-20 lg:py-28">
			<div className="mx-auto max-w-[1280px] px-5 lg:px-10">
				<div className="mx-auto mb-14 max-w-[600px] text-center">
					<span className="mb-3 inline-block rounded-full bg-neutral-100 px-4 py-1 text-[13px] font-medium text-[#333]">
						Testimonials
					</span>
					<h3 className="text-[30px] font-medium leading-[1.1] text-[#161c25] md:text-[36px]">
						What <span className="font-semibold">Our Clients</span> Say{' '}
						<span className="font-semibold">About Us</span>
					</h3>
				</div>

				<div className="grid gap-6 md:grid-cols-3">
					{testimonials.map((t) => (
						<article
							key={t.id}
							id={t.id}
							className="group overflow-hidden rounded-[28px] border border-neutral-100 bg-white transition hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)]"
						>
							<div className="flex flex-col">
								{/* Quote content */}
								<div className="p-8">
									<img src={reviewImg} alt="5-star review" className="mb-4 h-[18px]" loading="lazy" />
									<p className="mb-6 text-[16px] font-medium leading-[1.6] text-[#161c25]">
										"{t.quote}"
									</p>
									<div className="flex items-center gap-4">
										<div className="grid h-[56px] w-[56px] place-items-center rounded-full bg-[#e7edf7] text-[15px] font-semibold uppercase tracking-[0.08em] text-[#1457d2]">
											{t.name.slice(0, 2)}
										</div>
										<div>
											<h6 className="text-[15px] font-semibold text-[#161c25]">{t.name}</h6>
											<span className="text-[13px] text-neutral-500">
												<span className="font-bold text-[#1457d2]">{t.role}</span> | {t.org},{' '}
												<span className="font-bold">{t.location}</span>
											</span>
										</div>
									</div>
								</div>
							</div>
						</article>
					))}
				</div>
			</div>
		</section>
	)
}

export default TestimonialsSection
