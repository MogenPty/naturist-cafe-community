const Join = () => {
  const membershipBenefits = [
    {
      icon: (
        <svg
          className="icon-lg"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
      title: "Community Events",
      description:
        "Access to exclusive nature walks, markets, and community gatherings",
    },
    {
      icon: (
        <svg
          className="icon-md"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
      ),
      title: "Educational Resources",
      description:
        "Workshops on naturist philosophy, wellness practices, and community values",
    },
    {
      icon: (
        <svg
          className="icon-lg"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      ),
      title: "Safe Environment",
      description:
        "Respectful, judgment-free community guided by clear principles and values",
    },
    {
      icon: (
        <svg
          className="icon-lg"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064"
          />
        </svg>
      ),
      title: "Network Connections",
      description:
        "Connect with like-minded individuals and other naturist organizations in South Africa",
    },
  ];

  return (
    <section
      id="join"
      className="section-padding bg-gradient-to-br from-earth-50 to-nature-50"
    >
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-6">
            Become a Member
          </h2>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-8">
            Join our welcoming community and embrace the naturist lifestyle in a
            supportive, respectful environment that celebrates authenticity and
            wellness.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Membership Benefits */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {membershipBenefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-200"
              >
                <div className="icon-container bg-nature-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <div className="text-nature-600">{benefit.icon}</div>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-sm text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>

          {/* Membership Information */}
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-serif font-bold text-gray-900 mb-6">
                Membership Information
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-nature-500 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium text-gray-900">
                      Open Membership
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Welcome to all who share our values of respect and
                      authenticity
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-earth-500 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium text-gray-900">
                      Community Guidelines
                    </h4>
                    <p className="text-gray-600 text-sm">
                      All members agree to follow our constitution and community
                      principles
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-nature-500 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium text-gray-900">
                      Active Participation
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Engage in events, workshops, and community activities
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-earth-500 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium text-gray-900">
                      South African Focus
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Promoting naturist culture within the South African
                      context
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact/Application */}
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-serif font-bold text-gray-900 mb-6">
                Ready to Join?
              </h3>

              <p className="text-gray-700 mb-6">
                Take the first step towards joining our community. We'll provide
                you with all the information you need to get started and connect
                you with current members who can answer your questions.
              </p>

              <div className="space-y-4">
                <button className="btn-primary w-full">
                  Contact Us About Membership
                </button>

                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-2">
                    Or reach out directly:
                  </p>
                  <a
                    href="mailto:membership@naturistcafe.co.za"
                    className="text-nature-600 hover:text-nature-700 font-medium text-sm"
                  >
                    membership@naturistcafe.co.za
                  </a>
                </div>

                <div className="border-t pt-4">
                  <p className="text-xs text-gray-500 text-center">
                    All inquiries are handled with complete confidentiality and
                    respect
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-12">
            <div className="bg-white p-8 rounded-xl shadow-lg max-w-2xl mx-auto">
              <h3 className="text-xl font-serif font-bold text-gray-900 mb-4">
                Questions About Membership?
              </h3>
              <p className="text-gray-600 mb-6">
                We're here to help you understand our community and what
                membership entails. Feel free to reach out with any questions or
                concerns.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
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
        </div>
      </div>
    </section>
  );
};

export default Join;
