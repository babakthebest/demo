import React, { ReactNode } from "react";
import MainHeader from "./components/mainHeader";
import MainFooter from "./components/mainFooter";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="relative h-[100vh]">
      <section className="fixed top-[0] h-[3rem] w-full">
        <MainHeader />
      </section>
      <section className="fixed bottom-[3rem] top-[3rem] w-full">{children}</section>
      <section className="fixed bottom-0 h-[3rem] w-full">
        <MainFooter />
      </section>
    </div>
  );
}
