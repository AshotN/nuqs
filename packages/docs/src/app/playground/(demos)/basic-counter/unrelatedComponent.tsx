'use client'

import { Button } from '@/src/components/ui/button'
import { Minus, Plus } from 'lucide-react'
import { parseAsInteger, useQueryState } from 'nuqs'
import { useEffect, useRef } from 'react'

export function SecondCounter() {
  const [counter, setCounter] = useQueryState(
    'secondCounter',
    parseAsInteger.withDefault(0)
  )
  const renderCount = useRef(0)

  useEffect(() => {
    renderCount.current = renderCount.current + 1
  })

  return (
    <>
      <nav className="my-8 flex flex-wrap items-center gap-4">
        <Button onClick={() => setCounter(x => x - 1)}>
          <Minus />
        </Button>
        <Button onClick={() => setCounter(x => x + 1)}>
          <Plus />
        </Button>
        <Button onClick={() => setCounter(null)}>Reset</Button>
        <span className="text-2xl font-semibold tabular-nums">
          Counter: {counter}
        </span>
        <span className="text-2xl font-semibold tabular-nums">
          Render #: {renderCount.current}
        </span>
      </nav>
    </>
  )
}
