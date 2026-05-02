"use client";

import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { client } from "@salah-tours/helpers/client";
import Button from "@salah-tours/components/ui/button/Button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import QueryLoader from "@salah-tours/components/ui/loader/QueryLoader";
import { ContactInfo } from "@entities/ContactInfo";
import toast from "react-hot-toast";

const contactInfoFormSchema = z.object({
  phone: z.string().optional(),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  supportEmail: z.string().email("Invalid email address").optional().or(z.literal("")),
  address: z.string().optional(),
  city: z.string().optional(),
  workingHours: z.string().optional(),
  facebookUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
  instagramUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
  twitterUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
  description: z.string().optional(),
});

type ContactInfoFormData = z.infer<typeof contactInfoFormSchema>;

export default function ContactInfoManagement() {
  const router = useRouter();

  const {
    data: contactInfo,
    isLoading,
    error,
    refetch,
  } = useQuery<ContactInfo>({
    queryKey: ["contact-info"],
    queryFn: () => client("/contact"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactInfoFormData>({
    resolver: zodResolver(contactInfoFormSchema),
    defaultValues: {
      phone: "",
      email: "",
      supportEmail: "",
      address: "",
      city: "",
      workingHours: "",
      facebookUrl: "",
      instagramUrl: "",
      twitterUrl: "",
      description: "",
    },
  });

  useEffect(() => {
    if (contactInfo) {
      reset({
        phone: contactInfo.phone || "",
        email: contactInfo.email || "",
        supportEmail: contactInfo.supportEmail || "",
        address: contactInfo.address || "",
        city: contactInfo.city || "",
        workingHours: contactInfo.workingHours || "",
        facebookUrl: contactInfo.facebookUrl || "",
        instagramUrl: contactInfo.instagramUrl || "",
        twitterUrl: contactInfo.twitterUrl || "",
        description: contactInfo.description || "",
      });
    }
  }, [contactInfo, reset]);

  const updateContactInfoMutation = useMutation({
    mutationFn: (data: ContactInfoFormData) =>
      client("/contact", {
        method: "PUT",
        data,
      }),
    onSuccess: () => {
      toast.success("Contact information updated successfully");
      refetch();
    },
    onError: () => {
      toast.error("Failed to update contact information");
    },
  });

  const onSubmit = (data: ContactInfoFormData) => {
    updateContactInfoMutation.mutate(data);
  };

  return (
    <QueryLoader isLoading={isLoading} error={error}>
      <div className="max-w-4xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Contact Information</h1>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white p-6 rounded-lg shadow-sm space-y-6"
        >
          {/* Basic Contact Info */}
          <div>
            <h2 className="text-lg font-semibold mb-4 text-gray-900">
              Basic Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  {...register("phone")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  placeholder="+123 456 789"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  {...register("email")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  placeholder="info@salahtours.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Support Email
                </label>
                <input
                  type="email"
                  {...register("supportEmail")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  placeholder="support@salahtours.com"
                />
                {errors.supportEmail && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.supportEmail.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Working Hours
                </label>
                <input
                  type="text"
                  {...register("workingHours")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Mon-Fri 9am-6pm"
                />
                {errors.workingHours && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.workingHours.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Address Information */}
          <div>
            <h2 className="text-lg font-semibold mb-4 text-gray-900">
              Office Location
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <input
                  type="text"
                  {...register("address")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  placeholder="123 Travel Street"
                />
                {errors.address && (
                  <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City, Country
                </label>
                <input
                  type="text"
                  {...register("city")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  placeholder="City, Country 12345"
                />
                {errors.city && (
                  <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Social Media Links */}
          <div>
            <h2 className="text-lg font-semibold mb-4 text-gray-900">
              Social Media
            </h2>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Facebook URL
                </label>
                <input
                  type="url"
                  {...register("facebookUrl")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  placeholder="https://facebook.com/salahtours"
                />
                {errors.facebookUrl && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.facebookUrl.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Instagram URL
                </label>
                <input
                  type="url"
                  {...register("instagramUrl")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  placeholder="https://instagram.com/salahtours"
                />
                {errors.instagramUrl && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.instagramUrl.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Twitter URL
                </label>
                <input
                  type="url"
                  {...register("twitterUrl")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  placeholder="https://twitter.com/salahtours"
                />
                {errors.twitterUrl && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.twitterUrl.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h2 className="text-lg font-semibold mb-4 text-gray-900">
              Description
            </h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contact Page Description
              </label>
              <textarea
                {...register("description")}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                placeholder="We're here to help and answer any question you might have..."
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.description.message}
                </p>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 pt-4 border-t">
            <Button
              type="button"
              color="ghost"
              onClick={() => router.push("/admin")}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              color="primary"
              disabled={isSubmitting || updateContactInfoMutation.isPending}
            >
              {updateContactInfoMutation.isPending ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </div>
    </QueryLoader>
  );
}
