import { API_VERSION } from "@clerk/nextjs/dist/types/server"
import { useStripe } from "@stripe/react-stripe-js"
import { Stripe } from "@stripe/stripe-js"
import { NextResponse } from "next/server";


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
        typescript: true,  
        API_VERSION:'2023-10-16'
})
 

export async function POST(request:any){
    const data:any=await request.json();
    const amount= data.amount;

    try{
        const paymentIntent=await stripe.paymentIntents.create({
            amount:Number(amount)*100,
            currency:'USD'
        });
            return NextResponse.json(paymentIntent.client_secret, {status:200});
    }
    catch(e:any){
        return new NextResponse(e, {
            status:400
        })
    }
}