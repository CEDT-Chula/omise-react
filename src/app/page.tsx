'use client'
import Image from 'next/image'
import { OmiseReact } from './omiseReact/omiseReact';
import Script from 'next/script';
import CreditCard from './Example/CreditCardForm';
import { useEffect } from 'react';
import PaymentForm from './Example/Paymentform';

export default function MyApp() {

  return   (<div><PaymentForm></PaymentForm>
  <CreditCard></CreditCard></div>)  
}
