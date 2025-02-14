import { useLanguage } from "@/contexts/LanguageContext";
import { homeContent } from "@/data";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";

const Footer = () => {
  const { language } = useLanguage();
  const index = language === "fa" ? "fa" : "en";
  const t = homeContent[index];

  return (
    <footer className="dark:bg-slate-900 bg-slate-200  dark:text-slate-200 text-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t.footer.about.title}</h3>
            <p className="dark:text-slate-400 text-slate-600">{t.footer.about.description}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t.footer.links.title}</h3>
            <ul className="space-y-2">
              {t.footer.links.items.map((item, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="dark:text-slate-400 text-slate-600 dark:hover:text-slate-200 hover:text-slate-800 transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t.footer.contact.title}</h3>
            <div className="space-y-2">
              <a
                href={`mailto:${t.footer.contact.email}`}
                className="flex items-center dark:text-slate-400 text-slate-600 dark:hover:text-slate-200 hover:text-slate-800"
              >
                <Mail className="h-4 w-4 mr-2" />
                {t.footer.contact.email}
              </a>
              <div className="flex space-x-4 mt-4">
                <a
                  href="#"
                  className="dark:text-slate-400 text-slate-600 dark:hover:text-slate-200 hover:text-slate-800"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="dark:text-slate-400 text-slate-600 dark:hover:text-slate-200 hover:text-slate-800"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="dark:text-slate-400 text-slate-600 dark:hover:text-slate-200 hover:text-slate-800"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-8 text-center dark:text-slate-400 text-slate-600">{t.footer.copyright}</div>
      </div>
    </footer>
  );
};

export default Footer;
