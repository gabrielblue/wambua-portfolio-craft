import logoImage from "@/assets/logo.png";

const Footer = () => {
  return (
    <div className="w-full bg-blue-light border-t border-gray-light">
      <div className="container mx-auto py-4 sm:py-5 flex flex-col sm:flex-row items-center justify-between px-4 sm:px-6 gap-4">
        <div className="flex items-center gap-2">
          <img className="w-6 sm:w-8 h-6 sm:h-8" src={logoImage} alt="Portfolio Logo" />
          <span className="text-lg sm:text-2xl font-bold text-foreground">Portfolio.</span>
        </div>
        <span className="text-center sm:text-left font-medium text-gray-text text-sm sm:text-base">
          © 2022 Portfolio Design with ♥️ by Gabriel Wambua.
        </span>
      </div>
    </div>
  );
};

export default Footer;