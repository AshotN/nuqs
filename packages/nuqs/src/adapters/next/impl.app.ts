import { useRouter,  } from 'next/navigation'
import { useCallback, useOptimistic } from 'react'
import { debug } from '../../debug'
import type { AdapterInterface, UpdateUrlFunction } from '../defs'
import { renderURL } from './shared'

export function useNuqsNextAppRouterAdapter(): AdapterInterface {
  const router = useRouter()
  const [optimisticSearchParams, setOptimisticSearchParams] =
    useOptimistic<URLSearchParams>(new URL(document.location.toString()).searchParams)

  const updateUrl: UpdateUrlFunction = useCallback((search, options) => {
    // App router
    const url = renderURL(location.origin + location.pathname, search)
    setOptimisticSearchParams(new URL(url).searchParams)
    debug('[nuqs queue (app)] Updating url: %s', url)
    // First, update the URL locally without triggering a network request,
    // this allows keeping a reactive URL if the network is slow.
    const updateMethod =
      options.history === 'push' ? history.pushState : history.replaceState

    updateMethod(
      { ...history.state, as: url, url: url },
      '',
      url
    )
    if (options.scroll) {
      window.scrollTo(0, 0)
    }
    if (!options.shallow) {
      // Call the Next.js router to perform a network request
      // and re-render server components.
      router.replace(url, {
        scroll: false
      })
    }
  }, [])
  return {
    searchParams: optimisticSearchParams,
    updateUrl,
    // See: https://github.com/47ng/nuqs/issues/603#issuecomment-2317057128
    rateLimitFactor: 2
  }
}
