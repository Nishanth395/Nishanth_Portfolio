import Image from "next/image";
import { brandDossier as dossier } from "@/content/dossier";
import { Station } from "../exhibition/Exhibition";

export function ClientStory() {
  const client = dossier.commercialMilestone;
  return <section id="ventures" className="story client-story" aria-labelledby="client-title">
    <header className="story-heading">
      <p>Client work</p>
      <h2 id="client-title">Sri Balaji <em>Interiors.</em></h2>
    </header>
    <div className="client-spread">
      <a href={client.websiteUrl} className="client-print" target="_blank" rel="noreferrer">
        <Image src={client.screenshotPath} width={1400} height={800} alt="The Sri Balaji Interiors website with its Interiors and Corian entrances" />
        <span>Visit the client website ↗</span>
      </a>
      <div className="story-copy">
        <h3>My first paid website.</h3>
        <p>Sri Balaji Interiors makes custom woodwork and Corian surfaces in Hyderabad. Most enquiries came through referrals. The owners needed a way to show both sides of the business during a conversation with a client.</p>
        <p>I organised the site around those two trades, built it in HTML, CSS and JavaScript, and connected each enquiry to WhatsApp or phone.</p>
        <details><summary>Process and lessons</summary><p>I worked with the owners on the brief, gathered their portfolio, built the pages, and took the site through review and domain handoff. Agreeing on the scope early helped us decide which revisions belonged in the first release.</p></details>
        <Station room="ventures" />
      </div>
    </div>
  </section>;
}

export function CampusStory() {
  return <section id="leadership" className="story campus-story" aria-labelledby="campus-title">
    <header className="story-heading"><p>Leadership</p><h2 id="campus-title">On campus <em>&amp; on air.</em></h2></header>
    <div className="campus-spread">
      <Station room="leadership" />
      <div>{dossier.leadership.map((item, index) =>
        <article key={item.id} id={"leadership-item-"+index} tabIndex={-1} className="initiative">
          <p>{item.institution ?? item.format}</p><h3>{item.title}</h3>
          <p>{index===0 ? "At NIAT Kolhapur, I help student builders share early ideas, practise their pitches, and get feedback from one another." : "I created Inside Founder’s Mind to ask founders about early product decisions and the things they learned by building."}</p>
          <details><summary>My role</summary><p>{item.role}</p><ul>{item.initiatives.map(line=><li key={line}>{line}</li>)}</ul></details>
        </article>)}</div>
    </div>
  </section>;
}

export function PersonalStory() {
  return <section id="about" className="story personal-story" aria-labelledby="about-title">
    <div className="personal-spread">
      <div><header className="story-heading"><p>Personal perspective</p><h2 id="about-title">Before <em>the code.</em></h2></header>
        <div className="story-copy"><p>I study AI and Data Science. The part of building I keep coming back to is figuring out what someone actually needs. A clinic, a local business and a student founder all give me a different answer.</p>
          <details><summary>How I work</summary>{dossier.principles.map(p=><p key={p.index}><strong>{p.title}</strong><br/>{p.statement}</p>)}</details>
          <details><summary>What I want to build</summary><p>{dossier.longTermAmbition}</p></details>
        </div>
      </div>
      <Station room="about" />
    </div>
  </section>;
}
