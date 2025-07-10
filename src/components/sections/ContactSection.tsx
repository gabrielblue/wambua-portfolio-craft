import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const ContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Required fields missing",
        description: "Please fill in your name, email, and message.",
        variant: "destructive"
      });
      return;
    }

    // Simulate form submission
    toast({
      title: "Message sent!",
      description: "Thank you for your message. I'll get back to you soon.",
    });

    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      message: ""
    });
  };

  return (
    <div id="contact" className="py-12 sm:py-20 px-4 sm:px-6 bg-blue-light">
      <div className="container mx-auto">
        
        {/* Header */}
        <div className="flex flex-col gap-2 items-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground underline">CONTACT ME.</h1>
          <h2 className="text-2xl sm:text-3xl text-foreground">Have a Question?</h2>
          <p className="w-full md:w-1/2 text-center text-gray-text text-sm sm:text-base">
            Do you have an idea? Let's discuss it and see what we can do together.
          </p>
        </div>
        
        {/* Contact Form and Info */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-start justify-center">
          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full lg:w-1/2 bg-background/90 p-6 sm:p-8 rounded-lg shadow-card hover:shadow-card-hover transition-all duration-300 backdrop-blur-sm">
            <Input 
              type="text" 
              name="name"
              placeholder="Name" 
              value={formData.name}
              onChange={handleInputChange}
              className="shadow-sm hover:shadow-md transition-shadow duration-300" 
              required 
            />
            <Input 
              type="email" 
              name="email"
              placeholder="Email" 
              value={formData.email}
              onChange={handleInputChange}
              className="shadow-sm hover:shadow-md transition-shadow duration-300" 
              required 
            />
            <Input 
              type="tel" 
              name="phone"
              placeholder="Phone Number" 
              value={formData.phone}
              onChange={handleInputChange}
              className="shadow-sm hover:shadow-md transition-shadow duration-300" 
            />
            <Input 
              type="text" 
              name="company"
              placeholder="Company/Organization" 
              value={formData.company}
              onChange={handleInputChange}
              className="shadow-sm hover:shadow-md transition-shadow duration-300" 
            />
            <Textarea 
              name="message"
              placeholder="Message..." 
              value={formData.message}
              onChange={handleInputChange}
              className="shadow-sm hover:shadow-md transition-shadow duration-300 min-h-[120px]" 
              required 
            />
            
            <Button 
              type="submit"
              className="w-full transform transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Submit
            </Button>
          </form>

          {/* Contact Information */}
          <div className="bg-background/90 p-6 sm:p-8 rounded-lg shadow-card hover:shadow-card-hover transition-all duration-300 backdrop-blur-sm w-full lg:w-1/3 flex flex-col gap-4 text-gray-text">
            <h3 className="text-xl sm:text-2xl font-semibold text-foreground mb-4">Contact Information</h3>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                <strong className="text-foreground">Email:</strong> 
                <a href="mailto:gabrielwambua9659@gmail.com" className="hover:text-blue-primary transition duration-300 break-all">
                  gabrielwambua9659@gmail.com
                </a>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                <strong className="text-foreground">Instagram:</strong> 
                <a href="https://www.instagram.com/Irv_rule" target="_blank" rel="noopener noreferrer" className="hover:text-blue-primary transition duration-300">
                  @Irv_rule
                </a>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                <strong className="text-foreground">LinkedIn:</strong> 
                <a href="https://www.linkedin.com/in/angel-gabriel-129b08339/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-primary transition duration-300">
                  angel-gabriel-129b08339
                </a>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                <strong className="text-foreground">GitHub:</strong> 
                <a href="https://github.com/gabrielblue/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-primary transition duration-300">
                  gabrielblue
                </a>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                <strong className="text-foreground">Phone:</strong> 
                <a href="tel:+254713056184" className="hover:text-blue-primary transition duration-300">
                  0713056184
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;