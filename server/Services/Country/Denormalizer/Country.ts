import type { AllCountriesResult } from "~/server/Services/Country/Repository/CountryRepository";
import { localizeCountryName } from "~/server/utils/localizeCountryName";
import type { Country } from "~/types/Country";

export const denormalizeCountries = (
  countries: AllCountriesResult,
): Country[] => {
  const denormalizedCountries = [] as Country[];

  countries.forEach((country) => {
    const denormalizedCountry = {} as Country;

    denormalizedCountry.code = country.code;
    denormalizedCountry.name = localizeCountryName(country.code);

    if (!country.sylius_province) {
      denormalizedCountry.provinces = undefined;
    } else {
      denormalizedCountry.provinces = country.sylius_province.map(
        (province) => ({ code: province.code, name: province.name }),
      );
    }

    denormalizedCountries.push(denormalizedCountry);
  });

  return denormalizedCountries;
};
