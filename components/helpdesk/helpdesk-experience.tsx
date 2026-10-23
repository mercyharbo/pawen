'use client'

import { Button } from '@/components/ui/button'
import {
  HELP_DESK_ERROR_EVENT,
  HELP_DESK_READY_EVENT,
  openNvitiHelpdeskChat,
} from '@/lib/nviti-chat'
import Image from 'next/image'
import { useEffect, useState } from 'react'

type HelpdeskStatus = 'loading' | 'ready' | 'error'

const LOAD_TIMEOUT_MS = 12_000

export function HelpdeskExperience() {
  const [status, setStatus] = useState<HelpdeskStatus>('loading')

  useEffect(() => {
    const handleError = () => setStatus('error')
    const timeoutId = window.setTimeout(handleError, LOAD_TIMEOUT_MS)

    const handleReady = () => {
      window.clearTimeout(timeoutId)
      setStatus('ready')
    }

    window.addEventListener(HELP_DESK_READY_EVENT, handleReady)
    window.addEventListener(HELP_DESK_ERROR_EVENT, handleError)

    if (openNvitiHelpdeskChat()) {
      handleReady()
    }

    return () => {
      window.clearTimeout(timeoutId)
      window.removeEventListener(HELP_DESK_READY_EVENT, handleReady)
      window.removeEventListener(HELP_DESK_ERROR_EVENT, handleError)
    }
  }, [])

  const retry = () => {
    window.location.reload()
  }

  return (
    <section
      data-helpdesk-page
      className='flex min-h-svh items-center justify-center bg-pawen-brand-color px-5 py-10 text-primary sm:px-8'
      aria-labelledby='helpdesk-heading'
    >
      <div className='flex w-full max-w-lg flex-col items-center gap-8 text-center'>
        <Image
          src='/Group.svg'
          alt='PAWEN'
          width={138}
          height={83}
          className='h-20 w-auto'
          priority
        />

        {status === 'error' ? (
          <div className='flex flex-col items-center gap-5' role='alert'>
            <div className='flex flex-col gap-3'>
              <h1
                id='helpdesk-heading'
                className='font-melodrama text-3xl font-semibold text-accent sm:text-4xl'
              >
                We couldn&apos;t open the PAWEN Helpdesk
              </h1>
              <p className='text-base leading-7 text-primary/80'>
                Check your connection and try opening the chat again.
              </p>
            </div>
            <Button
              className='h-11 rounded-full bg-accent px-7 text-sm font-semibold text-background hover:bg-accent/90'
              onClick={retry}
              type='button'
            >
              Try again
            </Button>
          </div>
        ) : (
          <div
            className='flex flex-col items-center gap-4'
            role='status'
            aria-live='polite'
          >
            <span
              className='size-8 animate-pulse rounded-full border-2 border-accent border-r-transparent'
              aria-hidden='true'
            />
            <div className='flex flex-col gap-3'>
              <h1
                id='helpdesk-heading'
                className='font-melodrama text-3xl font-semibold text-accent sm:text-4xl'
              >
                Opening the PAWEN Helpdesk
              </h1>
              <p className='text-base leading-7 text-primary/80'>
                Connecting you to Priscar, your PAWEN 2026 Digital Concierge.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
