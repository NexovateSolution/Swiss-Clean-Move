export const SectionTitle = ({ number, title }: { number: string, title: string }) => (
  <div className="flex items-center gap-4 mb-6 mt-8 first:mt-0">
    <div className="w-8 h-8 rounded-full bg-swiss-red text-white flex items-center justify-center font-bold shrink-0 text-sm">
      {number}
    </div>
    <h2 className="text-xl md:text-2xl font-bold text-[#0A1C3E] whitespace-nowrap">{title}</h2>
    <div className="flex-1 h-[2px] bg-gray-200 mt-2"></div>
  </div>
);
