import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useCallback } from 'react';
import Particles from 'react-particles';
import { tsParticles } from 'tsparticles-engine'
import { loadFull } from 'tsparticles'
import type { Container, Engine } from 'tsparticles-engine'

function MyApp({ Component, pageProps }: AppProps) {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine)
  }, [])

  const date = new Date()
  const isSnowing = date.getMonth() == 11
  if (isSnowing) {
    tsParticles.loadJSON('tsparticles', 'snow.json')
  }

  return <>
    <Component {...pageProps} />
    {isSnowing && <Particles init={particlesInit}/>}
  </>
}
export default MyApp
