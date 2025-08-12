import { navItems } from "../data";

interface NavbarProps {
    onSignUpClick: () => void;
}

const Navbar = ({ onSignUpClick }: NavbarProps) => {
    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    const navMap: { [key: string]: string } = {
        "About Us": "about-us",
        "Projects": "projects", 
        "Services": "services",
        "Our Team": "our-team"
    };

    return (
        <div className="w-full flex items-center justify-between md:px-[120px] px-5 absolute md:top-12 top-5">
            <h1 className="font-bold text-xl cursor-pointer">
                <span className="text-yellow-400">O.L.K</span>
                <span className="text-white"> PRICE CONSTRUCTION</span>
            </h1>
            <div className="flex items-center gap-12">
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
                    className="bg-primary text-secondary px-6 h-[50px] rounded-sm font-bold cursor-pointer hover:bg-opacity-90 transition-all duration-200"
                >
                    Enquire
                </button>
            </div>
        </div>
    )
}

export default Navbar;