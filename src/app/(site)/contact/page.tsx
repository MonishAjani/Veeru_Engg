'use client';

import { useState, useEffect } from 'react';
import HeroSection from '../../../components/HeroSection';

export default function ContactPage() {
  const [bookingForm, setBookingForm] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    message: ''
  });
  
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [activeTab, setActiveTab] = useState('contact'); // 'contact' or 'booking'
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  const handleBookingChange = (e) => {
    const { name, value } = e.target;
    setBookingForm(prev => ({ ...prev, [name]: value }));
  };
  
  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContactForm(prev => ({ ...prev, [name]: value }));
  };
  
  const handleBookingSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      console.log('Booking form submitted:', bookingForm);
      setIsSubmitting(false);
      setSubmitSuccess(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
        setBookingForm({
          name: '',
          email: '',
          phone: '',
          date: '',
          message: ''
        });
      }, 3000);
    }, 1000);
  };
  
  const handleContactSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      console.log('Contact form submitted:', contactForm);
      setIsSubmitting(false);
      setSubmitSuccess(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
        setContactForm({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      }, 3000);
    }, 1000);
  };

  // For map display
  const [mapLoaded, setMapLoaded] = useState(false);
  
  useEffect(() => {
    // Mark map as loaded after component mounts
    setMapLoaded(true);
  }, []);
  
  return (
    <div>
      <HeroSection
        title="Contact Us"
        description="Partner with us for your industrial and infrastructure projects. We're here to help you achieve your goals."
      />
      
      
      <section className="py-16">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Company Information */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Company Information</h2>
              
              <div className="bg-gradient-card rounded-xl p-6 shadow-lg">
                <table className="w-full text-steel-200">
                  <tbody>
                    <tr className="border-b border-steel-800">
                      <td className="py-3 pr-4 font-semibold">Name of Firm</td>
                      <td className="py-3">M/S. VEERU ENGINEERING & INFRA.</td>
                    </tr>
                    <tr className="border-b border-steel-800">
                      <td className="py-3 pr-4 font-semibold">Nationality</td>
                      <td className="py-3">Indian</td>
                    </tr>
                    <tr className="border-b border-steel-800">
                      <td className="py-3 pr-4 font-semibold">Office Address</td>
                      <td className="py-3">
                        Plot No. C-27, Sadachar Society,<br />
                        Dattawadi, Amravati Road,<br />
                        NAGPUR-440023
                      </td>
                    </tr>
                    <tr className="border-b border-steel-800">
                      <td className="py-3 pr-4 font-semibold">Mobile Number</td>
                      <td className="py-3">CELL NO. 8600016632</td>
                    </tr>
                    <tr className="border-b border-steel-800">
                      <td className="py-3 pr-4 font-semibold">Email ID</td>
                      <td className="py-3">
                        <a href="mailto:vei4275@gmail.com" className="text-brand-blue hover:underline">
                          vei4275@gmail.com
                        </a>
                      </td>
                    </tr>
                    <tr className="border-b border-steel-800">
                      <td className="py-3 pr-4 font-semibold">Year of Establishment</td>
                      <td className="py-3">1995</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4 font-semibold">Type of Firm</td>
                      <td className="py-3">Proprietorship</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
            </div>
            
            {/* Forms Section */}
            <div>
              <div className="bg-gradient-card rounded-xl shadow-lg overflow-hidden">
                {/* Tabs */}
                <div className="flex border-b border-steel-800">
                  <button 
                    className={`flex-1 py-4 px-6 text-center font-medium ${activeTab === 'contact' ? 'bg-steel-800 text-white' : 'text-steel-300 hover:bg-steel-800/50'}`}
                    onClick={() => setActiveTab('contact')}
                  >
                    Contact Us
                  </button>
                  <button 
                    className={`flex-1 py-4 px-6 text-center font-medium ${activeTab === 'booking' ? 'bg-steel-800 text-white' : 'text-steel-300 hover:bg-steel-800/50'}`}
                    onClick={() => setActiveTab('booking')}
                  >
                    Book a Call
                  </button>
                </div>
                
                {/* Contact Form */}
                {activeTab === 'contact' && (
                  <form className="p-6 space-y-4" onSubmit={handleContactSubmit}>
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-steel-300 mb-1">
                        Your Name
                      </label>
                      <input 
                        id="name"
                        name="name"
                        type="text" 
                        className="w-full rounded border border-steel-600 bg-steel-800/50 p-3 text-white" 
                        placeholder="Enter your name"
                        value={contactForm.name}
                        onChange={handleContactChange}
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-steel-300 mb-1">
                        Email Address
                      </label>
                      <input 
                        id="email"
                        name="email"
                        type="email" 
                        className="w-full rounded border border-steel-600 bg-steel-800/50 p-3 text-white" 
                        placeholder="Enter your email"
                        value={contactForm.email}
                        onChange={handleContactChange}
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-steel-300 mb-1">
                        Subject
                      </label>
                      <input 
                        id="subject"
                        name="subject"
                        type="text" 
                        className="w-full rounded border border-steel-600 bg-steel-800/50 p-3 text-white" 
                        placeholder="What is this regarding?"
                        value={contactForm.subject}
                        onChange={handleContactChange}
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-steel-300 mb-1">
                        Message
                      </label>
                      <textarea 
                        id="message"
                        name="message"
                        className="w-full rounded border border-steel-600 bg-steel-800/50 p-3 text-white" 
                        rows={5} 
                        placeholder="How can we help you?"
                        value={contactForm.message}
                        onChange={handleContactChange}
                        required
                      />
                    </div>
                    
                    <button 
                      type="submit" 
                      className={`w-full rounded py-3 px-4 font-medium ${isSubmitting ? 'bg-gradient-blue/70' : 'bg-gradient-blue hover:shadow-lg'}`}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Sending...' : submitSuccess ? 'Message Sent!' : 'Send Message'}
                    </button>
                  </form>
                )}
                
                {/* Booking Form */}
                {activeTab === 'booking' && (
                  <form className="p-6 space-y-4" onSubmit={handleBookingSubmit}>
                    <div>
                      <label htmlFor="booking-name" className="block text-sm font-medium text-steel-300 mb-1">
                        Your Name
                      </label>
                      <input 
                        id="booking-name"
                        name="name"
                        type="text" 
                        className="w-full rounded border border-steel-600 bg-steel-800/50 p-3 text-white" 
                        placeholder="Enter your name"
                        value={bookingForm.name}
                        onChange={handleBookingChange}
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="booking-email" className="block text-sm font-medium text-steel-300 mb-1">
                          Email Address
                        </label>
                        <input 
                          id="booking-email"
                          name="email"
                          type="email" 
                          className="w-full rounded border border-steel-600 bg-steel-800/50 p-3 text-white" 
                          placeholder="Enter your email"
                          value={bookingForm.email}
                          onChange={handleBookingChange}
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="booking-phone" className="block text-sm font-medium text-steel-300 mb-1">
                          Phone Number
                        </label>
                        <input 
                          id="booking-phone"
                          name="phone"
                          type="tel" 
                          className="w-full rounded border border-steel-600 bg-steel-800/50 p-3 text-white" 
                          placeholder="Enter your phone"
                          value={bookingForm.phone}
                          onChange={handleBookingChange}
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="booking-date" className="block text-sm font-medium text-steel-300 mb-1">
                        Preferred Date & Time
                      </label>
                      <input 
                        id="booking-date"
                        name="date"
                        type="datetime-local" 
                        className="w-full rounded border border-steel-600 bg-steel-800/50 p-3 text-white" 
                        value={bookingForm.date}
                        onChange={handleBookingChange}
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="booking-message" className="block text-sm font-medium text-steel-300 mb-1">
                        Additional Information
                      </label>
                      <textarea 
                        id="booking-message"
                        name="message"
                        className="w-full rounded border border-steel-600 bg-steel-800/50 p-3 text-white" 
                        rows={4} 
                        placeholder="Tell us about your project or any specific questions"
                        value={bookingForm.message}
                        onChange={handleBookingChange}
                      />
                    </div>
                    
                    <button 
                      type="submit" 
                      className={`w-full rounded py-3 px-4 font-medium ${isSubmitting ? 'bg-gradient-blue/70' : 'bg-gradient-blue hover:shadow-lg'}`}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Booking...' : submitSuccess ? 'Call Booked!' : 'Book a 15 min call'}
                    </button>
                    
                    <p className="text-sm text-steel-400 text-center">
                      Our team will confirm your booking via email within 24 hours.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Map section */}
      <section className="py-8">
        <div className="container">
          <h2 className="text-2xl font-bold mb-4 text-center">Our Location</h2>
          <div className="rounded-xl overflow-hidden h-[200px] shadow-lg bg-gradient-card max-w-2xl mx-auto">
            {mapLoaded && (
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3720.8978553694!2d79.0633!3d21.1563!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjHCsDA5JzIyLjciTiA3OcKwMDMnNDcuOSJF!5e0!3m2!1sen!2sin!4v1631234567890!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Veeru Engineering & Infra Location"
                aria-label="Map showing Veeru Engineering & Infra office location"
              ></iframe>
            )}
          </div>
          <div className="mt-4 text-center">
            <p className="text-steel-300">
              <strong>Address:</strong> Plot No. C-27, Sadachar Society, Dattawadi, Amravati Road, NAGPUR-440023
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
