import { Button } from './ui/button';
import logoImage from 'figma:asset/5359972e9e4260f6bcd141dfc6d216542cc5799c.png';
import { Link } from 'react-router';

export function Navigation() {
  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <img src={logoImage} alt="RiskLens Logo" className="h-10 w-auto" />
            <span className="text-xl font-semibold text-gray-900">RiskLens</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-gray-700 hover:text-gray-900 transition-colors">
              Home
            </Link>
            <a href="#report-a-site" className="text-gray-700 hover:text-gray-900 transition-colors">
              Report a site
            </a>
            <a href="#who-it-is" className="text-gray-700 hover:text-gray-900 transition-colors">
              Who it is for
            </a>
            <a href="#developer" className="text-gray-700 hover:text-gray-900 transition-colors">
              Developer
            </a>
          </div>

          <Button className="bg-green-600 hover:bg-green-700 text-white rounded-md">
            Install Now
          </Button>
        </div>
      </div>
    </nav>
  );
}