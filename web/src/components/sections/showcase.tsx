import { ProgressiveBlur } from "@/components/ui/progressive-blur";
import { Icon } from "@/components/icon-sprite";

export function Showcase() {
  return (
    <>
<section className="container stack g24" id="features" style={{"paddingBottom": "96px"}}>

  {/* 1 · media left */}
  <article className="showcase">
    <div className="showcase-media">
        <ProgressiveBlur position="bottom" height="19%" blurLevels={[0.4, 0.9, 2, 4]} />
      <div className="ui">
        <div className="ui-bar"><span className="ui-dots"><i></i><i></i><i></i></span><span style={{"fontSize": "10px", "color": "var(--cw-text-2)"}}>Rental Agreement.pdf</span></div>
        <div className="ui-body stack g10">
          <div style={{"textAlign": "right"}}><span className="ui-q">Can my landlord raise the rent whenever he wants?</span></div>
          <div className="ui-a stack g6">
            <span style={{"fontSize": "9.5px", "fontWeight": "600", "letterSpacing": ".08em", "textTransform": "uppercase", "color": "var(--cw-accent-deep)"}}><Icon name="spark" className="ai-mark" style={{"width": "1em", "height": "1em", "display": "inline-block", "verticalAlign": "-.12em"}} /> In simple words</span>
            <span>Clause 4 lets the rent be revised once a year. It does not set a maximum, so there is no ceiling on the increase.</span>
          </div>
          <div className="ui-a stack g6">
            <span style={{"fontSize": "9.5px", "fontWeight": "600", "letterSpacing": ".08em", "textTransform": "uppercase", "color": "var(--cw-accent-deep)"}}>What this means for you</span>
            <span>Ask for a cap in writing before signing — commonly 5–10% a year.</span>
          </div>
          <div className="row g6"><span className="ui-tag" style={{"background": "var(--cw-risk-bg)", "color": "var(--cw-risk-text)", "borderColor": "var(--cw-risk-border)"}}>Potential Risk</span><span className="ui-tag" style={{"background": "var(--cw-surface-warm)", "color": "var(--cw-text-2)", "borderColor": "var(--cw-border)"}}>Cited: Clause 4</span></div>
          <div className="ui-input">Ask anything about this clause…<span className="ui-send"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg></span></div>
        </div>
      </div>
    </div>
    <div className="showcase-copy">
      <h3 className="h2 balance">Ask anything about the document in front of you</h3>
      <p className="lead balance" style={{"maxWidth": "44ch"}}>Every answer is grounded in your own document and points back to the exact clause it came from — so you can check it yourself.</p>
      <a className="link-accent mt8" href="/dashboard">Upload a document and ask
        <Icon name="arrow" style={{"width": "15px", "height": "15px"}} /></a>
    </div>
  </article>

  {/* 2 · media right */}
  <article className="showcase flip">
    <div className="showcase-media pad">
      <div className="ui" style={{"maxWidth": "400px"}}>
        <div className="ui-bar"><span style={{"fontSize": "10px", "fontWeight": "600"}}>Clause 02 · Security Deposit</span><span className="ui-tag" style={{"marginLeft": "auto", "background": "var(--cw-warn-bg)", "color": "var(--cw-warn-text)", "borderColor": "var(--cw-warn-border)"}}>Important</span></div>
        <div className="ui-body stack g10">
          <div>
            <div style={{"fontSize": "9.5px", "fontWeight": "600", "letterSpacing": ".08em", "textTransform": "uppercase", "color": "var(--cw-text-3)", "marginBottom": "6px"}}>Original text</div>
            <div style={{"fontSize": "10px", "lineHeight": "1.75", "color": "var(--cw-text-2)", "padding": "9px 11px", "borderLeft": "2px solid var(--cw-border)", "background": "var(--cw-surface-warm)", "borderRadius": "0 7px 7px 0"}}>
              “The Tenant shall pay a security deposit of <span className="hl" style={{"padding": "0 3px"}}>₹20,000</span> before the commencement of this Agreement, refundable within <span className="hl" style={{"padding": "0 3px"}}>30 days</span> of termination, subject to deductions for damages beyond normal wear and tear.”
            </div>
          </div>
          <div>
            <div style={{"fontSize": "9.5px", "fontWeight": "600", "letterSpacing": ".08em", "textTransform": "uppercase", "color": "var(--cw-accent)", "marginBottom": "6px"}}><Icon name="spark" className="ai-mark" style={{"width": "1em", "height": "1em", "display": "inline-block", "verticalAlign": "-.12em"}} /> In simple words</div>
            <div className="ui-a">You pay ₹20,000 before moving in. You get it back within 30 days of leaving, unless there is damage beyond normal use.</div>
          </div>
          <div className="row g6">
            <span className="ui-tag" style={{"background": "var(--cw-accent-surface)", "color": "var(--cw-accent-deep)", "borderColor": "var(--cw-accent-border)"}}>Your obligation · Pay before moving in</span>
          </div>
          <div className="row g6">
            <span className="ui-tag" style={{"background": "var(--cw-ok-bg)", "color": "var(--cw-ok-text)", "borderColor": "var(--cw-ok-border)"}}>Your right · Full refund in 30 days</span>
          </div>
        </div>
      </div>
    </div>
    <div className="showcase-copy">
      <h3 className="h2 balance">Every clause, rewritten in words you actually use</h3>
      <p className="lead balance" style={{"maxWidth": "44ch"}}>ClauseWise summarises clause by clause and separates what you must do from what you are entitled to — no legal training needed.</p>
      <a className="link-accent mt8" href="/dashboard">See a full clause breakdown
        <Icon name="arrow" style={{"width": "15px", "height": "15px"}} /></a>
    </div>
  </article>

  {/* 3 · media left */}
  <article className="showcase">
    <div className="showcase-media">
        <ProgressiveBlur position="bottom" height="19%" blurLevels={[0.4, 0.9, 2, 4]} />
      <div className="ui">
        <div className="ui-bar"><span style={{"fontSize": "10px", "fontWeight": "600"}}>Things worth your attention</span><span className="ui-tag" style={{"marginLeft": "auto", "background": "var(--cw-risk-bg)", "color": "var(--cw-risk-text)", "borderColor": "var(--cw-risk-border)"}}>2 potential risks</span></div>
        <div className="ui-body stack g8">
          <div className="ui-a stack g5" style={{"borderLeft": "2px solid var(--cw-accent)"}}>
            <div className="row g6"><span className="dot dot-risk"></span><b style={{"fontSize": "10.5px"}}>Automatic Rent Increase</b></div>
            <span style={{"color": "var(--cw-text-2)"}}>The landlord may increase rent annually with no maximum limit specified.</span>
          </div>
          <div className="ui-a stack g5" style={{"borderLeft": "2px solid var(--cw-accent)"}}>
            <div className="row g6"><span className="dot dot-risk"></span><b style={{"fontSize": "10.5px"}}>Early Termination Penalty</b></div>
            <span style={{"color": "var(--cw-text-2)"}}>You may have to keep paying rent even after you move out.</span>
          </div>
          <div className="ui-a stack g5">
            <div className="row g6"><span className="dot dot-important"></span><b style={{"fontSize": "10.5px"}}>Deposit Deductions</b></div>
            <span style={{"color": "var(--cw-text-2)"}}>Deductions for damage are neither itemised nor capped.</span>
          </div>
          <div className="ui-a row g6" style={{"alignItems": "center"}}>
            <span className="dot dot-clear"></span><span style={{"color": "var(--cw-text-2)"}}>10 remaining clauses read as standard.</span>
          </div>
        </div>
      </div>
    </div>
    <div className="showcase-copy">
      <h3 className="h2 balance">The risky clauses find you, not the other way around</h3>
      <p className="lead balance" style={{"maxWidth": "44ch"}}>Unusual, one-sided or costly terms are flagged the moment a document is analysed — with a plain explanation of why they matter to you.</p>
      <a className="link-accent mt8" href="/dashboard">Upload a document
        <Icon name="arrow" style={{"width": "15px", "height": "15px"}} /></a>
    </div>
  </article>

  {/* 4 · media right */}
  <article className="showcase flip">
    <div className="showcase-media pad">
      <div className="ui" style={{"maxWidth": "430px"}}>
        <table className="ui-table">
          <thead><tr><th>Document</th><th>Clauses</th><th>Status</th></tr></thead>
          <tbody>
            <tr><td>Rental Agreement.pdf</td><td>8</td><td><span className="ui-tag" style={{"background": "var(--cw-risk-bg)", "color": "var(--cw-risk-text)", "borderColor": "var(--cw-risk-border)"}}>2 risks</span></td></tr>
            <tr><td>Loan Agreement.pdf</td><td>12</td><td><span className="ui-tag" style={{"background": "var(--cw-warn-bg)", "color": "var(--cw-warn-text)", "borderColor": "var(--cw-warn-border)"}}>3 important</span></td></tr>
            <tr><td>Terms of Service.pdf</td><td>15</td><td><span className="ui-tag" style={{"background": "var(--cw-ok-bg)", "color": "var(--cw-ok-text)", "borderColor": "var(--cw-ok-border)"}}>Clear</span></td></tr>
            <tr><td>Offer Letter.pdf</td><td>9</td><td><span className="ui-tag" style={{"background": "var(--cw-warn-bg)", "color": "var(--cw-warn-text)", "borderColor": "var(--cw-warn-border)"}}>1 important</span></td></tr>
            <tr><td>Service Agreement.pdf</td><td>6</td><td><span className="ui-tag" style={{"background": "var(--cw-ok-bg)", "color": "var(--cw-ok-text)", "borderColor": "var(--cw-ok-border)"}}>Clear</span></td></tr>
            <tr><td style={{"border": "0"}}>NDA.pdf</td><td style={{"border": "0"}}>14</td><td style={{"border": "0"}}><span className="ui-tag" style={{"background": "var(--cw-risk-bg)", "color": "var(--cw-risk-text)", "borderColor": "var(--cw-risk-border)"}}>1 risk</span></td></tr>
          </tbody>
        </table>
      </div>
    </div>
    <div className="showcase-copy">
      <h3 className="h2 balance">Every document you have signed, in one place</h3>
      <p className="lead balance" style={{"maxWidth": "44ch"}}>Rental agreements, loan terms, offer letters and scheme circulars — analysed, searchable, and ready the next time someone asks you what you agreed to.</p>
      <a className="link-accent mt8" href="/dashboard">Open the dashboard
        <Icon name="arrow" style={{"width": "15px", "height": "15px"}} /></a>
    </div>
  </article>

</section>
    </>
  );
}
