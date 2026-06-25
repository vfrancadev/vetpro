"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import logoImg from "../../../../public/logo-odonto.png";
import Image from "next/image";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  Banknote,
  CalendarCheck2,
  ChevronLeft,
  ChevronRight,
  Folder,
  List,
  Settings,
} from "lucide-react";
import Link from "next/link";

export function SidebarDashboard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen w-full">
      <aside
        className={clsx(
          "flex flex-col border-r bg-background transition-all duration-300 p-4 h-full",
          {
            "w-20": isCollapsed,
            "w-64": !isCollapsed,
            "hidden md:flex": true,
          },
        )}
      >
        <div>
          {!isCollapsed && (
            <Image src={logoImg} alt="Logo" priority quality={100} />
          )}
        </div>
        <Button
          className="bg-gray-100 hover:bg-gray-50 text-inc-900 self-end mb-2"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {!isCollapsed ? (
            <ChevronLeft className="w-5 h-5" />
          ) : (
            <ChevronRight className="w-5 h-5 " />
          )}
        </Button>

        {isCollapsed && (
          <nav className="flex flex-col gap-1 overflow-hidden mt-2">
            <SideBarLink
              href="/dashboard"
              icon={<CalendarCheck2 />}
              label="Agendamentos"
              isCollapsed={isCollapsed}
              pathname={pathname}
            />
            <SideBarLink
              href="/dashboard/services"
              icon={<Folder />}
              label="Serviços"
              isCollapsed={isCollapsed}
              pathname={pathname}
            />
            <SideBarLink
              href="/dashboard/plans"
              icon={<Banknote className="w-6 h-6" />}
              label="Planos"
              isCollapsed={isCollapsed}
              pathname={pathname}
            />
            <SideBarLink
              href="/dashboard/profile"
              icon={<Settings className="w-6 h-6" />}
              label="Meu Perfil"
              isCollapsed={isCollapsed}
              pathname={pathname}
            />
          </nav>
        )}

        <Collapsible open={!isCollapsed}>
          <CollapsibleContent>
            <nav className="flex flex-col gap-1 overflow-hidden">
              <span className="text-sm text-gray-400 font-medium mt-1 uppercase">
                {" "}
                Painel
              </span>
            </nav>
            <SideBarLink
              href="/dashboard"
              icon={<CalendarCheck2 />}
              label="Agendamentos"
              isCollapsed={isCollapsed}
              pathname={pathname}
            />
            <SideBarLink
              href="/dashboard/services"
              icon={<Folder />}
              label="Serviços"
              isCollapsed={isCollapsed}
              pathname={pathname}
            />

            <span className="text-sm text-gray-400 font-medium mt-1 uppercase">
              {" "}
              Painel
            </span>
            <SideBarLink
              href="/dashboard/plans"
              icon={<Banknote className="w-6 h-6" />}
              label="Planos"
              isCollapsed={isCollapsed}
              pathname={pathname}
            />
            <SideBarLink
              href="/dashboard/profile"
              icon={<Settings className="w-6 h-6" />}
              label="Meu Perfil"
              isCollapsed={isCollapsed}
              pathname={pathname}
            />
          </CollapsibleContent>
        </Collapsible>
      </aside>

      <div
        className={clsx("flex flex-1 flex-col transition-all duration-300", {
          "md:ml-20": !isCollapsed,
          "md:ml-0": isCollapsed,
        })}
      >
        <header className="md:hidden flex items-center justify-between border-b px-4 md:px6 h-14 z-10 sticky top-0 bg-white">
          <Sheet>
            <div className="flex items-center gap-4">
              <SheetTrigger asChild>
                <Button
                  onClick={() => setIsCollapsed(false)}
                  variant="outline"
                  size="icon"
                  className="md:hidden"
                >
                  <List className="h-5 w-5" />
                </Button>
              </SheetTrigger>

              <h1 className="text-base md:text-lg font-semibold">
                Menu NutriPro
              </h1>
            </div>
            <SheetContent
              side="right"
              className=" sm:max-w-xs text-black w-64 px-3"
            >
              <SheetTitle>NutriPro</SheetTitle>
              <SheetDescription>Menu Administrativo</SheetDescription>
              <nav className="grid gap-2 text-base pt-5">
                <SideBarLink
                  href="/dashboard"
                  icon={<CalendarCheck2 />}
                  label="Dashboard"
                  isCollapsed={isCollapsed}
                  pathname={pathname}
                />
                <SideBarLink
                  href="/dashboard/services"
                  icon={<Folder />}
                  label="Agendamentos"
                  isCollapsed={isCollapsed}
                  pathname={pathname}
                />
                <SideBarLink
                  href="/dashboard/plans"
                  icon={<Banknote className="w-6 h-6" />}
                  label="Planos"
                  isCollapsed={isCollapsed}
                  pathname={pathname}
                />
                <SideBarLink
                  href="/dashboard/profile"
                  icon={<Settings className="w-6 h-6" />}
                  label="Meu Perfil"
                  isCollapsed={isCollapsed}
                  pathname={pathname}
                />
              </nav>
            </SheetContent>
          </Sheet>
        </header>
        <main className="flex-1 py-4 px-2 md:p-6 ">{children}</main>
      </div>
    </div>
  );
}

interface SideBarLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  isCollapsed?: boolean;
  pathname: string;
}

function SideBarLink({
  href,
  icon,
  label,
  isCollapsed,
  pathname,
}: SideBarLinkProps) {
  return (
    <Link href={href}>
      <div
        className={clsx(
          "flex items-center gap-3 rounded-md px-3 py-2 transition-colors",
          {
            "text-white bg-blue-500": pathname === href,
            "text-gray-700 hover:bg-gray-100": pathname !== href,
          },
        )}
      >
        <span className="w-6 h-6">{icon}</span>
        {!isCollapsed && <span>{label}</span>}
      </div>
    </Link>
  );
}
