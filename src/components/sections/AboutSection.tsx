const AboutSection = () => {
  return (
    <div id="about" className="px-4 sm:px-6 lg:px-10 bg-background py-12 sm:py-16">
      <div className="container mx-auto flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
        {/* Left Side: Text and Description */}
        <div className="lg:w-1/2 flex flex-col gap-6">
          <h1 className="font-bold underline text-2xl sm:text-3xl text-center lg:text-left text-foreground">
            ABOUT ME.
          </h1>
          <p className="text-gray-text text-base sm:text-lg leading-relaxed text-center lg:text-left">
            I design and build digital products. I'm a multi-disciplinary maker with over 5 years of experience across a wide range of design disciplines. As a web designer, my prowess in crafting digital landscapes is commendable. I have a keen eye for aesthetics and attention to detail that shines through in every project.
            <br /><br />
            My skill in translating clients' visions into reality is exceptional. My work remains cutting-edge and relevant, with a portfolio showcasing a diverse range of projects that highlight adaptability and innovation.
          </p>
        </div>

        {/* Right Side: Experience, Education, Slogan Cards */}
        <div className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {/* Experience Card */}
          <div className="flex flex-col gap-4 rounded-md shadow-card bg-card p-6 sm:p-8 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-card-hover">
            <h1 className="text-xl sm:text-2xl font-bold text-card-foreground text-center">Experience</h1>
            <p className="text-gray-text text-center text-sm sm:text-base">
              2+ years<br />Frontend and Backend Development.
            </p>
          </div>

          {/* Education Card */}
          <div className="flex flex-col gap-4 rounded-md shadow-card bg-card p-6 sm:p-8 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-card-hover">
            <h1 className="text-xl sm:text-2xl font-bold text-card-foreground text-center">Education</h1>
            <p className="text-gray-text text-center text-sm sm:text-base">
              Certificate in Software Development.<br />Diploma in Software Development.
            </p>
          </div>

          {/* Slogan Card */}
          <div className="flex flex-col gap-4 rounded-md shadow-card bg-card p-6 sm:p-8 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-card-hover sm:col-span-2 lg:col-span-1">
            <h1 className="text-xl sm:text-2xl font-bold text-card-foreground text-center">My Slogan</h1>
            <p className="text-gray-text text-center text-sm sm:text-base">
              Elevate Your Online Presence with<br />Our Unique Designs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;