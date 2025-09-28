import Head from 'next/head'
import Image from 'next/image'
import type { AppProps } from 'next/app'
// import styles from '../styles/Home.module.css'
import LinkBox from '../src/Components/LinkBox.js'
import HeaderBar from '../src/Components/HeaderBar.js'
import Pill from '../src/Components/Pill.js'

// images
import linkedInLogo from '../public/linkedInLogo.png'
import githubLogo from'../public/githubLogo.png'

export default function Home() {
  return (
    <div className='flex h-full'>
      <Head>
        <title>Andrew Graves</title>
        <meta name="description" content="I'm Andrew Graves and this is my personal website!" />
        <link rel="icon" href="/logo.png" />
      </Head>

      <main>
        <HeaderBar>
          <Pill link="/ceramics"><b>CERAMICS</b></Pill>
          <Pill link="/"><b>DESIGN</b></Pill>
          <Pill link="/"><b>PROJECTS</b></Pill>
        </HeaderBar>
        <div className="flex flex-wrap gap-4 p-16">
          <div className="flex-initial lg:flex-1">
            <h1 className='mb-8'>
              Hello, I'm Andrew Graves
            </h1>
            <h2>
              I’m a full-stack developer at PennyMac Loan Services and a part time tinkerer. In my free time, I like being out in nature, creating ceramic art, designing and building things, and advocating for better regional transportation for California.

              I’m most interested in how technology can augment people’s lives in meaningful ways and how we can leverage that to bring people together and make positive change. 
            </h2>
          </div>
          <div className="flex-initial lg:flex-1">
            Testing
          </div>
        </div>
        <div className='flex gap-4 sm:flex-row flex-wrap pl-16'>
          <LinkBox link="https://www.linkedin.com/in/andrewcgraves/" imgSrc={linkedInLogo} size={24}/>
          <LinkBox link="https://github.com/andrewcgraves" imgSrc={githubLogo} size={24}/>
        </div>
      </main>
    </div>
  )
}
