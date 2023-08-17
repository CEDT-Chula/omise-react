"use client";
// @ts-ignore
import Script from "react-load-script";
import React, { useEffect, useState } from "react";

// @ts-ignore
let OmiseCard;

interface OmiseCreditFormProps {
  className?: string;
  currency?: string;
  frameLabel?: string;
  submitLabel?: string;
  buttonLabel?: string;
  onCreateTokenSuccess: (token: string) => void;
}

export default function OmiseCreditForm(props: OmiseCreditFormProps) {
  const handleLoadScript = () => {
    // @ts-ignore
    OmiseCard = window.OmiseCard;
    OmiseCard.configure({
      // exposed to public, configured in next.config.js
      publicKey: process.env.OMISE_PUBLIC_CLIENT_KEY,
      currency: "THB",
      frameLabel: "PreceptorAI",
      submitLabel: "Pay NOW",
      buttonLabel: "Pay with Omise",
    });
  };

  const creditCardConfigure = () => {
    // @ts-ignore
    OmiseCard.configure({
      defaultPaymentMethod: "credit_card",
      otherPaymentMethods: [],
    });
    // @ts-ignore
    OmiseCard.configureButton("#credit-card");
    // @ts-ignore
    OmiseCard.attach();
  };

  const OmiseCardHandler = () => {
    // @ts-ignore
    OmiseCard.open({
      amount: "30000",
      onCreateTokenSuccess: (token: string) => {
        props.onCreateTokenSuccess(token);
      },
      onFormClosed: () => {},
    });
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    creditCardConfigure();
    OmiseCardHandler();
  };

  return (
    <div className="own-form">
      <Script url="https://cdn.omise.co/omise.js" onLoad={handleLoadScript} />{" "}
      <form>
        <button
          id="credit-card"
          className={
            "cursor-pointer px-12 py-4 bg-blue-500 hover:bg-blue-400 text-white font-bold border-b-4 border-blue-700 hover:border-blue-500 rounded" +
            props.className
          }
          onClick={handleClick}
        >
          ชำระเงินด้วยบัตรเครดิต{" "}
        </button>{" "}
      </form>{" "}
    </div>
  );
}
