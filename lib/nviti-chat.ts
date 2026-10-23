export const HELP_DESK_PATH = '/helpdesk'
export const HELP_DESK_READY_EVENT = 'pawen:helpdesk:ready'
export const HELP_DESK_ERROR_EVENT = 'pawen:helpdesk:error'

type NvitiOpenOptions = {
  focusMessage?: boolean
  view?: 'chat'
}

declare global {
  interface Window {
    NvitiChatWidget?: {
      close: () => void
      open: () => void
      toggle?: () => void
    }
    openNvitiChat?: (options?: NvitiOpenOptions) => void
  }
}

export function openNvitiHelpdeskChat(allowEventFallback = false) {
  if (typeof window === 'undefined') {
    return false
  }

  if (window.openNvitiChat) {
    window.openNvitiChat({ view: 'chat', focusMessage: true })
    return true
  }

  if (window.NvitiChatWidget?.open) {
    window.NvitiChatWidget.open()
    return true
  }

  if (allowEventFallback) {
    document.dispatchEvent(new CustomEvent('nviti:chat-widget:open'))
    return true
  }

  return false
}

export function closeNvitiChat() {
  if (typeof window === 'undefined') {
    return
  }

  window.NvitiChatWidget?.close()
}
