import { Control, Controller, FieldValues, Path } from "react-hook-form";

interface FormFieldProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  isSelect?: boolean;
  options?: string[];
  capitalize?: boolean;
  disabled?: boolean;
  readOnly?: boolean; // ✅ Added readOnly support
  value?: string; // ✅ Added external value support
  capitalizeWords?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  labelBgColor?: string;
  textColor?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode; // ✅ Added endIcon support
  className?: string;
}

export const TextField = <T extends FieldValues>({
  name,
  control,
  label,
  required = false,
  capitalize = false,
  disabled = false,
  readOnly = false, // ✅ default to false
  value,
  onChange,
  onFocus,
  inputProps = {},
  labelBgColor = "bg-gray-900",
  textColor = "text-black",
  startIcon,
  endIcon, // ✅ accept endIcon
  ...others
}: FormFieldProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <div>
          <div className="relative">
            {startIcon && (
              <div className="absolute left-3 top-1/2 -translate-y-1/2 z-20">{startIcon}</div>
            )}
            <input
              id={field.name}
              disabled={disabled}
              readOnly={readOnly} // ✅ dynamic readOnly added
              className={`block ${startIcon ? "pl-10" : "pl-2.5"} ${
                endIcon ? "pr-10" : "pr-2.5"
              } pb-2.5 pt-3 w-full text-sm ${textColor} bg-transparent rounded border-1  ring-0 border-gray-300 appearance-none
                ${disabled ? "cursor-not-allowed  !bg-gray-100 " : ""}
                ${
                  error
                    ? " border-red-500  focus:outline-none focus:ring-0 focus:border-red-500"
                    : " border-gray-300  focus:outline-none focus:ring-0 focus:border-gray-500"
                } peer`}
              placeholder=""
              autoComplete="off"
              {...field}
              {...inputProps}
              value={
                typeof value !== "undefined"
                  ? value
                  : typeof field.value === "object"
                  ? field.value?.value
                  : field.value
              }
              onChange={(e) => {
                const newValue = capitalize ? e.target.value.toUpperCase() : e.target.value;
                field.onChange(newValue);
                onChange?.(e);
              }}
              onFocus={onFocus}
              {...others}
            />
            {endIcon && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2 z-20">{endIcon}</div>
            )}
            <label
              htmlFor={field.name}
              className={`absolute text-sm ${
                error ? "text-red-500  peer-focus:text-red-500" : " text-black"
              } duration-300 transform -translate-y-4 scale-75 top-2 left-1 z-10 origin-[0] px-1 
              ${labelBgColor}
              peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2
              peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto 
              peer-focus:ml-1 peer-placeholder-shown:ml-9`}
            >
              {label} {required && <span className="text-red-500">*</span>}
            </label>
          </div>

          {error && (
            <p id="outlined_error_help" className="mt-2 text-xs text-red-400 text-start">
              <span className="font-medium">{error.message}!</span>
            </p>
          )}
        </div>
      )}
    />
  );
};
