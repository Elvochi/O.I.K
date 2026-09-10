import Navbar from './Navbar'
import hero from '../OLK assets/logomain.png'

interface HeaderProps {
    onSignUpClick: () => void;
}

const Header = ({ onSignUpClick }: HeaderProps) => {
const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
        const offset = 100;
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({
            top: elementPosition - offset,
            behavior: 'smooth'
        });
    }
};

    return (
        <div className="w-full flex flex-col items-center justify-center md:h-screen relative bg-gradient-to-b from-grad-start to-grad-end">
            <Navbar onSignUpClick={onSignUpClick} />
            <div className="w-full md:pl-[120px] md:pr-[215px] px-5 flex md:flex-row flex-col md:gap-0 gap-12 md:mb-0 mb-10 items-center justify-between md:mt-0 mt-24">
                <div className="flex flex-col gap-8">
                    <div className="font-bold text-4xl md:text-7xl max-w-[590px] leading-tight md:leading-[90px]">
                        Crafting Architectural Wonders
                    </div>
                    <span className="text-gray font-bold max-w-[450px] leading-[30px]">
                        Your ideas & dreams are transformed by us into long-lasting, engineered buildings.
                    </span>
                    <div className="flex items-center gap-6">
                        <button 
                            onClick={() => scrollToSection('contact')}
                            className="bg-primary text-secondary w-[188px] h-[50px] rounded-sm font-bold cursor-pointer"
                        >
                            Contact Us
                        </button>
                        <button 
                            onClick={() => scrollToSection('contact')}
                            className="h-[50px] border w-[188px] border-primary rounded-sm font-bold cursor-pointer"
                        >
                            Available for Consultation
                        </button>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-orange font-bold mt-[2px]">*</span>
                        <span className="text-gray font-bold">All our projects are certified by experts.</span>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row items-center gap-8">
  <img 
    src={hero} 
    alt="hero" 
    className="w-full max-w-md border-[5px] border-yellow-400 rounded-2xl shadow-2xl hover:shadow-yellow-200 transition-shadow"
  />
  
<div className="group bg-gradient-to-br from-secondary to-secondary-dark border-4 border-primary w-[300px] h-[140px] rounded-2xl flex flex-col items-center justify-center space-y-2 p-4 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/30">
    <span className="font-bold text-5xl text-white drop-shadow-md group-hover:drop-shadow-lg">Certified</span>
    <span className="font-bold text-2xl text-yellow-200 group-hover:text-yellow-300 transition-colors duration-300">Engineers</span>
</div>
</div>
            </div>
        </div>
    )
}

export default Header