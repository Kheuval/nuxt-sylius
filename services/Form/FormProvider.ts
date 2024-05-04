import type { DivType, ElementType, FormType, InputType } from "~/types/Form";

export const provideForm = async (name: string, data?: Object) => {
  try {
    const { schema }: { schema: FormType } = await import(
      `./Schema/${name}.ts`
    );

    if (!data) {
      return schema;
    }

    setFormValue(schema, data);

    return schema;
  } catch {
    throw new Error(
      `The form "${name}" could not be found at "services/Form/Schema/${name}.ts"`,
    );
  }
};

const isDivType = (field: InputType | ElementType): field is DivType =>
  Object.hasOwn(field, "$el") && (field as ElementType).$el === "div";

const setFormValue = (schema: FormType | ElementType, data: Object) => {
  const inputMap = {} as { [key: string]: InputType };

  schema.children.forEach((input) => {
    if (isDivType(input)) {
      setFormValue(input, data);
    } else {
      inputMap[input.name] = input;
    }
  });

  Object.entries(data).forEach(([key, value]) => {
    const inputToUpdate = inputMap[key];

    if (inputToUpdate) {
      inputToUpdate.value = value;
    }
  });
};
