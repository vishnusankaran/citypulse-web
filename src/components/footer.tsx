import { Mountain } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 px-4 md:px-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center gap-2 mb-4 md:mb-0">
          <Mountain className="h-6 w-6" />
          <span className="text-lg font-semibold">CityPulse</span>
        </div>
        <div className="text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} CityPulse. All rights reserved.</p>
          <p className="mt-1">
            Made with ❤️ for city explorers
          </p>
        </div>
        <div className="flex gap-4 mt-4 md:mt-0">
          <a href="#" className="text-gray-400 hover:text-white">
            Privacy Policy
          </a>
          <a href="#" className="text-gray-400 hover:text-white">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
};
