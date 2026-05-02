/* eslint-disable @next/next/no-img-element */
"use client";

import { useQuery } from "@tanstack/react-query";
import { client } from "@salah-tours/helpers/client";
import { Info } from "@salah-tours/entities/Info";
import { motion } from "framer-motion";
import QueryLoader from "@salah-tours/components/ui/loader/QueryLoader";

export default function AboutPage() {
  const {
    data: info,
    isLoading,
    isError,
  } = useQuery<Info>({
    queryKey: ["info"],
    queryFn: () => client("/info"),
  });

  return (
    <QueryLoader isLoading={isLoading} error={isError}>
      <div className="bg-white">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-primary-700 py-16 sm:py-24">
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] opacity-5" />
          
          <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-white">
                About Us
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-100 max-w-3xl mx-auto">
                Discover who we are and what makes us your perfect travel partner
              </p>
            </motion.div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 items-center">
              {/* Image */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative"
              >
                {info?.heroImage?.url && (
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-2xl">
                    <img
                      src={info.heroImage.url}
                      alt="About Salah Tours"
                      className="object-cover w-full h-full"
                    />
                  </div>
                )}
              </motion.div>

              {/* Text Content */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="space-y-6"
              >
                <h2 className="text-3xl font-bold tracking-tight text-primary-700 sm:text-4xl">
                  {info?.title || "Welcome to Salah Tours"}
                </h2>
                <div className="text-lg text-gray-700 leading-relaxed space-y-4">
                  <p>{info?.description}</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Mission & Vision Section */}
        <section className="bg-gray-50 py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white p-8 rounded-2xl shadow-lg"
              >
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-6">
                  <svg
                    className="w-8 h-8 text-primary-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-primary-700 mb-4">Our Mission</h3>
                <p className="text-gray-600 leading-relaxed">
                  To create unforgettable travel experiences that connect people with the beauty, 
                  culture, and wonders of destinations around the world, while ensuring exceptional 
                  service and value for every traveler.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white p-8 rounded-2xl shadow-lg"
              >
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-6">
                  <svg
                    className="w-8 h-8 text-primary-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-primary-700 mb-4">Our Vision</h3>
                <p className="text-gray-600 leading-relaxed">
                  To be the leading tour operator known for crafting personalized journeys that 
                  inspire exploration, foster cultural understanding, and create lasting memories 
                  for travelers from all walks of life.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold tracking-tight text-primary-700 sm:text-4xl">
                Why Choose Us
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                We go above and beyond to make your travel dreams a reality
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  ),
                  title: "Expert Guidance",
                  description: "Our experienced team provides personalized recommendations and support throughout your journey.",
                },
                {
                  icon: (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  ),
                  title: "Best Value",
                  description: "Competitive pricing without compromising on quality, comfort, or experiences.",
                },
                {
                  icon: (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                    />
                  ),
                  title: "Customer Satisfaction",
                  description: "Your happiness is our priority. We're committed to exceeding your expectations.",
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-primary-700"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      {feature.icon}
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </QueryLoader>
  );
}
