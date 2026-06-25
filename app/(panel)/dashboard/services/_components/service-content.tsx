import { getAllServices } from "../data-access/get-all-services";
import { ServicesList } from "./server-list";

interface ServiceContentProps {
  userId: string;
}

export async function ServiceContent({ userId }: ServiceContentProps) {
  const services = await getAllServices({ userId: userId });
  console.log(services);

  return <ServicesList services={services.data || []} />;
}
