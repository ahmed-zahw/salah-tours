"use client";
import { motion } from "framer-motion";
import { useSession, useSignIn, useClerk } from "@clerk/nextjs";
import Loader from "@salah-tours/components/ui/loader/Loader";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function SignInPage() {
  const { signIn } = useSignIn();
  const { isLoaded, isSignedIn } = useSession();
  const { setActive } = useClerk();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  if (!isLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader text="Checking authentication..." />
      </div>
    );
  }

  const redirectIfLogin = () => {
    if (isSignedIn) {
      router.push("/admin");
      return null;
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    console.log("Form submitted", { isSignedIn });
    redirectIfLogin();

    if (!signIn) return;

    setIsLoading(true);
    setError("");

    try {
      const { error: signInError } = await signIn.create({
        identifier: email,
        password,
      });

      console.log("Sign-in response:", { signInError });

      if (signInError) return setError(signInError.message);

      setActive({ session: signIn.createdSessionId });

      router.push("/admin");
    } catch (e) {
      console.log({ errorrrr: e });
      setError("Server Error, Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  redirectIfLogin();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7, delay: 0.5 }}
      className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary-50 max-w-2xl mx-auto p-6"
    >
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary-700">Admin Login</h1>
          <p className="text-gray-600 mt-2">
            Sign in to access the admin dashboard
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
              placeholder="admin@example.com"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading || !signIn}
            className="w-full bg-primary-700 text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary-800 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </motion.div>
  );
}
