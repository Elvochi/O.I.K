import HeadSection from './HeadSection';

const Contact = () => {
  return (
    <div id="contact" className="w-full md:py-[120px] py-24 md:px-[120px] px-5 flex flex-col gap-12 bg-creamy">
      <HeadSection
        title="Contact Us"
        description="Reach out to our team to discuss your project ideas or inquiries."
        isDark={false}
      />
      <div className="w-full max-w-2xl mx-auto flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <span className="text-secondary font-bold">Phone:</span>
            <a href="tel:+1234567890" className="text-primary font-bold hover:underline">+1 (234) 567-890</a>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-secondary font-bold">Email:</span>
            <a href="mailto:info@olkconsultants.com" className="text-primary font-bold hover:underline">info@olkconsultants.com</a>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-secondary font-bold">Address:</span>
            <span className="text-gray-light font-bold">123 Construction Lane, Build City, BC 12345</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-orange font-bold mt-[2px]">*</span>
          <span className="text-gray-light font-bold">Our team is available Monday to Friday, 9 AM to 5 PM.</span>
        </div>
      </div>
    </div>
  );
};

export default Contact;