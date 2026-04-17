import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FORMSPREE_URL = 'https://formspree.io/f/xbdqgvep';

const initialForm = {
  names: '',
  email: '',
  phone: '',
  event_date: '',
  event_type: '',
  venue: '',
  message: '',
};

const Contact = () => {
  const [form, setForm]       = useState(initialForm);
  const [status, setStatus]   = useState('idle'); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('');
  const [errors, setErrors]   = useState({});

  /* ── helpers ── */
  const validate = () => {
    const e = {};
    if (!form.names.trim())      e.names      = 'Please enter your name(s).';
    if (!form.email.trim())      e.email      = 'Please enter your email.';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email.';
    if (!form.event_type)        e.event_type = 'Please choose an event type.';
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // clear field error on change
    if (errors[name]) setErrors((prev) => { const n = { ...prev }; delete n[name]; return n; });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fieldErrors = validate();
    if (Object.keys(fieldErrors).length) { setErrors(fieldErrors); return; }

    setStatus('loading');
    setErrors({});

    try {
      const res = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          Names:          form.names,
          Email:          form.email,
          Phone:          form.phone,
          'Event Date':   form.event_date,
          'Event Type':   form.event_type,
          'Venue / Location': form.venue,
          Message:        form.message,
          _subject:       `New Inquiry from ${form.names} — Lumina Studio`,
        }),
      });

      if (res.ok) {
        setStatus('success');
        setForm(initialForm);
      } else {
        const data = await res.json();
        setErrorMsg(data?.errors?.[0]?.message || 'Something went wrong. Please try again.');
        setStatus('error');
      }
    } catch {
      setErrorMsg('Network error. Please check your connection and try again.');
      setStatus('error');
    }
  };

  /* ── field class ── */
  const fieldCls = (name) =>
    `w-full bg-transparent border-b py-3 text-white outline-none transition-colors duration-200 placeholder-gray-600 text-sm ${
      errors[name] ? 'border-red-500' : 'border-white/10 focus:border-gold-500'
    }`;

  return (
    <section id="contact" className="py-16 md:py-24 bg-dark-800 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 pointer-events-none" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="flex flex-col lg:flex-row gap-0 bg-dark-900 rounded-sm border border-white/5 overflow-hidden">

          {/* ── LEFT INFO PANEL ── */}
          <div
            className="w-full lg:w-2/5 p-8 lg:p-16 flex flex-col justify-between relative overflow-hidden"
            style={{
              backgroundImage: "url('/iiim/pexels-legacy-shots-by-sharan-sathya-692552845-29497170.jpg')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            {/* Full opaque dark overlay — guarantees readability */}
            <div
              className="absolute inset-0 z-0"
              style={{
                background: 'linear-gradient(135deg, rgba(5,5,5,0.97) 0%, rgba(10,8,5,0.94) 60%, rgba(20,14,6,0.92) 100%)',
              }}
            />
            {/* Subtle gold shimmer at top */}
            <div
              className="absolute top-0 left-0 right-0 h-px z-0"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(176,141,91,0.6), transparent)' }}
            />

            <div className="relative z-10">
              <span
                className="tracking-[0.35em] uppercase text-xs font-semibold mb-4 block"
                style={{ color: '#D4A96A', textShadow: '0 1px 6px rgba(0,0,0,0.8)' }}
              >
                Let's Connect
              </span>
              <h2
                className="text-3xl font-serif text-white mb-5 leading-snug"
                style={{ textShadow: '0 2px 12px rgba(0,0,0,0.9)' }}
              >
                Begin Your<br />Journey
              </h2>
              <p
                className="font-light mb-10 text-sm leading-relaxed"
                style={{ color: '#CBD5E1', textShadow: '0 1px 6px rgba(0,0,0,0.8)' }}
              >
                We take on a limited number of weddings each year to ensure the highest quality experience. Reach out to check our availability.
              </p>

              <div className="space-y-5">
                {/* Email */}
                <div
                  className="flex items-center gap-4 rounded-lg px-4 py-3"
                  style={{ background: 'rgba(176,141,91,0.10)', border: '1px solid rgba(176,141,91,0.18)' }}
                >
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: 'rgba(176,141,91,0.18)' }}
                  >
                    <Mail size={16} style={{ color: '#D4A96A' }} />
                  </div>
                  <div>
                    <h4
                      className="text-xs uppercase tracking-widest mb-0.5"
                      style={{ color: '#D4A96A', textShadow: '0 1px 4px rgba(0,0,0,0.9)' }}
                    >
                      Email
                    </h4>
                    <a
                      href="mailto:hello@luminastudio.com"
                      className="text-sm font-light transition-colors"
                      style={{ color: '#F1F5F9', textShadow: '0 1px 6px rgba(0,0,0,0.9)' }}
                      onMouseEnter={e => e.target.style.color='#D4A96A'}
                      onMouseLeave={e => e.target.style.color='#F1F5F9'}
                    >
                      hello@luminastudio.com
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div
                  className="flex items-center gap-4 rounded-lg px-4 py-3"
                  style={{ background: 'rgba(176,141,91,0.10)', border: '1px solid rgba(176,141,91,0.18)' }}
                >
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: 'rgba(176,141,91,0.18)' }}
                  >
                    <Phone size={16} style={{ color: '#D4A96A' }} />
                  </div>
                  <div>
                    <h4
                      className="text-xs uppercase tracking-widest mb-0.5"
                      style={{ color: '#D4A96A', textShadow: '0 1px 4px rgba(0,0,0,0.9)' }}
                    >
                      Phone
                    </h4>
                    <a
                      href="tel:+911234567890"
                      className="text-sm font-light transition-colors"
                      style={{ color: '#F1F5F9', textShadow: '0 1px 6px rgba(0,0,0,0.9)' }}
                      onMouseEnter={e => e.target.style.color='#D4A96A'}
                      onMouseLeave={e => e.target.style.color='#F1F5F9'}
                    >
                      +91 12345 67890
                    </a>
                  </div>
                </div>

                {/* Studio Address */}
                <div
                  className="flex items-start gap-4 rounded-lg px-4 py-3"
                  style={{ background: 'rgba(176,141,91,0.10)', border: '1px solid rgba(176,141,91,0.18)' }}
                >
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                    style={{ background: 'rgba(176,141,91,0.18)' }}
                  >
                    <MapPin size={16} style={{ color: '#D4A96A' }} />
                  </div>
                  <div>
                    <h4
                      className="text-xs uppercase tracking-widest mb-0.5"
                      style={{ color: '#D4A96A', textShadow: '0 1px 4px rgba(0,0,0,0.9)' }}
                    >
                      Studio
                    </h4>
                    <p
                      className="text-sm font-light leading-relaxed"
                      style={{ color: '#F1F5F9', textShadow: '0 1px 6px rgba(0,0,0,0.9)' }}
                    >
                      120 Fine Art Avenue, Suite 404<br />Mumbai, MH 400050
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative z-10 mt-10 pt-8" style={{ borderTop: '1px solid rgba(176,141,91,0.25)' }}>
              <a
                href="https://wa.me/911234567890"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 py-3 px-6 rounded-sm font-medium uppercase tracking-widest text-xs transition-all duration-300"
                style={{ background: '#25D366', color: '#fff' }}
                onMouseEnter={e => e.currentTarget.style.background='#1fbc59'}
                onMouseLeave={e => e.currentTarget.style.background='#25D366'}
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Quick Chat on WhatsApp
              </a>
            </div>
          </div>

          {/* ── RIGHT FORM PANEL ── */}
          <div className="w-full lg:w-3/5 p-8 lg:p-16 relative">

            <AnimatePresence mode="wait">

              {/* ── SUCCESS STATE ── */}
              {status === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.93 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col items-center justify-center text-center h-full min-h-[420px] gap-6"
                >
                  <div className="w-20 h-20 rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center">
                    <CheckCircle className="text-gold-500" size={38} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-serif text-white mb-3">Inquiry Received!</h3>
                    <p className="text-gray-400 font-light text-sm max-w-sm leading-relaxed">
                      Thank you for reaching out. We've received your inquiry and will get back to you within <span className="text-gold-400">24–48 hours</span>.
                    </p>
                  </div>
                  <button
                    onClick={() => setStatus('idle')}
                    className="mt-2 text-xs uppercase tracking-widest text-gold-500 border border-gold-500/30 px-6 py-2.5 rounded-sm hover:bg-gold-500/10 transition-colors"
                  >
                    Send Another Inquiry
                  </button>
                </motion.div>
              ) : (

              /* ── FORM STATE ── */
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-2xl text-white font-serif mb-1">Inquire About Your Date</h3>
                <p className="text-gray-500 text-xs mb-8 tracking-wide">Fields marked <span className="text-gold-500">*</span> are required.</p>

                {/* ── Global error banner ── */}
                <AnimatePresence>
                  {status === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex items-start gap-3 bg-red-500/10 border border-red-500/30 rounded-sm px-4 py-3 mb-6"
                    >
                      <AlertCircle className="text-red-400 shrink-0 mt-0.5" size={16} />
                      <p className="text-red-400 text-xs leading-relaxed">{errorMsg}</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <form onSubmit={handleSubmit} noValidate className="space-y-5">

                  {/* Row 1 — Names + Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-gray-400 text-[10px] uppercase tracking-widest mb-2">
                        Names <span className="text-gold-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="names"
                        value={form.names}
                        onChange={handleChange}
                        placeholder="Rohan &amp; Ananya"
                        className={fieldCls('names')}
                      />
                      {errors.names && <p className="text-red-400 text-[10px] mt-1">{errors.names}</p>}
                    </div>
                    <div>
                      <label className="block text-gray-400 text-[10px] uppercase tracking-widest mb-2">
                        Email <span className="text-gold-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        className={fieldCls('email')}
                      />
                      {errors.email && <p className="text-red-400 text-[10px] mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  {/* Row 2 — Phone + Event Date */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-gray-400 text-[10px] uppercase tracking-widest mb-2">Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
                        className={fieldCls('phone')}
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-[10px] uppercase tracking-widest mb-2">Event Date</label>
                      <input
                        type="date"
                        name="event_date"
                        value={form.event_date}
                        onChange={handleChange}
                        className={`${fieldCls('event_date')} color-scheme-dark`}
                      />
                    </div>
                  </div>

                  {/* Row 3 — Event Type */}
                  <div>
                    <label className="block text-gray-400 text-[10px] uppercase tracking-widest mb-2">
                      Event Type <span className="text-gold-500">*</span>
                    </label>
                    <select
                      name="event_type"
                      value={form.event_type}
                      onChange={handleChange}
                      className={`${fieldCls('event_type')} appearance-none bg-transparent`}
                    >
                      <option value="" disabled>Select an option</option>
                      <option value="Wedding">Wedding</option>
                      <option value="Pre-Wedding Shoot">Pre-Wedding Shoot</option>
                      <option value="Engagement">Engagement</option>
                      <option value="Elopement">Elopement</option>
                      <option value="Other Celebration">Other Celebration</option>
                    </select>
                    {errors.event_type && <p className="text-red-400 text-[10px] mt-1">{errors.event_type}</p>}
                  </div>

                  {/* Row 4 — Venue */}
                  <div>
                    <label className="block text-gray-400 text-[10px] uppercase tracking-widest mb-2">Venue / Location</label>
                    <input
                      type="text"
                      name="venue"
                      value={form.venue}
                      onChange={handleChange}
                      placeholder="Where is it happening?"
                      className={fieldCls('venue')}
                    />
                  </div>

                  {/* Row 5 — Message */}
                  <div>
                    <label className="block text-gray-400 text-[10px] uppercase tracking-widest mb-2">Tell Us Your Vision</label>
                    <textarea
                      rows={4}
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="We'd love to hear about the aesthetic, mood, and details..."
                      className={`${fieldCls('message')} resize-none`}
                    />
                  </div>

                  {/* Submit */}
                  <div className="flex justify-end pt-2">
                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="btn-primary flex items-center justify-center gap-2 min-w-[180px] disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {status === 'loading' ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          Sending…
                        </>
                      ) : (
                        <>
                          Submit Inquiry <Send size={15} />
                        </>
                      )}
                    </button>
                  </div>

                </form>
              </motion.div>
              )}

            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
