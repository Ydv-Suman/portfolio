import { useState } from "react";
import TypewriterText from "../common/TypewriterText";
import { resume } from "../../data/resume";
import { contactIcons } from "../../lib/iconMaps";

function ContactSection() {
  const { contact } = resume;
  const [formData, setFormData] = useState({ email: "", message: "", name: "" });
  const [status, setStatus] = useState({ message: "", type: "" });
  const [sending, setSending] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ message: contact.form.validation, type: "error" });
      return;
    }

    try {
      setSending(true);
      setStatus({ message: "", type: "" });

      const response = await fetch(contact.form.action, {
        body: JSON.stringify({
          _replyto: formData.email,
          _subject: `Portfolio message from ${formData.name}`,
          email: formData.email,
          message: formData.message,
          name: formData.name,
        }),
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        method: "POST",
      });

      const payload = await response.json();

      if (!response.ok || payload.success === false || payload.success === "false") {
        throw new Error(payload.message || "Send failed");
      }

      setStatus({ message: contact.form.success, type: "success" });
      setFormData({ email: "", message: "", name: "" });
    } catch (error) {
      const message = error?.message?.toLowerCase() ?? "";
      setStatus({
        message: message.includes("not activated") || message.includes("confirm")
          ? contact.form.activationError
          : contact.form.fallbackError,
        type: "error",
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="space-y-3 text-center">
        <TypewriterText
          as="p"
          text={contact.eyebrow}
          className="text-sm font-semibold uppercase tracking-widest text-emerald-600"
          speed={9}
        />
        <TypewriterText
          as="h2"
          text={contact.title}
          className="text-3xl font-extrabold text-gray-900 sm:text-4xl"
          speed={10}
          startDelay={80}
        />
        <TypewriterText
          text={contact.intro}
          className="mx-auto max-w-2xl text-sm leading-relaxed text-gray-400 sm:text-base"
          speed={8}
          startDelay={160}
        />
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-4">
          {contact.details.map(({ icon, label, value, href }, index) => {
            const Icon = contactIcons[icon];

            return (
              <div
                key={label}
                className="flex items-center gap-4 rounded-2xl border border-gray-100/60 bg-white p-4 shadow-[0_4px_20px_rgba(5,150,105,0.06)]"
              >
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-100 to-teal-100">
                  {Icon ? <Icon className="h-5 w-5 text-emerald-600" /> : null}
                </div>
                <div>
                  <TypewriterText
                    as="p"
                    text={label}
                    className="mb-0.5 text-[10px] uppercase tracking-widest text-gray-400"
                    speed={9}
                    startDelay={index * 70}
                  />
                  {href ? (
                    <a href={href} className="text-sm font-semibold text-gray-900 transition-colors hover:text-emerald-600">
                      <TypewriterText as="span" text={value} speed={9} startDelay={70 + index * 70} />
                    </a>
                  ) : (
                    <TypewriterText as="p" text={value} className="text-sm font-semibold text-gray-900" speed={9} startDelay={70 + index * 70} />
                  )}
                </div>
              </div>
            );
          })}

          <div className="rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-teal-50 p-5">
            <TypewriterText text={contact.note} className="text-sm leading-relaxed text-gray-500" speed={8} startDelay={300} />
          </div>
        </div>

        <div className="rounded-2xl border border-gray-100/60 bg-white p-8 shadow-[0_4px_20px_rgba(5,150,105,0.06)]">
          <form onSubmit={handleSubmit} className="space-y-5">
            {contact.form.fields.map((field, index) => (
              <div key={field.id}>
                <label htmlFor={field.id} className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-gray-400">
                  <TypewriterText as="span" text={field.label} speed={9} startDelay={index * 60} />
                </label>
                <input
                  id={field.id}
                  type={field.type}
                  name={field.id}
                  value={formData[field.id]}
                  onChange={handleChange}
                  required
                  placeholder={field.placeholder}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50/60 px-4 py-3 text-sm text-gray-800 placeholder:text-gray-400 transition-all focus:border-emerald-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-200"
                />
              </div>
            ))}

            <div>
              <label htmlFor={contact.form.messageField.id} className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-gray-400">
                <TypewriterText as="span" text={contact.form.messageField.label} speed={9} startDelay={120} />
              </label>
              <textarea
                id={contact.form.messageField.id}
                name={contact.form.messageField.id}
                value={formData[contact.form.messageField.id]}
                onChange={handleChange}
                required
                rows={5}
                placeholder={contact.form.messageField.placeholder}
                className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50/60 px-4 py-3 text-sm text-gray-800 placeholder:text-gray-400 transition-all focus:border-emerald-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-200"
              />
            </div>

            <button
              type="submit"
              disabled={sending}
              className="w-full rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3 font-bold text-white shadow-md shadow-emerald-200/60 transition-all hover:-translate-y-0.5 hover:shadow-emerald-300/70 disabled:cursor-not-allowed disabled:translate-y-0 disabled:opacity-60"
            >
              <TypewriterText
                as="span"
                text={sending ? contact.form.submittingLabel : contact.form.submitLabel}
                speed={10}
              />
            </button>

            {status.message ? (
              <p className={`text-center text-sm font-semibold ${status.type === "success" ? "text-green-600" : "text-red-500"}`}>
                {status.message}
              </p>
            ) : null}
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactSection;
