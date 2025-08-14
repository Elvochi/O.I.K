import { projects } from "../data";
import { chunkArray } from "../helpers";
import HeadSection from "./HeadSection";
import { useNavigate } from "react-router-dom";
import type { Project } from "../types";

const Projects = () => {
    const projectsChunks = chunkArray(projects, 2);
    const navigate = useNavigate();

    return (
        <div id="projects" className="w-full md:py-[110px] py-24 md:px-[120px] px-5 flex flex-col gap-12 bg-gradient-to-b from-grad-start to-grad-end">
            <HeadSection title="Recent projects" description="Recent Projects Showcasing Our Craftsmanship and Innovation in Construction" isDark={false} />
            <div className="w-full flex flex-col gap-8">
                {projectsChunks.map((chunk, index) => (
                    <div key={index} className="w-full flex md:flex-row flex-col items-center justify-between gap-8">
                        {chunk.map((project: Project) => (
                            <div key={project.id} className="w-full flex items-center gap-8 p-8 bg-white">
                                <img src={project.image} alt={project.title} className="w-[184px] h-[196px]" />
                                <div className="flex flex-col gap-3">
                                    <span className="text-secondary font-bold text-2xl">{project.title}</span>
                                    <p className="text-gray-light font-bold">{project.description}</p>
                                    <div className="flex items-center justify-between mt-6">
                                        <div className="flex items-center gap-2">
                                            <span className="text-gray-light font-bold">{project.category}</span>
                                            <span className="text-gray-light font-bold">{project.date}</span>
                                        </div>
                                        <div 
                                            onClick={() => navigate(`/projects/${project.category}`)} 
                                            className="text-primary border border-primary rounded-sm w-[72px] h-[36px] md:flex hidden items-center justify-center font-bold bg-[#fefaf2] cursor-pointer"
                                        >
                                            View
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Projects;