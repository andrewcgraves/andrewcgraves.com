import '../styles/globals.css'
import type { AppProps } from 'next/app'
import React from 'react'

function MyApp({ Component, pageProps }: AppProps) {  
  return (
    <div className='h-screen overflow-auto'>
      <Component {...pageProps}/>
    </div>
  )
}
export default MyApp
