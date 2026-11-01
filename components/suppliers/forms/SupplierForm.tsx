"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import {
  supplierSchema,
  type SupplierFormValues,
} from "@/lib/validations/supplier";

import type { Supplier } from "@/types/supplier";

interface SupplierFormProps {
  supplier?: Supplier;
  onSupplierSaved: (
    supplier: SupplierFormValues
  ) => Promise<void>;
}

export default function SupplierForm({
  supplier,
  onSupplierSaved,
}: SupplierFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SupplierFormValues>({
    resolver: zodResolver(supplierSchema),

    defaultValues: {
      companyName: supplier?.companyName ?? "",
      contactName: supplier?.contactName ?? "",
      email: supplier?.email ?? "",
      phone: supplier?.phone ?? "",
      address: supplier?.address ?? "",
    },
  });

  useEffect(() => {
    reset({
      companyName: supplier?.companyName ?? "",
      contactName: supplier?.contactName ?? "",
      email: supplier?.email ?? "",
      phone: supplier?.phone ?? "",
      address: supplier?.address ?? "",
    });
  }, [supplier, reset]);

  const onSubmit = async (data: SupplierFormValues) => {
    await onSupplierSaved(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >
      <div className="space-y-2">
        <Label htmlFor="companyName">
          Company Name
        </Label>

        <Input
          id="companyName"
          placeholder="e.g. Logitech"
          {...register("companyName")}
        />

        {errors.companyName && (
          <p className="text-sm text-red-500">
            {errors.companyName.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="contactName">
          Contact Person
        </Label>

        <Input
          id="contactName"
          placeholder="e.g. Juan Dela Cruz"
          {...register("contactName")}
        />

        {errors.contactName && (
          <p className="text-sm text-red-500">
            {errors.contactName.message}
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="email">
            Email
          </Label>

          <Input
            id="email"
            type="email"
            placeholder="supplier@example.com"
            {...register("email")}
          />

          {errors.email && (
            <p className="text-sm text-red-500">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">
            Phone
          </Label>

          <Input
            id="phone"
            placeholder="09XX XXX XXXX"
            {...register("phone")}
          />

          {errors.phone && (
            <p className="text-sm text-red-500">
              {errors.phone.message}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="address">
          Address
        </Label>

        <Textarea
          id="address"
          placeholder="Supplier address..."
          {...register("address")}
        />

        {errors.address && (
          <p className="text-sm text-red-500">
            {errors.address.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        className="w-full"
      >
        {supplier
          ? "Save Changes"
          : "Save Supplier"}
      </Button>
    </form>
  );
}
