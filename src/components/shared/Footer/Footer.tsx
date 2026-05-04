import React from "react";
import Image from "next/image";
import { Sparkles } from "lucide-react";
import { InstagramIcon } from "@/components/ui/InstagramIcon";
import { FadeIn } from "@/components/shared/FadeIn";
import { SOCIAL_LINKS } from "@/constants/seo";
import { FOOTER_METADATA } from "@/constants/landing";
import { useLanguage } from "@/context/LanguageContext";

interface FooterProps {
  t: {
    title: string;
    sub: string;
    cta: string;
    copyright: string;
    waitingMsg: string;
  };
}

export const Footer = ({ t }: FooterProps) => {
  const { lang } = useLanguage();

  return (
    <footer
      className="bg-orange-50 text-slate-900 relative mt-20"
      id="contact"
    >
      {/* Wave Separator */}
      <div className="w-full absolute -top-[50px] sm:-top-[100px] left-0 right-0 z-10 pointer-events-none">
        <svg
          viewBox="0 0 1440 320"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="block w-full h-[100px] sm:h-[150px]"
        >
          <path
            fill="#fff7ed"
            fillOpacity="1"
            d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>

      <div className="pt-24 pb-10 bg-orange-50 relative z-20">
        <div className="max-w-[1200px] mx-auto px-5">
          <FadeIn>
            <div className="flex flex-col-reverse md:flex-row items-stretch bg-white rounded-[32px] overflow-hidden border-[3px] border-slate-900 shadow-hard-xl mb-16 transition-transform duration-300 hover:-translate-y-1 hover:shadow-[12px_12px_0px_#0f172a] min-h-[450px]">
              {/* Left Side: Text */}
              <div className="flex-[1.2] p-8 md:p-12 flex flex-col justify-center relative bg-[radial-gradient(#e2e8f0_1.5px,transparent_1.5px)] bg-[length:20px_20px]">
                <div className="absolute top-8 right-8 animate-float-decor">
                  <Sparkles size={24} className="text-amber-500" />
                </div>

                <h2 className="text-[2.5rem] m-0 mb-6 leading-[1.1] font-heading font-bold">
                  {t.title}
                </h2>
                <p className="text-[1.1rem] text-slate-700 mb-10 max-w-[450px] leading-[1.6]">
                  {t.sub}
                </p>

                <div>
                  <a
                    href={SOCIAL_LINKS.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-3 bg-primary text-white px-8 py-4 rounded-2xl font-hand text-2xl font-bold no-underline border-[3px] border-slate-900 shadow-hard-lg transition-all duration-200 hover:-translate-2 hover:-translate-y-2 hover:shadow-hard-xl hover:bg-primary-dark active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0px_#0f172a]"
                  >
                    <InstagramIcon size={24} />
                    <span>{t.cta}</span>
                  </a>
                </div>
              </div>

              {/* Right Side: Image */}
              <div className="flex-1 relative min-h-[250px] md:min-h-full overflow-hidden border-t-[3px] md:border-t-0 md:border-l-[3px] border-slate-900 group">
                <Image
                  src={FOOTER_METADATA.image.url}
                  alt={FOOTER_METADATA.image.alt[lang]}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"></div>

                {/* Floating Message Bubble */}
                <div className="absolute bottom-6 left-6 right-6 md:right-auto bg-white py-3 px-5 rounded-[20px_20px_20px_4px] shadow-lg flex items-center gap-3 border-2 border-slate-900 animate-pop-in">
                  <span className="text-2xl">👋</span>
                  <span className="font-bold font-hand text-lg text-slate-900">
                    {t.waitingMsg}
                  </span>
                </div>
              </div>
            </div>
          </FadeIn>

          <div className="border-t-2 border-dashed border-slate-300 pt-8 text-center text-slate-600 text-sm font-medium">
            © {new Date().getFullYear()} {t.copyright}
          </div>
        </div>
      </div>
    </footer>
  );
};
