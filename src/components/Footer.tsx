import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-charcoal-gray text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
              <Link to="/" className="text-xl font-bold hover:text-dusty-coral">
                Purrfect Health
              </Link>
            </div>
            <p className="text-white">
              Helping cat owners track their feline friends' health and
              happiness with personalized recommendations and easy-to-use tools.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-white hover:text-dusty-coral transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-white hover:text-dusty-coral transition-colors"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/resources/health-tips"
                  className="text-white hover:text-dusty-coral transition-colors"
                >
                  Cat Health Tips
                </Link>
              </li>
              <li>
                <Link
                  to="/resources/enrichment"
                  className="text-white hover:text-dusty-coral transition-colors"
                >
                  Enrichment Ideas
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="text-white hover:text-dusty-coral transition-colors"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-dusty-coral mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white text-sm">
            © {new Date().getFullYear()} Purrfect Health. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
