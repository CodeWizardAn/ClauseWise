import { Icon } from "@/components/icon-sprite";

export function Intro() {
  return (
    <>
<section className="section" id="how">
  <div className="container">
    <div className="stack center tac g16" style={{"maxWidth": "760px", "margin": "0 auto"}}>
      <h2 className="h2 balance">ClauseWise reads the fine print,<br />so you never sign blind</h2>
      <p className="lead balance" style={{"maxWidth": "58ch"}}>
        Upload a document and it is broken down clause by clause — in words you actually use, in the
        language you think in, with the risky parts pointed out before you agree to them.
      </p>
    </div>

    {/* Three steps */}
    <div className="grid grid-3 mt48" style={{"gap": "20px"}}>
      <div className="card card-p card-hover">
        <div className="row between" style={{"alignItems": "flex-start"}}>
          <span className="feat-icon"><Icon name="upload" /></span>
          <span className="h3 accent" style={{"opacity": ".35"}}>01</span>
        </div>
        <h3 className="h4 mt16">Upload your document</h3>
        <p className="body mt8">Drop in a PDF, DOCX or TXT. It is redacted, then split into its individual clauses.</p>
      </div>
      <div className="card card-p card-hover">
        <div className="row between" style={{"alignItems": "flex-start"}}>
          <span className="feat-icon"><Icon name="ask" /></span>
          <span className="h3 accent" style={{"opacity": ".35"}}>02</span>
        </div>
        <h3 className="h4 mt16">Ask in plain language</h3>
        <p className="body mt8">Ask anything in English, Hindi, Marathi, Tamil or Telugu. Every answer cites the clause it came from.</p>
      </div>
      <div className="card card-p card-hover">
        <div className="row between" style={{"alignItems": "flex-start"}}>
          <span className="feat-icon"><Icon name="risk" /></span>
          <span className="h3 accent" style={{"opacity": ".35"}}>03</span>
        </div>
        <h3 className="h4 mt16">See what matters</h3>
        <p className="body mt8">Risks, obligations and rights are surfaced up front — before you put your name on it.</p>
      </div>
    </div>
  </div>
</section>
    </>
  );
}
