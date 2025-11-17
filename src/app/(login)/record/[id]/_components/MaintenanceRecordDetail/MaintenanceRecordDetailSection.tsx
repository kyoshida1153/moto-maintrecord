import { JSX } from "react";

export default function MaintenanceRecordDetailSection({
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
