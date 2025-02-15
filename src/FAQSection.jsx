import React, { useState } from "react";

const faqData = [
  {
    id: 1,
    question: "What are green investments?",
    answer:
      "Green investments focus on companies and funds that prioritize environmental sustainability, such as renewable energy and eco-friendly initiatives.",
  },
  {
    id: 2,
    question: "How can I check a company's sustainability score?",
    answer:
      "You can check sustainability scores on financial platforms, or use our GreenVest platform to analyze a company's ESG ratings.",
  },
  {
    id: 3,
    question: "Are green investments profitable?",
    answer:
      "Yes, many green investments provide strong long-term returns while promoting sustainability and reducing environmental impact.",
  },
  {
    id: 4,
    question: "What is an ESG score?",
    answer:
      "An ESG score measures a company's environmental, social, and governance impact, helping investors assess sustainability risks.",
  },
];

const FAQItem = ({ question, answer, isOpen, toggle }) => (
  <div className="border border-gray-700 rounded-lg hover:border-green-500/50 
                  transition-all duration-300 group">
    <button
      className="w-full text-left p-4 bg-gray-900 hover:bg-gray-800 
                 transition-all duration-300 flex justify-between items-center 
                 rounded-lg group-hover:text-green-400"
      onClick={toggle}
    >
      <span className="font-semibold text-lg text-white">{question}</span>
      <span className="text-white text-xl font-bold transition-transform duration-300 
                       transform group-hover:scale-110 group-hover:text-green-400">
        {isOpen ? "−" : "+"}
      </span>
    </button>
    {isOpen && (
      <div className="overflow-hidden transition-all duration-300">
        <p className="p-4 text-gray-300 border-t border-gray-700 bg-gray-900/50 
                      leading-relaxed">
          {answer}
        </p>
      </div>
    )}
  </div>
);

const FAQSection = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  return (
    <section className="py-20 bg-gray-800 text-gray-100">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 
                         bg-gradient-to-r from-green-400 to-green-600 
                         bg-clip-text text-transparent">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-300 text-lg">
            Everything you need to know about green investments
          </p>
        </div>

        <div className="space-y-4">
          {faqData.map((faq) => (
            <FAQItem
              key={faq.id}
              question={faq.question}
              answer={faq.answer}
              isOpen={openFAQ === faq.id}
              toggle={() => setOpenFAQ(openFAQ === faq.id ? null : faq.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
