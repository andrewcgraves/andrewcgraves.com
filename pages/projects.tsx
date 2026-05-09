import Head from "next/head";
import UniversalHeaderBar from "../src/Components/UniversalHeaderBar.js";

export default function Projects() {
  return (
    <div>
      <Head>
        <title>Projects</title>
        <meta
          name="description"
          content="A collection of interesting projects I've worked on."
        />
        <link rel="icon" href="/logo.png" />
      </Head>
      <main>
        <UniversalHeaderBar />
        <div className="main-container">
          <h1>Projects</h1>
          <p>Coming soon.</p>
        </div>
      </main>
    </div>
  );
}
