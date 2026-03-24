import { type FormEvent, useForm, ValidationError } from "@formspree/react";
import { useState } from "react";

const JoinUs = () => {
  return (
    <section
      id={`join`}
      className="bg-gradient-to-br from-earth-50 to-nature-50"
    >
      <div className="container-custom">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            {/* Application Form */}
            <MembershipForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default JoinUs;

const MembershipForm = () => {
  const [formData, setFormData] = useState({
    // Required fields
    firstName: "",
    nickname: "",
    email: "",
    phone: "",
    dateOfBirth: "",

    // Optional fields
    lastName: "",
    gender: "",
    city: "",
    province: "",
    emergencyContact: "",
    emergencyPhone: "",
    naturismExperience: "",
    heardAboutUs: "",
    interests: [] as string[],
    otherAreasOfInterest: "",
    medicalConditions: "",
    additionalComments: "",
  });

  const [state, handleSubmit] = useForm("xqavrbjr");

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleLocalSubmit = (e: FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (validateForm() && !state.submitting) {
      handleSubmit(e);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Age validation
    if (formData.dateOfBirth) {
      const birthDate = new Date(formData.dateOfBirth);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();

      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDate.getDate())
      ) {
        age--;
      }

      if (age < 18) {
        newErrors.dateOfBirth = "You must be 18 years or older to join";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg">
      <h3 className="text-2xl font-serif font-bold text-gray-900 mb-6">
        Membership Application
      </h3>
      {state.succeeded && (
        <h4>Thank you for your application! We'll be in touch soon.</h4>
      )}

      <form onSubmit={handleLocalSubmit} className="space-y-6">
        {/* Required Information */}
        <div>
          <h4 className="text-lg font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">
            Required Information
          </h4>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                First Name *
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-nature-500 focus:border-nature-500 ${
                  state.errors?.getFieldErrors("firstName")
                    ? "border-red-300"
                    : "border-gray-300"
                }`}
                placeholder="Your first name"
              />
              <ValidationError
                prefix="First Name"
                field="firstName"
                className="text-red-500 text-xs mt-1"
                errors={state.errors}
              />
            </div>

            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nature-500 focus:border-nature-500"
                placeholder="Your last name"
              />
            </div>

            <div>
              <label
                htmlFor="nickname"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Nickname/Preferred Name *
              </label>
              <input
                type="text"
                name="nickname"
                value={formData.nickname}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-nature-500 focus:border-nature-500 ${
                  state.errors?.getFieldErrors("nickname")
                    ? "border-red-300"
                    : "border-gray-300"
                }`}
                placeholder="How you'd like to be called"
              />
              <ValidationError
                prefix="Nickname"
                field="nickname"
                className="text-red-500 text-xs mt-1"
                errors={state.errors}
              />
            </div>
            <div>
              <label
                htmlFor="dateOfBirth"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Date of Birth *
              </label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                max={new Date().toISOString().split("T")[0]}
                title="Date of Birth"
                aria-label="Date of Birth"
                placeholder="YYYY-MM-DD"
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-nature-500 focus:border-nature-500 ${
                  state.errors?.getFieldErrors("dateOfBirth")
                    ? "border-red-300"
                    : "border-gray-300"
                }`}
              />
              <ValidationError
                prefix="Date of Birth"
                field="dateOfBirth"
                className="text-red-500 text-xs mt-1"
                errors={state.errors}
              />
              {errors.dateOfBirth && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.dateOfBirth}
                </p>
              )}
            </div>
          </div>

          <div className="mt-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email *
            </label>

            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-nature-500 focus:border-nature-500 ${
                  state.errors?.getFieldErrors("email") || errors.phone
                    ? "border-red-300"
                    : "border-gray-300"
                }`}
                placeholder="your.email@example.com"
              />
              <ValidationError
                prefix="Email"
                field="email"
                className="text-red-500 text-xs mt-1"
                errors={state.errors}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>
          </div>
        </div>

        {/* Optional Information */}
        <div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="gender"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Gender Identity
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                title="Gender Identity"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nature-500 focus:border-nature-500"
              >
                <option value="">-- Please Select Gender --</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="non-binary">Non-binary</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="naturismExperience"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Naturism Experience
              </label>
              <select
                name="naturismExperience"
                value={formData.naturismExperience}
                onChange={handleInputChange}
                title="Naturism Experience"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nature-500 focus:border-nature-500"
              >
                <option value="">Select your experience level</option>
                <option value="new-to-naturism">New to naturism</option>
                <option value="some-experience">Some experience</option>
                <option value="experienced-naturist">
                  Experienced naturist
                </option>
                <option value="longterm-naturist">Long-term naturist</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="city"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                City
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nature-500 focus:border-nature-500"
                placeholder="Your city"
              />
            </div>

            <div>
              <label
                htmlFor="province"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Province
              </label>
              <select
                name="province"
                value={formData.province}
                onChange={handleInputChange}
                title="Province"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nature-500 focus:border-nature-500"
              >
                <option value="">Select Province</option>
                <option value="eastern-cape">Eastern Cape</option>
                <option value="free-state">Free State</option>
                <option value="gauteng">Gauteng</option>
                <option value="kwazulu-natal">KwaZulu-Natal</option>
                <option value="limpopo">Limpopo</option>
                <option value="mpumalanga">Mpumalanga</option>
                <option value="northern-cape">Northern Cape</option>
                <option value="north-west">North West</option>
                <option value="western-cape">Western Cape</option>
              </select>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-6">
          <button
            type="button"
            disabled={true}
            className="w-full btn-default text-white bg-gray-600 opacity-50 cursor-not-allowed"
          >
            {state.submitting
              ? "Submitting Application Form..."
              : "Membership Application Coming Soon"}
          </button>

          <p className="text-xs text-gray-500 text-center mt-3">
            By submitting this application form, you (a) confirm that the
            accuracy of your details provided, (b) confirm that you have read
            and understood the terms of the Constitution of the Naturist Café
            Community, and (c) agree to abide by the terms of the Constitution
            of the Naturist Café Community.
          </p>
        </div>
      </form>
    </div>
  );
};
