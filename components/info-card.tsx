import {LucideIcon} from "lucide-react";
import {IconBadge} from "@/components/icon-badge";

interface InfoCardProps {
  icon: LucideIcon;
  label: string;
  numberOfItems: number;
  variant?: "default" | "success";
}

export const InfoCard = ({icon: Icon, label, numberOfItems, variant}: InfoCardProps) => {
  return (
    <div className="flex items-center p-3 border rounded-md gap-x-2">
      <IconBadge variant={variant} icon={Icon} />
      <div>
        <p className="font-medium">{label}</p>
        <p className="text-sm text-gray-500">
          {numberOfItems} {numberOfItems === 1 ? "Document" : "Documents"}
        </p>
      </div>
    </div>
  );
};
