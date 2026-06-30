import { useState } from "react";
import { resume } from "../../data/resume";
import { contactIcons } from "../../lib/iconMaps";
import SectionTitle from "../common/SectionTitle";

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
    <div className="space-y-12">
      <SectionTitle>{contact.title}</SectionTitle>

      <div className="grid gap-12 lg:grid-cols-2">
        <div className="flex flex-col justify-center space-y-6 pl-12 lg:pl-24">
          {contact.details.map(({ icon, label, value, href }) => {
            const Icon = contactIcons[icon];
            return (
              <div key={label} className="flex items-center gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800">
                  {Icon ? <Icon className="h-4 w-4 text-gray-600 dark:text-gray-400" /> : null}
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-gray-400 dark:text-gray-500">
                    {label}
                  </p>
                  {href ? (
                    <a
                      href={href}
                      target={href.startsWith("mailto:") || href.startsWith("tel:") ? undefined : "_blank"}
                      rel={href.startsWith("mailto:") || href.startsWith("tel:") ? undefined : "noopener noreferrer"}
                      className="text-sm font-medium text-gray-900 transition-colors hover:text-gray-600 dark:text-gray-100 dark:hover:text-gray-300"
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{value}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {contact.form.fields.map((field) => (
            <div key={field.id}>
              <label
                htmlFor={field.id}
                className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400"
              >
                {field.label}
              </label>
              <input
                id={field.id}
                type={field.type}
                name={field.id}
                value={formData[field.id]}
                onChange={handleChange}
                required
                placeholder={field.placeholder}
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 transition-colors duration-200 focus:border-gray-400 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:placeholder:text-gray-600 dark:focus:border-gray-500"
              />
            </div>
          ))}

          <div>
            <label
              htmlFor={contact.form.messageField.id}
              className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400"
            >
              {contact.form.messageField.label}
            </label>
            <textarea
              id={contact.form.messageField.id}
              name={contact.form.messageField.id}
              value={formData[contact.form.messageField.id]}
              onChange={handleChange}
              required
              rows={5}
              placeholder={contact.form.messageField.placeholder}
              className="w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 transition-colors duration-200 focus:border-gray-400 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:placeholder:text-gray-600 dark:focus:border-gray-500"
            />
          </div>

          <button
            type="submit"
            disabled={sending}
            className="w-full rounded-xl bg-gray-900 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200"
          >
            {sending ? contact.form.submittingLabel : contact.form.submitLabel}
          </button>

          {status.message && (
            <p
              className={`text-center text-sm font-medium ${
                status.type === "success" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
              }`}
            >
              {status.message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default ContactSection;
