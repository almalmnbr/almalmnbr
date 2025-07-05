import * as React from "react"
import { OTPInput, OTPInputContext } from "input-otp"
import { Dot, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface InputOTPProps extends React.ComponentPropsWithoutRef<typeof OTPInput> {
  containerClassName?: string
  loading?: boolean
  variant?: "default" | "filled" | "outline"
  size?: "sm" | "md" | "lg"
}

const InputOTP = React.forwardRef<React.ElementRef<typeof OTPInput>, InputOTPProps>(
  ({ className, containerClassName, loading, variant = "default", size = "md", ...props }, ref) => {
    const sizeClasses = {
      sm: "h-8 w-8 text-sm",
      md: "h-10 w-10 text-base",
      lg: "h-12 w-12 text-lg",
    }

    const variantClasses = {
      default: "border-input bg-background",
      filled: "border-gray-200 bg-gray-50 hover:bg-gray-100",
      outline: "border-input bg-transparent",
    }

    return (
      <div className="relative">
        <OTPInput
          ref={ref}
          containerClassName={cn(
            "flex items-center gap-2 has-[:disabled]:opacity-50",
            containerClassName
          )}
          className={cn(
            "disabled:cursor-not-allowed",
            loading && "opacity-70 pointer-events-none",
            className
          )}
          {...props}
          render={({ slots }) => (
            <>
              {slots.map((slot, idx) => (
                <InputOTPSlot
                  key={idx}
                  index={idx}
                  size={size}
                  variant={variant}
                  className={cn(
                    sizeClasses[size],
                    variantClasses[variant]
                  )}
                />
              ))}
            </>
          )}
        />
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="h-5 w-5 animate-spin text-primary" />
          </div>
        )}
      </div>
    )
  }
)
InputOTP.displayName = "InputOTP"

interface InputOTPSlotProps extends React.ComponentPropsWithoutRef<"div"> {
  index: number
  variant?: "default" | "filled" | "outline"
  size?: "sm" | "md" | "lg"
}

const InputOTPSlot = React.forwardRef<React.ElementRef<"div">, InputOTPSlotProps>(
  ({ index, className, variant = "default", size = "md", ...props }, ref) => {
    const inputOTPContext = React.useContext(OTPInputContext)
    const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index]

    const sizeClasses = {
      sm: "h-8 w-8 text-sm",
      md: "h-10 w-10 text-base",
      lg: "h-12 w-12 text-lg",
    }

    const variantClasses = {
      default: "border-input bg-background",
      filled: "border-gray-200 bg-gray-50 hover:bg-gray-100",
      outline: "border-input bg-transparent",
    }

    return (
      <div
        ref={ref}
        className={cn(
          "relative flex items-center justify-center border-y border-r text-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md",
          "focus-within:z-10 focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
          isActive && "z-10 ring-2 ring-ring ring-offset-background",
          sizeClasses[size],
          variantClasses[variant],
          className
        )}
        {...props}
      >
        {char}
        {hasFakeCaret && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="h-4 w-px animate-caret-blink bg-foreground duration-1000" />
          </div>
        )}
      </div>
    )
  }
)
InputOTPSlot.displayName = "InputOTPSlot"

const InputOTPGroup = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center", className)} {...props} />
))
InputOTPGroup.displayName = "InputOTPGroup"

const InputOTPSeparator = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    role="separator"
    className={cn("flex items-center justify-center text-muted-foreground", className)}
    {...props}
  >
    <Dot className="h-4 w-4" />
  </div>
))
InputOTPSeparator.displayName = "InputOTPSeparator"

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator }