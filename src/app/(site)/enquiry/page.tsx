'use client';

import { useState, useEffect } from 'react';

export default function EnquiryPage() {
  // Animation state
  const [isVisible, setIsVisible] = useState(false);
  
  // Form state
  const [enquiryForm, setEnquiryForm] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    companyName: '',
    projectType: '',
    budget: '',
    timeline: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  
  // Set visibility after component mounts for animations
  useEffect(() => {
    setIsVisible(true);
  }, []);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEnquiryForm(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(false);
    
    // Simulate form submission
    setTimeout(() => {
      console.log('Enquiry form submitted:', enquiryForm);
      
      // 95% chance of success for demo purposes
      if (Math.random() > 0.05) {
        setSubmitSuccess(true);
        setIsSubmitting(false);
        
        // Reset form after success
        setTimeout(() => {
          setSubmitSuccess(false);
          setEnquiryForm({
            fullName: '',
            email: '',
            phoneNumber: '',
            companyName: '',
            projectType: '',
            budget: '',
            timeline: '',
            message: ''
          });
        }, 3000);
      } else {
        setSubmitError(true);
        setIsSubmitting(false);
      }
    }, 1500);
  };

  // Project type options
  const projectTypes = [
    "Structural Fabrication",
    "Industrial Piping",
    "Heavy Equipment Installation",
    "Maintenance & Repair",
    "Consulting & Design",
    "Other"
  ];
  
  // Budget range options
  const budgetRanges = [
    "Under ₹10 Lakhs",
    "₹10 Lakhs - ₹50 Lakhs",
    "₹50 Lakhs - ₹1 Crore",
    "₹1 Crore - ₹5 Crores",
    "Above ₹5 Crores",
    "To be discussed"
  ];
  
  // Timeline options
  const timelineOptions = [
    "Immediate (within 1 month)",
    "Short-term (1-3 months)",
    "Medium-term (3-6 months)",
    "Long-term (6+ months)",
    "Ongoing/Maintenance",
    "To be discussed"
  ];

  return (
    <div className="bg-white min-h-screen relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-full h-64 bg-gradient-to-l from-orange-50 to-orange-100 transform skew-y-3"></div>
      <div className="absolute top-40 left-0 w-64 h-64 bg-orange-500 rounded-full opacity-5"></div>
      <div className="absolute bottom-40 right-0 w-96 h-96 bg-orange-500 rounded-full opacity-5"></div>
      
      {/* Diagonal pattern overlay */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23F97316' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        backgroundSize: '60px 60px'
      }}></div>
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        {/* Header Section with animated reveal */}
        <div 
          className={`text-center mb-16 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-full px-4 py-2 text-sm text-orange-600 mb-6">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            <span>PROJECT ENQUIRY</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Tell Us About Your <span className="text-orange-500">Project</span>
          </h1>
          
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Fill out the form below with your project details, and our team will get back to you 
            with a customized solution tailored to your specific requirements.
          </p>
          
          {/* Decorative line */}
          <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-orange-600 mx-auto mt-8"></div>
        </div>
        
        {/* Main Form Section */}
        <div 
          className={`max-w-4xl mx-auto transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          style={{ transitionDelay: '200ms' }}
        >
          {/* Form Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 md:p-12 relative">
            {/* Decorative elements */}
            <div className="absolute -top-6 -left-6 w-12 h-12 bg-orange-500 rounded-lg transform rotate-45 opacity-20"></div>
            <div className="absolute -bottom-6 -right-6 w-12 h-12 bg-orange-500 rounded-lg transform rotate-45 opacity-20"></div>
            
            {/* Success Message */}
            {submitSuccess && (
              <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-lg mb-8 animate-fadeIn">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-medium text-green-800">Enquiry Submitted Successfully!</h3>
                    <p className="text-green-700 mt-1">Thank you for your interest. Our team will contact you shortly.</p>
                  </div>
                </div>
              </div>
            )}
            
            {/* Error Message */}
            {submitError && (
              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg mb-8 animate-fadeIn">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-medium text-red-800">Something went wrong</h3>
                    <p className="text-red-700 mt-1">Please try again or contact us directly by phone.</p>
                  </div>
                </div>
              </div>
            )}
            
            {/* Enquiry Form */}
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Information Section */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-3 text-orange-500 font-bold">1</div>
                  Personal Information
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input 
                      id="fullName"
                      name="fullName"
                      type="text" 
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-orange-500 focus:ring-orange-500" 
                      placeholder="John Doe"
                      value={enquiryForm.fullName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  {/* Email Address */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input 
                      id="email"
                      name="email"
                      type="email" 
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-orange-500 focus:ring-orange-500" 
                      placeholder="john@company.com"
                      value={enquiryForm.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  {/* Phone Number */}
                  <div>
                    <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input 
                      id="phoneNumber"
                      name="phoneNumber"
                      type="tel" 
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-orange-500 focus:ring-orange-500" 
                      placeholder="+91 98765 43210"
                      value={enquiryForm.phoneNumber}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  {/* Company Name */}
                  <div>
                    <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">
                      Company Name
                    </label>
                    <input 
                      id="companyName"
                      name="companyName"
                      type="text" 
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-orange-500 focus:ring-orange-500" 
                      placeholder="Your Company"
                      value={enquiryForm.companyName}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
              
              {/* Project Details Section */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-3 text-orange-500 font-bold">2</div>
                  Project Details
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Project Type */}
                  <div>
                    <label htmlFor="projectType" className="block text-sm font-medium text-gray-700 mb-1">
                      Project Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="projectType"
                      name="projectType"
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-orange-500 focus:ring-orange-500"
                      value={enquiryForm.projectType}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="" disabled>Select project type</option>
                      {projectTypes.map((type, index) => (
                        <option key={index} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  
                  {/* Budget Range */}
                  <div>
                    <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-1">
                      Budget Range
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-orange-500 focus:ring-orange-500"
                      value={enquiryForm.budget}
                      onChange={handleInputChange}
                    >
                      <option value="" disabled>Select budget range</option>
                      {budgetRanges.map((range, index) => (
                        <option key={index} value={range}>{range}</option>
                      ))}
                    </select>
                  </div>
                  
                  {/* Timeline */}
                  <div className="md:col-span-2">
                    <label htmlFor="timeline" className="block text-sm font-medium text-gray-700 mb-1">
                      Project Timeline
                    </label>
                    <select
                      id="timeline"
                      name="timeline"
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-orange-500 focus:ring-orange-500"
                      value={enquiryForm.timeline}
                      onChange={handleInputChange}
                    >
                      <option value="" disabled>Select timeline</option>
                      {timelineOptions.map((option, index) => (
                        <option key={index} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              
              {/* Project Description */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-3 text-orange-500 font-bold">3</div>
                  Project Description
                </h3>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea 
                    id="message"
                    name="message"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-orange-500 focus:ring-orange-500" 
                    rows={6} 
                    placeholder="Please describe your project requirements, specifications, challenges, and any other relevant details..."
                    value={enquiryForm.message}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              {/* Submit Button */}
              <div className="pt-4">
                <button 
                  type="submit" 
                  className={`w-full rounded-lg py-4 px-6 font-medium text-white text-lg shadow-lg transition-all duration-300 ${
                    isSubmitting 
                      ? 'bg-orange-400 cursor-not-allowed' 
                      : submitSuccess 
                        ? 'bg-green-500' 
                        : 'bg-orange-500 hover:bg-orange-600 hover:shadow-xl transform hover:-translate-y-1'
                  }`}
                  disabled={isSubmitting || submitSuccess}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </div>
                  ) : submitSuccess ? 'Enquiry Submitted!' : (
                    <div className="flex items-center justify-center">
                      Submit Enquiry
                      <svg className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                  )}
                </button>
                
                {/* Privacy Policy Note */}
                <p className="text-center text-sm text-gray-500 mt-4">
                  By submitting this form, you agree to our privacy policy and terms of service.
                </p>
              </div>
            </form>
          </div>
        </div>
        
        {/* Why Choose Us Section */}
        <div 
          className={`max-w-4xl mx-auto mt-24 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          style={{ transitionDelay: '400ms' }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">Why Choose Veeru Engineering & Infra</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Reason 1 */}
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-md hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4 text-orange-500">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Quality Assurance</h3>
              <p className="text-gray-600">We adhere to the highest quality standards and safety protocols in all our projects.</p>
            </div>
            
            {/* Reason 2 */}
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-md hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4 text-orange-500">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Timely Delivery</h3>
              <p className="text-gray-600">We understand the importance of deadlines and ensure on-time project completion.</p>
            </div>
            
            {/* Reason 3 */}
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-md hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4 text-orange-500">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Expert Team</h3>
              <p className="text-gray-600">Our team of skilled engineers and technicians brings decades of industry experience.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}