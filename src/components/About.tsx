import about from '../assets/images/about.svg';
import { stats } from '../data';
import type { Stat } from '../types';

const About = () => {
    return (
        <div id="about-us" className="w-full flex md:flex-row flex-col-reverse items-center justify-start md:gap-[130px] gap-16 xl:gap-[250px] bg-creamy md:py-[150px] py-24 md:px-[120px] px-5">
            <div className="w-full 2xl:w-[30%] md:w-[40%]">
                <img src={about} alt="about" />
            </div>
            <div className="flex flex-col gap-8">
                <div className="bg-secondary w-[88px] h-[8px]"></div>
                <h2 className="text-secondary text-5xl font-bold max-w-[580px] leading-[60px]">
                    Take A Glimpse into Our Construction Voyage
                </h2>
                <p className="text-gray-light font-bold max-w-[580px] leading-[30px]">
                    A Trailblazer In The Construction Industry. Our Journey Is One Of Passion, Dedication, And A Relentless Pursuit Of Excellence.
                </p>
                <div className="flex items-center gap-8">
                    {stats.map((stat: Stat, index: number) => (
                        <div key={index} className="flex flex-col gap-2">
                            <span className="text-secondary text-4xl font-bold">{stat.value}</span>
                            <span className="text-gray-light font-bold text-sm md:max-w-[160px]">{stat.text}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default About;