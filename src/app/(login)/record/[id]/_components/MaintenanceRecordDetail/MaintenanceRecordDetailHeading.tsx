export default function MaintenanceRecordDetailHeading({
  children,
}: {
  children: string;
}) {
  return (
    <h2 className="_font-[600] text-[14px] leading-[30px] md:text-[15px]">
      {children}
    </h2>
  );
}
