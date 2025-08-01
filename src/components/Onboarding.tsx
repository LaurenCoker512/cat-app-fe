import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import Select from "react-select";

const initialCat = { name: "", breed: "", age: "", temperament: "" };

const steps = [
  "Home Info",
  "Lifestyle",
  "Toys & Enrichment",
  "Your Cat(s)",
  "Review & Submit",
];

interface OnboardingProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: {
    form: typeof initialForm;
    cats: (typeof initialCat)[];
  }) => void;
}

const initialForm = {
  homeType: "",
  homeFeatures: "",
  lifestyle: "",
  activityLevel: "",
  toys: "",
  furniture: "",
};

const Onboarding = ({ open, onClose, onSubmit }: OnboardingProps) => {
  useAuth();
  const [step, setStep] = useState(0);
  const [cats, setCats] = useState([{ ...initialCat }]);
  const [form, setForm] = useState({ ...initialForm });
  const [submitted, setSubmitted] = useState(false);

  const HOME_FEATURE_OPTIONS = [
    { value: "Balcony", label: "Balcony" },
    { value: "Yard", label: "Yard" },
    { value: "Stairs", label: "Stairs" },
    { value: "Patio", label: "Patio" },
    { value: "Large Windows", label: "Large Windows" },
    { value: "Other", label: "Other" },
  ];
  const [homeFeatures, setHomeFeatures] = useState<
    { value: string; label: string }[]
  >([]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCatChange = (
    idx: number,
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const newCats = cats.map((cat, i) =>
      i === idx ? { ...cat, [e.target.name]: e.target.value } : cat
    );
    setCats(newCats);
  };

  const addCat = () => {
    setCats([...cats, { ...initialCat }]);
  };

  const removeCat = (idx: number) => {
    setCats(cats.filter((_, i) => i !== idx));
  };

  const nextStep = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const prevStep = () => setStep((s) => Math.max(s - 1, 0));

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    localStorage.setItem("needsOnboarding", "false");
    if (onSubmit) {
      onSubmit({ form, cats });
    }
    setTimeout(() => {
      setSubmitted(false);
      if (onClose) onClose();
    }, 1500);
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="onboarding-title"
    >
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg mx-4 p-6 relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none"
          aria-label="Close onboarding"
          onClick={onClose}
        >
          <span aria-hidden="true">&times;</span>
        </button>
        <h2
          id="onboarding-title"
          className="text-2xl font-bold mb-4 text-dusty-coral"
        >
          Welcome! Let's get to know you
        </h2>
        <div className="mb-4 flex items-center gap-2" aria-label="Progress">
          {steps.map((label, i) => (
            <div
              key={label}
              className={`flex-1 h-2 rounded ${
                i <= step ? "bg-dusty-coral" : "bg-gray-200"
              }`}
              aria-current={i === step ? "step" : undefined}
            />
          ))}
        </div>
        <form onSubmit={handleSubmit}>
          {step === 0 && (
            <div>
              <label
                htmlFor="homeType"
                className="block font-medium text-gray-700 mb-1"
              >
                What type of home do you live in?
              </label>
              <select
                id="homeType"
                name="homeType"
                value={form.homeType}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded p-2 mb-3 text-gray-700"
              >
                <option value="">Select...</option>
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
                <option value="condo">Condo</option>
                <option value="other">Other</option>
              </select>
              <label
                htmlFor="homeFeatures"
                className="block font-medium text-gray-700 mb-1"
              >
                Any special home features? (Select all that apply)
              </label>
              <Select
                inputId="homeFeatures"
                isMulti
                name="homeFeatures"
                options={HOME_FEATURE_OPTIONS}
                value={homeFeatures}
                onChange={(selected) =>
                  setHomeFeatures(selected as typeof HOME_FEATURE_OPTIONS)
                }
                className="mb-3"
                classNamePrefix="react-select"
                aria-label="Any special home features? (Select all that apply)"
                styles={{
                  control: (provided, state) => ({
                    ...provided,
                    boxShadow: state.isFocused
                      ? "0 0 0 2px #3a7b7d"
                      : provided.boxShadow,
                    borderColor: state.isFocused
                      ? "#3a7b7d"
                      : provided.borderColor,
                  }),
                  option: (provided, state) => ({
                    ...provided,
                    color: "black", // Set option text color
                    backgroundColor: state.isFocused ? "#ffe5d0" : "white", // Optional: highlight on hover
                  }),
                  multiValueLabel: (provided) => ({
                    ...provided,
                    color: "black", // Set selected value text color
                  }),
                  input: (provided) => ({
                    ...provided,
                    color: "black", // Set input text color
                  }),
                  singleValue: (provided) => ({
                    ...provided,
                    color: "black", // Set single value text color
                  }),
                }}
              />
            </div>
          )}
          {step === 1 && (
            <div>
              <label
                htmlFor="lifestyle"
                className="block font-medium text-gray-700 mb-1"
              >
                How much time do you spend at home?
              </label>
              <select
                id="lifestyle"
                name="lifestyle"
                value={form.lifestyle}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded p-2 mb-3 text-gray-700"
              >
                <option value="">Select...</option>
                <option value="mostly-home">Mostly at home</option>
                <option value="half-half">About half and half</option>
                <option value="rarely-home">Rarely at home</option>
              </select>
              <label
                htmlFor="activityLevel"
                className="block font-medium text-gray-700 mb-1"
              >
                How active is your household?
              </label>
              <select
                id="activityLevel"
                name="activityLevel"
                value={form.activityLevel}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded p-2 mb-3 text-gray-700"
              >
                <option value="">Select...</option>
                <option value="calm">Calm</option>
                <option value="moderate">Moderate</option>
                <option value="busy">Busy</option>
              </select>
            </div>
          )}
          {step === 2 && (
            <div>
              <label
                htmlFor="toys"
                className="block font-medium text-gray-700 mb-1"
              >
                What cat toys do you have at home?
              </label>
              <input
                id="toys"
                name="toys"
                type="text"
                value={form.toys}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded p-2 mb-3"
                placeholder="e.g., balls, wands, tunnels"
                aria-describedby="toys-desc"
              />
              <div id="toys-desc" className="text-xs text-gray-500 mb-2">
                Optional
              </div>
              <label
                htmlFor="furniture"
                className="block font-medium text-gray-700 mb-1"
              >
                What cat furniture or enrichment do you have?
              </label>
              <input
                id="furniture"
                name="furniture"
                type="text"
                value={form.furniture}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded p-2 mb-3"
                placeholder="e.g., cat tree, shelves, window perch"
                aria-describedby="furniture-desc"
              />
              <div id="furniture-desc" className="text-xs text-gray-500 mb-2">
                Optional
              </div>
            </div>
          )}
          {step === 3 && (
            <div>
              <div className="mb-2 font-medium text-gray-700">
                Tell us about your cat(s):
              </div>
              {cats.map((cat, idx) => (
                <fieldset
                  key={idx}
                  className="border border-gray-300 rounded p-3 mb-3"
                >
                  <legend className="text-sm font-semibold text-dusty-coral">
                    Cat {idx + 1}
                  </legend>
                  <label
                    htmlFor={`cat-name-${idx}`}
                    className="block text-sm mt-2"
                  >
                    Name
                  </label>
                  <input
                    id={`cat-name-${idx}`}
                    name="name"
                    type="text"
                    value={cat.name}
                    onChange={(e) => handleCatChange(idx, e)}
                    className="w-full border border-gray-300 rounded p-2 mb-2"
                    required
                  />
                  <label htmlFor={`cat-breed-${idx}`} className="block text-sm">
                    Breed
                  </label>
                  <input
                    id={`cat-breed-${idx}`}
                    name="breed"
                    type="text"
                    value={cat.breed}
                    onChange={(e) => handleCatChange(idx, e)}
                    className="w-full border border-gray-300 rounded p-2 mb-2"
                  />
                  <label htmlFor={`cat-age-${idx}`} className="block text-sm">
                    Age
                  </label>
                  <input
                    id={`cat-age-${idx}`}
                    name="age"
                    type="number"
                    min="0"
                    value={cat.age}
                    onChange={(e) => handleCatChange(idx, e)}
                    className="w-full border border-gray-300 rounded p-2 mb-2"
                  />
                  <label
                    htmlFor={`cat-temperament-${idx}`}
                    className="block text-sm"
                  >
                    Temperament
                  </label>
                  <input
                    id={`cat-temperament-${idx}`}
                    name="temperament"
                    type="text"
                    value={cat.temperament}
                    onChange={(e) => handleCatChange(idx, e)}
                    className="w-full border border-gray-300 rounded p-2 mb-2"
                  />
                  {cats.length > 1 && (
                    <button
                      type="button"
                      className="text-xs text-red-600 mt-1 underline"
                      onClick={() => removeCat(idx)}
                      aria-label={`Remove cat ${idx + 1}`}
                    >
                      Remove this cat
                    </button>
                  )}
                </fieldset>
              ))}
              <button
                type="button"
                className="text-sm text-dusty-coral underline mb-2"
                onClick={addCat}
                aria-label="Add another cat"
              >
                + Add another cat
              </button>
            </div>
          )}
          {step === 4 && (
            <div>
              <h3 className="font-semibold mb-2">Review your info:</h3>
              <ul className="mb-2 text-sm">
                <li>
                  <strong>Home:</strong> {form.homeType}{" "}
                  {form.homeFeatures && `- ${form.homeFeatures}`}
                </li>
                <li>
                  <strong>Lifestyle:</strong> {form.lifestyle},{" "}
                  {form.activityLevel}
                </li>
                <li>
                  <strong>Toys:</strong> {form.toys || "N/A"}
                </li>
                <li>
                  <strong>Furniture:</strong> {form.furniture || "N/A"}
                </li>
                <li>
                  <strong>Cats:</strong>
                  <ul className="ml-4">
                    {cats.map((cat, idx) => (
                      <li key={idx}>
                        {cat.name} ({cat.breed || "Unknown"}), Age:{" "}
                        {cat.age || "Unknown"}, Temperament:{" "}
                        {cat.temperament || "Unknown"}
                      </li>
                    ))}
                  </ul>
                </li>
              </ul>
              <div className="text-xs text-gray-500 mb-2">
                If you need to make changes, use Previous.
              </div>
            </div>
          )}
          <div
            className={`flex mt-4 ${
              step > 0 ? "justify-between" : "justify-end"
            }`}
          >
            {step > 0 && (
              <button
                type="button"
                onClick={prevStep}
                className="px-4 py-2 rounded bg-gray-200 text-gray-700 font-medium"
              >
                Previous
              </button>
            )}
            {step < steps.length - 1 ? (
              <button
                type="button"
                onClick={nextStep}
                className="px-4 py-2 rounded bg-dusty-coral text-white font-medium"
                aria-label="Next step"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                className="px-4 py-2 rounded bg-deep-teal text-white font-medium"
                aria-label="Submit onboarding"
              >
                Submit
              </button>
            )}
          </div>
        </form>
        {submitted && (
          <div className="mt-4 text-green-700 font-semibold" role="status">
            Onboarding complete! Redirecting...
          </div>
        )}
      </div>
    </div>
  );
};

export default Onboarding;
