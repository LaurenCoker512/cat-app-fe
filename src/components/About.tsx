import { useAuth } from "../context/AuthContext";
import Header from "./Header";
import Footer from "./Footer";

const About = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-cream-white">
      <Header isLoggedIn={!!user} />

      <main className="flex-grow" id="main-content" tabIndex={-1}>
        <div className="container mx-auto px-4 py-12">
          <section className="text-center mb-16" aria-label="Welcome">
            <h1
              className="text-4xl md:text-5xl font-bold text-dusty-coral mb-4"
              tabIndex={0}
            >
              About Us
            </h1>
            <p className="text-l text-charcoal-gray text-left max-w-3xl mx-auto mb-8">
              Purrfect Health was built by two coworkers-turned-friends, Belle
              and Lauren. They started working together at GRIN back in 2021.
              Lauren already had two cats at the time, and in October 2024,
              Belle adopted her own cat. As proud cat moms, they wanted a
              platform to track their cats' health and help others do the same,
              as well as combat the prevalent issue of cat boredom. Hence,
              Purrfect Health was born, combining their love for cats with their
              work as software engineers.
            </p>
            <p className="text-l text-charcoal-gray text-left max-w-3xl mx-auto mb-8">
              <strong>Lauren Coker</strong> taught herself programming from
              scratch and has been working as a full-stack engineer since 2018,
              with a focus on frontend. Most of her experience is in Vue,
              Laravel, and MySQL, but she decided to write the frontend of
              Purrfect Health in React to develop her skills in the framework.
              She adopted two five-month-old kittens, Sophie and Kiki, in 2020.
              Both are affectionate and full of energy, but also have chronic
              health issues, particularly severe allergies and viral flare-ups.
              Since their systems are unique and new issues regularly come up,
              she uses Purrfect Health to track patterns, note changes in her
              cats' health and behavior, and gather information to bring to the
              vet.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
