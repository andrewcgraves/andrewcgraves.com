import '../styles/globals.css'
import type { AppProps } from 'next/app'
import React, { useCallback, useEffect, useState } from 'react';
import Particles from 'react-particles';
import { tsParticles } from 'tsparticles-engine'
import { loadFull } from 'tsparticles'
import type { Container, Engine } from 'tsparticles-engine'

function MyApp({ Component, pageProps }: AppProps) {
  const [hostname, setHostname] = useState('')

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine)
  }, [])

  const date = new Date()
  const isSnowing = date.getMonth() == 11
  if (isSnowing) {
    tsParticles.loadJSON('tsparticles', 'snow.json')
  }

  useEffect(() => {
    setHostname(window.location.hostname)
  }, [])

  return (
    <div className='bg-slate-800 h-screen overflow-auto'>
      {hostname != '' && hostname != 'www.andrewcgraves.com' ? (<div className='bg-red-600 p-2 text-center sticky top-0 left-0'><b>{hostname}</b> is used for development. Please use <b><a href='https://andrewcgraves.com'>andrewcgraves.com</a></b>.</div>) : null }
      <Component {...pageProps} />
      {isSnowing && <Particles init={particlesInit}/>}
    </div>
  )
}
export default MyApp
