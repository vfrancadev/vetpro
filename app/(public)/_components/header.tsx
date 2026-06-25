"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { LogIn, Menu } from "lucide-react";
import { useSession } from "next-auth/react";
import { handleRegister } from "../_actions/login";

export function Header() {
  const { data: session, status } = useSession();
  const navItems = [{ href: "#profissionais", label: "Profissionais" }];
  const [isOpen, setIsOpen] = useState(false);

  async function handleLogin() {
    await handleRegister("github");
  }
  const NavLinks = () => (
    <>
      {" "}
      {navItems.map((item) => (
        <Button
          onClick={() => setIsOpen(false)}
          key={item.href}
          asChild
          className=" text-white shadow-none font-bold px-2 py-2 rounded transition-colors"
        >
          <Link href={item.href} className="text-base">
            {item.label}
          </Link>
        </Button>
      ))}
      {status === "loading" ? (
        <></>
      ) : session ? (
        <Button
          asChild
          className="font-bold bg-emerald-500 hover:bg-emerald-600 px-2 py-2 rounded"
        >
          <Link href="/dashboard" className="flex items-center gap-2  ">
            <LogIn size={20} />
            Conta
          </Link>
        </Button>
      ) : (
        <Button
          onClick={handleLogin}
          className="font-bold bg-emerald-500 text-white px-2 py-2 hover:bg-emerald-600 transition-colors rounded "
        >
          <LogIn />
          Portal da Clinica
        </Button>
      )}
    </>
  );

  return (
    <header className="fixed top-0 right-0 left-0 z-999 py-4 px-6 bg-white">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="text-3xl text-zinc-900 font-bold">
          {" "}
          vet<span className="text-emerald-500">PRO</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-4">
          <NavLinks />
        </nav>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden ">
            <Button
              className="text-black hover-transparent"
              variant="ghost"
              size="icon"
            >
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-240px sm: w-300px z-9999">
            <SheetTitle>Menu </SheetTitle>
            <SheetHeader></SheetHeader>
            <SheetDescription>Veja nossos links</SheetDescription>
            <nav className="flex flex-col space-y-4 mt-6">
              <NavLinks />
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
