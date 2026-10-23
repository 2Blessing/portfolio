import { clsx, type ClassValue } from "clsx";

/** Assemble des classes CSS conditionnelles : cn("a", isOk && "b"). */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
