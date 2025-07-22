import React, { useState } from 'react';

const FAQ = ({ question, answer, index, isOpen, toggle }) => (
  <div className="border-b border-[#333]">
    <button
      onClick={() => toggle(index)}
      className="flex justify-between items-center w-full py-4 text-left"
    >
      <span
        className={`text-sm md:text-base ${isOpen ? 'text-[#E67802]' : 'text-[#767676]'
          }`}
      >
        {question}
      </span>
      <span className="text-orange-500 text-xl">{isOpen ? '−' : '+'}</span>
    </button>

    {isOpen && (
      <div className="pb-4 text-sm text-[#bbbbbb]">{answer}</div>
    )}
  </div>
);

export default function InfoSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (idx) =>
    setOpenIndex(openIndex === idx ? null : idx);

  const faqs = [
    {
      question: 'What Types Of AI Tools Can I Find On This Page?',
      answer:
        'You can find various AI tools: Chat, Generative AI, Application Assistants, Search, Text Generation, Translation, Image Recognition, and more.',
    },
    {
      question: 'How Can I Tell If A Site Is Free Or Paid?',
      answer: 'Each tool is marked as Free or Featured. Free tools are labeled clearly.',
    },
    {
      question: 'How Can I Vote For An AI?',
      answer: 'Simply click the vote button available on the tool’s card.',
    },
    {
      question: 'Conclusion',
      answer: 'This page helps you discover and interact with AI tools easily and efficiently.',
    },
  ];

  return (
    <div className="bg-black text-white px-4 md:px-12 py-10 space-y-10 font-[Poppins]">
      {/* Benefits Section */}


      {/* How to Use Section */}
      <div className="bg-[#1e1e1e] p-8 rounded-2xl relative overflow-hidden">
        <div className="absolute -right-5 -top-20 text-[100px] md:text-[180px] font-black text-white/5 select-none pointer-events-none z-0">
          AI
        </div>
        <h2 className="text-center text-orange-400 text-lg md:text-4xl font-semibold mb-10 z-10 relative">
          WHY USE FREE AI TOOLS?
        </h2>
        <ul className="list-decimal list-inside text-sm md:text-base space-y-1 text-[#767676] z-10 relative">
          <li>Access to a variety of tools without any upfront cost.</li>
          <li>The ability to test different solutions before committing.</li>
          <li>Daily updates providing an overview of new and trending items.</li>
          <li>Classification by popularity to discover the tools highly valued by the community.</li>
          <li>Easy navigation thanks to an intuitive design and effective filters.</li>
        </ul>
      </div>

      {/* FAQ Section */}
      <h2 className="text-center text-[#FA9021] text-lg md:text-4xl font-semibold mb-4">
        FREQUENTLY ASKED QUESTIONS
      </h2>
      <div className="bg-[#1e1e1e] p-6 rounded-2xl">
        {faqs.map((faq, idx) => (
          <FAQ
            key={idx}
            index={idx}
            isOpen={openIndex === idx}
            toggle={toggleFAQ}
            {...faq}
          />
        ))}
      </div>
    </div>
  );
}
