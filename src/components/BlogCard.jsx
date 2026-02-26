import React from 'react';

export default function BlogCard({ title, date, excerpt }) {
  return (
    <div className="group cursor-pointer bg-[#0b1b34] rounded-xl overflow-hidden border border-[#1de9b6]/20 hover:border-[#1de9b6] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_25px_#1de9b650] p-6">
      <h3 className="text-[#6fffe9] text-2xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-300 text-sm mb-4">{date}</p>
      <p className="text-gray-400">{excerpt}</p>
    </div>
  );
}
