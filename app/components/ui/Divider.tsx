import { cn } from "../../lib/utils";

interface DividerProps {
  className?: string;
}

export function Divider({ className }: DividerProps) {
  return <div className={cn("w-12 h-px bg-brand-gold mx-auto", className)} />;
}
