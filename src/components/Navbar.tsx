import { useState } from "react";
import { navItems } from "../data";
import { useNavigate } from 'react-router-dom';

interface NavbarProps {
    onSignUpClick: () => void;
}

const Navbar = ({ onSignUpClick }: NavbarProps) => {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const scrollToSection = (sectionId: string) => {
        setIsMenuOpen(false);
        if (sectionId === 'contact') {
            navigate('/#contact');
            setTimeout(() => {
                const element = document.getElementById('contact');
                if (element) {
                    const offset = 100;
                    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
                    window.scrollTo({ top: elementPosition - offset, behavior: 'smooth' });
                }
            }, 100);
        } else {
            const element = document.getElementById(sectionId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    };

    const navMap: { [key: string]: string } = {
        "About Us": "about-us",
        "Projects": "projects",
        "Services": "services",
        "Our Team": "our-team",
        "Contacts": "contact"
    };

    return (
        <div className="w-full flex items-center justify-between md:px-[120px] px-5 absolute md:top-12 top-5 z-50">
            <h1 className="font-bold text-xl cursor-pointer">
                <span className="text-yellow-400">O.I.K</span>
                <span className="text-white"> CONSULTANTS L.T.D</span>
            </h1>
            <div className="flex items-center gap-6 md:gap-12">
                <div className="hidden md:flex items-center gap-6">
                    {navItems.map((item: string, index: number) => (
                        <button
                            key={index}
                            onClick={() => scrollToSection(navMap[item])}
                            className="text-white font-bold hover:text-yellow-400 transition-colors duration-200 cursor-pointer"
                        >
                            {item}
                        </button>
                    ))}
                </div>
                <button
                    onClick={onSignUpClick}
                    className="bg-primary text-secondary px-4 md:px-6 h-[44px] md:h-[50px] rounded-sm font-bold cursor-pointer hover:bg-opacity-90 transition-all duration-200 text-sm md:text-base"
                >
                    Enquire
                </button>
                {/* Hamburger - mobile only */}
                <button
                    className="md:hidden flex flex-col gap-[5px] w-8 h-8 items-center justify-center"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle menu"
                >
                    <span className={`block w-6 h-[2px] bg-white transition-all ${isMenuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
                    <span className={`block w-6 h-[2px] bg-white transition-all ${isMenuOpen ? 'opacity-0' : ''}`} />
                    <span className={`block w-6 h-[2px] bg-white transition-all ${isMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
                </button>
            </div>

            {/* Mobile dropdown */}
            {isMenuOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-secondary flex flex-col items-center gap-6 py-8 mt-2">
                    {navItems.map((item: string, index: number) => (
                        <button
                            key={index}
                            onClick={() => scrollToSection(navMap[item])}
                            className="text-white font-bold hover:text-yellow-400 transition-colors duration-200 cursor-pointer"
                        >
                            {item}
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Navbar;