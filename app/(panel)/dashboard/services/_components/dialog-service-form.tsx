import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";

const formSchema = z.object({
  name: z.string().min(1, { message: "Nome é obrigatório  " }),
  price: z.string().min(1, { message: "Preço é obrigatório" }),
  hours: z.string(),
  minutes: z.string(),
});

export interface UseDialogServiceFormProps {
  initialValues?: {
    name: string;
    price: string;
    hours: string;
    minutes: string;
  };
}

export type dialogServiceFormData = z.infer<typeof formSchema>;

export function useDialogServiceForm({
  initialValues,
}: UseDialogServiceFormProps) {
  return useForm<dialogServiceFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues || {
      name: "",
      price: "",
      hours: "",
      minutes: "",
    },
  });
}
