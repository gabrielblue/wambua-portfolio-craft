
const Footer = () => {
  return (
    <div className="w-full bg-blue-light border-t border-gray-light">
      <div className="container mx-auto py-4 sm:py-5 flex flex-col sm:flex-row items-center justify-between px-4 sm:px-6 gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6 sm:w-8 h-6 sm:h-8 bg-gradient-blue rounded-lg flex items-center justify-center text-white font-bold text-xs sm:text-sm">
            GW
          </div>
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