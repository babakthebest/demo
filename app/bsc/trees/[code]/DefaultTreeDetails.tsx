"use client";
import React, { useEffect, useState } from "react";
import useTreeDataStore, { findNodeById } from "../../components/treelist/useTreeDataStore";
import { FormSchema } from "./Treeform";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export default function DefaultTreeDetails({ code }: { code: number }) {
  const { treeData } = useTreeDataStore();
  const [defaultFormValues, setdefaultFormValues] = useState<z.infer<typeof FormSchema>>();

  useEffect(() => {
    const thisNode = findNodeById(code, treeData);
    if (thisNode) {
      const defaultValues = {
        name: thisNode.name ?? "",
        manager: thisNode.manager ?? "",
        isActive: thisNode.isActive ?? false,
        assesment: thisNode.assesment ?? "",
        model: thisNode.model ?? "",
      };
      setdefaultFormValues(defaultValues);
    }
  }, [code]);

  return (
    <div className="h-full w-full max-w-lg space-y-4">
      <div className="flex flex-col space-y-1">
        <Label htmlFor="name" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          Tree Name
        </Label>
        <Input
          placeholder="Tree Name"
          className="rounded-lg border border-gray-300 bg-gray-100 p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300"
          id="name"
          value={defaultFormValues?.name ?? ""}
          readOnly
        />
      </div>

      <div className="flex flex-col space-y-1">
        <Label htmlFor="model" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          Model
        </Label>
        <Input
          placeholder="Model"
          className="rounded-lg border border-gray-300 bg-gray-100 p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300"
          id="model"
          value={defaultFormValues?.model ?? ""}
          readOnly
        />
      </div>

      <div className="flex flex-col space-y-1">
        <Label htmlFor="manager" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          Manager
        </Label>
        <Input
          placeholder="Manager"
          className="rounded-lg border border-gray-300 bg-gray-100 p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300"
          id="manager"
          value={defaultFormValues?.manager ?? ""}
          readOnly
        />
      </div>

      <div className="flex items-center space-x-3">
        <Checkbox
          aria-readonly
          checked={defaultFormValues?.isActive ?? false}
          className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:text-blue-400 dark:focus:ring-blue-400"
        />
        <Label htmlFor="isActive" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          Is Active
        </Label>
      </div>
    </div>
  );
}
