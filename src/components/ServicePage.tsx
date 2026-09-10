import { useParams, useNavigate } from "react-router-dom";
import { services } from "../data";
import HeadSection from "./HeadSection";
import type { Service } from "../types";

const ServicePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  if (!id) {
    return (
      <div className="w-full flex flex-col gap-12 bg-creamy py-24 px-5 md:px-[120px]">
        <HeadSection 
          title="Service Not Found" 
          description="No service specified. Please select a valid service." 
          isDark={false} 
        />
        <button
          onClick={() => navigate("/services")}
          className="bg-primary text-secondary w-[188px] h-[50px] rounded-sm font-bold cursor-pointer mx-auto hover:bg-opacity-90 transition"
        >
          Back to Services
        </button>
      </div>
    );
  }

  const service = services.find((s: Service) => s.id === parseInt(id));

  // Handle contact navigation with service context
const handleContactClick = () => {
  navigate("/#contact", {
    state: {
      service: service?.title || "",
      message: `I'm interested in your ${service?.title} services`
    }
  });
};

  return (
    <div className="w-full flex flex-col gap-12 bg-creamy py-24 px-5 md:px-[120px]">
      {service ? (
        <>
          <HeadSection 
            title={service.title} 
            description={service.description} 
            isDark={false} 
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="flex flex-col gap-8">
              <img 
                src={service.image || service.icon} 
                alt={service.title} 
                className="w-full h-auto max-h-[260px] md:max-h-[400px] object-cover rounded-sm"
              />
              <div className="bg-white p-5 md:p-8 rounded-sm">
                <h3 className="text-secondary font-bold text-2xl mb-4">Service Details</h3>
                <p className="text-gray-light">
                  {service.fullDescription || service.description}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-8">
              <div className="bg-white p-5 md:p-8 rounded-sm">
                <h3 className="text-secondary font-bold text-2xl mb-4">What We Offer</h3>
                <ul className="list-disc pl-5 space-y-3 text-gray-light">
                  {(service.features || ["No features listed"]).map((feature: string, index: number) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-white p-5 md:p-8 rounded-sm">
                <h3 className="text-secondary font-bold text-2xl mb-4">Get Started</h3>
                <p className="text-gray-light mb-6">
                  Ready to begin your {service.title} project?
                </p>
                <button
                  onClick={handleContactClick}
                  className="bg-primary text-secondary w-full md:w-[200px] h-[50px] rounded-sm font-bold cursor-pointer hover:bg-opacity-90 transition"
                >
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="w-full flex flex-col gap-12">
          <HeadSection 
            title="Service Not Found" 
            description={`No service found with ID: ${id}`} 
            isDark={false} 
          />
          <button
            onClick={() => navigate("/services")}
            className="bg-primary text-secondary w-[188px] h-[50px] rounded-sm font-bold cursor-pointer mx-auto hover:bg-opacity-90 transition"
          >
            Back to Services
          </button>
        </div>
      )}
    </div>
  );
};

export default ServicePage;