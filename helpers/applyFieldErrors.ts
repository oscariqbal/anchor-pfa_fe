// others
import { FieldValues, UseFormSetError, Path } from "react-hook-form";

export function applyFieldErrors<T extends FieldValues>(
  errors: Record<string, string[]>,
  setError: UseFormSetError<T>
) {
  for (const [field, messages] of Object.entries(errors)) {
    setError(field as Path<T>, {
      type: "server",
      message: messages[0],
    });
  }
}