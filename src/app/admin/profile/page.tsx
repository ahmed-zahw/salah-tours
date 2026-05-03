"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Button from "@salah-tours/components/ui/button/Button";
import toast from "react-hot-toast";
import ChangeEmail from "../components/ChangeEmail";
import ChangePassword from "../components/ChangePassword";

const profileFormSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .min(2, "First name must be at least 2 characters"),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
});

type ProfileFormData = z.infer<typeof profileFormSchema>;

export default function AdminProfilePage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [isUpdating, setIsUpdating] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileFormSchema),
    values: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.emailAddresses[0]?.emailAddress || "",
      phone: user?.phoneNumbers[0]?.phoneNumber || "",
    },
  });

  const onSubmit = async (data: ProfileFormData) => {
    if (!user) return;

    setIsUpdating(true);

    try {
      // Update user profile
      await user.update({
        firstName: data.firstName,
        lastName: data.lastName,
      });

      // Update primary email if changed
      const currentEmail = user.emailAddresses[0]?.emailAddress;
      if (data.email !== currentEmail) {
        await user.createEmailAddress({ email: data.email });
      }

      // Update phone number if provided and changed
      if (data.phone) {
        const currentPhone = user.phoneNumbers[0]?.phoneNumber;
        if (data.phone !== currentPhone) {
          await user.createPhoneNumber({ phoneNumber: data.phone });
        }
      }

      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Failed to update profile:", error);
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-700 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin">
          <Button color="ghost" className="p-2">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">Profile Settings</h1>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            Account Information
          </h2>
          <p className="text-sm text-gray-600">
            Update your personal information and contact details
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                First Name *
              </label>
              <input
                type="text"
                id="firstName"
                {...register("firstName")}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                placeholder="John"
              />
              {errors.firstName && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Last Name *
              </label>
              <input
                type="text"
                id="lastName"
                {...register("lastName")}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                placeholder="Doe"
              />
              {errors.lastName && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

         

          <div className="flex justify-end gap-4 pt-4 border-t">
            <Button
              type="button"
              color="ghost"
              onClick={() => router.push("/admin")}
            >
              Cancel
            </Button>
            <Button type="submit" color="primary" disabled={isUpdating}>
              {isUpdating ? "Updating..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </div>

<div className="bg-white p-6 mt-6">
       <ChangeEmail /> 
</div>

<div className="bg-white p-6 mt-6">
       <ChangePassword />
</div>

         


      {/* Account Info Section */}
      <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Account Details
        </h2>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Account ID:</span>
            <span className="font-mono text-gray-900">{user?.id}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Created:</span>
            <span className="text-gray-900">
              {user?.createdAt
                ? new Date(user.createdAt).toLocaleDateString()
                : "N/A"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Last Updated:</span>
            <span className="text-gray-900">
              {user?.updatedAt
                ? new Date(user.updatedAt).toLocaleDateString()
                : "N/A"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
