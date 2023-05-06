import Head from 'next/head'
import Image from 'next/image'
// import styles from '../styles/Home.module.css'
import LinkBox from '../src/Components/LinkBox.js'

// images
import linkedInLogo from '../public/linkedInLogo.png'
import githubLogo from'../public/githubLogo.png'

export default function Home() {
  return (
    <div className='flex bg-slate-800 h-full'>
      <Head>
        <title>Andrew Graves</title>
        <meta name="description" content="I'm Andrew Graves and this is my personal website!" />
        <link rel="icon" href="/logo.png" />
        <link rel="preconnect" href="https://fonts.gstatic.com"/>
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet"/> 
      </Head>

      <main className='m-auto p-8'>
        <h1 className='mb-8'>
          Hey, I'm <br/><strong>Andrew Graves</strong> 👋
        </h1>
        <div className='items-start'>
          <div className='mb-8'>
            <p>
              I'm a senior at 🎓 California State University Channel Islands, studying Computer Science.
              <br></br>I am also employed full-time as a 💻 full-stack developer at PennyMac Loan Services.
              <br></br>I like 🌿 being out in nature, 🔨 building things, 🏦 thoughtful urban planning, 🚉 and trains!
              <br></br><br></br> I'm most interested in how technology can improve the material conditions of the average person
              <br></br> and how we can leverage that to make positive change.
            </p>
          </div>
          <div>
            <p className='caption'>Links...</p>
            <div className='flex gap-4 sm:flex-row flex-wrap'>
              <LinkBox link="https://www.linkedin.com/in/andrewcgraves/" imgSrc={linkedInLogo} size={24}/>
              <LinkBox link="https://github.com/andrewcgraves" imgSrc={githubLogo} size={24}/>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
