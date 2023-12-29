'use client';
import { SWRConfig } from 'swr'

interface SWRProviderProps {
    children: React.ReactNode;
}
export const SWRProvider = ({ children }:SWRProviderProps) => {
  return (
    <SWRConfig value={{fetcher: (url:string) => fetch(url).then((res) => res.json())}}>
        {children}
    </SWRConfig>
  )
};