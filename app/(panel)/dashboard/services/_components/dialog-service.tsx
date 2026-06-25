"use client";
import { useState } from "react";

import {
  DialogHeader,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  dialogServiceFormData,
  useDialogServiceForm,
} from "./dialog-service-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { convertRealtoCents } from "@/utils/convertCurrency";
import { createNewService } from "./_actions/create-service";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { updateService } from "./_actions/update-service";

interface DialogServiceProps {
  closeModal: () => void;
  serviceId?: string;
  initialValues?: {
    name: string;
    price: string;
    hours: string;
    minutes: string;
  };
}

export function DialogService({
  closeModal,
  initialValues,
  serviceId,
}: DialogServiceProps) {
  const form = useDialogServiceForm({ initialValues: initialValues });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  async function onSubmit(data: dialogServiceFormData) {
    setLoading(true);
    const priceInCents = convertRealtoCents(data.price);
    const hours = parseInt(data.hours) || 0;
    const minutes = parseInt(data.minutes) || 0;
    const totalDurationInMinutes = hours * 60 + minutes;

    if (serviceId) {
      await editServiceById({
        serviceId: serviceId,
        name: data.name,
        price: priceInCents,
        duration: totalDurationInMinutes,
      });

      return;
    }

    const response = await createNewService({
      name: data.name,
      price: priceInCents,
      durations: totalDurationInMinutes,
    });

    setLoading(false);

    if (response.error) {
      toast.error(response.error);
      return;
    }
    toast.success("Serviço criado com sucesso!");
    handleCloseModal();
    router.refresh();
  }

  function handleCloseModal() {
    form.reset();
    closeModal();
  }

  async function editServiceById({
    serviceId,
    name,
    price,
    duration,
  }: {
    serviceId: string;
    name: string;
    price: number;
    duration: number;
  }) {
    const response = await updateService({
      serviceId: serviceId,
      name: name,
      price: price,
      durations: duration,
    });

    if (response.error) {
      toast.error(response.error);
      return;
    }

    toast.success("Serviço atualizado com sucesso!");
    handleCloseModal();
    router.refresh();
  }

  function changeCurrency(event: React.ChangeEvent<HTMLInputElement>) {
    let { value } = event.target;
    value = value.replace(/\D/g, "");
    if (value) {
      value = (parseInt(value, 10) / 100).toFixed(2);
      value = value.replace(".", ",");
      value = value.replace(/(\B)(?=(\d{3})+(?!\d))/g, ".");
    }
    event.target.value = value;
    form.setValue("price", value);
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>Adicionar Serviço</DialogTitle>
        <DialogDescription>
          Preencha as informações para adicionar um novo serviço.
        </DialogDescription>
      </DialogHeader>

      <Form {...form}>
        <form className="spacey-4" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="my-2">
                  <FormLabel className="text-sm font-medium">
                    Nome do serviço:
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Nome do serviço" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem className="my-2">
                  <FormLabel className="text-sm font-medium">Preço:</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Preço"
                      {...field}
                      onChange={(e) => {
                        changeCurrency(e);
                        field.onChange(e);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          Tempo de duração do serviço:
          <div className="grid grid-cols-2 gap-3">
            <FormField
              control={form.control}
              name="hours"
              render={({ field }) => (
                <FormItem className="my-2">
                  <FormLabel className="text-sm font-medium">Horas:</FormLabel>
                  <FormControl>
                    <Input placeholder="1" min="0" type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="minutes"
              render={({ field }) => (
                <FormItem className="my-2">
                  <FormLabel className="text-sm font-medium">
                    Minutos:
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="1" min="0" type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} type="submit" className="w-full mt-4">
            {loading
              ? "Carregando..."
              : serviceId
                ? "Atualizar Serviço"
                : "Criar Serviço"}
          </Button>
        </form>
      </Form>
    </>
  );
}
