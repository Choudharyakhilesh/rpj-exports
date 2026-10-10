import { Control, Controller, FieldValues, Path } from "react-hook-form";

interface TextAreaFieldProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  required?: boolean;
  rows?: number;
  minRows?: number;
  textColor?: string;
  labelBgColor?: string;
  labelTextColor?: string;
  borderColor?: string;
  focusBorderColor?: string;
  errorColor?: string;
}

export const TextAreaField = <T extends FieldValues>({
  name,
  control,
  label,
  required = false,
  rows = 4,
  minRows = 3,
  textColor = "text-white",
  labelBgColor = "bg-black",
  // borderColor = "border-gray-600",
  // focusBorderColor = "focus:border-inputFocusPrimary border-inputFocusPrimary",
  errorColor = "text-red-400",
}: TextAreaFieldProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <div>
          <div className="relative">
            <textarea
              id="floating_textarea"
              rows={rows}
              className={`block px-2.5 pb-2.5 pt-3 w-full text-sm ${textColor} bg-transparent rounded-lg border ${
                error
                  ? "border-red-500 focus:border-red-500 focus:outline-none focus:ring-0"
                  : `!border-gray-300 dark:!border-gray-600 focus:outline-none focus:ring-0 focus:border-gray-500`
              } appearance-none peer`}
              placeholder=" "
              style={{ minHeight: `${minRows * 1.5}em` }}
              {...field}
              {...(field.value && { value: field.value })}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault(); // Default behavior prevent kare
                  const textarea = e.currentTarget; // Reference store kare
                  const { selectionStart, selectionEnd } = textarea;
                  const value = field.value || "";

                  // New line insert kare
                  field.onChange(
                    value.substring(0, selectionStart) + "\n" + value.substring(selectionEnd),
                  );

                  // Cursor ko next line me move kare
                  setTimeout(() => {
                    if (textarea) {
                      textarea.selectionStart = textarea.selectionEnd = selectionStart + 1;
                    }
                  }, 0);
                }
              }}
            />
            <label
              htmlFor="floating_textarea"
              className={`ml-1 absolute text-sm transition-all duration-300 transform -translate-y-4 scale-75 left-0 top-2 z-10 origin-[0] ${labelBgColor} px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-[13%] peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 ${
                error ? `${errorColor} peer-focus:${errorColor}` : `text-black  `
              }`}
            >
              {label} {required && <span className={`${errorColor}`}>*</span>}
            </label>
          </div>
          {error && (
            <p id="outlined_error_help" className={`mt-2 text-xs ${errorColor} text-start`}>
              <span className="font-medium">{error.message}!</span>
            </p>
          )}
        </div>
      )}
    />
  );
};
