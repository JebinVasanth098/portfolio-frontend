import { useState } from 'react';
import { sendContact } from '../api.js';
import { profile } from '../data/content.js';

const empty = { name: '', email: '', message: '' };

export default function Contact() {
  const [form, setForm] = useState(empty);
  const [state, setState] = useState('idle'); // idle | sending | sent | error
  const [error, setError] = useState('');

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  async function onSubmit(e) {
    e.preventDefault();
    setState('sending');
    setError('');
    try {
      await sendContact(form);
      setState('sent');
      setForm(empty);
    } catch (err) {
      setError(err.message || 'Something went wrong.');
      setState('error');
    }
  }

  return (
    <section id="contact" className="section">
      <div className="wrap contact">
        <div>
          <h2>Contact</h2>
          <p>
            Send a message here, or write to{' '}
            <a href={`mailto:${profile.email}`}>{profile.email}</a>.
          </p>
        </div>

        <form onSubmit={onSubmit} className="form" noValidate={false}>
          <label>
            Name
            <input type="text" name="name" required maxLength={100} value={form.name} onChange={update('name')} autoComplete="name" />
          </label>
          <label>
            Email
            <input type="email" name="email" required maxLength={200} value={form.email} onChange={update('email')} autoComplete="email" />
          </label>
          <label>
            Message
            <textarea name="message" required minLength={10} maxLength={4000} rows={6} value={form.message} onChange={update('message')} />
          </label>

          <div className="form__footer">
            <button className="btn" type="submit" disabled={state === 'sending'}>
              {state === 'sending' ? 'Sending' : 'Send message'}
            </button>
            <p className="form__status" role="status">
              {state === 'sent' && 'Message sent. I will reply by email.'}
              {state === 'error' && `Message not sent: ${error}`}
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
