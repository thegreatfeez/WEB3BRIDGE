import c1 from '../../assets/landing/c1-min.png'
import c2 from '../../assets/landing/c2-min.png'
import c3 from '../../assets/landing/c3-min.png'
import c4 from '../../assets/landing/c4-min.png'
import c5 from '../../assets/landing/c5-min.png'
import c6 from '../../assets/landing/c6-min.png'
import c7 from '../../assets/landing/c7-min.png'
import c8 from '../../assets/landing/c8-min.png'

const logos = [c1, c2, c3, c4, c5, c6, c7, c8]

function BrandSlider() {
	return (
		<section className="overflow-hidden bg-white py-12 lg:py-16">
			<h3 className="mb-10 text-center text-[24px] font-light leading-[1.1] text-[#161c25] md:text-[28px]">
				<span>Join </span>
				<span className="font-semibold">1,000+ </span>
				<span>institutions and a growing ecosystem</span>
			</h3>

			{/* CSS marquee */}
			<div className="relative">
				<div className="flex animate-[marquee_25s_linear_infinite] items-center gap-12">
					{[...logos, ...logos].map((logo, i) => (
						<div key={i} className="flex h-[60px] w-[120px] flex-shrink-0 items-center justify-center px-4">
							<img
								src={logo}
								alt={`Partner logo ${(i % logos.length) + 1}`}
								className="max-h-[40px] object-contain opacity-40 grayscale transition hover:opacity-100 hover:grayscale-0"
								loading="lazy"
							/>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}

export default BrandSlider
