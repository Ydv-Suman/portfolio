import { motion } from "framer-motion";

function SectionFrame({ children, sectionKey }) {
  return (
    <motion.section
      key={sectionKey}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -14 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
      className="h-full overflow-y-auto px-4 py-5 sm:px-6 lg:px-8"
    >
      <div className="mx-auto h-full max-w-6xl">{children}</div>
    </motion.section>
  );
}

export default SectionFrame;
