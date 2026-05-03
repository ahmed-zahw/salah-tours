"use client";

import { useState } from "react";
import { useUser, useReverification } from "@clerk/nextjs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export default function ChangeEmail() {
  const { user, isLoaded } = useUser();
  const createEmailAddress = useReverification((email: string) =>
    user?.createEmailAddress({ email }),
  );
  const changePrimaryEmail = useReverification((emailAddressId: string) =>
    user?.update({ primaryEmailAddressId: emailAddressId }),
  );

  const form = useForm({
    resolver: zodResolver(
      z.object({
        email: z.string().nonempty().email(),
      }),
    ),
    values: {
      email: user?.primaryEmailAddress?.emailAddress || "",
    },
  });
  const [code, setCode] = useState("");
  const [step, setStep] = useState<"enterEmail" | "verify" | "done">(
    "enterEmail",
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isLoaded) return <p>Loading...</p>;

  const handleAddEmail = async ({ email }: { email: string }) => {
    setLoading(true);
    setError("");

    try {
      const emailAddress = await createEmailAddress(email);

      await emailAddress?.prepareVerification({
        strategy: "email_code",
      });

      setStep("verify");
    } catch (err: any) {
      setError(err?.errors?.[0]?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const updatePrimaryEmailWithRetry = async (emailId: string) => {
    try {
      await changePrimaryEmail(emailId);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleVerify = async () => {
    setLoading(true);
    setError("");

    try {
      const email = user?.emailAddresses.find(
        (e) => e.emailAddress === form.getValues("email"),
      );

      if (!email) throw new Error("Email not found");

      const result = await email.attemptVerification({
        code,
      });

      if (result?.verification?.status === "verified") {
        // ✅ Set as primary with retry logic
        await updatePrimaryEmailWithRetry(email.id);

        // ✅ Optional: remove old emails
        const others = user?.emailAddresses.filter((e) => e.id !== email.id);

        for (const old of others || []) {
          try {
            await old.destroy();
          } catch (err: any) {
            setError(`Failed to remove old email: ${err.message}`);
          }
        }

        setStep("done");
        setCode("");
      }
    } catch (err: any) {
      setError(err?.errors?.[0]?.message || "Invalid code");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {(step === "enterEmail" || step === "done") && (
        <div className="flex  flex-col justify-between gap-4">
          <section className="grow">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email *
            </label>
            <input
              type="email"
              id="email"
              {...form.register("email")}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
              placeholder="Enter your new email"
            />
          </section>

        { (form.watch("email") !== user?.primaryEmailAddress?.emailAddress) && (
          <button
            onClick={form.handleSubmit(handleAddEmail)}
            disabled={loading || form.getFieldState("email").invalid}
            className="font-bold text-primary-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Sending..." : "Send Verification Code"}
          </button>
          ) }

        </div>
      )}

      {step === "verify" && (
        <div className="flex flex-col items-center gap-4">
          <p>Enter the code sent to {form.getValues("email")}</p>

          <input
            type="text"
            placeholder="Verification code"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            style={{ width: "100%", marginBottom: 10 }}
          />

          <button
            className="text-primary-600 font-bold disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleVerify}
            disabled={loading || code.trim() === ""}
          >
            {loading ? "Verifying..." : "Verify & Update Email"}
          </button>
        </div>
      )}

      {step === "done" && (
        <p className="text-primary-600 mt-2">
          ✅ Your email has been updated successfully!
        </p>
      )}

      {error && <p className="text-red-600 mt-2">{error}</p>}
    </div>
  );
}
