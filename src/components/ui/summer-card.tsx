import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

const summerCardVariants = cva(
  "rounded-2xl border bg-card text-card-foreground shadow-sm transition-all duration-300 group",
  {
    variants: {
      variant: {
        default: "border-neutral-200 hover:shadow-lg hover:-translate-y-1 hover:border-pink-200",
        premium: "border-0 hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.02]",
        minimal: "border-0 shadow-none hover:shadow-md",
        featured: "border-2 border-pink-200 hover:border-pink-300 hover:shadow-xl",
      },
      padding: {
        none: "p-0",
        sm: "p-4",
        default: "p-6",
        lg: "p-8",
      },
    },
    defaultVariants: {
      variant: "default",
      padding: "default",
    },
  }
)

export interface SummerCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof summerCardVariants> {}

const SummerCard = React.forwardRef<HTMLDivElement, SummerCardProps>(
  ({ className, variant, padding, ...props }, ref) => (
    <div
      ref={ref}
      className={summerCardVariants({ variant, padding, className })}
      {...props}
    />
  )
)
SummerCard.displayName = "SummerCard"

const SummerCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={`flex flex-col space-y-1.5 p-6 ${className}`}
    {...props}
  />
))
SummerCardHeader.displayName = "SummerCardHeader"

const SummerCardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={`font-semibold text-2xl leading-none tracking-tight ${className}`}
    {...props}
  />
))
SummerCardTitle.displayName = "SummerCardTitle"

const SummerCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={`text-sm text-muted-foreground ${className}`}
    {...props}
  />
))
SummerCardDescription.displayName = "SummerCardDescription"

const SummerCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={`p-6 pt-0 ${className}`} {...props} />
))
SummerCardContent.displayName = "SummerCardContent"

const SummerCardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={`flex items-center p-6 pt-0 ${className}`}
    {...props}
  />
))
SummerCardFooter.displayName = "SummerCardFooter"

export {
  SummerCard,
  SummerCardHeader,
  SummerCardFooter,
  SummerCardTitle,
  SummerCardDescription,
  SummerCardContent,
}