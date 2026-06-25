import { Button } from "@/components/ui/button";
import Image from "next/image";
import ImageDoctor from "../../../public/ananutri-doctor.png";

export function Hero() {
  return (
    <section className="bg-white">
      <div className="container mx-auto px-4 pt-20 sm:px-6 lg:px-8">
        <main className="flex items-center justify-center">
          <article className="max-w-3xl flex-2 space-y-8 flex flex-col justify-center">
            <h1 className="text-4xl font-bold lg:text-5xl max-w-2xl tracking-tight">
              Agende sua consulta com uma clinca veterinária de forma rápida e
              fácil
            </h1>
            <p className="text-base md:text-lg text-gray-600">
              Plataforma de agendamento online para clientes que desejam cuidar
              da alimentação e da saúde do seu pet. Escolha a melhor clinica
              veterinária, veja horários disponíveis e marque sua consulta em
              poucos cliques.
            </p>
            <Button className="bg-emerald-500 hover:bg-emerald-400 w-fit px-6 font-semibold">
              Agendar consulta
            </Button>
          </article>

          <div>
            <Image
              src={ImageDoctor}
              alt="Imagem de um dentista"
              width={340}
              height={400}
              className="object-contain"
              quality={100}
              priority
            />
          </div>
        </main>
      </div>
    </section>
  );
}
