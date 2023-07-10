"use client";
import { DetailedHTMLProps, InputHTMLAttributes } from "react";
import { useForm, Controller } from "react-hook-form";

const Page = () => {
  return (
    <div>
      <h1>Page</h1>
      <FieldArray />
      Here will be some form
    </div>
  );
};

export default Page;

const StyledInput = (
  props: DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
) => {
  return (
    <input
      {...props}
      className="border border-gray-300 text-black rounded-md px-4 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
    />
  );
};

type DefaultValues = {
  firstName: string;
  lastName: string;
  anotherVal: string;
  customObject: {
    key1: string;
    key2: string;
    key3: number;
  };
};

function FieldArray() {
  const { handleSubmit, control } = useForm<DefaultValues>({
    defaultValues: {
      firstName: "Bill",
      lastName: "Luo",
      anotherVal: "someVal",
    },
    resolver: (values) => {
      values.customObject.key3;
      return {
        values: {
          ...values,
          customObject: { ...values.customObject, key3: "1", key4: "dupa" },
        },
        errors: {},
      };
    },
  });
  return (
    <form
      onSubmit={handleSubmit((data) => {
        data.customObject.key3;
        console.log(data);
      })}
    >
      <h1>Field Array </h1>
      <Controller
        name="firstName"
        control={control}
        render={({ field: { ref, ...field } }) => (
          <StyledInput
            {...field}
            onChange={(e) => {
              field.onChange(e);
            }}
          />
        )}
      />
      <input type="submit" />
    </form>
  );
}
