export interface Country {
  code: string;
  name: string;
  provinces?: { code: string; name: string }[];
}
