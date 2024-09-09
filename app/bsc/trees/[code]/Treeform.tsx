"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import useTreeDataStore, { findNodeById } from "../../components/treelist/useTreeDataStore";
import { useEffect, useState } from "react";

const Models = [
  { id: 1, name: "model 1" },
  { id: 2, name: "model 2" },
  { id: 3, name: "model 3" },
];
const Managers = [
  { id: 1, name: "Manager 1" },
  { id: 2, name: "Manager 2" },
  { id: 3, name: "Manager 3" },
];
const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  manager: z.string(),
  model: z.string(),
  isActive: z.boolean(),
  assesment: z.string().min(2, {
    message: "Assessment must be at least 2 characters.",
  }),
});

export default function Treeform({ code }: { code: number }) {
  const { treeData, showAddChildForm, addNodeToTree, setShowAddChildForm, editNodeInTree, showEditForm } =
    useTreeDataStore();
  const [defaultFormValues, setdefaultFormValues] = useState<z.infer<typeof FormSchema>>();

  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "", // Ensure form starts controlled
      manager: "",
      model: "",
      isActive: false,
      assesment: "",
    },
  });

  useEffect(() => {
    if (showEditForm) {
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
        form.reset(defaultValues);
      }
    }
  }, [showEditForm, code]);

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });

    if (showAddChildForm) {
      const nodetoadd = {
        ...data,
        id: Date.now(),
        parentId: Number(code),
        expanded: false,
      };
      addNodeToTree(nodetoadd, code);
      setShowAddChildForm(false);
    }

    if (showEditForm) {
      const thisNode = findNodeById(code, treeData);
      if (thisNode) {
        const editedNode = {
          id: code,
          parentId: thisNode.parentId,
          expanded: false,
          ...data,
        };
        editNodeInTree(editedNode);
      }
    }
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="name" {...field} />
                </FormControl>
                <FormDescription>Please Enter Tree Name</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Assessment field */}
          <FormField
            control={form.control}
            name="assesment"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Models</FormLabel>
                {/* <Select onValueChange={field.onChange} defaultValue={showEditForm ? defaultFormValues?.model : ""}> */}
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a Model" className="text-slate-900" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Models.map((model) => (
                      <SelectItem key={model.id} value={`${model.name}`}>
                        {model.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {/* <FormDescription>You can manage email addresses in your.</FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="manager"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Manager</FormLabel>
                {/* <Select onValueChange={field.onChange} defaultValue={showEditForm ? defaultFormValues?.manager : ""}> */}
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a Manager" className="text-slate-900" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Managers.map((manager) => (
                      <SelectItem key={manager.id} value={`${manager.name}`}>
                        {manager.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {/* <FormDescription>You can manage email addresses in your.</FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isActive"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Active </FormLabel>
                <FormControl>
                  <Checkbox
                    // defaultValue={showEditForm ? defaultFormValues?.isActive : "false"}
                    // checked={showEditForm ? defaultFormValues?.isActive : false}
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                {/* <FormDescription>Please check isActive</FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="bg-my-gradient-2" type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
