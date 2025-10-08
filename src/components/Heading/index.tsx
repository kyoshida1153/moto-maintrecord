export default function Heading({
  children,
  level = 1,
}: {
  children: string;
  level: 1;
}) {
  switch (level) {
    case 1:
      return (
        <h1 className="mb-4 text-2xl font-medium tracking-wide text-black md:mb-6 md:text-3xl">
          {children}
        </h1>
      );
    default:
      break;
  }
}
