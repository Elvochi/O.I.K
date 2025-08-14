import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import About from "./components/About";
import Banner from "./components/Banner";
import Feedbacks from "./components/Feedbacks";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Members from "./components/Members";
import Projects from "./components/Projects";
import Services from "./components/Services";
import SignUpPage from "./components/SignUpPage";
import Contact from "./components/Contact";
import CategoryPage from "./components/CategoryPage";
import ServicePage from "./components/ServicePage";

const App = () => {
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);

  return (
    <div className="w-full h-full flex flex-col">
      <Routes>
        <Route 
          path="/" 
          element={
            <>
              <Header onSignUpClick={() => setIsSignUpOpen(true)} />
              <About />
              <Services />
              <Projects />
              <Feedbacks />
              <Members />
              <Banner />
              <Contact />
              <Footer />
            </>
          } 
        />
        {/* Existing route */}
        <Route path="/projects/:category" element={<CategoryPage />} />
        
        {/* NEW ROUTE - Add this line */}
        <Route path="/services/:id" element={<ServicePage />} />

        <Route path="/contact" element={<Contact />} />

      </Routes>
      
      <SignUpPage 
        isOpen={isSignUpOpen} 
        onClose={() => setIsSignUpOpen(false)} 
      />
    </div>
  );
};

export default App;