const ServicesSection = () => {
  const services = [
    {
      name: "HTML",
      description: "I deliver high-quality solutions for web development. To begin, understanding client requirements is crucial; effective communication helps tailor HTML code to meet specific needs.",
      gradient: "bg-gradient-purple",
      icon: "💻"
    },
    {
      name: "CSS",
      description: "I craft visually appealing and responsive designs for websites. Assessing client preferences and branding guidelines ensures a personalized approach.",
      gradient: "bg-gradient-green",
      icon: "🎨"
    },
    {
      name: "JavaScript",
      description: "I create dynamic and interactive web experiences tailored to clients' functional requirements, ensuring engaging and responsive interfaces.",
      gradient: "bg-gradient-pink",
      icon: "⚡"
    },
    {
      name: "React",
      description: "I build scalable, component-based user interfaces using React, ensuring seamless and maintainable front-end solutions for complex applications.",
      gradient: "bg-gradient-blue",
      icon: "⚛️"
    },
    {
      name: "Mobile App Development",
      description: "I develop cross-platform mobile applications that deliver a seamless user experience on iOS and Android devices, using modern frameworks and tools.",
      gradient: "bg-gradient-purple",
      icon: "📱"
    },
    {
      name: "Laravel",
      description: "I use Laravel to build secure and efficient backend solutions for web applications, focusing on scalability, reliability, and rapid development.",
      gradient: "bg-gradient-orange",
      icon: "🛠️"
    }
  ];

  return (
    <div id="services" className="bg-background py-12 sm:py-20">
      <section className="container mx-auto px-4 sm:px-6 relative">
        {/* Title and Description */}
        <div className="text-center mb-12 sm:mb-16">
          <h6 className="font-bold uppercase mb-2 underline text-2xl sm:text-3xl text-foreground">
            Services.
          </h6>
          <h3 className="font-semibold text-xl sm:text-2xl md:text-3xl mb-4 text-foreground">
            Services Provided?
          </h3>
          <p className="max-w-xl mx-auto text-gray-text text-sm sm:text-base">
            I offer a wide range of services to help you achieve your goals. Whether you need assistance with website design, marketing, or anything in between, we've got you covered. Here are some of the services we provide:
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          {services.map((service, index) => (
            <div 
              key={index}
              className="group relative p-6 rounded-lg shadow-card hover:shadow-card-hover bg-card text-center transition-all duration-500 ease-in-out transform hover:-translate-y-2"
            >
              <div className={`w-16 h-16 rounded-full ${service.gradient} flex items-center justify-center mx-auto transition-transform duration-300 transform group-hover:scale-110 text-2xl`}>
                {service.icon}
              </div>
              <div className="mt-7">
                <h3 className="text-lg font-medium hover:text-blue-primary transition-colors text-card-foreground mb-3">
                  {service.name}
                </h3>
                <p className="text-gray-text text-sm sm:text-base leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ServicesSection;