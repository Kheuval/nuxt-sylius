import { useCountryRepository } from "~/server/Services/Country/Repository/CountryRepository";

export default defineCachedEventHandler(
  async (event) => {
    assertMethod(event, "GET");

    const { findAll } = useCountryRepository();

    return await findAll();
  },
  { maxAge: 24 * 60 * 60 },
);
