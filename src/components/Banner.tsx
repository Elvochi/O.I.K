import banner from '../assets/images/banner.svg';
import HeadSection from './HeadSection';

const Banner = () => {
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
        <div className="w-full flex flex-col md:flex-row items-center justify-between md:h-[500px] bg-gradient-to-b from-grad-start to-grad-end py-16 md:py-[80px] md:px-[120px] px-5 gap-10 md:gap-0">
            <div className="flex flex-col gap-12">
                <HeadSection title="Let's Build Together" description="Contact us If you have anything in mind, We will help you build." isDark={false} hasButton={false} />
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6 w-full sm:w-auto">
                    <button 
                        onClick={() => scrollToSection('contact')}
                        className="bg-primary text-secondary w-full sm:w-[188px] h-[50px] rounded-sm font-bold cursor-pointer"
                              >
                       Contact Us
                    </button>
                     <button 
                            onClick={() => scrollToSection('contact')}
                            className="h-[50px] border w-full sm:w-[188px] border-primary rounded-sm font-bold cursor-pointer"
                         >
                          Available for Consultation
                                     </button>
                                   </div>
                               </div>
            <img src={banner} alt="banner" className="w-[25%] md:block hidden" />
        </div>
    )
}

export default Banner