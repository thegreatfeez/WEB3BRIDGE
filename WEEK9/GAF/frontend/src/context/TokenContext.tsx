import { createContext, useContext, type ReactNode } from 'react'
import { useReadToken, type TokenReadState } from '../hooks/specific/useReadToken'

const TokenContext = createContext<TokenReadState | null>(null)

export function TokenProvider({ children }: { children: ReactNode }) {
  const tokenState = useReadToken()
  return (
    <TokenContext.Provider value={tokenState}>
      {children}
    </TokenContext.Provider>
  )
}

export function useTokenContext(): TokenReadState {
  const ctx = useContext(TokenContext)
  if (!ctx) throw new Error('useTokenContext must be used inside <TokenProvider>')
  return ctx
}