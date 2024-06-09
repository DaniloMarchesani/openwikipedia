
import { Button } from "@/components/ui/button";
import { Github, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import AnimatedBg from "@/components/common/AnimatedBg";


const Home = () => {


  return (
    <div className="flex flex-col w-full items-center grow">
      <section
        id="hero"
        className="grow flex flex-col justify-center items-center"
      >
        <AnimatedBg />
        <div className="mb-14">
            <h1 className="gradient-text text-7xl font-bold text-transparent animate-gradient drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">Open Wikipedia</h1>
            <h3 className="mt-4 text-xl italic font-semibold">Your knowledge, offline and personalized ✨</h3>
        </div>

        <p className="max-w-[70%] mb-10 p-2">
          Welcome to Open Wikipedia, your ultimate app for exploring,
          downloading, and customizing articles from Wikipedia, all in offline
          mode. Designed for professors, students, and group learning
          enthusiasts, Open Wikipedia allows you to take knowledge with you
          wherever you go.
        </p>

        <div className="space-x-3">
          <Button asChild variant={"outline"}>
            <Link to={"/getting-started"}>
              <Sparkles className="mr-2 h-4 w-4" />
              Getting Started
            </Link>
          </Button>
          <Button asChild>
            <Link to={"/github"}>
              <Github className="mr-2 h-4 w-4" />
              Github
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
