import { toaster } from "@/components/ui/toaster";

type ToastType = "success" | "error" | "warning" | "info";

interface UseToastProps {
  message: string;
  type: ToastType;
}

export const useToast = () => {
  const showToast = ({ message, type }: UseToastProps) => {
    queueMicrotask(() => {
      toaster.create({
        title: message,
        type,
        duration: 3000,
      });
    });
  };

  return { showToast };
};
