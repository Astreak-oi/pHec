"use client";
import { Icons } from "@/components/icons";
import { useState } from "react";

type Props = {
  params: { landingName: string };
};

export default function InquiryForm({params}: Props) {
  const [step, setStep] = useState(1);
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state for submission
  const [errors, setErrors] = useState<{ [key: string]: boolean }>({}); // Error handling with color changes


  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    budget: "",
    source: params?.landingName,
    serviceRequested: "",
    aboutProject: "",
    additionalInfo: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type, } = e.target;

    if (type === "checkbox" || type === "radio") {
      const target = e.target as HTMLInputElement;
      if (type === "radio" && name === "budget") {
        setFormData({ ...formData, budget: value });
        setErrors({ ...errors, budget: false }); 
      } else if (type === "checkbox" && name === "terms") {
        setIsChecked(target.checked); 
        setErrors({ ...errors, terms: false }); 
      }
    } else {
      setFormData({ ...formData, [name]: value });
      setErrors({ ...errors, [name]: false }); // Remove error on input change
    }
  };

  // Validate current step
  const validateStep = () => {
    const newErrors: { [key: string]: boolean } = {};

    if (step === 1) {
      if (!formData.fullName) newErrors.fullName = true;
      if (!formData.email) newErrors.email = true;
      if (!formData.aboutProject) newErrors.aboutProject = true;
    }

    if (step === 2) {
      if (!formData.phone) newErrors.phone = true;
      if (!formData.serviceRequested) newErrors.serviceRequested = true;
    }

    if (step === 3) {
      if (!formData.budget) newErrors.budget = true;
      if (!isChecked) newErrors.terms = true;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep() && step < 3) {
      setStep((prevStep) => prevStep + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) setStep((prevStep) => prevStep - 1);
    
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep()) return;

    try {
      setLoading(true); // Start loading state
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log(response)
        console.log("Inquiry submitted successfully");
      } else {
        console.error("Failed to submit inquiry");
      }
    } catch (error) {
      console.error("Error submitting the form", error);
    } finally {
      setLoading(false); // End loading state
    }
  };

  return (
    <section className="max-w-2xl flex items-center justify-center">
      <div className="bg-gray-100 rounded-lg w-full max-w-lg">
        <div className="border-b border-black">
          <div className="px-8 py-4 flex justify-between items-center">
            <h2 className="text-xl font-semibold">Project</h2>
            <span className="text-gray-500">Step {step}/3</span>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="h-80">
            {step === 1 && (
              <div className="px-8 pt-8">
                <div className="relative flex flex-col mb-4">
                  <div className="font-bold mb-1 text-left">Full Name</div>
                  <input
                    type="text"
                    className={`block h-9 w-full rounded-md border border-solid  px-3 py-6 text-sm text-black placeholder:text-black ${
                      errors?.fullName ? "border-red-600" : "border-black"
                    }`}
                    placeholder="Full Name"
                    required
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                  />
                </div>
                <div className="relative flex flex-col mb-4">
                  <div className="font-bold mb-1 text-left">Email</div>
                  <input
                    type="email"
                    className={`block h-9 w-full rounded-md border border-solid  px-3 py-6 text-sm text-black placeholder:text-black ${
                      errors?.email ? "border-red-600" : "border-black"
                    }`}
                    placeholder="Email Address"
                    required
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="relative flex flex-col mb-4">
                  <div className="font-bold mb-1 text-left">Project Brief</div>
                  <textarea
                    className={`w-full h-22 rounded-md border border-solid border-black px-3 py-3 text-sm text-black placeholder:text-black ${
                      errors?.aboutProject ? "border-red-600" : "border-black"
                    }`}
                    name="aboutProject"
                    placeholder="About Project"
                    value={formData.aboutProject}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            )}
            {step === 2 && (
              <div className="px-8 pt-8">
                <div className="relative mb-4">
                  <div className="font-bold mb-1 text-left">Mobile</div>
                  <input
                    type="tel"
                    className={`block h-9 w-full rounded-md border border-solid  px-3 py-6 text-sm text-black placeholder:text-black ${
                      errors?.phone ? "border-red-600" : "border-black"
                    }`}
                    placeholder="Mobile Number"
                    required
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="relative mb-4">
                  <div className="font-bold mb-1 text-left">Services</div>
                  <div className="relative">
                    <select
                      className={`w-full h-12 appearance-none rounded-md border border-solid border-black px-3 py-3 text-sm text-black bg-white placeholder:text-black ${
                        errors?.serviceRequested
                          ? "border-red-600"
                          : "border-black"
                      }`}
                      required
                      name="serviceRequested"
                      value={formData.serviceRequested}
                      onChange={handleChange}
                    >
                      <option value="" disabled>
                        Select a Service
                      </option>
                      <option value="software_development">
                        Software Development
                      </option>
                      <option value="devops">DevOps</option>
                      <option value="qa">QA</option>
                      <option value="ui_ux">UI/UX</option>
                      <option value="consulting">Consulting</option>
                      <option value="support">Support</option>
                    </select>

                    {/* Custom dropdown icon */}
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-black">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="relative flex flex-col mb-8">
                  <div className="font-bold mb-1 text-left">
                    Additional Info
                  </div>
                  <textarea
                    className={`w-full h-22 rounded-md border border-solid border-black px-3 py-3 text-sm text-black placeholder:text-black ${
                      errors?.additionalInfo ? "border-red-600" : "border-black"
                    }`}
                    required
                    name="additionalInfo"
                    placeholder="Additional Info"
                    value={formData.additionalInfo}
                    onChange={handleChange}
                  />
                </div>
              </div>
            )}
            {step === 3 && (
              <div className="px-8 pt-8">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Budget</h3>
                  <div className="flex flex-wrap justify-between gap-2 border-b border-black pb-8">
                  {["<$5k", "$5k-$10k", "$10k-$20k", ">$20k"].map((budget) => (
                    <label
                      key={budget}
                      className={`relative flex items-center text-sm justify-center w-[48%] px-4 py-3 border rounded-lg cursor-pointer ${
                        formData.budget === budget
                          ? "border-black bg-gray-200"
                          : `${
                              errors.budget
                                ? "border-red-400 bg-gray-200"
                                : "border-gray-300"
                            }`
                      }`}
                    >
                      <input
                        type="radio"
                        name="budget"
                        value={budget}
                        checked={formData.budget === budget}
                        onChange={handleChange}
                        className="hidden"
                      />
                      {budget}
                    </label>
                  ))}
                  </div>
                </div>

                <div className="px-4 py-4">
                  <label className="flex items-center">
                    <input
                    id="terms"
                    name="terms"
                      type="checkbox"
                      className="form-checkbox h-5 w-5"
                      checked={isChecked}
                      onChange={handleChange}
                    />
                    <span
                      className={`ml-4 text-sm text-black ${
                        errors.terms ? "text-red-600" : "text-black"
                      }`}
                    >
                      I agree with Terms & Conditions
                    </span>
                  </label>

                  <p className="mt-3 text-sm">
                    Your personal data will be used to process your order,
                    support your experience throughout this website, and for
                    other purposes described in our{" "}
                    <a href="#" className="font-semibold">
                      privacy policy
                    </a>{" "}
                    .
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-row-reverse gap-6 pt-10 p-8">
            {step === 3 ? (
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-black text-white p-3 rounded-lg font-bold"
              >
                {loading ? <Icons.sun className="animate-spin" /> : "Submit"}
              </button>
            ) : (
              <button
                type="button"
                onClick={nextStep}
                className="w-full bg-black text-white p-3 rounded-lg font-bold"
              >
                Next
              </button>
            )}
            <button
              onClick={prevStep}
              className={`w-full bg-gray-300 border border-black p-3 rounded-lg font-bold `}
            >
              Back
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
