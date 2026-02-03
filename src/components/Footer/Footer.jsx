import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo";

const Footer = () => {
  return (
    <section className="py-10 bg-gray-400 border-t-2 border-t-black">
      <div className="px-4 mx-auto max-w-7xl">
        <div className="flex flex-wrap">
          {/* Logo + copyright */}
          <div className="w-full p-6 md:w-1/2 lg:w-5/12">
            <div className="flex flex-col gap-4">
              <Logo width="100px" />
              <p className="text-sm text-gray-600">
                © Copyright 2026. All Rights Reserved by MegaBlog.
              </p>
            </div>
          </div>

          {/* Company */}
          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <h3 className="mb-6 text-xs font-semibold text-gray-500 uppercase">
              Sunshine
            </h3>
            <ul className="space-y-4">
              <li>
                <Link className="font-medium hover:text-gray-700" to="/">
                  Features
                </Link>
              </li>
              <li>
                <Link className="font-medium hover:text-gray-700" to="/">
                  Pricing
                </Link>
              </li>
              <li>
                <Link className="font-medium hover:text-gray-700" to="/">
                  Affiliate Program
                </Link>
              </li>
              <li>
                <Link className="font-medium hover:text-gray-700" to="/">
                  Press Kit
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <h3 className="mb-6 text-xs font-semibold text-gray-500 uppercase">
              Support
            </h3>
            <ul className="space-y-4">
              <li>
                <Link className="font-medium hover:text-gray-700" to="/">
                  Account
                </Link>
              </li>
              <li>
                <Link className="font-medium hover:text-gray-700" to="/">
                  Help
                </Link>
              </li>
              <li>
                <Link className="font-medium hover:text-gray-700" to="/">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link className="font-medium hover:text-gray-700" to="/">
                  Customer Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="w-full p-6 md:w-1/2 lg:w-3/12">
            <h3 className="mb-6 text-xs font-semibold text-gray-500 uppercase">
              Legals
            </h3>
            <ul className="space-y-4">
              <li>
                <Link className="font-medium hover:text-gray-700" to="/">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link className="font-medium hover:text-gray-700" to="/">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link className="font-medium hover:text-gray-700" to="/">
                  Licensing
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
