import { Highlighter } from "@/components/ui/highlighter";
import { Icon } from "@/components/icon-sprite";

export function Hero() {
  return (
    <>
<section className="hero-wrap">
  <div className="hero">
    <div className="hero-mesh"></div>
    <div className="hero-rule"></div>
    <div className="container">
      <div className="stack center g24 tac">
        <a className="hero-pill rise" href="/dashboard">
          <Icon name="spark" />
          <b>New</b> <span>Every clause scored, grounded in Indian law</span>
        </a>

        <h1 className="display balance rise d1" style={{"maxWidth": "16ch"}}>
          Legal documents,<br />finally{" "}
          <Highlighter action="highlight" color="#FDBA74" padding={8}
            strokeWidth={2} iterations={2} animationDuration={900}>
            explained.
          </Highlighter>
        </h1>

        <p className="lead balance rise d2" style={{"maxWidth": "60ch", "fontSize": "18px"}}>
          Upload any legal or administrative document and ask questions in plain language. ClauseWise
          simplifies complex terms, highlights potential risks, and helps you understand your rights
          and obligations.
        </p>

        <div className="row center wrap g12 rise d3 mt8">
          <a className="btn btn-primary btn-lg" href="/dashboard">
            <Icon name="upload" />
            Upload a Document
          </a>
          <a className="btn btn-secondary btn-lg" href="#how">
            <Icon name="play" />
            See how it works
          </a>
        </div>
        <p className="small rise d3">No legal expertise required.</p>
      </div>

      {/* Product mockup */}
      <div className="mt48 rise d4" style={{"position": "relative", "maxWidth": "960px", "marginLeft": "auto", "marginRight": "auto"}}>
        <div className="device">
          <div className="device-inner">
            <div className="ui">
              <div className="chrome">
                <span className="chrome-dots"><i style={{"background": "#E8A0A0"}}></i><i style={{"background": "#E8CE9B"}}></i><i style={{"background": "#A8CFA8"}}></i></span>
                <span className="chrome-url">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="10.5" width="14" height="10" rx="2"/><path d="M8.5 10.5V7.5a3.5 3.5 0 0 1 7 0v3"/></svg>
                  clausewise.app/d/rental-agreement
                </span>
                <span className="chrome-actions"><i></i><i></i></span>
              </div>
              <div style={{"display": "flex", "minHeight": "392px"}}>
                {/* sidebar */}
                <div className="ui-side">
                  <div className="row g6" style={{"padding": "2px 6px 10px"}}>
                    <span style={{"width": "15px", "height": "15px", "borderRadius": "5px", "background": "var(--cw-accent-surface)", "border": "1px solid var(--cw-accent-border)", "display": "grid", "placeItems": "center"}}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="var(--cw-accent-dark)" strokeWidth="2.2" strokeLinecap="round" style={{"width": "9px", "height": "9px"}}><path d="M7 12h10M7 16h5M7 8h10"/></svg>
                    </span>
                    <span style={{"fontSize": "11px", "fontWeight": "600", "letterSpacing": "-.02em"}}>Clause<span className="accent">Wise</span></span>
                  </div>
                  <div className="ui-link"><i></i>Dashboard</div>
                  <div className="ui-link on"><i></i>Documents</div>
                  <div className="ui-link"><i></i>Omissions</div>
                  <div className="ui-link"><i></i>Statutes</div>
                  <div className="ui-link"><i></i>Affordability</div>
                  <div style={{"marginTop": "14px", "padding": "0 7px 5px", "fontSize": "9px", "fontWeight": "600", "letterSpacing": ".09em", "textTransform": "uppercase", "color": "var(--cw-text-3)"}}>Outline</div>
                  <div className="ui-link" style={{"justifyContent": "space-between"}}><span>1 &nbsp;Security Deposit</span><span className="dot dot-risk"></span></div>
                  <div className="ui-link" style={{"justifyContent": "space-between"}}><span>2 &nbsp;Rent & Payment</span><span className="dot dot-important"></span></div>
                  <div className="ui-link" style={{"justifyContent": "space-between"}}><span>3 &nbsp;Termination</span><span className="dot dot-risk"></span></div>
                  <div className="ui-link" style={{"justifyContent": "space-between"}}><span>4 &nbsp;Maintenance</span><span className="dot dot-clear"></span></div>
                  <div className="ui-link" style={{"justifyContent": "space-between"}}><span>5 &nbsp;Liability</span><span className="dot dot-important"></span></div>
                </div>
                {/* body */}
                <div className="ui-body stack g14">
                  <div className="row between">
                    <span style={{"fontSize": "12px", "fontWeight": "600", "letterSpacing": "-.02em"}}>Ask ClauseWise</span>
                    <span className="ui-chip">8 clauses · 2 need attention</span>
                  </div>

                  <div style={{"textAlign": "right"}}><span className="ui-q">What happens if I leave before the lease ends?</span></div>

                  <div className="row g8" style={{"alignItems": "flex-start"}}>
                    <span className="avatar avatar-ai" style={{"width": "20px", "height": "20px", "flex": "none"}}><Icon name="spark" style={{"width": "11px", "height": "11px"}} /></span>
                    <div className="stack g8" style={{"minWidth": "0", "flex": "1"}}>
                      <div className="ui-a">You may be required to continue paying rent until a replacement tenant is found.</div>
                      <div className="ui-note row g8" style={{"alignItems": "flex-start"}}>
                        <Icon name="risk" style={{"width": "12px", "height": "12px", "flex": "none", "marginTop": "1px"}} />
                        <span><b>Potential Financial Obligation</b><br />This clause has no cap on how long you keep paying.</span>
                      </div>
                      <span style={{"fontSize": "10.5px", "fontWeight": "500", "color": "var(--cw-accent-dark)"}}>View Original Clause →</span>
                    </div>
                  </div>

                  <div className="row g6 wrap" style={{"marginTop": "auto"}}>
                    <span className="ui-chip">Can the landlord keep my deposit?</span>
                    <span className="ui-chip">Explain this simply</span>
                  </div>
                  <div className="ui-input">
                    Ask anything about this document…
                    <span className="ui-send"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="play-overlay">
          <a className="play-btn" href="#features">
            <Icon name="play" />
            See how a clause is explained
          </a>
        </div>
      </div>
    </div>
  </div>
</section>
    </>
  );
}
