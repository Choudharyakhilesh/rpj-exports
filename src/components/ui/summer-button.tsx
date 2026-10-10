import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

const summerButtonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group",
  {
    variants: {
      variant: {
        default: "bg-pink-100 text-neutral-900 hover:bg-pink-200 hover:shadow-lg hover:-translate-y-0.5",
        primary: "bg-sky-100 text-sky-900 hover:bg-sky-200 hover:shadow-lg hover:-translate-y-0.5",
        accent: "bg-mint-100 text-green-900 hover:bg-mint-200 hover:shadow-lg hover:-translate-y-0.5",
        outline: "border-2 border-neutral-200 bg-white text-neutral-900 hover:bg-neutral-50 hover:border-pink-200",
        ghost: "hover:bg-pink-50 hover:text-pink-700",
        premium: "bg-gradient-to-r from-pink-100 to-peach-100 text-neutral-900 hover:from-pink-200 hover:to-peach-200 hover:shadow-xl hover:-translate-y-1",
      },
      size: {
        default: "h-12 px-6 py-2",
        sm: "h-10 rounded-lg px-4 text-xs",
        lg: "h-14 rounded-2xl px-8 text-base",
        xl: "h-16 rounded-3xl px-12 text-lg",
        icon: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface SummerButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof summerButtonVariants> {
  asChild?: boolean
}

const SummerButton = React.forwardRef<HTMLButtonElement, SummerButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={summerButtonVariants({ variant, size, className })}
        ref={ref}
        {...props}
      />
    )
  }
)
SummerButton.displayName = "SummerButton"

export { SummerButton, summerButtonVariants }