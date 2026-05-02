"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import Button from "@salah-tours/components/ui/button/Button";
import { CheckCircle } from "lucide-react";

export default function BookingSuccessPage() {
  const params = useParams();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full text-center">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Booking Successful!
          </h1>
          
          <p className="text-gray-600 mb-8">
            Thank you for your booking! We've received your tour reservation and 
            will contact you shortly to confirm the details.
          </p>
          
          <div className="bg-primary-50 rounded-lg p-4 mb-8">
            <p className="text-sm text-primary-800">
              A confirmation email will be sent to your registered email address. 
              Please check your inbox (and spam folder) for booking details.
            </p>
          </div>
          
          <div className="space-y-3">
            <Link href={`/tours/${params.tourId}`} className="block">
              <Button color="primary" className="w-full">
                View Tour Details
              </Button>
            </Link>
            
            <Link href="/" className="block">
              <Button color="ghost" className="w-full">
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
