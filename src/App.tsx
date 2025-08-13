import { useState } from "react"
import About from "./components/About"
import Banner from "./components/Banner"
import Feedbacks from "./components/Feedbacks"
import Footer from "./components/Footer"
import Header from "./components/Header"
import Members from "./components/Members"
import Projects from "./components/Projects"
import Services from "./components/Services"
import SignUpPage from "./components/SignUpPage"
import Contact from "./components/Contact"

const App = () => {
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);

  const handleSignUpOpen = () => {
    setIsSignUpOpen(true);
  };

  const handleSignUpClose = () => {
    setIsSignUpOpen(false);
  };

  return (
    <div className="w-full h-full flex flex-col">
      <Header onSignUpClick={handleSignUpOpen} />
      <About />
      <Services />
      <Projects />
      <Feedbacks />
      <Members />
      <Banner />
      <Contact />
      <Footer />
      <SignUpPage isOpen={isSignUpOpen} onClose={handleSignUpClose} />
    </div>
  )
}

export default App