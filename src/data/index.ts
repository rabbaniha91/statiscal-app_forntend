import { AnalysisCategory } from "@/types";

export const homeContent = {
  en: {
    nav: {
      home: { path: "/", title: "Home" },
      tools: { path: "/tools", title: "Tools" },
      learn: { path: "/learn", title: "Learn" },
      about: { path: "/about", title: "About" },
      login: { path: "/login", title: "Login" },
      profile: { path: "/profile", title: "Profile" },
    },
    hero: {
      title: "Advanced Statistical Analysis",
      subtitle: "Powerful statistical tools for researchers and analysts",
      description:
        "Transform your research with our comprehensive suite of statistical tools. From basic analysis to advanced modeling, weve got you covered.",
      cta: {
        primary: "Get Started",
        tools: "Explore Tools",
      },
      stats: {
        users: "10K+ Users",
        calculations: "1M+ Calculations",
        institutions: "500+ Institutions",
      },
      tools: {
        trigger: "Quick Access",
        basic: "Basic Statistics",
        advanced: "Advanced Analysis",
        visualization: "Data Visualization",
        research: "Research Tools",
      },
    },
    categories: {
      basic: {
        title: "Basic Statistics",
        description: "Fundamental statistical calculations and analysis tools",
      },
      advanced: {
        title: "Advanced Statistics",
        description: "Complex statistical methods for in-depth research",
      },
      visualization: {
        title: "Data Visualization",
        description: "Interactive charts and graphs for better insights",
      },
    },
    benefits: {
      title: "Why Choose Our Platform",
      items: [
        {
          title: "User-Friendly Interface",
          description: "Intuitive design that makes complex statistical analysis accessible to everyone",
        },
        {
          title: "Comprehensive Tools",
          description: "From basic calculations to advanced statistical methods, all in one place",
        },
        {
          title: "Multi-language Support",
          description: "Work in your preferred language with our bilingual interface",
        },
        {
          title: "Expert Support",
          description: "Get help from our community of statisticians and researchers",
        },
      ],
    },
    feedback: {
      title: "Share Your Feedback",
      subtitle: "Help us improve our platform",
      namePlaceholder: "Your name",
      emailPlaceholder: "Your email",
      messagePlaceholder: "Your message...",
      submit: "Send Feedback",
    },
    footer: {
      about: {
        title: "About Us",
        description: "Advanced statistical analysis platform for researchers and analysts",
      },
      links: {
        title: "Quick Links",
        items: ["Home", "Tools", "Documentation", "Support"],
      },
      contact: {
        title: "Contact",
        email: "support@statapp.com",
        phone: "+1 234 567 890",
      },
      copyright: "© 2025 StatApp. All rights reserved.",
    },
  },
  fa: {
    nav: {
      home: { path: "/", title: "خانه" },
      tools: { path: "/tools", title: "ابزارها" },
      learn: { path: "/learn", title: "آموزش" },
      about: { path: "/about", title: "درباره ما" },
      login: { path: "/login", title: "ورود" },
      profile: { path: "/profile", title: "پنل کاربری" },
    },
    hero: {
      title: "تحلیل‌های آماری پیشرفته",
      subtitle: "ابزارهای قدرتمند آماری برای پژوهشگران و تحلیلگران",
      description: "پژوهش خود را با مجموعه جامع ابزارهای آماری ما متحول کنید. از تحلیل‌های پایه تا مدل‌سازی پیشرفته، ما کنار شما هستیم.",
      cta: {
        primary: "شروع کنید",
        tools: "مشاهده ابزارها",
      },
      stats: {
        users: "+۱۰ هزار کاربر",
        calculations: "+۱ میلیون محاسبه",
        institutions: "+۵۰۰ موسسه",
      },
      tools: {
        trigger: "دسترسی سریع",
        basic: "آمار پایه",
        advanced: "تحلیل پیشرفته",
        visualization: "تجسم داده",
        research: "ابزارهای پژوهشی",
      },
    },
    categories: {
      basic: {
        title: "آمار پایه",
        description: "محاسبات و ابزارهای تحلیل آماری پایه",
      },
      advanced: {
        title: "آمار پیشرفته",
        description: "روش‌های آماری پیچیده برای تحقیقات عمیق",
      },
      visualization: {
        title: "تجسم داده",
        description: "نمودارها و گراف‌های تعاملی برای بینش بهتر",
      },
    },
    benefits: {
      title: "چرا پلتفرم ما را انتخاب کنید",
      items: [
        {
          title: "رابط کاربری آسان",
          description: "طراحی بصری که تحلیل‌های آماری پیچیده را برای همه قابل دسترس می‌کند",
        },
        {
          title: "ابزارهای جامع",
          description: "از محاسبات پایه تا روش‌های آماری پیشرفته، همه در یک مکان",
        },
        {
          title: "پشتیبانی چند زبانه",
          description: "با رابط دو زبانه ما به زبان دلخواه خود کار کنید",
        },
        {
          title: "پشتیبانی تخصصی",
          description: "از جامعه آمارشناسان و پژوهشگران ما کمک بگیرید",
        },
      ],
    },
    feedback: {
      title: "ارسال بازخورد",
      subtitle: "به ما در بهبود پلتفرم کمک کنید",
      namePlaceholder: "نام شما",
      emailPlaceholder: "ایمیل شما",
      messagePlaceholder: "پیام شما...",
      submit: "ارسال بازخورد",
    },
    footer: {
      about: {
        title: "درباره ما",
        description: "پلتفرم تحلیل آماری پیشرفته برای پژوهشگران و تحلیلگران",
      },
      links: {
        title: "لینک‌های سریع",
        items: ["خانه", "ابزارها", "مستندات", "پشتیبانی"],
      },
      contact: {
        title: "تماس",
        email: "support@statapp.com",
        phone: "+۱ ۲۳۴ ۵۶۷ ۸۹۰",
      },
      copyright: "© ۲۰۲۵ StatApp. تمامی حقوق محفوظ است.",
    },
  },
};

export const statiscalTabs = {
  en: {
    title: {
      charts: "Charts",
      bsicData: "Baisc Data",
    },
  },
  fa: {
    title: {
      charts: "نمودارها",
      bsicData: "اطلاعات پایه",
    },
  },
};

export const statisticalTests: AnalysisCategory[] = [
  {
    id: "descriptive",
    title: { en: "Descriptive Analysis", fa: "تحلیل توصیفی" },
    subcategories: [
      {
        id: "central-tendency",
        title: { en: "Central Tendency", fa: "شاخص‌های مرکزی" },
        tests: [
          {
            id: "mean-median-mode",
            title: { en: "Mean, Median, Mode", fa: "میانگین، میانه، مد" },
            dataRequirements: { type: "single", minSamples: 1 },
          },
        ],
      },
      // اضافه شده: شاخص‌های پراکندگی
      {
        id: "dispersion",
        title: { en: "Dispersion Measures", fa: "شاخص‌های پراکندگی" },
        tests: [
          {
            id: "variance-std",
            title: { en: "Variance, Standard Deviation", fa: "واریانس، انحراف معیار" },
            dataRequirements: { type: "single", minSamples: 2 },
          },
          {
            id: "range-iqr",
            title: { en: "Range, IQR", fa: "دامنه، دامنه بین چارکی" },
            dataRequirements: { type: "single", minSamples: 2 },
          },
        ],
      },
    ],
  },
  {
    id: "hypothesis",
    title: { en: "Hypothesis Testing", fa: "آزمون فرضیه" },
    subcategories: [
      {
        id: "t-tests",
        title: { en: "T-Tests", fa: "آزمون‌های t" },
        tests: [
          {
            id: "one-sample-t",
            title: { en: "One Sample T-Test", fa: "آزمون t تک نمونه‌ای" },
            dataRequirements: { type: "single", minSamples: 30 },
          },
          {
            id: "paired-t",
            title: { en: "Paired T-Test", fa: "آزمون t زوجی" },
            dataRequirements: { type: "paired", minSamples: 30 },
          },
          // اضافه شده: آزمون t دو نمونه مستقل
          {
            id: "independent-t",
            title: { en: "Independent T-Test", fa: "آزمون t دو نمونه مستقل" },
            dataRequirements: { type: "two-independent", minSamples: 30 },
          },
        ],
      },
      {
        id: "z-tests",
        title: { en: "Z-Tests", fa: "آزمون‌های z" },
        tests: [
          {
            id: "one-proportion-z",
            title: { en: "One Proportion Z-Test", fa: "آزمون z تک نسبتی" },
            dataRequirements: { type: "single", minSamples: 50 },
          },
          // اضافه شده: آزمون z برای میانگین
          {
            id: "one-mean-z",
            title: { en: "One Mean Z-Test", fa: "آزمون z تک میانگین" },
            dataRequirements: { type: "single", minSamples: 50 },
          },
        ],
      },
      // اضافه شده: ANOVA
      {
        id: "anova",
        title: { en: "ANOVA", fa: "آنالیز واریانس" },
        tests: [
          {
            id: "one-way-anova",
            title: { en: "One-Way ANOVA", fa: "آنوا یک طرفه" },
            dataRequirements: { type: "multi-group", minSamples: 30 },
          },
        ],
      },
      // اضافه شده: آزمون‌های نرمالیتی
      {
        id: "normality",
        title: { en: "Normality Tests", fa: "آزمون‌های نرمالیتی" },
        tests: [
          {
            id: "shapiro-wilk",
            title: { en: "Shapiro-Wilk", fa: "شاپیرو-ویلک" },
            dataRequirements: { type: "single", minSamples: 3 },
          },
          {
            id: "kolmogorov-smirnov",
            title: { en: "Kolmogorov-Smirnov", fa: "کولموگوروف-اسمیرنوف" },
            dataRequirements: { type: "single", minSamples: 5 },
          },
        ],
      },
    ],
  },
  {
    id: "regression",
    title: { en: "Regression", fa: "رگرسیون" },
    subcategories: [
      {
        id: "linear",
        title: { en: "Linear Regression", fa: "رگرسیون خطی" },
        tests: [
          {
            id: "simple-linear",
            title: { en: "Simple Linear", fa: "رگرسیون ساده" },
            dataRequirements: { type: "paired", minSamples: 30 },
          },
          // اضافه شده: رگرسیون چندگانه
          {
            id: "multiple-linear",
            title: { en: "Multiple Linear", fa: "رگرسیون چندگانه" },
            dataRequirements: { type: "multi-variable", minSamples: 50 },
          },
        ],
      },
      // اضافه شده: رگرسیون غیرخطی
      {
        id: "nonlinear",
        title: { en: "Nonlinear Regression", fa: "رگرسیون غیرخطی" },
        tests: [
          {
            id: "logistic-reg",
            title: { en: "Logistic Regression", fa: "رگرسیون لجستیک" },
            dataRequirements: { type: "categorical", minSamples: 100 },
          },
        ],
      },
    ],
  },
  // اضافه شده: آزمون‌های ناپارامتریک
  {
    id: "nonparametric",
    title: { en: "Nonparametric Tests", fa: "آزمون‌های ناپارامتریک" },
    subcategories: [
      {
        id: "mann-whitney",
        title: { en: "Mann-Whitney U", fa: "من-ویتنی" },
        tests: [
          {
            id: "mann-whitney",
            title: { en: "Mann-Whitney U Test", fa: "آزمون من-ویتنی" },
            dataRequirements: { type: "two-independent", minSamples: 20 },
          },
        ],
      },
      {
        id: "kruskal-wallis",
        title: { en: "Kruskal-Wallis", fa: "کروسکال-والیس" },
        tests: [
          {
            id: "kruskal-wallis",
            title: { en: "Kruskal-Wallis Test", fa: "آزمون کروسکال-والیس" },
            dataRequirements: { type: "multi-group", minSamples: 20 },
          },
        ],
      },
    ],
  },
  // اضافه شده: آزمون‌های همبستگی
  {
    id: "correlation",
    title: { en: "Correlation Analysis", fa: "تحلیل همبستگی" },
    subcategories: [
      {
        id: "pearson",
        title: { en: "Pearson Correlation", fa: "همبستگی پیرسون" },
        tests: [
          {
            id: "pearson",
            title: { en: "Pearson's r", fa: "ضریب پیرسون" },
            dataRequirements: { type: "paired", minSamples: 30 },
          },
        ],
      },
      {
        id: "spearman",
        title: { en: "Spearman Correlation", fa: "همبستگی اسپیرمن" },
        tests: [
          {
            id: "spearman",
            title: { en: "Spearman's rho", fa: "ضریب اسپیرمن" },
            dataRequirements: { type: "paired", minSamples: 20 },
          },
        ],
      },
    ],
  },
];

export const basicStatiscalContent = {
  en: {
    dataInput: {
      title: "Data Input",
      description: "Enter your data manually or upload a file",
      manual: {
        title: "Manual Input",
        addRow: "Add Row",
        value: "Value",
        actions: "Actions",
      },
      file: {
        title: "File Upload",
        description: "Upload CSV or Excel file",
        drag: "Drag and drop your file here",
        or: "or",
        browse: "Browse Files",
      },
    },
    results: {
      title: "Statistical Results",
      mean: "Mean",
      median: "Median",
      variance: "Variance",
      stdDev: "Standard Deviation",
      cv: "Coefficient of Variation",
      q1: "First Quartile",
      q2: "Second Quartile",
      q3: "Third Quartile",
      min: "Minimum",
      max: "Maximum",
      skewness: "Skewness",
    },
    plots: {
      title: "Data Visualization",
      boxPlot: "Box Plot",
      histogram: "Histogram",
      scatter: "Scatter Plot",
      skewness: "Skewness Plot",
      sampleSize: "Sample Size",
      densityDescription: "Description about density",
      discreteWarning: "Discrete Warning",
      continuousWarning: "Continuous Warning",
      density: "Density",
      frequency: "Frequency",
      value: "Value",
      index: "Count",
    },
  },
  fa: {
    dataInput: {
      title: "ورود داده",
      description: "داده‌ها را به صورت دستی وارد کنید یا فایل آپلود کنید",
      manual: {
        title: "ورود دستی",
        addRow: "افزودن ردیف",
        value: "مقدار",
        actions: "عملیات",
      },
      file: {
        title: "آپلود فایل",
        description: "آپلود فایل CSV یا Excel",
        drag: "فایل خود را اینجا رها کنید",
        or: "یا",
        browse: "انتخاب فایل",
      },
    },
    results: {
      title: "نتایج آماری",
      mean: "میانگین",
      median: "میانه",
      variance: "واریانس",
      stdDev: "انحراف معیار",
      cv: "ضریب تغییرات",
      q1: "چارک اول",
      q2: "چارک دوم",
      q3: "چارک سوم",
      min: "حداقل",
      max: "حداکثر",
      skewness: "چولگی",
    },
    plots: {
      title: "تجسم داده",
      boxPlot: "نمودار جعبه‌ای",
      histogram: "هیستوگرام",
      scatter: "نمودار پراکندگی",
      skewness: "نمودار توزیع",
      sampleSize: "اندازه نمونه",
      densityDescription: "توضیحات درباره منحنی چگالی",
      discreteWarning: "هشدارهای داده های گسسته",
      continuousWarning: "هشدارهای داده های پیوسته",
      density: "Density",
      frequency: "Frequency",
      value: "Value",
      index: "Count",
    },
  },
};
