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
    <div className='app'>
      {hostname != 'andrewcgraves.com' ? (<div className='warningBanner'><b>{hostname}</b> is used for development. Please use <b>andrewcgraves.com</b>.</div>) : null }
      <Component {...pageProps} />
      {isSnowing && <Particles init={particlesInit}/>}
    </div>
  )
}
export default MyApp
