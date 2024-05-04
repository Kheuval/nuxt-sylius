interface GlobalInputProps {
  name: string;
  label: string;
  help?: string;
  id?: string;
  if?: string;
  [key: `data-${string}`]: string | boolean | number;
  delay?: number;
  dirtyBehavior?: "touched" | "compare";
  errors?: string[];
  ignore?: boolean;
  index?: number;
  parent?: FormKitNode;
  "prefix-icon"?: string;
  "suffix-icon"?: string;
  validation?: string | [];
  "validation-visibility"?: "blur" | "dirty" | "live" | "submit";
  "validation-messages"?: { [key: string]: string };
  "validation-rules"?: { [key: string]: string };
  "validation-label"?: string;
  value?: any;
}

interface Option {
  label: string;
  value: string;
  help?: string;
  attrs?: { [key: string]: any };
  group?: string;
  options?: Option[];
  if?: string;
  then?: Option[];
  else?: Option[];
}

export type InputType =
  | CheckboxType
  | ColorType
  | DateType
  | DateTimeLocaleType
  | EmailType
  | FileType
  | HiddenType
  | MetaType
  | NumberType
  | PasswordType
  | RadioType
  | RangeType
  | SearchType
  | SelectType
  | TelephoneType
  | TextType
  | TextareaType
  | TimeType;

export type ElementType = DivType;

type CheckboxType = {
  $formkit: "checkbox";
  "decorator-icon"?: string;
  options?: Option[];
  "on-value"?: any;
  "off-value"?: any;
} & Omit<GlobalInputProps, "prefix-icon" | "suffix-icon">;

type ColorType = { $formkit: "color" } & GlobalInputProps;

type DateType = {
  $formkit: "date";
  min?: string;
  max?: string;
  step?: string;
} & GlobalInputProps;

type DateTimeLocaleType = {
  $formkit: "datetime-local";
  min?: string;
  max?: string;
  step?: string;
} & GlobalInputProps;

type EmailType = { $formkit: "email"; placeholder?: string } & GlobalInputProps;

type FileType = {
  $formkit: "file";
  accept?: string;
  capture?: "user" | "environment";
  multiple?: boolean;
  "file-item-icon"?: string;
  "file-remove-icon"?: string;
  "no-files-icon"?: string;
} & GlobalInputProps;

type HiddenType = { $formkit: "hidden"; number?: "float" | "integer" } & Omit<
  GlobalInputProps,
  "errors" | "help" | "label" | "prefix-icon" | "suffix-icon"
>;

type MetaType = { $formkit: "meta" } & Omit<GlobalInputProps, "label" | "help">;

type NumberType = {
  $formkit: "number";
  min?: number;
  max?: number;
  step?: number;
  number?: "float" | "integer";
} & GlobalInputProps;

type PasswordType = {
  $formkit: "password";
  minLength?: number;
  maxLength?: number;
  placeholder?: string;
} & GlobalInputProps;

type RadioType = {
  $formkit: "radio";
  "decorator-icon"?: string;
  options?: Option[];
} & Omit<GlobalInputProps, "prefix-icon" | "suffix-icon">;

type RangeType = {
  $formkit: "range";
  min?: number;
  max?: number;
  step?: number;
  number?: "float" | "integer";
} & GlobalInputProps;

type SearchType = {
  $formkit: "search";
  minLength?: number;
  maxLength?: number;
  placeholder?: string;
} & GlobalInputProps;

type SelectType = {
  $formkit: "select";
  options?: Option[];
  placeholder?: string;
  "select-icon"?: string;
} & GlobalInputProps;

type TelephoneType = {
  $formkit: "tel";
  minLength?: number;
  maxLength?: number;
  placeholder?: string;
} & GlobalInputProps;

type TextType = {
  $formkit: "text";
  minLength?: number;
  maxLength?: number;
  placeholder?: string;
  number?: "float" | "integer";
} & GlobalInputProps;

type TextareaType = {
  $formkit: "textarea";
  minLength?: number;
  maxLength?: number;
  placeholder?: string;
  cols?: number;
  rows?: number;
} & GlobalInputProps;

type TimeType = {
  $formkit: "time";
  min?: number;
  max?: number;
  step?: number;
} & GlobalInputProps;

export type DivType = {
  $el: "div";
  attrs?: { [key: string]: any };
  children: InputType[];
};

export type FormType = {
  $formkit: "form";
  disabled?: boolean;
  "incomplete-message"?: string | boolean;
  "submit-attrs"?: { [key: string]: any };
  "submit-behavior"?: "disabled" | "live";
  "submit-label"?: string;
  actions?: boolean;
  children: (InputType | ElementType)[];
} & Omit<GlobalInputProps, "help" | "label">;
