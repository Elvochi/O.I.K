import { services } from "../data";
import { chunkArray } from "../helpers";
import HeadSection from "./HeadSection";
import type { Service } from "../types";

const Services = () => {
    const serviceChunks = chunkArray(services, 3);
    return (
        <div id="services" className="w-full md:py-[120px] py-24 md:px-[120px] px-5 flex flex-col gap-[80px]">
            <HeadSection title="Our Services" description="Take a look at the variety of services we provide to make your dreams a reality" />
            <div className="w-full flex flex-col gap-[50px]">
                {serviceChunks.map((chunk, index) => (
                    <div key={index} className="w-full flex md:flex-row flex-col items-center justify-between gap-[38px]">
                        {chunk.map((service: Service) => (
                            <div key={service.id} className="flex flex-col md:items-start items-center gap-3">
                                <img src={service.icon} alt={service.title} className="w-16 h-16" />
                                <h3 className="text-[24px] font-bold text-secondary">{service.title}</h3>
                                <p className="text-gray-light font-bold max-w-[380px] md:text-left text-center">{service.description}</p>
                                <a href="#" className="text-primary font-bold">Learn More</a>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Services;