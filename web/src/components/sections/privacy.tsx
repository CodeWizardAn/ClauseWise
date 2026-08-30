import { Highlighter } from "@/components/ui/highlighter";
import { Icon } from "@/components/icon-sprite";

/**
 * The design prototype claimed "nothing is stored on a server" and "deleted the
 * moment you close the tab". Neither is true of this build: an analysis IS
 * saved, encrypted, to your account. The copy below describes the guarantee
 * this app actually implements — redaction before the model, AES-256-GCM at
 * rest, and ownership enforced at the data layer.
 */
export function Privacy() {
  return (
    <section className="section-sm" id="privacy">
      <div className="container">
        <div className="stack center tac g16" style={{ maxWidth: 900, margin: "0 auto" }}>
          <h2 className="h1 balance" style={{ maxWidth: "22ch" }}>
            The AI only ever sees your document{" "}
            <Highlighter
              action="highlight"
              color="#FDBA74"
              padding={4}
              strokeWidth={2}
              iterations={2}
              animationDuration={700}
              multiline={false}
              isView
            >
              redacted
            </Highlighter>
          </h2>
          <p className="lead balance" style={{ maxWidth: "58ch" }}>
            Names, PAN, Aadhaar, GSTIN, IFSC, phone numbers, email addresses and income figures
            are stripped out on our server before a single clause is sent to a model. The real
            values are put back into the answer afterwards — on the server, never in your browser.
          </p>

          <div className="trust-row mt32" style={{ textAlign: "left" }}>
            <div className="trust-item">
              <Icon name="shield" />
              <div>
                <b>Redacted before analysis</b>
                <span>
                  Personal identifiers are replaced with placeholders first. The model is given
                  the redacted text and nothing else.
                </span>
              </div>
            </div>
            <div className="trust-item">
              <Icon name="tos" />
              <div>
                <b>No third-party sharing</b>
                <span>
                  Your data is never sold, shared, or indexed by third-party search engines.
                </span>
              </div>
            </div>
            <div className="trust-item">
              <Icon name="notrain" />
              <div>
                <b>Never used for training</b>
                <span>Your agreement does not become somebody else&rsquo;s model.</span>
              </div>
            </div>
          </div>

          <p className="mt24">
            <span className="build-note">
              <Icon name="doc" />
              Your income is never sent anywhere — the affordability maths runs in your browser.
            </span>
          </p>

          <p
            className="disclaimer mt24"
            style={{ justifyContent: "center", maxWidth: "60ch" }}
          >
            <Icon name="info" />
            ClauseWise provides information about documents you upload. It is not legal or
            financial advice. Always consult a qualified professional before signing.
          </p>
        </div>
      </div>
    </section>
  );
}
