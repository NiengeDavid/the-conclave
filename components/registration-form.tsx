"use client";

import { useState, FormEvent } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import {
  registrationSchema,
  type RegistrationFormData,
} from "@/lib/validations";
import { Loader2 } from "lucide-react";

export default function RegistrationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
  });

  const accommodationValue = watch("accommodation");
  const feedingValue = watch("feeding");

  const onSubmit = async (data: RegistrationFormData) => {
    setIsSubmitting(true);
    try {
      // Step 1: Register user and save to Google Sheets
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error("Registration failed", {
          description: result.message || "Please try again.",
        });
        return;
      }

      // Step 2: Send confirmation email with registration code
      try {
        await fetch("/api/send", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: data.email,
            fullName: data.fullName,
            registrationCode: result.registrationCode,
          }),
        });
      } catch (emailError) {
        console.error("Email send failed:", emailError);
        // Don't fail the registration if email fails
        toast.warning("Registration successful, but email failed to send", {
          description: `Your code: ${result.registrationCode}. Please save it!`,
        });
        return;
      }

      // Step 3: Show success message
      toast.success("Registration successful!", {
        description: `Check your email for confirmation. Code: ${result.registrationCode}`,
        duration: 20000, // Show for 20 seconds
      });

      reset();
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Error", {
        description: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <div className="mb-12 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Register Now</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Complete the form below to secure your seat at The Conclave 2025
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="glass-effect p-8 md:p-12 space-y-8"
        >
          {/* Full Name */}
          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-base">
              Full Name *
            </Label>
            <Input
              id="fullName"
              placeholder="Enter your full name"
              {...register("fullName")}
              className="bg-transparent py-6 border-black/30 text-foreground placeholder:text-muted-foreground"
              disabled={isSubmitting}
            />
            {errors.fullName && (
              <p className="text-sm text-red-500">{errors.fullName.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-base">
              Email *
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              {...register("email")}
              className="bg-transparent py-6 border-black/30 text-foreground placeholder:text-muted-foreground"
              disabled={isSubmitting}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* Phone Number */}
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-base">
              Phone Number (WhatsApp) *
            </Label>
            <Input
              id="phone"
              placeholder="+234 XXX XXX XXXX"
              {...register("phone")}
              className="bg-transparent py-6 border-black/30 text-foreground placeholder:text-muted-foreground"
              disabled={isSubmitting}
            />
            {errors.phone && (
              <p className="text-sm text-red-500">{errors.phone.message}</p>
            )}
          </div>

          {/* Title / Designation */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-base">
              Title / Designation *
            </Label>
            <Input
              id="title"
              placeholder="e.g., Senior Pastor, Director"
              {...register("title")}
              className="bg-transparent py-6 border-black/30 text-foreground placeholder:text-muted-foreground"
              disabled={isSubmitting}
            />
            {errors.title && (
              <p className="text-sm text-red-500">{errors.title.message}</p>
            )}
          </div>

          {/* Ministry / Center */}
          <div className="space-y-2">
            <Label htmlFor="ministry" className="text-base">
              Ministry / Center *
            </Label>
            <Input
              id="ministry"
              placeholder="Name of your ministry or center"
              {...register("ministry")}
              className="bg-transparent py-6 border-black/30 text-foreground placeholder:text-muted-foreground"
              disabled={isSubmitting}
            />
            {errors.ministry && (
              <p className="text-sm text-red-500">{errors.ministry.message}</p>
            )}
          </div>

          {/* Arrival Date */}
          <div className="space-y-2">
            <Label htmlFor="arrivalDate" className="text-base">
              Arrival Date *
            </Label>
            <Input
              id="arrivalDate"
              type="date"
              {...register("arrivalDate")}
              className="bg-transparent py-6 border-black/30 text-foreground"
              disabled={isSubmitting}
            />
            {errors.arrivalDate && (
              <p className="text-sm text-red-500">
                {errors.arrivalDate.message}
              </p>
            )}
          </div>

          {/* Departure Date */}
          <div className="space-y-2">
            <Label htmlFor="departureDate" className="text-base">
              Departure Date *
            </Label>
            <Input
              id="departureDate"
              type="date"
              {...register("departureDate")}
              className="bg-transparent py-6 border-black/30 text-foreground"
              disabled={isSubmitting}
            />
            {errors.departureDate && (
              <p className="text-sm text-red-500">
                {errors.departureDate.message}
              </p>
            )}
          </div>

          {/* Accommodation */}
          <div className="space-y-3">
            <Label className="text-base">Accommodation required? *</Label>
            <RadioGroup
              value={accommodationValue}
              onValueChange={(value) => {
                const event = {
                  target: { name: "accommodation", value },
                } as any;
                register("accommodation").onChange(event);
              }}
              disabled={isSubmitting}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="accommodation-yes" />
                <Label
                  htmlFor="accommodation-yes"
                  className="font-normal cursor-pointer"
                >
                  Yes
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="accommodation-no" />
                <Label
                  htmlFor="accommodation-no"
                  className="font-normal cursor-pointer"
                >
                  No
                </Label>
              </div>
            </RadioGroup>
            <p className="text-xs text-muted-foreground">
              No free accommodation. Nearby hotel list will be shared.
            </p>
            {errors.accommodation && (
              <p className="text-sm text-red-500">
                {errors.accommodation.message}
              </p>
            )}
          </div>

          {/* Feeding */}
          <div className="space-y-3">
            <Label className="text-base">Feeding required? *</Label>
            <RadioGroup
              value={feedingValue}
              onValueChange={(value) => {
                const event = {
                  target: { name: "feeding", value },
                } as any;
                register("feeding").onChange(event);
              }}
              disabled={isSubmitting}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="feeding-yes" />
                <Label
                  htmlFor="feeding-yes"
                  className="font-normal cursor-pointer"
                >
                  Yes
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="feeding-no" />
                <Label
                  htmlFor="feeding-no"
                  className="font-normal cursor-pointer"
                >
                  No
                </Label>
              </div>
            </RadioGroup>
            <p className="text-xs text-muted-foreground">
              Only light snacks & water provided. Restaurant list will be
              shared.
            </p>
            {errors.feeding && (
              <p className="text-sm text-red-500">{errors.feeding.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 py-6 text-lg font-semibold rounded-lg"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Registering...
              </>
            ) : (
              "Secure your seat"
            )}
          </Button>
        </form>
      </div>
    </section>
  );
}
