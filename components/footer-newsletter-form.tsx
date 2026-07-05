'use client'

import type { NewsletterFormState } from '@/app/newsletter/actions'
import { submitNewsletterSignup } from '@/app/newsletter/actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { ArrowUpRight } from 'lucide-react'
import { useActionState } from 'react'

const initialNewsletterState: NewsletterFormState = {
  status: 'idle',
  message: '',
}

function fieldError(state: NewsletterFormState, field: string) {
  return state.fieldErrors?.[field]
}

function errorId(field: string) {
  return `footer-newsletter-${field}-error`
}

export function FooterNewsletterForm() {
  const [state, formAction, pending] = useActionState(
    submitNewsletterSignup,
    initialNewsletterState,
  )
  const firstNameError = fieldError(state, 'firstName')
  const lastNameError = fieldError(state, 'lastName')
  const emailError = fieldError(state, 'email')

  return (
    <form
      action={formAction}
      className='flex flex-col gap-3'
      key={state.resetKey ?? 'footer-newsletter-form'}
      noValidate
    >
      <div className='grid gap-3 sm:grid-cols-2'>
        <label className='flex flex-col gap-2' htmlFor='footer-first-name'>
          <span className='sr-only'>First name</span>
          <Input
            aria-describedby={firstNameError ? errorId('firstName') : undefined}
            aria-invalid={firstNameError ? 'true' : 'false'}
            autoComplete='given-name'
            className={cn(
              'min-h-14 min-w-0 flex-1 rounded-full bg-white/15 px-7 text-sm text-primary placeholder:text-muted-foreground focus-visible:border-accent focus-visible:ring-accent/30',
              firstNameError ? 'ring-3 ring-destructive/40' : '',
            )}
            id='footer-first-name'
            name='firstName'
            placeholder='First name'
            type='text'
          />
          {firstNameError ? (
            <span
              className='text-xs text-destructive'
              id={errorId('firstName')}
            >
              {firstNameError}
            </span>
          ) : null}
        </label>

        <label className='flex flex-col gap-2' htmlFor='footer-last-name'>
          <span className='sr-only'>Last name</span>
          <Input
            aria-describedby={lastNameError ? errorId('lastName') : undefined}
            aria-invalid={lastNameError ? 'true' : 'false'}
            autoComplete='family-name'
            className={cn(
              'min-h-14 min-w-0 flex-1 rounded-full bg-white/15 px-7 text-sm text-primary placeholder:text-muted-foreground focus-visible:border-accent focus-visible:ring-accent/30',
              lastNameError ? 'ring-3 ring-destructive/40' : '',
            )}
            id='footer-last-name'
            name='lastName'
            placeholder='Last name'
            type='text'
          />
          {lastNameError ? (
            <span className='text-xs text-destructive' id={errorId('lastName')}>
              {lastNameError}
            </span>
          ) : null}
        </label>
      </div>

      <label
        className='flex min-w-0 flex-1 flex-col gap-2'
        htmlFor='footer-email'
      >
        <span className='sr-only'>Email address</span>
        <Input
          aria-describedby={emailError ? errorId('email') : undefined}
          aria-invalid={emailError ? 'true' : 'false'}
          autoComplete='email'
          className={cn(
            'min-h-14 min-w-0 flex-1 rounded-full bg-white/15 px-7 text-sm text-primary placeholder:text-muted-foreground focus-visible:border-accent focus-visible:ring-accent/30',
            emailError ? 'ring-3 ring-destructive/40' : '',
          )}
          id='footer-email'
          name='email'
          placeholder='your@email.com'
          type='email'
        />
        {emailError ? (
          <span className='text-xs text-destructive' id={errorId('email')}>
            {emailError}
          </span>
        ) : null}
      </label>

      <Button
        aria-label={pending ? 'Subscribing' : 'Subscribe to newsletter'}
        className='group/newsletter relative min-h-14 w-full overflow-hidden rounded-full bg-primary px-7 text-sm font-medium text-primary-foreground hover:bg-primary'
        disabled={pending}
        type='submit'
      >
        <span
          className='absolute inset-0 origin-bottom-left scale-0 rounded-full bg-accent transition-transform duration-500 ease-out group-hover/newsletter:scale-100 group-focus-visible/newsletter:scale-100'
          aria-hidden='true'
        />
        <span className='relative z-10 flex items-center gap-2 transition-colors duration-500 group-hover/newsletter:text-accent-foreground group-focus-visible/newsletter:text-accent-foreground'>
          {pending ? 'Subscribing' : 'Subscribe'}
          <ArrowUpRight
            className='size-5 transition-transform duration-500 ease-out group-hover/newsletter:-translate-y-0.5 group-hover/newsletter:translate-x-0.5 group-focus-visible/newsletter:-translate-y-0.5 group-focus-visible/newsletter:translate-x-0.5'
            aria-hidden='true'
          />
        </span>
      </Button>

      {state.message ? (
        <p
          className={cn(
            'px-1 text-sm leading-6',
            state.status === 'success'
              ? 'text-accent'
              : 'text-destructive',
          )}
          aria-live='polite'
          role={state.status === 'error' ? 'alert' : 'status'}
        >
          {state.message}
        </p>
      ) : null}
    </form>
  )
}
