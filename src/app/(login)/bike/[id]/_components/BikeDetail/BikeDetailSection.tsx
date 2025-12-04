import { JSX } from "react";

export default function BikeDetailSection({
  children,
}: {
  children: JSX.Element[];
}) {
  return (
    <section className="text-[18px] md:grid md:grid-cols-[120px_1fr] md:gap-4">
      {children}
    </section>
  );
}
