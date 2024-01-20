import getUserPurchases from "@/hooks/get-user-purchases";

import SubscriptionButton from "@/components/subscription-button";
import {Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card";

import {currentUser} from "@/lib/auth";
import {redirect} from "next/navigation";
import {UserSubscriptionsList} from "@/components/user-subscriptions-list";

export const revalidate = 0;

const SubscriptionPage = async () => {
  const user = await currentUser();
  if (!user) {
    return redirect("/");
  }
  const userPurchases = await getUserPurchases(user.id);
  return (
    <Card className="w-[600px] h-2/3 flex flex-col">
      <CardHeader className="border-b">
        <p className="text-2xl font-semibold text-center">💸 Subscriptions</p>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto p-4">
        <UserSubscriptionsList data={userPurchases} />
      </CardContent>
      <CardFooter className="pt-6 border-t">
        <SubscriptionButton />
      </CardFooter>
    </Card>
  );
};

export default SubscriptionPage;
