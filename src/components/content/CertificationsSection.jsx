import { useState } from "react";
import { resume } from "../../data/resume";
import SectionTitle from "../common/SectionTitle";

function CertificationsSection() {
  const { certifications } = resume;
  const [activePdf, setActivePdf] = useState(null);

  return (
    <div className="space-y-12">
      <SectionTitle>{certifications.title}</SectionTitle>

      <div className="grid gap-6">
        {certifications.items.map((cert) => (
          <button
            key={cert.name}
            type="button"
            onClick={() => setActivePdf(cert)}
            className="group flex w-full items-center justify-between rounded-xl border border-gray-200 p-6 text-left transition-colors duration-200 hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-900"
          >
            <div>
              <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">
                {cert.name}
              </h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{cert.issuer}</p>
              <p className="mt-1 text-sm text-gray-400 dark:text-gray-500">{cert.date}</p>
            </div>
            <span className="text-sm font-medium text-gray-400 transition-colors duration-200 group-hover:text-gray-900 dark:group-hover:text-gray-100">
              View &rarr;
            </span>
          </button>
        ))}
      </div>

      {activePdf && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={() => setActivePdf(null)}
        >
          <div
            className="relative mx-4 flex h-[85vh] w-full max-w-4xl flex-col overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 dark:border-gray-700">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                {activePdf.name}
              </h3>
              <button
                type="button"
                onClick={() => setActivePdf(null)}
                className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-100"
                aria-label="Close"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <object
              data={activePdf.pdf}
              type="application/pdf"
              className="flex-1"
              aria-label={`${activePdf.name} certificate`}
            >
              <div className="flex h-full flex-col items-center justify-center gap-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  PDF preview not available in this browser.
                </p>
                <a
                  href={activePdf.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-gray-700 underline hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
                >
                  Open PDF
                </a>
              </div>
            </object>
          </div>
        </div>
      )}
    </div>
  );
}

export default CertificationsSection;
