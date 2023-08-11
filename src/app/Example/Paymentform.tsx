import TestForm from "../TestForm";
import { OmiseReact, } from "../omiseReact/omiseReact";
import type  {
    OmiseReactArgs,
    OmiseInstance,
    CreateTokenFunc,
    CreateSourceFunc,
    CreateTokenPromiseType,
    CreateSourcePromiseType,
    CardFormValueType,
} from '../types';

export default function PaymentForm() {
    const { loading, createTokenPromise ,createToken} = OmiseReact({
      publicKey: 'YOUR-OMISE-PUBLIC-KEY',
    });
  
    if (loading) return <div>Loading OmiseJS...</div>;
  
    const handleSubmit = async (cardFormValues:CardFormValueType) => {
        console.log(111);
      try {
        const token = await createTokenPromise('card', cardFormValues);
        // Send the token to your server to create a charge
        console.log(token);
      } catch (error) {
        // Handle error on the UI
      }
    };
  
    return <TestForm handleSubmit={handleSubmit} />;
  }