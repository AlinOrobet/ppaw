import Stripe from "stripe";
import {stripe} from "@/lib/stripe";
import {currentUser} from "@/lib/auth";
import {NextResponse} from "next/server";
import {createStripeCustomer, getStripeCustomerByUserId} from "@/model/stripe-customer";

export async function POST(req: Request, {params}: {params: {userId: string}}) {
  try {
    const user = await currentUser();
    if (!user || !user.id || !user.email || params.userId !== user.id) {
      return new NextResponse("Unauthorized", {status: 401});
    }
    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [
      {
        quantity: 1,
        price_data: {
          currency: "RON",
          product_data: {
            name: "Subscriptie ppaw",
            description: `Mai multe documente (current - ${user.documentsCount})`,
          },
          unit_amount: 10000 * (user.documentsCount / 3),
        },
      },
    ];
    let stripeCustomer = await getStripeCustomerByUserId(user.id);
    if (!stripeCustomer) {
      const customer = await stripe.customers.create({
        email: user.email,
      });
      stripeCustomer = await createStripeCustomer({userId: user.id, stripeCustomerId: customer.id});
    }
    const session = await stripe.checkout.sessions.create({
      customer: stripeCustomer.stripeCustomerId,
      line_items,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/subscription?success=1`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/subscription?canceled=1`,
      metadata: {
        userId: user.id,
        currentDocCount: user.documentsCount,
      },
    });

    return NextResponse.json({url: session.url});
  } catch (error) {
    console.log("[USER_ID_SUBSCRIPTION]_POST", error);
    return new NextResponse("Internal error", {status: 500});
  }
}
