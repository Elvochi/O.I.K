import { useParams, useNavigate } from "react-router-dom";
import { projects } from "../data";
import HeadSection from "./HeadSection";

const CategoryPage = () => {
  const { category } = useParams();
  const navigate = useNavigate();

  if (!category) {
    return (
      <div className="w-full flex flex-col gap-12 bg-creamy py-24 px-5 md:px-[120px]">
        <HeadSection title="Invalid Category" description="No category specified. Please select a valid project category." isDark={false} />
        <button
          onClick={() => navigate("/")}
          className="bg-primary text-secondary w-[188px] h-[50px] rounded-sm font-bold cursor-pointer mx-auto"
        >
          Back to Home
        </button>
      </div>
    );
  }

  const filteredProjects = projects.filter(p => p.category.toLowerCase() === category.toLowerCase());

  return (
    <div className="w-full flex flex-col gap-12 bg-creamy py-24 px-5 md:px-[120px]">
      <HeadSection title={`${category} Projects`} description={`Explore our ${category} projects and images.`} isDark={false} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredProjects.length > 0 ? (
          filteredProjects.map(project => (
            <div key={project.id} className="flex flex-col gap-4">
              <img src={project.image} alt={project.title} className="w-full h-auto" />
              <h3 className="text-secondary font-bold text-xl">{project.title}</h3>
              <p className="text-gray-light">{project.description}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-light font-bold">No projects found for this category.</p>
        )}
        {/* Placeholder for additional images */}
        <div className="flex flex-col gap-4">
          <div className="w-full h-[300px] bg-gray-light flex items-center justify-center">
            <span className="text-secondary font-bold">Add Image Here</span>
          </div>
          <p className="text-gray-light">Additional {category} image placeholder</p>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;