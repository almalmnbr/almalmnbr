import * as React from "react"
import { cn } from "@/lib/utils"
import { Eye, EyeOff, Search, X } from "lucide-react"

interface InputProps extends React.ComponentProps<"input"> {
  variant?: "default" | "filled" | "outline"
  inputSize?: "sm" | "md" | "lg"
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  showClearButton?: boolean
  onClear?: () => void
  isPassword?: boolean
  error?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      variant = "default",
      size = "md",
      leftIcon,
      rightIcon,
      showClearButton,
      onClear,
      isPassword = false,
      error = false,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = React.useState(false)
    const [isFocused, setIsFocused] = React.useState(false)

    const finalType = isPassword ? (showPassword ? "text" : "password") : type

    const sizeClasses = {
      sm: "h-8 text-sm px-2.5",
      md: "h-10 text-base px-3",
      lg: "h-12 text-lg px-4",
    }

    const variantClasses = {
      default: "bg-background border-input",
      filled: "bg-gray-50 border-gray-200 hover:bg-gray-100",
      outline: "bg-transparent border-input",
    }

    return (
      <div className="relative w-full">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            {leftIcon}
          </div>
        )}
        <input
          type={finalType}
          className={cn(
            "flex w-full rounded-md border ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors duration-200",
            sizeClasses[size],
            variantClasses[variant],
            error && "border-destructive focus-visible:ring-destructive/30",
            leftIcon && "pl-10",
            (rightIcon || showClearButton || isPassword) && "pr-10",
            className
          )}
          ref={ref}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
          {showClearButton && props.value && (
            <button
              type="button"
              onClick={onClear}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          )}
          {rightIcon && !showClearButton && !isPassword && (
            <div className="text-muted-foreground">{rightIcon}</div>
          )}
        </div>
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }