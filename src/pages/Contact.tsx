import { useState, type FormEvent } from 'react';
import Masthead from '../components/Masthead';
import { lookingFor } from '../data/profile';
import { EMAIL, GITHUB, LINKEDIN } from '../links';

const details = [
  { label: 'Email', value: EMAIL, href: `mailto:${EMAIL}` },
  { label: 'Location', value: 'Davis, California' },
  { label: 'Open to', value: `Full-time ${lookingFor.join(', ')} roles, and research collaborations` },
  { label: 'Elsewhere', value: 'LinkedIn', href: LINKEDIN, extra: { value: 'GitHub', href: GITHUB } },
];

// The site is static, so the form drafts an email in the visitor's mail app.
const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const set = (key: keyof typeof form) => (e: { target: { value: string } }) =>
    setForm({ ...form, [key]: e.target.value });

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const body = `${form.message}\n\n${form.name}${form.email ? ` <${form.email}>` : ''}`;
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <>
      <Masthead title="Contact" />

      {/* Three-column body: info in the first column, the message form across the other two */}
      <section className="wrap after-masthead">
        <div className="cols">
          <div className="s2 t2">
            <h2 className="section-heading">Open to full-time opportunities</h2>
            <p className="mt-3 secondary">
              I'm graduating in December 2026 and looking for a full-time role. I'm always happy to talk with people
              working on perception, ML systems or hard software problems. If you think I could help your team, send
              me a note.
            </p>

            <dl className="mt-8 space-y-5">
              {details.map((d) => (
                <div key={d.label}>
                  <dt className="label">{d.label}</dt>
                  <dd className="mt-0.5">
                    {d.href ? (
                      <a
                        href={d.href}
                        className="text-link"
                        target={d.href.startsWith('mailto:') ? undefined : '_blank'}
                        rel="noopener noreferrer"
                      >
                        {d.value}
                      </a>
                    ) : (
                      d.value
                    )}
                    {d.extra && (
                      <>
                        {' · '}
                        <a href={d.extra.href} className="text-link" target="_blank" rel="noopener noreferrer">
                          {d.extra.value}
                        </a>
                      </>
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="s4 t2">
            <h2 className="section-heading">Send a message</h2>
            <form className="mt-3 space-y-4" onSubmit={submit}>
              {/* Name and email split on the page grid's own column line */}
              <div className="split2 form-pair">
                <label className="field">
                  <span className="label">Name</span>
                  <input required value={form.name} onChange={set('name')} placeholder="Your name" autoComplete="name" />
                </label>
                <label className="field">
                  <span className="label">Email</span>
                  <input
                    type="email"
                    value={form.email}
                    onChange={set('email')}
                    placeholder="you@example.com"
                    autoComplete="email"
                  />
                </label>
              </div>
              <label className="field">
                <span className="label">Subject</span>
                <input required value={form.subject} onChange={set('subject')} placeholder="What's this about?" />
              </label>
              <label className="field">
                <span className="label">Message</span>
                <textarea
                  required
                  rows={7}
                  value={form.message}
                  onChange={set('message')}
                  placeholder="Tell me a little about what you'd like to discuss."
                />
              </label>
              <div className="flex flex-wrap items-center gap-4">
                <button type="submit" className="button">
                  Send message →
                </button>
                <span className="text-sm dim">Opens your email app with this filled in.</span>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
