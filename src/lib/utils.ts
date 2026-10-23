import { clsx, type ClassValue } from "clsx";

/** Assemble des classes CSS conditionnelles : cn("a", isOk && "b"). */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/** « TCHABI Odilon » → « tchabi-odilon » (sans accents ni espaces). */
export function slugifyName(input: string) {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
