import { FooterNewsletterForm } from '../footer-newsletter-form'

export function NewsletterSection() {
  return (
    <section className='bg-pawen-brand-color px-5 py-10 text-primary sm:px-8 lg:px-10 lg:py-16'>
      <div className='mx-auto flex w-full max-w-lg flex-col items-center justify-center gap-5'>
        <div className='flex max-w-xl flex-col items-center gap-3 text-center'>
          <h2 className='font-brand text-3xl font-semibold leading-tight text-accent sm:text-4xl'>
            Stay Connected
          </h2>
          <p id='footer-newsletter' className='text-sm leading-7'>
            Subscribe to our newsletter and get updated with The PAWEN Award
          </p>
        </div>

        <div className='w-full'>
          <FooterNewsletterForm />
        </div>
      </div>
    </section>
  )
}
