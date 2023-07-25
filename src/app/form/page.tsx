"use client";
import { DetailedHTMLProps, InputHTMLAttributes } from "react";
import { useForm, Controller, Control, Path } from "react-hook-form";

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
      className="border border-gray-300 text-slate-800 rounded-md px-4 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
    />
  );
};

const FirstNameInput = <T extends { firstName: string }>({
  control,
}: {
  control: Control<T>;
}) => (
  <Controller
    name={"firstName" as Path<T>}
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
);

const LastNameInput = <T extends { firstName: string }>({
  control,
}: {
  control: Control<T>;
}) => (
  <Controller
    name={"firstName" as Path<T>}
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
);

const buildUnNestedStringInput =
  <K extends string>(fieldName: K) =>
  // eslint-disable-next-line react/display-name
  <T extends { [S in K]: string }>({ control }: { control: Control<T> }) =>
    (
      <Controller
        name={fieldName as unknown as Path<T>}
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
    );

const FirstName = buildUnNestedStringInput("firstName");
const SecondName = buildUnNestedStringInput("secondName");

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
        console.log(data);
      })}
    >
      <h1>Field Array </h1>
      <FirstNameInput control={control} />
      <FirstName control={control} />
      <SecondName control={control} />
      <input type="submit" />
    </form>
  );
}
