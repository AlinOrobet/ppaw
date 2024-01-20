"use client";

import {useCurrentUser} from "@/hooks/use-current-user";
import {Button} from "./ui/button";
import {toast} from "sonner";
import {useState} from "react";
import axios from "axios";

const SubscriptionButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const user = useCurrentUser();
  const onClick = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(`api/user/${user?.id}/subscription`);
      window.location.assign(response.data.url);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Button size="lg" className="w-full" onClick={onClick} disabled={isLoading}>
      Create new subscription
    </Button>
  );
};

export default SubscriptionButton;
