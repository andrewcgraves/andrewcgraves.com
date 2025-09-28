import Head from 'next/head'
import Image from 'next/image'
import type { AppProps } from 'next/app'
// import styles from '../styles/Home.module.css'
import LinkBox from '../src/Components/LinkBox.js'
import UniversalHeaderBar from '../src/Components/UniversalHeaderBar.js'
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
        <UniversalHeaderBar/>
        <div className="flex flex-wrap gap-4 p-16">
          <div className="flex-initial lg:flex-1">
            <h1>
              Hello, I'm Andrew Graves
            </h1>
            <h2 className='my-8'>
              I’m a full-stack developer at PennyMac Loan Services and a part time tinkerer. In my free time, I like being out in nature, creating ceramic art, designing and building things, and advocating for better regional transportation for California. <br/><br/>I’m most interested in how technology can augment people’s lives in meaningful ways and how we can leverage that to bring people together and make positive change. 
            </h2>
          </div>
          <div className="flex-initial lg:flex-1 flex gap-4 sm:flex-row flex-wrap content-center justify-center">
            {/* <img className="rounded-2xl" src="https://f004.backblazeb2.com/b2api/v1/b2_download_file_by_id?fileId=4_z8f907fb55c4c22b29911051f_f106e8302bae80c5f_d20250928_m203123_c004_v0402028_t0032_u01759091483421"></img> */}
              <LinkBox link="https://www.linkedin.com/in/andrewcgraves/" imgSrc={linkedInLogo} size={24}/>
              <LinkBox link="https://github.com/andrewcgraves" imgSrc={githubLogo} size={24}/>
          </div>
        </div>
      </main>
    </div>
  )
}
