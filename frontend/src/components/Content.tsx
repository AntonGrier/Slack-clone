import { RouteComponentProps } from '@reach/router'
import { observer } from 'mobx-react'
import { createRef, FunctionComponent, RefObject } from 'react'
import { MessageTerminal, Messages } from './messaging'
import { Sidebar } from './sidebar'

export const Content: FunctionComponent<RouteComponentProps> = () => {
  const bottomRef: RefObject<HTMLDivElement> = createRef()

  return (
    <Sidebar>
      <div
        style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'space-between',
        }}
      >
        <Messages bottomRef={bottomRef} />
        <MessageTerminal bottomRef={bottomRef} />
      </div>
    </Sidebar>
  )
}
