import type { Metadata } from "next";
import LinkBox from "../src/Components/LinkBox.jsx";
import UniversalHeaderBar from "../src/Components/UniversalHeaderBar.jsx";
import linkedInLogo from "../public/linkedInLogo.png";
import githubLogo from "../public/githubLogo.png";

export const metadata: Metadata = {
  title: "Andrew Graves",
  description: "I'm Andrew Graves and this is my personal website!",
};

export default function Home() {
  return (
    <div className="page-shell">
      <UniversalHeaderBar />
      <main className="page-main">
        <div className="flex flex-wrap gap-8">
          <div className="flex-initial lg:flex-2">
            <hgroup>
              <h1>Hello, I&apos;m Andrew Graves</h1>
              <p>
                I&apos;m a full-time full-stack developer and a part time tinkerer. In my free time,
                I like being out in nature, designing and building things, and advocating for better
                regional transportation for California.
                <br />
                <br />
                I&apos;m most interested in how technology can augment people&apos;s lives in
                meaningful ways and how we can leverage that to bring people together and make
                positive change.
              </p>
            </hgroup>
          </div>
          <div className="flex-initial lg:flex-1 flex gap-4 sm:flex-row flex-wrap content-center justify-center rounded">
            <LinkBox link="https://www.linkedin.com/in/andrewcgraves/" imgSrc={linkedInLogo} />
            <LinkBox link="https://github.com/andrewcgraves" imgSrc={githubLogo} />
          </div>
        </div>
      </main>
    </div>
  );
}
