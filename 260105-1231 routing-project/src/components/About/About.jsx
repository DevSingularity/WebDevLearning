import React from "react";

export default function About() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        <img
          src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=900"
          className="rounded-xl shadow-lg"
          alt="Team working"
        />

        <div>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
            Built by Passionate React Developers
          </h2>
          <p className="mt-6 text-gray-600">
            We focus on clean architecture, modern UI, and scalable frontend systems.
          </p>
          <p className="mt-4 text-gray-600">
            Our mission is to help developers ship better products faster.
          </p>
        </div>
      </div>
    </section>
  );
}
