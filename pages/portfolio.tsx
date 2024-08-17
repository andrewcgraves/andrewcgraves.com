
import Image from 'next/image'
import LinkBox from '../src/Components/LinkBox.js'
import Head from 'next/head'
import HeaderBar from '../src/Components/HeaderBar.js'
import Pill from '../src/Components/Pill.js'

export default function Portfolio() {
    return (
        <div className='flex bg-slate-800 h-full'>
            <Head>
                <title>Art Portfolio</title>
                <meta name="description" content="A personal portfolio for some of the things i've designed." />
                <link rel="icon" href="/logo.png" />
                <link rel="preconnect" href="https://fonts.gstatic.com"/>
                <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet"/> 
            </Head>

            <main className='mx-48 p-8 my-24'>
                <h1 className='mb-4'>
                    Portfolio
                </h1>
                <div>
                    <HeaderBar>
                        <Pill onClick={() => console.log("Photography clicked")}><b>Photography</b></Pill>
                        <Pill onClick={() => console.log("DESIGN clicked")}><b>Design</b></Pill>
                    </HeaderBar>
                </div>
            </main>
        </div>
    )
}