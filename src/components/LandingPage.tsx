import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Header from "./Header";
import Footer from "./Footer";

interface Cat {
  id: string;
  name: string;
  age: number;
  breed: string;
  healthStatus: "Excellent" | "Good" | "Fair" | "Poor";
  lastCheckup: string;
  imageUrl: string;
}

const LandingPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Dummy data for cats
  const dummyCats: Cat[] = [
    {
      id: "1",
      name: "Whiskers",
      age: 3,
      breed: "Domestic Shorthair",
      healthStatus: "Excellent",
      lastCheckup: "2023-05-15",
      imageUrl: "https://placekitten.com/300/200",
    },
    {
      id: "2",
      name: "Mittens",
      age: 5,
      breed: "Siamese",
      healthStatus: "Good",
      lastCheckup: "2023-04-22",
      imageUrl: "https://placekitten.com/300/201",
    },
  ];

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col bg-cream-white">
      <Header
        isLoggedIn={!!user}
        user={user ? { name: user.name, avatar: "https://placekitten.com/200/200" } : undefined}
        onLogout={handleLogout}
      />

      <main className="flex-grow">
        {!!user ? (
          // Logged-in state - Dashboard
          <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-charcoal-gray mb-2">
                Welcome back, {user.name}!
              </h1>
              <p className="text-charcoal-gray">
                Here's an overview of your feline friends' health and
                activities.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dummyCats.map((cat) => (
                <div
                  key={cat.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={cat.imageUrl}
                      alt={cat.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h2 className="text-xl font-bold text-charcoal-gray">
                        {cat.name}
                      </h2>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          cat.healthStatus === "Excellent"
                            ? "bg-green-100 text-green-800"
                            : cat.healthStatus === "Good"
                            ? "bg-blue-100 text-blue-800"
                            : cat.healthStatus === "Fair"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {cat.healthStatus}
                      </span>
                    </div>
                    <p className="text-charcoal-gray mb-1">
                      <span className="font-medium">Breed:</span> {cat.breed}
                    </p>
                    <p className="text-charcoal-gray mb-1">
                      <span className="font-medium">Age:</span> {cat.age} years
                    </p>
                    <p className="text-charcoal-gray mb-4">
                      <span className="font-medium">Last Checkup:</span>{" "}
                      {new Date(cat.lastCheckup).toLocaleDateString()}
                    </p>
                    <div className="flex space-x-2">
                      <Link
                        to={`/cats/${cat.id}/health`}
                        className="px-3 py-1 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700 transition-colors"
                      >
                        Health Log
                      </Link>
                      <Link
                        to={`/cats/${cat.id}/activities`}
                        className="px-3 py-1 bg-purple-600 text-white rounded-md text-sm hover:bg-purple-700 transition-colors"
                      >
                        Activities
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
              <Link
                to="/cats/new"
                className="bg-white rounded-lg shadow-md border-2 border-dashed border-gray-300 flex items-center justify-center hover:border-indigo-400 transition-colors"
              >
                <div className="flex flex-col items-center p-6 text-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 text-indigo-500 mb-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  <span className="font-medium text-indigo-600">
                    Add New Cat
                  </span>
                </div>
              </Link>
            </div>
          </div>
        ) : (
          // Logged-out state - Marketing landing page
          <div className="container mx-auto px-4 py-12">
            <section className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold text-dusty-coral mb-4">
                Keep Your Feline Friends Happy & Healthy
              </h1>
              <p className="text-xl text-charcoal-gray max-w-3xl mx-auto mb-8">
                Track your cat's health, behavior, and enrichment activities all
                in one place.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link
                  to="/login"
                  className="px-6 py-3 bg-deep-teal text-white rounded-lg hover:bg-white hover:text-deep-teal border hover:border-deep-teal transition-colors font-medium"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="px-6 py-3 bg-white text-deep-teal border border-deep-teal rounded-lg hover:bg-deep-teal hover:text-white transition-colors font-medium"
                >
                  Create Account
                </Link>
              </div>
            </section>

            {/* ... rest of the landing page content remains the same ... */}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default LandingPage;
