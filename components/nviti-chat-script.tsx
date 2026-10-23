'use client'

import {
  closeNvitiChat,
  HELP_DESK_ERROR_EVENT,
  HELP_DESK_PATH,
  HELP_DESK_READY_EVENT,
  openNvitiHelpdeskChat,
} from '@/lib/nviti-chat'
import Script from 'next/script'
import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useRef } from 'react'

const NVITI_WIDGET_SCRIPT =
  'https://api.nviti.ng/api/chat-widget/widget_5f9fd3248cbe239496205f2f1bf93615/js'

function dispatchHelpdeskEvent(name: string) {
  window.dispatchEvent(new CustomEvent(name))
}

export function NvitiChatScript() {
  const pathname = usePathname()
  const previousPathname = useRef(pathname)

  const openHelpdesk = useCallback(
    (allowEventFallback = false) => {
      if (pathname !== HELP_DESK_PATH) {
        return false
      }

      const opened = openNvitiHelpdeskChat(allowEventFallback)
      if (opened) {
        dispatchHelpdeskEvent(HELP_DESK_READY_EVENT)
      }

      return opened
    },
    [pathname],
  )

  useEffect(() => {
    const previousPath = previousPathname.current

    if (previousPath === HELP_DESK_PATH && pathname !== HELP_DESK_PATH) {
      closeNvitiChat()
    }

    if (pathname === HELP_DESK_PATH) {
      openHelpdesk()
    }

    previousPathname.current = pathname
  }, [openHelpdesk, pathname])

  return (
    <Script
      id='nviti-chat-widget-script'
      src={NVITI_WIDGET_SCRIPT}
      strategy='afterInteractive'
      onReady={() => {
        openHelpdesk(true)
      }}
      onError={() => dispatchHelpdeskEvent(HELP_DESK_ERROR_EVENT)}
    />
  )
}
