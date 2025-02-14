import Footer from "../Footer";
import Benefits from "./Benefits";
import Features from "./Features";
import FeedbackSection from "./Feedback";
import Hero from "./Hero";
import Navbar from "./Navbar";

const HomeComponents = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Navbar />
      <Hero />
      <Features />
      <Benefits />
      <FeedbackSection />
      <Footer />
    </div>
  );
};

export default HomeComponents;
