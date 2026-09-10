import React, { useState } from 'react';

interface SignUpPageProps {
  onClose: () => void;
  isOpen: boolean;
}

const SignUpPage: React.FC<SignUpPageProps> = ({ onClose, isOpen }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    projectType: '',
    message: ''
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.projectType) newErrors.projectType = 'Please select a project type';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const result = await response.json();
      
      if (result.success) {
        alert('Thank you for signing up! We will contact you soon.');
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          company: '',
          projectType: '',
          message: ''
        });
        onClose();
      } else {
        // Handle specific error messages
        if (result.message === 'Email already registered') {
          setErrors({ email: 'This email is already registered' });
        } else {
          alert(result.message || 'Something went wrong. Please try again.');
        }
      }
    } catch (error) {
      console.error('Signup error:', error);
      alert('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-border p-4 md:p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-secondary">Join Our Construction Journey</h2>
            <p className="text-gray-light font-bold mt-1">Let's build something amazing together</p>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-light hover:text-secondary text-2xl font-bold w-8 h-8 flex items-center justify-center"
          >
            ×
          </button>
        </div>
        
        <div className="p-4 md:p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-secondary font-bold mb-2">First Name *</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className={`w-full h-12 px-4 border rounded-lg font-bold text-secondary focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.firstName ? 'border-red-500' : 'border-gray-border'
                }`}
                placeholder="Enter your first name"
              />
              {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
            </div>
            
            <div>
              <label className="block text-secondary font-bold mb-2">Last Name *</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className={`w-full h-12 px-4 border rounded-lg font-bold text-secondary focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.lastName ? 'border-red-500' : 'border-gray-border'
                }`}
                placeholder="Enter your last name"
              />
              {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
            </div>
          </div>

          <div>
            <label className="block text-secondary font-bold mb-2">Email Address *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full h-12 px-4 border rounded-lg font-bold text-secondary focus:outline-none focus:ring-2 focus:ring-primary ${
                errors.email ? 'border-red-500' : 'border-gray-border'
              }`}
              placeholder="Enter your email address"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-secondary font-bold mb-2">Phone Number *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className={`w-full h-12 px-4 border rounded-lg font-bold text-secondary focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.phone ? 'border-red-500' : 'border-gray-border'
                }`}
                placeholder="Enter your phone number"
              />
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
            </div>
            
            <div>
              <label className="block text-secondary font-bold mb-2">Company (Optional)</label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                className="w-full h-12 px-4 border border-gray-border rounded-lg font-bold text-secondary focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter your company name"
              />
            </div>
          </div>

          <div>
            <label className="block text-secondary font-bold mb-2">Project Type *</label>
            <select
              name="projectType"
              value={formData.projectType}
              onChange={handleInputChange}
              className={`w-full h-12 px-4 border rounded-lg font-bold text-secondary focus:outline-none focus:ring-2 focus:ring-primary ${
                errors.projectType ? 'border-red-500' : 'border-gray-border'
              }`}
            >
              <option value="">Select project type</option>
              <option value="residential">Residential Construction</option>
              <option value="commercial">Commercial Construction</option>
              <option value="renovation">Renovation & Remodeling</option>
              <option value="consultation">Consultation Services</option>
              <option value="other">Other</option>
            </select>
            {errors.projectType && <p className="text-red-500 text-sm mt-1">{errors.projectType}</p>}
          </div>

          <div>
            <label className="block text-secondary font-bold mb-2">Project Details (Optional)</label>
            <textarea
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-border rounded-lg font-bold text-secondary focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              placeholder="Tell us about your project requirements, timeline, or any specific needs..."
            />
          </div>

          <div className="bg-creamy p-4 rounded-lg">
            <div className="flex items-start gap-3">
              <span className="text-orange font-bold mt-1">*</span>
              <div className="text-gray-light font-bold text-sm">
                <p>By signing up, you agree to receive project updates and consultation opportunities from our expert team.</p>
                <p className="mt-2">All projects are certified by our professional engineers and architects.</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
  <button
    type="button"
    onClick={onClose}
    className="w-full sm:flex-1 h-12 border border-gray-border rounded-lg font-bold text-gray-light hover:text-secondary transition-colors duration-200"
  >
    Cancel
  </button>
  <button
    type="button"
    onClick={handleSubmit}
    disabled={isSubmitting}
    className="w-full sm:flex-1 bg-primary text-secondary h-12 rounded-lg font-bold hover:bg-opacity-90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
  >
    {isSubmitting ? 'Submitting...' : 'Sign Up & Start Building'}
  </button>
         </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;