import React from "react";
import { useForm } from "react-hook-form";

export default function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    reset();
  };

  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 bg-white rounded-xl shadow p-10">
          {/* Left content */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              Get in Touch
            </h2>
            <p className="mt-4 text-gray-600">
              Fill out the form and we’ll get back to you shortly.
            </p>

            <img
              src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600"
              className="mt-8 rounded-lg shadow"
              alt="Contact illustration"
            />
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
            noValidate
          >
            {/* Name */}
            <div>
              <input
                type="text"
                placeholder="Full Name"
                className={`w-full border rounded-lg px-4 py-3 focus:ring-2 outline-none ${
                  errors.name
                    ? "border-red-500 focus:ring-red-400"
                    : "border-gray-300 focus:ring-orange-500"
                }`}
                {...register("name", {
                  required: "Full name is required",
                  minLength: {
                    value: 3,
                    message: "Name must be at least 3 characters",
                  },
                })}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <input
                type="email"
                placeholder="Email Address"
                className={`w-full border rounded-lg px-4 py-3 focus:ring-2 outline-none ${
                  errors.email
                    ? "border-red-500 focus:ring-red-400"
                    : "border-gray-300 focus:ring-orange-500"
                }`}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email address",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Phone */}
            <div>
              <input
                type="tel"
                placeholder="Phone Number"
                className={`w-full border rounded-lg px-4 py-3 focus:ring-2 outline-none ${
                  errors.phone
                    ? "border-red-500 focus:ring-red-400"
                    : "border-gray-300 focus:ring-orange-500"
                }`}
                {...register("phone", {
                  required: "Phone number is required",
                  minLength: {
                    value: 8,
                    message: "Enter a valid phone number",
                  },
                })}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-orange-600 hover:bg-orange-700 disabled:opacity-60 text-white py-3 rounded-lg font-semibold transition"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
