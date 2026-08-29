import { Icon } from "@/components/icon-sprite";

export function FinalCta() {
  return (
    <>
<section style={{"padding": "0 0 96px"}}>
  <div className="container">
    <div className="cta-band ">
      <h2 className="display balance" style={{"maxWidth": "15ch", "margin": "0 auto", "color": "#fff"}}>Know what you're signing.</h2>
      <p className="balance mt20" style={{"maxWidth": "50ch", "marginLeft": "auto", "marginRight": "auto", "fontSize": "18px", "lineHeight": "1.6", "color": "rgba(255,255,255,.92)"}}>
        Upload your first document and read it explained clause by clause in under a minute.
      </p>
      <div className="row center wrap g12 mt32">
        <a className="btn btn-lg" href="/dashboard" style={{"background": "#fff", "color": "var(--cw-accent-deep)", "boxShadow": "0 12px 30px -10px rgba(0,0,0,.35)"}}>
          <Icon name="upload" />
          Upload a Document
        </a>
        <a className="btn btn-lg" href="#privacy" style={{"background": "rgba(255,255,255,.14)", "color": "#fff", "borderColor": "rgba(255,255,255,.45)"}}>
          Read the privacy guarantee
          <Icon name="arrow" />
        </a>
      </div>
      <p className="mt24" style={{"fontSize": "13px", "color": "rgba(255,255,255,.8)"}}>Free to use · No legal expertise required</p>
    </div>
  </div>
</section>
    </>
  );
}
