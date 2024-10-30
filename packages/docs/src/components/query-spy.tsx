'use client'

import { Querystring, QuerystringProps } from './querystring'
import { parseAsInteger, useQueryState } from 'nuqs'

export function QuerySpy(props: Omit<QuerystringProps, 'value'>) {
  const [counter] = useQueryState(
    'secondCounter',
    parseAsInteger.withDefault(0)
  )
  return <Querystring value={counter.toString()} {...props} />
}
