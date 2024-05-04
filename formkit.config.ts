import { rootClasses } from "./formkit.theme";
import { defineFormKitConfig } from "@formkit/vue";
import { fr } from "@formkit/i18n";

export default defineFormKitConfig({
  config: {
    rootClasses,
  },
  locales: { fr },
  locale: "fr",
});
