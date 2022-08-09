import Stripe from "stripe";
import {
  PaymentRequestButtonElement,
  useStripe,
} from "@stripe/react-stripe-js";

const stripe = new Stripe(`${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`);

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create({
        submit_type: "pay",
        mode: "payment",
        allow_promotion_codes: true,
        // payment_method_types: ["card"],
        // customer: stripeId,
        shipping_address_collection: {
          allowed_countries: ["US", "IN"],
        },
        allow_promotion_codes: true,
        line_items: req.body.map((item) => {
          return {
            price_data: {
              currency: "INR",
              product_data: {
                name: item.title,
                images: [item.image.data.attributes.formats.thumbnail.url],
              },
              unit_amount: item.price * 100,
            },
            adjustable_quantity: {
              enabled: true,
              minimum: 1,
            },
            quantity: item.quantity,
          };
        }),

        //bring people to the success or failed page
        success_url: `${req.headers.origin}/success?&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/canceled`,
      });
      res.status(200).json({ session });
    } catch (error) {
      res.status(error.statusCode || 500).json(error.message);
    }
  }
}
