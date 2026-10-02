import { MotionReveal } from '@/components/motion-reveal'
import { Button } from '@/components/ui/button'
import { createPageMetadata } from '@/lib/seo'
import Image from 'next/image'
import Link from 'next/link'

export const metadata = createPageMetadata({
  path: '/sponsors',
  title: 'Our Sponsors & Partners',
  description:
    "PAWEN 2026 brings together institutions committed to advancing women's leadership, enterprise and economic participation across Africa.",
  keywords: [
    'PAWEN sponsors',
    'PAWEN partners',
    'women in business partners',
    'Africa business summit partners',
  ],
})

type PartnerLogo = {
  name: string
  src: string
  alt: string
  href?: string
  bgWhite?: boolean
  imageClassName?: string
}

const partnerLogos: readonly PartnerLogo[] = [
  {
    name: 'Zanaco',
    src: '/zanaco.png',
    alt: 'Zanaco logo',
    href: 'https://www.zanaco.co.zm',
  },
  {
    name: 'Nugi Technologies',
    src: '/NTW.png',
    alt: 'Nugi Technologies logo',
    href: 'https://nugitech.co.uk/',
  },
  {
    name: 'Qloop',
    src: '/QLoop.png',
    alt: 'Qloop logo',
    href: 'https://theqloop.com/',
  },
  {
    name: 'Syncventory',
    src: '/Syncventory Logo B.jpg',
    alt: 'Syncventory logo',
    href: 'https://www.syncventory.co/',
  },
  {
    name: '360 Gov',
    src: '/360 gov_W.png',
    alt: '360 Gov logo',
  },
  {
    name: 'Women in Technology Zambia',
    src: '/WITN.jpg',
    alt: 'Women in Technology Zambia logo',
    href: 'https://www.witn.org.zm/',
  },
  {
    name: 'ProdAfrica',
    src: '/prodafrica.png',
    alt: 'ProdAfrica logo',
    href: 'https://maps.prodafrica.com/',
  },
  {
    name: 'EventPadi Technology',
    src: '/eventpadi-logo.png',
    alt: 'EventPadi Technology logo',
    href: 'http://www.eventpadi.com/',
    bgWhite: true,
    imageClassName: 'w-48 max-h-16 object-contain',
  },
  {
    name: 'Alliance Media',
    src: '/alliance-media.jpg',
    alt: 'Alliance Media logo',
    href: 'https://www.alliancemedia.com/zambia/',
  },
  {
    name: 'GrandPalace Hotel',
    src: '/grandpalace-logo.png',
    alt: 'GrandPalace Hotel logo',
    href: 'https://grandpalace.co.zm/',
    bgWhite: true,
    imageClassName: 'max-h-20 w-auto object-contain',
  },
  {
    name: 'Hair Wonder',
    src: '/hair-wonder.webp',
    alt: 'Hair Wonder logo',
    href: 'https://myhairwonder.com/about-us/',
    imageClassName: 'max-h-20 w-auto rounded-md object-contain',
  },
  {
    name: 'BellaNaija',
    src: '/bellanaija.webp',
    alt: 'BellaNaija logo',
    href: 'http://www.bellanaija.com/',
    bgWhite: true,
    imageClassName: 'max-h-14 w-auto object-contain',
  },
]

export default function SponsorsPage() {
  return (
    <main className='relative isolate overflow-hidden bg-pawen-brand-color px-5 py-16 text-foreground sm:px-8 lg:px-10 lg:py-24'>
      <div className='relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center gap-16'>
        {/* Header */}
        <MotionReveal className='flex max-w-3xl flex-col items-center gap-6 text-center'>
          <span className='inline-flex items-center rounded-full border border-accent/40 bg-accent/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent'>
            Partnership &amp; Impact
          </span>
          <h1 className='font-brand text-4xl font-bold leading-tight text-accent sm:text-5xl lg:text-6xl'>
            Our Sponsors and Partners
          </h1>
          <p className='font-brand text-base leading-relaxed text-primary/85 sm:text-lg'>
            PAWEN 2026 brings together institutions committed to advancing
            women&apos;s leadership, enterprise and economic participation across
            Africa.
          </p>
        </MotionReveal>

        {/* Partners Grid */}
        <div className='grid w-full grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4'>
          {partnerLogos.map((logo, index) => {
            const cardClass = logo.bgWhite
              ? 'bg-white rounded-2xl p-6 shadow-md'
              : 'border border-primary/15 bg-background/30 rounded-2xl p-6 backdrop-blur-sm'
            const imgClass =
              logo.imageClassName ||
              'max-h-20 w-auto rounded-md object-contain'

            return (
              <MotionReveal
                key={logo.name}
                delay={index * 0.04}
                className='flex flex-col items-center justify-center'
              >
                {logo.href ? (
                  <a
                    href={logo.href}
                    target='_blank'
                    rel='noreferrer'
                    className={`flex h-36 w-full items-center justify-center transition-transform duration-300 ease-out hover:scale-105 ${cardClass}`}
                    aria-label={`Visit ${logo.name}`}
                  >
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      width={220}
                      height={110}
                      className={imgClass}
                    />
                  </a>
                ) : (
                  <div
                    className={`flex h-36 w-full items-center justify-center ${cardClass}`}
                  >
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      width={220}
                      height={110}
                      className={imgClass}
                    />
                  </div>
                )}
              </MotionReveal>
            )
          })}
        </div>

        {/* Partnership Call to Action */}
        <MotionReveal className='flex w-full max-w-3xl flex-col items-center gap-6 rounded-2xl border border-primary/20 bg-background/40 p-8 text-center backdrop-blur-sm sm:p-12'>
          <h2 className='font-brand text-2xl font-bold text-accent sm:text-3xl'>
            Join Us as a Partner
          </h2>
          <p className='font-brand text-sm leading-relaxed text-primary/85 sm:text-base'>
            Align your brand with Africa&apos;s leading platform for women&apos;s
            economic empowerment. Connect with key decision-makers, innovators, and
            market leaders across the continent.
          </p>
          <div className='flex flex-wrap items-center justify-center gap-4 pt-2'>
            <Button
              asChild
              className='h-12 rounded-full bg-accent px-8 text-sm font-semibold text-background hover:bg-accent/90'
            >
              <a href='mailto:awards@pawen.org'>Become a Partner</a>
            </Button>
            <Button
              asChild
              variant='outline'
              className='h-12 rounded-full border-primary/30 px-8 text-sm font-semibold text-primary hover:bg-primary/10'
            >
              <Link
                href='/The%20PAWEN%20Awards%20%26%20Summit%20Brochure.pdf'
                target='_blank'
                rel='noreferrer'
              >
                Download Brochure
              </Link>
            </Button>
          </div>
        </MotionReveal>
      </div>
    </main>
  )
}
