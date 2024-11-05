"use client";
import React from "react";
import { useForm } from "react-hook-form"; // Ensure you are using the correct version of react-hook-form
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { z } from "zod";
import { createChaptersSchema } from "@/validators/course";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Button } from "./ui/button";
import { Plus, Trash } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

// Ensure to specify props type correctly
// type Props = {
//   // Define any expected props here, if applicable
// };

type Input = z.infer<typeof createChaptersSchema>; // Use the correct schema here

const CreateCourseForm = () => {
  const router = useRouter();
  const { toast } = useToast();
  const { mutate: createChapters, isLoading } = useMutation({
    mutationFn: async ({ title, units }: Input) => {
      const response = await axios.post("/api/course/createChapters", {
        title,
        units,
      });
      return response.data;
    },
  });

  const form = useForm<Input>({
    resolver: zodResolver(createChaptersSchema), // Use the correct schema for validation
    defaultValues: {
      title: "",
      units: ["", "", ""],
    },
  });

  function onSubmit(data: Input) {
    if (data.units.some((unit) => unit === "")) {
      toast({
        title: "Error",
        description: "Please fill all the units",
        variant: "destructive",
      });
    }

    createChapters(data, {
      onSuccess: (course_id) => {
        toast({
          title: "Success",
          description: "Course created successfully",
        });
        router.push(`/create/${course_id}`);
      },
      onError: (error) => {
        console.error(error);
        toast({
          title: "Error",
          description: "An error occurred while creating the course",
          variant: "destructive",
        });
      },
    });
  }

  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full m-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="flex flex-col items-start w-full sm:items-center">
                <FormLabel className="flex-[1] text-xl">Title</FormLabel>
                <FormControl className="flex-[6] ">
                  <Input
                    placeholder="Enter the main topic of the course"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <AnimatePresence>
            {form.watch("units").map((_, index) => {
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{
                    opacity: { duration: 0.2 },
                    height: { duration: 0.2 },
                  }}
                >
                  <FormField
                    control={form.control}
                    name={`units.${index}`}
                    render={({ field }) => {
                      return (
                        <FormItem className="flex flex-col items-start w-full sm:items-center sm:flex-row">
                          <FormLabel className="flex-[1] text-xl">
                            Unit {index + 1}
                          </FormLabel>
                          <FormControl className="flex-[0]">
                            <Input
                              placeholder="Enter subtopic of the course"
                              {...field}
                              className="w-full"
                            />
                          </FormControl>
                        </FormItem>
                      );
                    }}
                  />
                </motion.div>
              );
            })}
          </AnimatePresence>

          <div className="flex items-center justify-center mt-4">
            <Separator className="flex-[1]" />
            <div className="mx-4">
              <Button
                type="button"
                variant="secondary"
                className="font-semibold"
                onClick={() => {
                  form.setValue("units", [...form.watch("units"), ""]);
                }}
              >
                Add Unit
                <Plus className="w-4 h-4 ml-2 text-green-500" />
              </Button>
              <Button
                type="button"
                variant="secondary"
                className="font-semibold ml-2"
                onClick={() => {
                  const currentUnits = form.getValues("units");
                  if (currentUnits.length > 0) {
                    form.setValue("units", currentUnits.slice(0, -1));
                  }
                }}
              >
                Remove Unit
                <Trash className="w-4 h-4 ml-2 text-red-500" />
              </Button>
            </div>
            <Separator className="flex-[1]" />
          </div>
          <Button
            disabled={isLoading}
            type="submit"
            className="w-full mt-6"
            size="lg"
          >
            Let&apos;s Go
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateCourseForm;
