import React from "react";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { z } from "zod";
import { CreateCourseFormSchema } from "@/validators/course";
import { zodResolver } from "@hookform/resolvers/zod";

type Props = {};

type Input = z.infer<typeof CreateCourseFormInput>;

const CreateCourseForm = (props: Props) => {
  const form = useForm<Input>({
    resolver: zodResolver(CreateCourseFormSchema),
    defaultValues: {
      title: "",
      units: ["", "", ""],
    },
  });

  function onSubmit(data: Input) {
    console.log(data);
  }

  return (
    <div className="w-full">
      <Form>
        <form onSubmit={from.handleSubmit(onSubmit)}></form>
      </Form>
    </div>
  );
};

export default CreateCourseForm;
