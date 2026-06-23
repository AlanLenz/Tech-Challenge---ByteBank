interface MetricCardProps {
  title: string;
  value: string;
  icon?: React.ReactNode;
}

export function MetricCard({
  title,
  value,
  icon,
}: MetricCardProps) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center gap-2">
        {icon}
        <p className="text-sm">{title}</p>
      </div>

      <h3 className="text-2xl font-bold mt-2">
        {value}
      </h3>
    </div>
  );
}