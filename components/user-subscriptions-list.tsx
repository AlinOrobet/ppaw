import {Purchase} from "@prisma/client";
import {format} from "date-fns";
export const UserSubscriptionsList = ({data}: {data: Purchase[]}) => {
  return (
    <div className="space-y-4">
      {data.map((purchase) => (
        <div key={purchase.id} className="flex flex-col border border-input p-4">
          <p className="text-xs text-muted-foreground">{purchase.id}</p>
          <p className="ml-auto">{format(purchase.createdAt, "MM/dd/yyyy - hh:mm:ss")}</p>
        </div>
      ))}
    </div>
  );
};
