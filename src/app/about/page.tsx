import { HeroBanner } from "@/components/HeroBanner";
import { SiteShell } from "@/components/SiteShell";
import { siteCopy } from "@/lib/siteCopy";
import { submitContact } from "./actions";

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function AboutPage({ searchParams }: Props) {
  const params = await searchParams;
  const sent = params.sent === "1";
  const error = typeof params.error === "string" ? params.error : null;
  const c = siteCopy.about;

  const errorMsg: Record<string, string> = {
    fields: "Please fill in all fields.",
    email: "That email address doesn\u2019t look right.",
    length: "Message is too long (2 000 chars max).",
    rate: "Too many messages \u2014 please try again later.",
    config: "Contact form isn\u2019t configured yet.",
    send: "Something went wrong sending. Please try later.",
    spam: "Submission blocked."
  };

  return (
    <SiteShell>
      <HeroBanner title={c.heroTitle} subtitle={c.heroSubtitle} />

      <section>
        <p className="sectionLabel">Our Story</p>
        <p className="sectionBody">{c.story}</p>
      </section>

      <section>
        <p className="sectionLabel">Safety First</p>
        <p className="sectionBody">{c.safety}</p>
      </section>

      <hr className="divider" />

      <section>
        <p className="sectionLabel">Get in Touch</p>
        <p className="sectionBody">{c.contact}</p>

        {sent && (
          <div className="notice noticeOk" style={{ marginTop: "1rem" }}>
            Message sent! We&apos;ll get back to you soon.
          </div>
        )}
        {error && (
          <div className="notice noticeErr" style={{ marginTop: "1rem" }}>
            {errorMsg[error] ?? "Something went wrong."}
          </div>
        )}

        <form action={submitContact} style={{ marginTop: "1.4rem" }}>
          <div className="stack">
            <div>
              <label className="formLabel" htmlFor="name">
                Name
              </label>
              <input id="name" name="name" className="formInput" required />
            </div>
            <div>
              <label className="formLabel" htmlFor="email">
                Email
              </label>
              <input id="email" name="email" type="email" className="formInput" required />
            </div>
            <div>
              <label className="formLabel" htmlFor="message">
                Message
              </label>
              <textarea id="message" name="message" className="formTextarea" required />
            </div>
            <div className="hpField">
              <label htmlFor="company">Company</label>
              <input id="company" name="company" tabIndex={-1} autoComplete="off" />
            </div>
            <button type="submit" className="btn btnPrimary">
              Send Message
            </button>
          </div>
        </form>
      </section>
    </SiteShell>
  );
}
