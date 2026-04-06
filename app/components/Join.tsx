"use client";

import { Users, BookOpen, ShieldCheck, Globe } from "lucide-react";

const Join = () => {
  const membershipBenefits = [
    {
      id: "community-events",
      icon: <Users className="icon-lg" />,
      title: "Community Events",
      description:
        "Access to exclusive nature walks, markets, and community gatherings",
    },
    {
      id: "educational-resources",
      icon: <BookOpen className="icon-md" />,
      title: "Educational Resources",
      description:
        "Workshops on naturist philosophy, wellness practices, and community values",
    },
    {
      id: "safe-environment",
      icon: <ShieldCheck className="icon-lg" />,
      title: "Safe Environment",
      description:
        "Respectful, judgment-free community guided by clear principles and values",
    },
    {
      id: "network-connections",
      icon: <Globe className="icon-lg" />,
      title: "Network Connections",
      description:
        "Connect with like-minded individuals and other naturist organizations in South Africa",
    },
  ];

  return (
    <section
      id={`membership-join`}
      className="bg-gradient-to-br from-earth-50 to-nature-50"
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
            {membershipBenefits.map((benefit) => (
              <div
                key={benefit.id}
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
                <button type="button" className="btn-primary w-full">
                  Contact Us About Membership
                </button>

                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-2">
                    Or reach out directly:
                  </p>
                  <a
                    href="mailto:members@naturistcafecommunity.org?subject=Join+Request&body=I%20am%20interested%20in%20joining%20the%20Naturist%20Caf%C3%A9%20Community.%20Please%20provide%20me%20with%20more%20information."
                    className="text-nature-600 hover:text-nature-700 font-medium text-sm"
                  >
                    members@naturistcafecommunity.org
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
        </div>
      </div>
    </section>
  );
};

export default Join;
