import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg overflow-hidden p-6 text-center">
        {/* Cat illustration */}
        <div className="relative mb-8">
          <div className="w-40 h-32 bg-orange-100 rounded-full mx-auto relative">
            {/* Cat ears */}
            <div className="absolute -top-4 -left-2 w-0 h-0 border-l-[20px] border-l-transparent border-b-[30px] border-b-orange-200 border-r-[20px] border-r-transparent"></div>
            <div className="absolute -top-4 -right-2 w-0 h-0 border-l-[20px] border-l-transparent border-b-[30px] border-b-orange-200 border-r-[20px] border-r-transparent"></div>

            {/* Cat face */}
            <div className="absolute top-8 left-1/2 transform -translate-x-1/2">
              {/* Eyes */}
              <div className="flex space-x-8 mb-2">
                <div className="w-6 h-6 bg-yellow-500 rounded-full relative">
                  <div className="w-2 h-2 bg-black rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                </div>
                <div className="w-6 h-6 bg-yellow-500 rounded-full relative">
                  <div className="w-2 h-2 bg-black rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                </div>
              </div>

              {/* Nose and mouth */}
              <div className="w-4 h-4 bg-pink-300 rounded-full mx-auto mb-1 relative">
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
                  <div className="w-0.5 h-4 bg-pink-300 mx-auto"></div>
                  <div className="flex space-x-1 -mt-0.5">
                    <div className="w-4 h-2 border-b-2 border-pink-300 rounded-b-full"></div>
                    <div className="w-4 h-2 border-b-2 border-pink-300 rounded-b-full"></div>
                  </div>
                </div>
              </div>

              {/* Whiskers */}
              <div className="absolute top-6 -left-8 w-16 h-0.5 bg-gray-300 transform -rotate-6"></div>
              <div className="absolute top-6 -right-8 w-16 h-0.5 bg-gray-300 transform rotate-6"></div>
              <div className="absolute top-8 -left-8 w-16 h-0.5 bg-gray-300"></div>
              <div className="absolute top-8 -right-8 w-16 h-0.5 bg-gray-300"></div>
            </div>
          </div>

          {/* Paws */}
          <div className="flex justify-center space-x-12 mt-4">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="w-8 h-6 bg-orange-200 rounded-full relative"
              >
                <div className="absolute -bottom-1 left-0 right-0 flex justify-center space-x-1">
                  {[...Array(3)].map((_, j) => (
                    <div
                      key={j}
                      className="w-1.5 h-2 bg-orange-300 rounded-full"
                    ></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Message */}
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          404 - Cat Not Found
        </h1>
        <p className="text-gray-600 mb-6">
          Oops! The page you're looking for has scampered away.
        </p>

        {/* Back to home link */}
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-dusty-coral text-white font-medium rounded-full transition duration-200 shadow-md hover:shadow-lg"
        >
          Back to Purrfect Health Home
        </Link>

        {/* Fun cat fact */}
        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-gray-700 italic">
            Did you know? Cats sleep 12-16 hours a day. Maybe this page is just
            napping...
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
