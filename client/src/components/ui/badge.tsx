import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        success: "border-transparent bg-success text-success-foreground hover:bg-success/80",
        alarm: "border-transparent bg-alarm text-alarm-foreground hover:bg-alarm/80",
        blue: "border-transparent text-cyan-foreground hover:bg-opacity-80",
        purple: "border-transparent text-purple-foreground hover:bg-opacity-80",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  const style = variant === 'blue' ? { backgroundColor: 'var(--cyan)', color: 'var(--cyan-foreground)' } :
               variant === 'purple' ? { backgroundColor: 'var(--purple)', color: 'var(--purple-foreground)' } :
               props.style;

  return (
    <div 
      className={cn(badgeVariants({ variant }), className)} 
      style={style}
      {...props} 
    />
  )
}

export { Badge, badgeVariants }
