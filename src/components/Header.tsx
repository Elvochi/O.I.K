import Navbar from './Navbar'
import hero from '../OLK assets/logomain.png'

interface HeaderProps {
    onSignUpClick: () => void;
}

const Header = ({ onSignUpClick }: HeaderProps) => {
    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    return (
        <div className="w-full flex flex-col items-center justify-center md:h-screen relative bg-gradient-to-b from-grad-start to-grad-end">
            <Navbar onSignUpClick={onSignUpClick} />
            <div className="w-full md:pl-[120px] md:pr-[215px] px-5 flex md:flex-row flex-col md:gap-0 gap-12 md:mb-0 mb-10 items-center justify-between md:mt-0 mt-24">
                <div className="flex flex-col gap-8">
                    <div className="font-bold text-7xl max-w-[590px] leading-[90px]">
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
                <div className="flex flex-col items-center">
                    <img src={hero} alt="hero" className="xl:scale-60" />
                    <div className="bg-secondary border-3 border-primary w-[278px] h-[128px] rounded-xl md:flex hidden flex-col gap-2 items-center justify-center">
                        <span className="font-bold text-5xl">Very</span>
                        <span className="font-bold text-xl">Capable Engineers</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header