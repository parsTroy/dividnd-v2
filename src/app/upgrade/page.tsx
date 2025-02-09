'use client';

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import UpgradeButton from "../components/UpgradeButton";
import { buttonVariants } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { PLANS } from "../config/stripe";
import { cn } from "@/lib/utils";
import { ArrowRight, Check, HelpCircle, Minus } from "lucide-react";
import Link from "next/link";

import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default function Upgrade() {

  const pricingItems = [
    {
      plan: "Free",
      tagline: "For small portfolios & testing our services.",
      interval: "Free",
      positions: 10,
      amount: 0,
      features: [
        {
          text: "10 stocks per portfolio",
          footnote: "The maximum amount of stocks per portfolio.",
        },
        {
          text: "Mobile-friendly interface",
        },
        {
          text: "Higher-quality UI",
          footnote: "Better tracking for enhanced portfolio quality",
          negative: true,
        },
        {
          text: "Priority support",
          negative: true,
        },
      ],
    },
    {
      plan: "Pro Monthly",
      tagline: "For larger portfolios with higher needs.",
      positions: PLANS.find((p) => p.slug === "pro-monthly")!.positions,
      interval: "Monthly",
      amount: 9.99,
      features: [
        {
          text: "250 stocks per portfolio.",
          footnote: "The maximum amount of stocks per portfolio.",
        },
        {
          text: "Mobile-friendly interface",
        },
        {
          text: "Higher-quality UI",
          footnote: "Better tracking for enhanced portfolio quality",
        },
        {
          text: "Priority support",
        },
      ],
    },
    // {
    //   plan: "Pro Annual",
    //   tagline: "For larger portfolios with higher needs.",
    //   positions: PLANS.find((p) => p.slug === "pro-annual")!.positions,
    //   interval: "Annually",
    //   features: [
    //     {
    //       text: "250 stocks per portfolio.",
    //       footnote: "The maximum amount of stocks per portfolio.",
    //     },
    //     {
    //       text: "Mobile-friendly interface",
    //     },
    //     {
    //       text: "Higher-quality UI",
    //       footnote: "Better tracking for enhanced portfolio quality",
    //     },
    //     {
    //       text: "Priority support",
    //     },
    //   ],
    // },
    // {
    //   plan: "Pro Lifetime",
    //   tagline: "For larger portfolios with higher needs.",
    //   positions: PLANS.find((p) => p.slug === "pro-lifetime")!.positions,
    //   interval: "For Life",
    //   features: [
    //     {
    //       text: "250 stocks per portfolio.",
    //       footnote: "The maximum amount of stocks per portfolio.",
    //     },
    //     {
    //       text: "Mobile-friendly interface",
    //     },
    //     {
    //       text: "Higher-quality UI",
    //       footnote: "Better tracking for enhanced portfolio quality",
    //     },
    //     {
    //       text: "Priority support",
    //     },
    //   ],
    // },
  ];

  const router = useRouter();

  const handleUpgrade = async () => {
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      // Create a Stripe checkout session
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id }),
      });

      const { id: sessionId } = await response.json();

      if (sessionId) {
        // Redirect to the Stripe checkout page
        const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
        await stripe?.redirectToCheckout({ sessionId });
      }
    }
  };

  return (
    <>
      <MaxWidthWrapper className="mb-8 mt-24 text-center max-w-5xl">
          <div className="mx-auto mb-10 sm:max-w-lg">
            <h1 className="text-6xl font-bold sm:text-7xl">Pricing</h1>
            <p className="mt-5 dark:text-slate-400 text-gray-600 sm:text-lg">
              We encourage you to try our service before you become a member.
              We&apos;re certain you&apos;ll be satisfied.
            </p>
          </div>

          <div className="pt-12 grid grid-cols-1 gap-10 lg:grid-cols-2">
            <TooltipProvider>
              {pricingItems.map(
                ({ plan, tagline, positions, features, amount, interval }) => {
                  const price =
                    PLANS.find((p) => p.slug === plan.toLowerCase())?.price
                      .amount || 0;
                  return (
                    <div
                      key={plan}
                      className={cn("relative rounded-2xl bg-white shadow-lg", {
                        "border-2 border-green-600 shadow-green-200":
                          plan === "Pro Monthly",
                        "border border-gray-200": plan !== "Pro Monthly",
                      })}
                    >
                      {plan === "Pro Monthly" && (
                        <div className="absolute -top-5 left-0 right-0 mx-auto w-32 rounded-full bg-gradient-to-r from-green-600 to-emerald-600 px-3 py-2 text-sm font-medium text-white">
                          Upgrade now
                        </div>
                      )}

                      <div className="p-5">
                        <h3 className="my-3 dark:text-black text-center font-display text-3xl font-bold">
                          {plan}
                        </h3>
                        <p className="text-gray-500">{tagline}</p>
                        <p className="my-5 font-display text-6xl dark:text-green-500 font-semibold">
                          ${amount}
                        </p>
                        <p className="text-gray-500">{interval}</p>
                      </div>

                      <div className="flex h-20 items-center justify-center border-b border-t border-gray-200 bg-gray-50">
                        <div className="flex items-center space-x-1">
                          <p className="dark:text-zinc-400">
                            {positions.toLocaleString()} Stocks Allowed
                          </p>

                          <Tooltip delayDuration={300}>
                            <TooltipTrigger className="cursor-default ml-1.5">
                              <HelpCircle className="h-4 w-4 text-zinc-500" />
                              <TooltipContent className="w-80 p-2">
                                How many positions you can add to your portfolio.
                              </TooltipContent>
                            </TooltipTrigger>
                          </Tooltip>
                        </div>
                      </div>

                      <ul className="my-10 space-y-5 px-8">
                        {features.map(({ text, footnote, negative }) => (
                          <li key={text} className="flex space-x-5">
                            <div className="flex-shrink-0">
                              {negative ? (
                                <Minus className="h-6 w-6 text-gray-300" />
                              ) : (
                                <Check className="h-6 w-6 text-green-500" />
                              )}
                            </div>
                            {footnote ? (
                              <div className="flex items-center space-x-1">
                                <p
                                  className={cn("text-gray-400", {
                                    "text-gray-600": negative,
                                  })}
                                >
                                  {text}
                                </p>
                                <Tooltip delayDuration={300}>
                                  <TooltipTrigger className="cursor-default ml-1.5">
                                    <HelpCircle className="h-4 w-4 text-zinc-500" />
                                    <TooltipContent className="w-80 p-2">
                                      {footnote}
                                    </TooltipContent>
                                  </TooltipTrigger>
                                </Tooltip>
                              </div>
                            ) : (
                              <p
                                className={cn("text-gray-400", {
                                  "text-gray-600": negative,
                                })}
                              >
                                {text}
                              </p>
                            )}
                          </li>
                        ))}
                      </ul>
                      <div className="border-t border-gray-200" />
                      <div className="p-5">
                        {plan === "Free" ? (
                          <Link
                            href={user ? "/dashboard" : "/sign-in"}
                            className={buttonVariants({
                              className: "w-full",
                              variant: "secondary",
                            })}
                          >
                            {user ? "Upgrade Now" : "Sign up"}
                            <ArrowRight className="h-5 w-5 ml-1.5" />
                          </Link>
                        ) : user ? (
                          <UpgradeButton />
                        ) : (
                          <Link
                            href={"/sign-in"}
                            className={buttonVariants({ className: "w-full" })}
                          >
                            {user ? "Upgrade Now" : "Sign up"}
                            <ArrowRight className="h-5 w-5 ml-1.5" />
                          </Link>
                        )}
                      </div>
                    </div>
                  );
                }
              )}
            </TooltipProvider>
          </div>
        </MaxWidthWrapper>
      </>
  );
}