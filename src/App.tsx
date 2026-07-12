import { useRef } from "react";
import "./index.css";
import { Hero } from "./myComponents/Hero";
import { Frise } from "./myComponents/Frise/Frise";
import { Quiz } from "./myComponents/Quizz/Quizz";

function App() {
  const friseRef = useRef<HTMLDivElement>(null);
  const quizRef = useRef<HTMLDivElement>(null);

  const scrollToFrise = () => {
    friseRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToQuiz = () => {
    quizRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen">
      <Hero onScrollToFrise={scrollToFrise} onScrollToQuiz={scrollToQuiz} />
      <div ref={friseRef}>
        <Frise />
      </div>
      <div ref={quizRef}>
        <Quiz />
      </div>
    </div>
  );
}

export default App;
