import { fallbackAfricanCountries } from "@/lib/nomination-form-data";

export const revalidate = 86400;

type RestCountry = {
  name?: {
    common?: string;
  };
};

export async function GET() {
  try {
    const response = await fetch(
      "https://restcountries.com/v3.1/region/africa?fields=name",
      {
        next: { revalidate: 86400 },
      },
    );

    if (!response.ok) {
      throw new Error("Country lookup failed.");
    }

    const countries = (await response.json()) as RestCountry[];
    const names = countries
      .map((country) => country.name?.common)
      .filter((country): country is string => Boolean(country))
      .sort((a, b) => a.localeCompare(b));

    return Response.json({
      countries: [...names, "Diaspora - please specify"],
    });
  } catch {
    return Response.json({
      countries: fallbackAfricanCountries,
    });
  }
}
