"use client";

import { useState } from "react";
import { useUser, useReverification } from "@clerk/nextjs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Button from "@salah-tours/components/ui/button/Button";
import toast, { Toaster } from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";

const passwordFormSchema = z
  .object({
    newPassword: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type PasswordFormData = z.infer<typeof passwordFormSchema>;

export default function ChangePassword() {
  const { user, isLoaded } = useUser();
  const [isUpdating, setIsUpdating] = useState(false);

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const updatePassword = useReverification((newPassword) => {
    return user?.updatePassword({
      newPassword,
    });
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: PasswordFormData) => {
    if (!user) return;

    setIsUpdating(true);

    try {
      await updatePassword(data.newPassword);

      toast.success("Password updated successfully!");
      reset(); // Clear the form
    } catch (error: any) {
      console.error("Failed to update password:", error);

      // Handle specific error messages from Clerk
      const errorMessage =
        error?.errors?.[0]?.message ||
        error?.message ||
        "Failed to update password. Please check your current password and try again.";

      toast.error(errorMessage);
    } finally {
      setIsUpdating(false);
    }
  };

  if (!isLoaded) {
    return (
      <div className="text-center py-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-700 mx-auto"></div>
        <p className="mt-2 text-sm text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <Toaster position="top-center"  containerClassName="mt-12" />
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">
          Change Password
        </h2>
        <p className="text-sm text-gray-600">
          Update your password to keep your account secure
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label
            htmlFor="newPassword"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            New Password *
          </label>
          <div className="relative">
            <input
              type={showNewPassword ? "text" : "password"}
              id="newPassword"
              {...register("newPassword")}
              className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
              placeholder="Enter your new password"
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showNewPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
          {errors.newPassword && (
            <p className="mt-1 text-sm text-red-600">
              {errors.newPassword.message}
            </p>
          )}
          <p className="mt-1 text-xs text-gray-500">
            Password must be at least 8 characters and contain uppercase,
            lowercase, and numbers
          </p>
        </div>

        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Confirm New Password *
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              {...register("confirmPassword")}
              className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
              placeholder="Confirm your new password"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showConfirmPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-600">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <div className="flex justify-end">
          <Button type="submit" color="primary" disabled={isUpdating}>
            {isUpdating ? "Updating Password..." : "Update Password"}
          </Button>
        </div>
      </form>
    </div>
  );
}
