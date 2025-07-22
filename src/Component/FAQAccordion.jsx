import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    question: "Why Do You Charge A Verification Fee?",
    answer:
      "You can find a wide variety of AI tools on this page, covering all application areas, such as text generation, automatic translation, image recognition, and much more.",
  },
  {
    question: "Are All Websites Accepted?",
    answer:
      "Most websites are accepted as long as they comply with our content guidelines and provide legitimate AI-related services or tools.",
  },
  {
    question: "Is NSFW Content Allowed?",
    answer:
      "No, NSFW (Not Safe For Work) or adult content is not allowed on our platform to maintain a safe and professional environment.",
  },
  {
    question: "What Are Featured Listings? How Do I Feature My Tool?",
    answer:
      "Featured listings are highlighted prominently on the homepage. You can feature your tool by selecting the featured option during submission and completing the verification process.",
  },
  {
    question: "How Does The Banner Look When I'm Featured?",
    answer:
      "Your tool will be shown in a larger banner with more visibility, including a highlighted background and call-to-action button to drive more clicks.",
  },
  {
    question: "What’s 7 Days Among The 8 Featured?",
    answer:
      "This refers to a 7-day rotation where your tool remains one of the top 8 featured listings during that time frame.",
  },
  {
    question: "Do I Get A Dofollow Link With My Listing?",
    answer:
      "Yes, verified and featured listings include a dofollow link, which can help improve your website's SEO and domain authority.",
  },
  {
    question: "How Long Will My Tool Be On AIxploria?",
    answer:
      "Your tool will remain listed indefinitely unless it violates our terms or you request removal. Featured visibility is based on the duration you select.",
  },
];


export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className=" bg-black flex items-start justify-center font-[Poppins] p-6">
      <div className="w-full max-w-7xl">
        <h2 className="text-center text-[#FA9021] text-[32px] font-bold mb-6">
          FREQUENTLY ASKED QUESTIONS
        </h2>
        <div className="space-y-2">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-[#191919] text-[#767676] w-full rounded-md "
            >
              <button
                onClick={() => toggle(index)}
                className={`flex justify-between items-center w-full px-6 cursor-pointer py-4 text-left font-medium ${openIndex === index ? "text-[#E67802]" : ""
                  }`}
              >
                <span>{`${index + 1}. ${faq.question}`}</span>
                {openIndex === index ? (
                  <ChevronUp size={20} />
                ) : (
                  <ChevronDown size={20} />
                )}
              </button>
              {openIndex === index && faq.answer && (
                <div className="px-4 pb-4 text-sm text-[#767676]">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
