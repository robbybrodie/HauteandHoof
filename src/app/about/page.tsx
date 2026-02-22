import { SiteShell } from "@/components/SiteShell";
import { siteCopy } from "@/lib/siteCopy";
import { sendParentContact } from "@/app/about/actions";

type AboutPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function AboutPage({ searchParams }: AboutPageProps) {
  const query = (await searchParams) ?? {};
  const sent = query.sent === "1";
  const error = typeof query.error === "string" ? query.error : "";

  return (
    <SiteShell>
      <section className="card">
        <h2 className="sectionTitle">{siteCopy.about.title}</h2>
        <p>{siteCopy.about.body}</p>
      </section>
      <section className="card">
        <h3 className="sectionTitle">{siteCopy.about.contactTitle}</h3>
        <p>{siteCopy.about.contactBody}</p>

        {sent ? (
          <p className="notice noticeSuccess">Message sent to the parent team. Thank you for reaching out.</p>
        ) : null}
        {error ? (
          <p className="notice noticeError">
            {error === "rate"
              ? "Too many messages were sent from this network recently. Please wait a few minutes and try again."
              : "We could not send that message yet. Please review your details and try again."}
          </p>
        ) : null}

        <form action={sendParentContact} className="stack">
          <label className="label" htmlFor="name">
            Your Name
          </label>
          <input className="input" id="name" name="name" type="text" maxLength={80} required />

          <label className="label" htmlFor="email">
            Email
          </label>
          <input className="input" id="email" name="email" type="email" maxLength={120} required />

          <label className="label" htmlFor="subject">
            Subject
          </label>
          <input className="input" id="subject" name="subject" type="text" maxLength={120} required />

          <label className="label" htmlFor="message">
            Message
          </label>
          <textarea className="textarea" id="message" name="message" minLength={10} maxLength={2500} required />

          <div className="hpField" aria-hidden="true">
            <label htmlFor="company">Company</label>
            <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
          </div>

          <button className="button buttonPrimary" type="submit">
            Send a Message to the Parent Team
          </button>
        </form>
      </section>
    </SiteShell>
  );
}
