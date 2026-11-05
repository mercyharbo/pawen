'use client'

import { useEffect } from 'react'
import { trackFormCompletion } from '@/lib/analytics'
import type { FormType } from '@/lib/analytics-policy'

export function useFormAnalytics(form: FormType, state: { status: string; resetKey?: string }) {
  useEffect(() => {
    trackFormCompletion(form, { status: state.status, resetKey: state.resetKey })
  }, [form, state.status, state.resetKey])
}
