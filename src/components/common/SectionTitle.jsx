function SectionTitle({ children }) {
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
        {children}
      </h2>
      <div className="mt-4 h-0.5 w-full bg-gray-300 dark:bg-gray-700" />
    </div>
  );
}

export default SectionTitle;
