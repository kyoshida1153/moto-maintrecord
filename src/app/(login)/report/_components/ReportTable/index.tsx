export default function ReportTable({
  data,
}: {
  data: { key: string; value: number }[];
}) {
  const totalValue = data.reduce((sum, current) => sum + current.value, 0);

  return (
    <table className="min-w-[300px]">
      <thead className="bg-gray-100">
        <tr className="border-b border-gray-200">
          <th className="px-6 py-2 text-left">合計</th>
          <th className="px-6 py-2 text-right">
            <span className="font-alphanumeric">
              {totalValue.toLocaleString()}
            </span>
            円
          </th>
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.key} className="border-b border-gray-200">
            <td className="px-6 py-2 text-left">{row.key}</td>
            <td className="px-6 py-2 text-right">
              <span className="font-alphanumeric">
                {row.value.toLocaleString()}
              </span>
              円
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
