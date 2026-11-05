'use client'

import { MotionReveal } from '@/components/motion-reveal'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Marquee from 'react-fast-marquee'

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
    name: 'Holiday Inn Lusaka',
    src: '/holiday-inn-lusaka-logo.png',
    alt: 'Holiday Inn Lusaka logo',
    href: 'https://www.ihg.com/holidayinn/hotels/us/en/find-hotels/select-roomrate?fromRedirect=true&qSrt=sBR&qErm=false&qSlH=LUNLU&qRms=1&qAdlt=1&qChld=0&qCiD=12&qCiMy=102026&qCoD=15&qCoMy=102026&qGrpCd=PAN&setPMCookies=true&qSHBrC=HI&qDest=Cnr%20Birdcage%20Walk%20and%20Haile%20Selassie%20Avenue,%20Lusaka,%20ZM&qpMbw=0&qpMn=1&srb_u=1&qRmFltr=',
    bgWhite: true,
    imageClassName: 'max-h-20 w-auto object-contain',
  },
  {
    name: 'Protea Hotel by Marriott',
    src: '/protea-hotel-by-marriott-logo.webp',
    alt: 'Protea Hotel by Marriott logo',
    href: 'https://www.marriott.com/offers/pawen-regional-summit-conference-delegate-accommodation-12-15-november-2026-off-258625',
    bgWhite: true,
    imageClassName: 'max-h-20 w-full object-contain',
  },
  {
    name: 'Southern Sun Ridgeway',
    src: '/southern-sun-ridgeway-logo.png',
    alt: 'Southern Sun Ridgeway logo',
    href: 'https://www.southernsun.com/southern-sun-ridgeway-lusaka',
    bgWhite: true,
    imageClassName: 'max-h-20 w-full object-contain',
  },
  {
    name: 'DOTS Mobility',
    src: '/dots-mobility.webp',
    alt: 'DOTS Mobility logo',
    href: 'https://www.facebook.com/share/19tcxzbuyX/?mibexitid=wwXlfr',
    imageClassName: 'max-h-24 w-full object-contain',
  },
  {
    name: 'Terratreks Travel',
    src: '/terratreks-travel.png',
    alt: 'Terratreks Travel Victoria Falls tour flyer',
    href: 'https://terratrekstravel.com/gallery',
    imageClassName: 'max-h-28 w-auto object-contain',
  },
  {
    name: 'Hair Wonder',
    src: '/hair-wonder.webp',
    alt: 'Hair Wonder logo',
    href: 'https://myhairwonder.com/about-us/',
    imageClassName: 'max-h-20 w-auto rounded-md object-contain',
  },
  {
    name: 'YSM Chartered Accountants',
    src: '/ysm-chartered-accountants.webp',
    alt: 'YSM Chartered Accountants logo',
    href: 'https://www.facebook.com/share/1CN2gum6ab/',
    bgWhite: true,
    imageClassName: 'max-h-24 w-auto object-contain',
  },
  {
    name: 'YamieReels',
    src: '/yamie-reels.webp',
    alt: 'YamieReels logo',
    href: 'https://www.facebook.com/share/19cHTEhzRs/?mibextid=wwXIfr',
    imageClassName: 'max-h-24 w-auto object-contain',
  },
  {
    name: 'A.R.T Studios',
    src: '/art-studios.webp',
    alt: 'A.R.T Studios logo',
    href: 'https://www.facebook.com/share/1FUcgyKNv1/?mibextid=wwXIfr',
    bgWhite: true,
    imageClassName: 'max-h-24 w-auto object-contain',
  },
  {
    name: 'wCAP Ltd',
    src: '/wcap-ltd.webp',
    alt: 'wCAP Ltd logo',
    href: 'https://wcapltd.com/',
    bgWhite: true,
    imageClassName: 'max-h-20 w-full object-contain',
  },
  {
    name: 'Aluvión',
    src: '/aluvion.png',
    alt: 'Aluvión logo',
    href: 'http://aluvion.com/',
    bgWhite: true,
    imageClassName: 'max-h-16 w-auto object-contain',
  },
  {
    name: 'BellaNaija',
    src: '/bellanaija.webp',
    alt: 'BellaNaija logo',
    href: 'http://www.bellanaija.com/',
    bgWhite: true,
    imageClassName: 'max-h-14 w-auto object-contain',
  },
  /*
  // Excluded until logo is provided:
  {
    name: 'Rideve Media Solutions',
    src: '/rideve.png',
    alt: 'Rideve Media Solutions logo',
    href: 'https://ridevemedia.com/?fbclid=IwVERDUAT-N5VwZG9mBWV4dG4DYWVtAjEwAHNydGMGYXBwX2lkDDM1MDY4NTUzMTcyOAABHvNKCnIYhiZcy8mKKV3y86uGK0sqG-iir0_WcDvrc3zI9npUp3G7KOOFfL3M_aem_9J4tbeo_yzPdpGRMaupUBQ',
    // Official Event Management Partner
  },
  */
]

export function SponsorsSection() {
  return (
    <section
      className='relative isolate overflow-hidden bg-pawen-brand-color px-5 py-10 text-foreground sm:px-8 lg:px-10 lg:py-16'
      id='our-story-details'
    >
      <div
        className='pointer-events-none absolute inset-x-0 top-0 h-[520%] bg-[linear-gradient(180deg,var(--color-pawen-brand-color)_0%,var(--color-pawen-brand-color)_56%,rgba(28,6,45,0.82)_72%,rgba(5,5,5,0)_100%)]'
        aria-hidden='true'
      />

      <div className='relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center gap-10 sm:gap-14'>
        <div className='flex flex-col items-center gap-4 text-center'>
          <h2 className='font-brand text-4xl font-bold leading-tight text-accent sm:text-5xl 3xl:text-6xl 2xl:text-6xl'>
            Our Sponsors and Partners
          </h2>
          <p className='max-w-2xl font-brand text-sm leading-6 text-primary/85 sm:text-base sm:leading-7'>
            PAWEN 2026 brings together institutions committed to advancing women&apos;s
            leadership, enterprise and economic participation across Africa.
          </p>
        </div>

        <MotionReveal className='w-full max-w-5xl overflow-hidden'>
          <Marquee
            autoFill
            gradient={false}
            pauseOnHover
            speed={34}
            className='overflow-hidden'
          >
            {partnerLogos.map((logo) => {
              const cardClass = logo.bgWhite
                ? 'bg-white rounded-2xl p-4 shadow-sm'
                : ''
              const imgClass =
                logo.imageClassName ||
                'max-h-24 w-auto rounded-md object-contain'

              return (
                <div
                  className='flex min-h-32 min-w-64 items-center justify-center px-4'
                  key={logo.name}
                >
                  {logo.href ? (
                    <a
                      href={logo.href}
                      target='_blank'
                      rel='noopener noreferrer'
                      className={`inline-flex h-28 w-56 items-center justify-center transition-transform duration-300 ease-out hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent ${cardClass}`}
                      aria-label={`Visit ${logo.name} (opens in a new tab)`}
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
                      className={`flex h-28 w-56 items-center justify-center ${cardClass}`}
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
                </div>
              )
            })}
          </Marquee>
        </MotionReveal>

        <div className='flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6'>
          {/* <Button
            asChild
            variant='outline'
            className='h-11 rounded-full border-accent/60 bg-transparent px-7 text-sm font-semibold text-accent hover:border-accent hover:bg-accent/15 hover:text-accent'
          >
            <Link href='/sponsors'>2026 Sponsors and Partners →</Link>
          </Button> */}
          <Button
            asChild
            className='h-11 rounded-full bg-accent px-7 text-sm font-semibold text-background hover:bg-accent/90'
          >
            <a href='mailto:awards@pawen.org'>Become a Partner</a>
          </Button>
        </div>
      </div>
    </section>
  )
}
