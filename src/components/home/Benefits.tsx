import { useLanguage } from "@/contexts/LanguageContext";
import { homeContent } from "@/data";
import { Check } from "lucide-react";

const Benefits = () => {
  const { language } = useLanguage();
  const index = language === "fa" ? "fa" : "en";
  const t = homeContent[index];

  return (
    <section className="py-16 bg-slate-100 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">{t.benefits.title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {t.benefits.items.map((benefit, index) => (
            <div
              key={index}
              className="flex items-start space-x-4"
            >
              <div className="flex-shrink-0">
                <Check className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
