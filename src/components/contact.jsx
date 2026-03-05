import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { Mail, Instagram, Github, Linkedin } from "lucide-react";

function Contact() {
  const formRef = useRef(null);

  const [status, setStatus] = useState({
    state: "idle", // idle | sending | success | error
    message: "",
  });

  const sendEmail = async (e) => {
    e.preventDefault();
    setStatus({ state: "sending", message: "Transmitting..." });

    try {
      const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
        console.error("Missing EmailJS environment variables");
        setStatus({
          state: "error",
          message: "Email service is not configured. Please try again later.",
        });
        return;
      }

      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, {
        publicKey: PUBLIC_KEY,
      });

      setStatus({ state: "success", message: "Message sent ✅" });
      formRef.current.reset();
    } catch (err) {
      console.error("EmailJS error:", err?.status, err?.text || err);
      setStatus({ state: "error", message: "Failed to send ❌" });
    }
  };

  return (
    <section id="contact" className="relative w-full py-28 px-6 md:px-10 lg:px-20 border-t border-white/5">
      <div className="relative mx-auto max-w-6xl">
        <p className="text-xs font-mono tracking-[0.4em] text-slate-400">// CONTACT</p>
        <h2 className="text-3xl md:text-5xl font-bold mt-3">
          Contact <span className="text-blue-400">BDACC</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mt-12">
          {/* left */}
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-2xl border border-white/10 bg-black/30 backdrop-blur-md p-6">
              <h3 className="text-lg font-semibold mb-3">Contact info</h3>

              <div className="space-y-4 text-sm">
                <InfoRow label="Email" value="bdacc_club@nitw.ac.in" />
                <InfoRow label="Phone" value="+91- 76740 34282" />
                <InfoRow label="Location" value="NIT WARANGAL" />
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="mailto:bdacc_club@nitw.ac.in"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-red-500 via-amber-400 to-green-400 text-white shadow-md hover:shadow-lg hover:brightness-110 transition text-xs font-mono tracking-widest"
                >
                  <Mail className="w-4 h-4" aria-hidden="true" />
                  <span>GMAIL</span>
                </a>
                <a
                  href="https://www.instagram.com/bdacc_nitw/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-pink-500 via-rose-500 to-yellow-400 text-white shadow-md hover:shadow-lg hover:brightness-110 transition text-xs font-mono tracking-widest"
                >
                  <Instagram className="w-4 h-4" aria-hidden="true" />
                  <span>@bdacc_club</span>
                </a>
                <a
                  href="https://github.com/bdaccell-nitw"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 text-slate-100 border border-slate-600 shadow-md hover:bg-slate-800 hover:border-slate-400 transition text-xs font-mono tracking-widest"
                >
                  <Github className="w-4 h-4" aria-hidden="true" />
                  <span>GitHub</span>
                </a>
                <a
                  href="https://www.linkedin.com/company/bdacc-nitw/posts/?feedView=all"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0a66c2] text-white shadow-md hover:bg-[#004182] transition text-xs font-mono tracking-widest"
                >
                  <Linkedin className="w-4 h-4" aria-hidden="true" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>

            {/* join CTA */}
            <div className="rounded-2xl border border-blue-400/20 bg-gradient-to-br from-blue-500/10 via-black/20 to-violet-500/10 p-6">
              <p className="text-xs font-mono tracking-[0.4em] text-blue-300/80">
                JOIN BDACC
              </p>

              <h3 className="text-xl md:text-2xl font-bold mt-3">
                Become a member
              </h3>

              <p className="text-slate-300 text-sm mt-3 leading-relaxed">
                Join BDACC and collaborate on AI projects, workshops, events and hackathons.
              </p>

              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href="/members"
                  className="px-5 py-2.5 rounded-xl border border-white/10 text-slate-300 hover:bg-white/5 transition font-mono text-xs tracking-widest"
                >
                  VIEW TEAM
                </a>
              </div>
            </div>
          </div>

          {/* right */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl border border-white/10 bg-black/30 backdrop-blur-md p-6 md:p-8">
              <h3 className="text-lg font-semibold">Send message</h3>
              <p className="text-sm text-slate-400 mt-1">
                Use this form to contact BDACC.
              </p>

              <form ref={formRef} onSubmit={sendEmail} className="space-y-4 mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Field label="Full Name" name="user_name" placeholder="Your name" required />
                  <Field label="Email" name="user_email" placeholder="you@example.com" required type="email" />
                </div>

                <Field label="Subject" name="subject" placeholder="Event / Join / Collaboration" required />

                <div>
                  <label className="text-xs font-mono tracking-widest text-slate-400">MESSAGE</label>
                  <textarea
                    name="message"
                    required
                    rows={6}
                    placeholder="Write your message..."
                    className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm outline-none focus:border-blue-400/40 focus:ring-2 focus:ring-blue-500/10"
                  />
                </div>

                {status.state !== "idle" && (
                  <div
                    className={`text-sm font-mono ${
                      status.state === "success"
                        ? "text-green-300"
                        : status.state === "error"
                        ? "text-red-300"
                        : "text-blue-300"
                    }`}
                  >
                    {status.message}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status.state === "sending"}
                  className="w-full md:w-auto px-6 py-3 rounded-xl bg-blue-500/20 border border-blue-400/40 text-blue-100 hover:bg-blue-500/30 transition font-mono text-xs tracking-widest disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status.state === "sending" ? "SENDING..." : "SEND"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-white/5 pb-3">
      <span className="text-slate-500 font-mono text-xs tracking-widest">
        {label.toUpperCase()}
      </span>
      <span className="text-slate-200 font-mono text-xs tracking-widest">
        {value}
      </span>
    </div>
  );
}

function Field({ label, name, placeholder, type = "text", required = false }) {
  return (
    <div>
      <label className="text-xs font-mono tracking-widest text-slate-400">
        {label.toUpperCase()}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm outline-none focus:border-blue-400/40 focus:ring-2 focus:ring-blue-500/10"
      />
    </div>
  );
}
export default Contact;

