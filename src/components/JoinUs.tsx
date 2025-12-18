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
          {/* Membership Application Form */}
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <div>
              {/* Contact/Application */}
              <JoinOurCommunity />

              {/* Call to Action */}
              <CTA />
            </div>

            {/* Membership Information */}
            <MemberInformation />
          </div>
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

const JoinOurCommunity = () => {
  return (
    <div className="bg-white p-8 rounded-xl shadow-lg">
      <h3 className="text-2xl font-serif font-bold text-gray-900 mb-6">
        Join our Community
      </h3>

      <p className="text-gray-700 mb-6">
        Take the first step towards joining our community. We'll provide you
        with all the information you need to get started and connect you with
        current members who can answer your questions.
      </p>
      <div className="space-y-4">
        <button type="button" className="btn-primary w-full">
          Contact Us About Membership
        </button>

        <div className="text-center">
          <p className="text-sm text-gray-600 mb-2">Or reach out directly:</p>
          <a
            href="mailto:members@naturistcafecommunity.org?subject=Join+Request&body=I%20am%20interested%20in%20joining%20the%20Naturist%20Caf%C3%A9%20Community.%20Please%20provide%20me%20with%20more%20information."
            className="text-nature-600 hover:text-nature-700 font-medium text-sm"
          >
            members@naturistcafecommunity.org
          </a>
        </div>

        <div className="border-t pt-4">
          <p className="text-xs text-gray-500 text-center">
            All inquiries are handled with complete confidentiality and respect
          </p>
        </div>
      </div>
    </div>
  );
};

const MemberInformation = () => {
  return (
    <div className="bg-white p-8 rounded-xl shadow-lg mt-12">
      <h3 className="text-2xl font-serif font-bold text-gray-900 mb-6">
        Membership Information
      </h3>

      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <div className="w-2 h-2 bg-nature-500 rounded-full mt-2"></div>
          <div>
            <h4 className="font-medium text-gray-900">Open Membership</h4>
            <p className="text-gray-600 text-sm">
              Welcome to all who share our values of respect and authenticity
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="w-2 h-2 bg-earth-500 rounded-full mt-2"></div>
          <div>
            <h4 className="font-medium text-gray-900">Community Guidelines</h4>
            <p className="text-gray-600 text-sm">
              All members agree to follow our constitution and community
              principles
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="w-2 h-2 bg-nature-500 rounded-full mt-2"></div>
          <div>
            <h4 className="font-medium text-gray-900">Active Participation</h4>
            <p className="text-gray-600 text-sm">
              Engage in events, workshops, and community activities
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="w-2 h-2 bg-earth-500 rounded-full mt-2"></div>
          <div>
            <h4 className="font-medium text-gray-900">South African Focus</h4>
            <p className="text-gray-600 text-sm">
              Promoting naturist culture within the South African context
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 p-4 bg-nature-50 rounded-lg">
        <h4 className="font-medium text-nature-800 mb-2">
          Privacy & Confidentiality
        </h4>
        <p className="text-sm text-nature-700">
          All personal information is kept strictly confidential and is only
          used for membership purposes and community communication.
        </p>
      </div>
    </div>
  );
};

const CTA = () => {
  return (
    <div className="text-center mt-12">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-2xl mx-auto">
        <h3 className="text-xl font-serif font-bold text-gray-900 mb-4">
          Questions About Membership?
        </h3>
        <p className="text-gray-600 mb-6">
          We're here to help you understand our community and what membership
          entails. Feel free to reach out with any questions or concerns.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            type="button"
            onClick={() =>
              document
                .getElementById("constitution")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="btn-secondary"
          >
            Read Our Constitution
          </button>
          <button
            type="button"
            onClick={() =>
              document
                .getElementById("board")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="btn-primary"
          >
            Meet Our Board
          </button>
        </div>
      </div>
    </div>
  );
};

const MembershipForm = () => {
  const [formData, setFormData] = useState({
    // Required fields
    firstName: "",
    nickname: "",
    contactMethod: "email", // 'email' or 'phone'
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

  const interestOptions = [
    "Nature Walks",
    "Community Markets",
    "Wellness Workshops",
    "Social Events",
    "Educational Sessions",
    "Work Opportunities",
    "Board Participation",
    "Event Organisation",
  ];

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleInterestChange = (interest: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
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

    // Required fields validation
    // if (!formData.firstName.trim())
    //   newErrors.firstName = "First name is required";
    // if (!formData.nickname.trim()) newErrors.nickname = "Nickname is required";
    // if (!formData.dateOfBirth)
    //   newErrors.dateOfBirth = "Date of birth is required";

    // Contact method validation
    if (formData.contactMethod === "email") {
      if (!formData.email.trim()) {
        newErrors.email = "Email address is required";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Please enter a valid email address";
      }
    } else {
      if (!formData.phone.trim()) {
        newErrors.phone = "Phone number is required";
      } else if (!/^[\d\s\-+()]+$/.test(formData.phone)) {
        newErrors.phone = "Please enter a valid phone number";
      }
    }

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

  if (state.succeeded) {
    //console.log("Form Data", formData, state);
    // Reset form
    // setFormData({
    //   firstName: "",
    //   nickname: "",
    //   contactMethod: "email",
    //   email: "",
    //   phone: "",
    //   dateOfBirth: "",
    //   lastName: "",
    //   gender: "",
    //   city: "",
    //   province: "",
    //   emergencyContact: "",
    //   emergencyPhone: "",
    //   naturismExperience: "",
    //   heardAboutUs: "",
    //   interests: [],
    //   otherAreasOfInterest: "",
    //   medicalConditions: "",
    //   additionalComments: "",
    // });
    // return "<p>Thank you for your application! We'll be in touch soon.</p>";
  }

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
          </div>

          <div className="mt-4">
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
              <p className="text-red-500 text-xs mt-1">{errors.dateOfBirth}</p>
            )}
          </div>

          <div className="mt-4">
            <label
              htmlFor="contactMethod"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Preferred Contact Method *
            </label>
            <div className="flex gap-4 mb-3">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="contactMethod"
                  value="email"
                  checked={formData.contactMethod === "email"}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                Email
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="contactMethod"
                  value="phone"
                  checked={formData.contactMethod === "phone"}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                Phone
              </label>
            </div>

            {formData.contactMethod === "email" ? (
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
            ) : (
              <div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-nature-500 focus:border-nature-500 ${
                    errors.phone ? "border-red-300" : "border-gray-300"
                  }`}
                  placeholder="+27 XX XXX XXXX"
                />
                <ValidationError
                  prefix="Phone Number"
                  field="phone"
                  className="text-red-500 text-xs mt-1"
                  errors={state.errors}
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Optional Information */}
        <div>
          <h4 className="text-lg font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">
            Additional Information (Optional)
          </h4>

          <div className="grid md:grid-cols-2 gap-4">
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
                <option value="">Prefer not to say</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="non-binary">Non-binary</option>
                <option value="other">Other</option>
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

          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <div>
              <label
                htmlFor="emergencyContact"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Emergency Contact Name
              </label>
              <input
                type="text"
                name="emergencyContact"
                value={formData.emergencyContact}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nature-500 focus:border-nature-500"
                placeholder="Full name"
              />
            </div>

            <div>
              <label
                htmlFor="emergencyPhone"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Emergency Contact Phone
              </label>
              <input
                type="tel"
                name="emergencyPhone"
                value={formData.emergencyPhone}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nature-500 focus:border-nature-500"
                placeholder="+27 XX XXX XXXX"
              />
            </div>
          </div>

          <div className="mt-4">
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
              <option value="experienced-naturist">Experienced naturist</option>
              <option value="longterm-naturist">Long-term naturist</option>
            </select>
          </div>

          <div className="mt-4">
            <label
              htmlFor="heardAboutUs"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              How did you hear about us?
            </label>
            <input
              type="text"
              name="heardAboutUs"
              value={formData.heardAboutUs}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nature-500 focus:border-nature-500"
              placeholder="Website, friend, social media, etc."
            />
          </div>

          <div className="mt-4">
            <label
              htmlFor="interests"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Areas of Interest (Select all that apply)
            </label>
            <div className="grid grid-cols-2 gap-2">
              {interestOptions.map((interest) => (
                <label key={interest} className="flex items-center text-sm">
                  <input
                    type="checkbox"
                    name="interests"
                    value={interest}
                    title={interest}
                    aria-label={`Interest: ${interest}`}
                    checked={formData.interests.includes(interest)}
                    onChange={() => handleInterestChange(interest)}
                    className="mr-2"
                  />
                  {interest}
                </label>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <label
              htmlFor="otherAreasOfInterest"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Other Areas of Interest
            </label>
            <textarea
              title="OtherAreasOfInterest"
              name="otherAreasOfInterest"
              value={formData.otherAreasOfInterest}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nature-500 focus:border-nature-500"
              placeholder=""
            />
          </div>

          <div className="mt-4">
            <label
              htmlFor="additionalComments"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Additional Comments
            </label>
            <textarea
              name="additionalComments"
              value={formData.additionalComments}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nature-500 focus:border-nature-500"
              placeholder="Anything else you'd like us to know..."
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-6">
          <button
            type="submit"
            disabled={state.submitting}
            className="w-full btn-primary cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {state.submitting
              ? "Submitting Application..."
              : "Submit Application"}
          </button>

          <p className="text-xs text-gray-500 text-center mt-3">
            By submitting this application, you agree to abide by our community
            constitution and guidelines.
          </p>
        </div>
      </form>
    </div>
  );
};
