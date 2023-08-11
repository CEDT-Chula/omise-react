"use client"
import Script from "next/script"
import PaymentForm from "./Paymentform";

let OmiseCard: { configure: (arg0: { publicKey: string; }) => void; open: (arg0: {}) => void; };

export default function CreditCard() {
    const handleLoad = () => {
      console.log(window.OmiseCard)
      OmiseCard = window.OmiseCard;
      OmiseCard.configure({
        publicKey: "pkey_test_5wpoyrflqtv7mg1wt9c",
        currency: "THB",
        frameLabel: "Merchant name",
        frameDescription: "Merchant description",
        submitLabel: "PAY NOW",
        buttonlabel: "Pay with Omise",
        });
    }
    const OnClickHandler = (event: { preventDefault: any; }) => {
        event?.preventDefault();
        OmiseCard.open({
            amount: 12345,
            defaultPaymentMethod	: "credit_card",
            otherPaymentMethods: ["promptpay","googlepay"],
            onCreateTokenSuccess: (nonce: any) => {
                console.log(nonce);
            }
        })
    }

  return (
      <div>
      <div className = "own-form">
        <Script src='https://cdn.omise.co/omise.js.gz' type="text/javascript" onLoad={handleLoad}></Script>
        <form>
          <button type = "button" className='btn' onClick = {OnClickHandler}>
            Pay with Omise
          </button>
        </form>
      </div>
      <PaymentForm></PaymentForm>
      </div>
   )
  }
  