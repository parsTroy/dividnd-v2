"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "../../components/ui/button";

const UpgradeButton = () => {
  const { mutate: createStripeSession } = trpc.createStripeSession.useMutation({
    onSuccess: ({ url }) => {
      window.location.href = url ?? "/dashboard/billing";
    },
  });

  return (
    <Button onClick={() => createStripeSession()} className="w-full ">
      Upgrade Now <ArrowRight className="h-5 w-5 ml-1.5" />
    </Button>
  );
};

export default UpgradeButton;