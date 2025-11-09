import { toaster } from "@/components/ui/toaster";

type ToastType = "success" | "error";

interface UseToastProps {
  message: string;
  type: ToastType;
}

export const useToast = () => {
  const showToast = ({ message, type }: UseToastProps) => {
    if (type === "success") {
      toaster.create({
        title: message,
        type: "success",
        duration: 3000,
      });
    } else {
      toaster.create({
        title: message,
        type: "error",
        duration: 3000,
      });
    }
  };

  return { showToast };
};
