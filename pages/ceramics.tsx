import Head from 'next/head'
import HeaderBar from '../src/Components/HeaderBar.js'
import Pill from '../src/Components/Pill.js'

export default function Ceramics() {
    return (
        <div>
            <Head>
                <title>Andrew Graves</title>
                <meta name="description" content="I'm Andrew Graves and this is my personal website!" />
                <link rel="icon" href="/logo.png" />
            </Head>
            <main>
                <HeaderBar>
                    <Pill link="/"><b>CERAMICS</b></Pill>
                    <Pill link="/"><b>DESIGN</b></Pill>
                    <Pill link="/"><b>PROJECTS</b></Pill>
                </HeaderBar>
                <div className='main-container'>
                    <h1>Ceramics</h1>
                    <p>Ceramics has become a big part of my life in the last few years. I teach and produce work with CSU Channel Islands, where I graduated. Ceramics is one of the ways I unwind, and express my creativity. Here are some of my favorite pieces.</p>
                </div>
            </main>
        </div>
    )
}
