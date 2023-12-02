import '../styles/globals.css'
import type { AppProps } from 'next/app'
import React, { useCallback, useEffect, useState } from 'react'
import Particles from 'react-particles'
import type { Engine } from 'tsparticles-engine'
import { loadSlim } from "tsparticles-slim"

function MyApp({ Component, pageProps }: AppProps) {
  const [hostname, setHostname] = useState('')

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine)
  }, [])

  const date = new Date()
  const isSnowing = date.getMonth() == 11

  useEffect(() => {
    setHostname(window.location.hostname)
  }, [])

  return (
    <div className='bg-slate-800 h-screen overflow-auto'>
      {hostname != '' && hostname != 'www.andrewcgraves.com' ? (<div className='bg-red-600 p-2 text-center sticky top-0 left-0'><b>{hostname}</b> is used for development. Please use <b><a href='https://andrewcgraves.com'>andrewcgraves.com</a></b>.</div>) : null }
      <Component {...pageProps}/>
      {isSnowing && <Particles
        id="tsparticles"
        init={particlesInit}
        options={
          {
            "particles": {
              "number": {
                "value": 50,
                "density": {
                  "enable": true,
                  "value_area": 800
                }
              },
              "color": {
                "value": "#FFF"
              },
              "shape": {
                "type": "circle",
                "stroke": {
                  "width": 0,
                  "color": "#000000"
                },
                "polygon": {
                  "nb_sides": 5
                },
                "image": {
                  "src": "img/github.svg",
                  "width": 100,
                  "height": 100
                }
              },
              "opacity": {
                "value": 1,
                "random": true,
                "anim": {
                  "enable": false,
                  "speed": 1,
                  "opacity_min": 1,
                  "sync": false
                }
              },
              "size": {
                "value": 4,
                "random": true,
                "anim": {
                  "enable": false,
                  "speed": 20,
                  "size_min": 0.1,
                  "sync": false
                }
              },
              "move": {
                "enable": true,
                "speed": 1,
                "direction": "bottom",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                  "enable": false,
                  "rotateX": 600,
                  "rotateY": 1200
                }
              }
            }
          }
        }
      />}
    </div>
  )
}
export default MyApp
