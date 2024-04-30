export const codeFromIri = (iri: string): string => {
  const splittedIri = iri.split("/");

  if (!splittedIri.length) {
    throw new Error(`"${iri}" is not an IRI`);
  }

  return splittedIri.at(-1)!;
};
