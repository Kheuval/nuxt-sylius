export const idFromIri = (iri: string): number => {
  const splittedIri = iri.split("/");

  if (!splittedIri.length) {
    throw new Error(`"${iri}" is not an IRI`);
  }

  const id = parseInt(splittedIri.at(-1)!);

  if (isNaN(id)) {
    throw new Error(
      `The last part of the IRI "${iri}" could not be converted to a number`,
    );
  }

  return id;
};
