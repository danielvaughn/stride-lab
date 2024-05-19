/* eslint-disable @typescript-eslint/no-explicit-any */
/// <reference types="vite/client" />
import { DOMAttributes }  from 'react'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ['editor-component']: Partial<DOMAttributes & { children: any } & { type: string }>
    }
  }
}
