import { useLanguage } from "@/contexts/LanguageContext";
import { homeContent } from "@/data";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Send } from "lucide-react";
import { Textarea } from "../ui/textarea";

const FeedbackSection = () => {
  const { language } = useLanguage();
  const index = language === "fa" ? "fa" : "en";
  const t = homeContent[index];

  return (
    <section className="py-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">{t.feedback.title}</h2>
          <p className="text-muted-foreground">{t.feedback.subtitle}</p>
        </div>
        <form className="space-y-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input placeholder={t.feedback.namePlaceholder} />
            <Input
              type="email"
              placeholder={t.feedback.emailPlaceholder}
            />
          </div>
          <Textarea
            placeholder={t.feedback.messagePlaceholder}
            className="h-32"
          />
          <Button className="w-full">
            <Send className="h-4 w-4 mr-2" />
            {t.feedback.submit}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default FeedbackSection;
