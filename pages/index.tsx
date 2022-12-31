import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import LinkBox from '../src/Components/LinkBox.js'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Andrew Graves</title>
        <meta name="description" content="I'm Andrew Graves and this is my personal website!" />
        <link rel="icon" href="/logo.png" />
        <link rel="preconnect" href="https://fonts.gstatic.com"/>
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet"/> 
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Hey, I'm <br/> <strong>Andrew Graves</strong> 👋
        </h1>
        <div style={{alignItems: 'start', paddingLeft: '32px', paddingRight: '32px'}}>
          <div >
            <p>
              I'm a senior at 🎓 California State University Channel Islands, studying Computer Science.
              <br></br>I am also employed full-time as a 💻 full-stack developer at PennyMac Loan Services.
              <br></br>I like 🌿 being out in nature, 🔨 building things, 🏦 thoughtful urban planning, 🚉 and trains!
              <br></br><br></br> I'm most interested in how technology can improve the material conditions of the average person
              <br></br> and how we can leverage that to make positive change.
            </p>
          </div>
          <div style={{marginTop: '32px'}}>
            <p className={styles.caption}>Links...</p>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'left'}}>
              <LinkBox link="https://www.linkedin.com/in/andrewcgraves/" imgSrc="/linkedInLogo.png" width={56} height={56}/>
              <LinkBox link="https://github.com/andrewcgraves" imgSrc="/githubLogo.png" width={56} height={56}/>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
