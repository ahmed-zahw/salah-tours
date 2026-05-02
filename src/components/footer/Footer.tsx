"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { client } from "@salah-tours/helpers/client";
import { ContactInfo } from "@entities/ContactInfo";

// icons
import { Facebook, Instagram, Twitter } from "lucide-react";

const navigation = {
  main: [
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Contact", href: "/contact" },
  ],
};

const Footer = () => {
  const { data: contactInfo } = useQuery<ContactInfo>({
    queryKey: ["contact-info"],
    queryFn: () => client("/contact"),
  });

  const socialLinks = [
    {
      name: "Facebook",
      href: contactInfo?.facebookUrl || "",
      icon: Facebook,
    },
    {
      name: "Instagram",
      href: contactInfo?.instagramUrl || "",
      icon: Instagram,
    },
    {
      name: "Twitter",
      href: contactInfo?.twitterUrl || "",
      icon: Twitter,
    },
  ].filter(item => item.href); // Only show icons that have URLs configured
  return (
    <footer className="bg-primary-800">
      <div className="mx-auto max-w-7xl overflow-hidden px-6 py-20 pb-28 sm:py-24 lg:px-8">
        <nav
          aria-label="Footer"
          className="-mb-6 flex flex-wrap justify-center gap-x-12 gap-y-3 text-sm/6"
        >
          {navigation.main.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-primary-100 hover:text-primary-300"
            >
              {item.name}
            </a>
          ))}
        </nav>
        <div className="mt-16 flex justify-center gap-x-10">
          {socialLinks.map((item) => (
            <a
              key={item.name}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-100 hover:text-primary-300"
            >
              <span className="sr-only">{item.name}</span>
              <item.icon aria-hidden="true" className="size-6" />
            </a>
          ))}
        </div>
        <p className="mt-10 text-center text-sm/6 text-primary-100">
          &copy; 2026 Salah Tours. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
