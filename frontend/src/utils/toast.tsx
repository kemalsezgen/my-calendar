import { toast } from "@/components/hooks/use-toast";

export const showToast = (
  message: string,
  type: "default" | "success" | "error" | "warning" = "default"
) => {
  toast({
    title: type.charAt(0).toUpperCase() + type.slice(1),
    description: message,
    variant: type === "success" ? "default" : "destructive",
  });
};
