import { useLanguage } from "@/contexts/LanguageContext";
import { homeContent } from "@/data";
import { Calculator, ChartBar, LineChart } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";

const FeatureCard = ({ icon: Icon, title, description }: { title: any; description: any; icon: any }) => (
  <Card className="transition-all hover:shadow-lg">
    <CardHeader>
      <Icon className="h-8 w-8 text-primary mb-2" />
      <CardTitle className="text-xl">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <CardDescription className="text-base">{description}</CardDescription>
    </CardContent>
  </Card>
);

const Features = () => {
  const { language } = useLanguage();
  const index = language === "fa" ? "fa" : "en";
  const t = homeContent[index];

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* Features Grid */}
      <div className="py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            icon={Calculator}
            title={t.categories.basic.title}
            description={t.categories.basic.description}
          />
          <FeatureCard
            icon={ChartBar}
            title={t.categories.advanced.title}
            description={t.categories.advanced.description}
          />
          <FeatureCard
            icon={LineChart}
            title={t.categories.visualization.title}
            description={t.categories.visualization.description}
          />
        </div>
      </div>
    </main>
  );
};

export default Features;
