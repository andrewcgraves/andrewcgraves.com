import Head from 'next/head'
import LinkBox from '../src/Components/LinkBox.js'
import UniversalHeaderBar from '../src/Components/UniversalHeaderBar.js'

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
          <div className="flex-initial lg:flex-2">
            <h1>
              Hello, I'm Andrew Graves
            </h1>
            <h2 className='my-8'>
              I’m a full-time full-stack developer and a part time tinkerer. In my free time, I like being out in nature, designing and building things, and advocating for better regional transportation for California. <br/><br/>I’m most interested in how technology can augment people’s lives in meaningful ways and how we can leverage that to bring people together and make positive change. 
            </h2>
          </div>
          <div className="flex-initial lg:flex-1 flex gap-4 sm:flex-row flex-wrap content-center justify-center rounded">
              <LinkBox link="https://www.linkedin.com/in/andrewcgraves/" imgSrc={linkedInLogo} size={24}/>
              <LinkBox link="https://github.com/andrewcgraves" imgSrc={githubLogo} size={24}/>
          </div>
        </div>
      </main>
    </div>
  )
}
