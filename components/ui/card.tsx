import * as React from "react"
import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

const cardVariants = cva(
  "relative rounded-xl border bg-white text-gray-800 shadow-sm transition-all duration-300 font-cairo",
  {
    variants: {
      hoverEffect: {
        default: "hover:shadow-md hover:border-blue-500/30 dark:hover:border-blue-400/50",
        lift: "hover:shadow-lg hover:-translate-y-1 hover:border-blue-500/30 dark:hover:border-blue-400/50",
        none: "",
      },
      animation: {
        fadeIn: "animate-fade-in",
        scaleIn: "animate-scale-in",
        none: "",
      },
    },
    defaultVariants: {
      hoverEffect: "default",
      animation: "none",
    },
  }
)

interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  index?: number
  accentColor?: "blue" | "emerald" | "violet" | "rose"
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      hoverEffect,
      animation,
      index = 0,
      accentColor = "blue",
      ...props
    },
    ref
  ) => {
    const animationDelay = `${index * 0.1}s`

    // Color mappings
    const colorMap = {
      blue: {
        light: "bg-[#1E3A8A]",
        dark: "bg-blue-600",
        text: "text-blue-600",
        hover: "hover:text-blue-600",
        bgHover: "bg-blue-500/5",
        border: "border-blue-500/30"
      },
      emerald: {
        light: "bg-emerald-500",
        dark: "bg-emerald-600",
        text: "text-emerald-600",
        hover: "hover:text-emerald-600",
        bgHover: "bg-emerald-500/5",
        border: "border-emerald-500/30"
      },
      violet: {
        light: "bg-violet-500",
        dark: "bg-violet-600",
        text: "text-violet-600",
        hover: "hover:text-violet-600",
        bgHover: "bg-violet-500/5",
        border: "border-violet-500/30"
      },
      rose: {
        light: "bg-rose-500",
        dark: "bg-rose-600",
        text: "text-rose-600",
        hover: "hover:text-rose-600",
        bgHover: "bg-rose-500/5",
        border: "border-rose-500/30"
      }
    }

    const colors = colorMap[accentColor]

    return (
      <div
        ref={ref}
        className={cn(cardVariants({ hoverEffect, animation, className }), "group")}
        style={{
          ...(animation !== "none" && {
            animationDelay,
            animationFillMode: "backwards",
          }),
        }}
        {...props}
      >
        {/* Accent bar */}
        <div
          className={cn(
            "absolute top-0 left-0 w-1 h-0",
            colors.light,
            "group-hover:h-full transition-all duration-500 ease-out",
            "dark:" + colors.dark
          )}
        ></div>

        {/* Subtle overlay on hover */}
        <div
          className={cn(
            "absolute inset-0 transition-colors duration-500 pointer-events-none",
            colors.bgHover,
            "group-hover:opacity-100 opacity-0",
            "dark:opacity-0 dark:group-hover:opacity-100"
          )}
        ></div>

        {props.children}
      </div>
    )
  }
)
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-col space-y-2 p-6 border-b border-gray-100",
      "dark:border-gray-700",
      className
    )}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement> & { accentColor?: "blue" | "emerald" | "violet" | "rose" }
>(({ className, accentColor = "blue", ...props }, ref) => {
  const colorMap = {
    blue: "group-hover:text-blue-600 dark:group-hover:text-blue-400",
    emerald: "group-hover:text-emerald-600 dark:group-hover:text-emerald-400",
    violet: "group-hover:text-violet-600 dark:group-hover:text-violet-400",
    rose: "group-hover:text-rose-600 dark:group-hover:text-rose-400"
  }

  return (
    <h3
      ref={ref}
      className={cn(
        "text-xl font-bold leading-tight tracking-tight",
        "text-gray-800 dark:text-gray-100",
        colorMap[accentColor],
        "transition-colors duration-300",
        className
      )}
      {...props}
    />
  )
})
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      "text-sm text-gray-600 leading-relaxed",
      "dark:text-gray-300",
      className
    )}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { accentColor?: "blue" | "emerald" | "violet" | "rose" }
>(({ className, accentColor = "blue", ...props }, ref) => {
  const colorMap = {
    blue: "group-hover:bg-blue-50/50 dark:group-hover:bg-blue-900/10",
    emerald: "group-hover:bg-emerald-50/50 dark:group-hover:bg-emerald-900/10",
    violet: "group-hover:bg-violet-50/50 dark:group-hover:bg-violet-900/10",
    rose: "group-hover:bg-rose-50/50 dark:group-hover:bg-rose-900/10"
  }

  return (
    <div
      ref={ref}
      className={cn(
        "p-6 pt-0",
        colorMap[accentColor],
        "transition-colors duration-300",
        className
      )}
      {...props}
    />
  )
})
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex items-center p-6 pt-0 border-t border-gray-100",
      "dark:border-gray-700",
      className
    )}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }