import type { FetchError } from "ofetch";
import type { FormErrorInterface } from "../types/FormErrorInterface";

export const useFormErrors = (errorRef: Ref<FetchError<any> | null>) => {
  const { t } = useI18n();

  watchEffect(() => {
    if (!errorRef.value?.data.data) {
      return;
    }

    const errors: FormErrorInterface[] = errorRef.value.data.data.errors;

    for (const error of errors) {
      const node = getNode(error.node);
      node?.setErrors([t(error.message)]);
    }
  });
};
