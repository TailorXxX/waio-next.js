'use client';
import { useState } from 'react';

export default function ContactForm({ formId, endpoint }) {
  const [formData, setFormData] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    // build FormData payload
    const fd = new FormData();
    Object.entries(formData).forEach(([k, v]) => fd.append(k, v));
    fd.append('_wpcf7', formId);
    fd.append('_wpcf7_version', '6.1.1');           // match your CF7 version
    fd.append('_wpcf7_locale', 'en_US');             // match your locale
    fd.append('_wpcf7_unit_tag', `wpcf7-f${formId}-p${formId}-o1`);
    fd.append('_wpcf7_container_post', '0');

    try {
      const res = await fetch(`${endpoint}/wp-json/contact-form-7/v1/contact-forms/${formId}/feedback`, {
        method: 'POST',
        body: fd
      });
      const json = await res.json();
      if (res.ok && json.status === 'mail_sent') {
        setStatus('success');
        setMessage('Thank you! Your message has been sent.');
      } else {
        setStatus('error');
        setMessage(json.message || 'Something went wrong.');
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
      setMessage('Network error, please try again.');
    }
  };

  return (
    <form className="wpcf7-form" onSubmit={handleSubmit}>
      <div>
        <label>Your Name</label>
        <input name="your-name" onChange={handleChange} required />
      </div>
      <div>
        <label>Your Email</label>
        <input name="your-email" type="email" onChange={handleChange} required />
      </div>
      <div>
        <label>Subject</label>
        <textarea name="your-subject" onChange={handleChange} required />
      </div>

      <button type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending…' : 'Send Message'}
      </button>

      {status === 'success' && <p style={{ color: 'green' }}>{message}</p>}
      {status === 'error'   && <p style={{ color: 'red' }}>{message}</p>}
    </form>
  );
}
