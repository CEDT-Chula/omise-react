"use client"
import { useState,useEffect } from 'react';
import type  {
    OmiseReactArgs,
    OmiseInstance,
    CreateTokenFunc,
    CreateSourceFunc,
    CreateTokenPromiseType,
    CreateSourcePromiseType,
} from '../types';
import { OmiseReactScript } from './omiseReactScript';

export const checkCreateError : OmiseInstance['checkCreateError'] = (status,response) => {
    if(status === 200){
        return null;
    }
    if(response.card && !response.card.security_code_check){
        return "Incorrect security code";
    }
    if(response.object === 'error'){
        return response.message;
    }
    return 'Unknown error';
};

export const OmiseReact = ({
    publicKey,
    scriptType,
} : OmiseReactArgs) : OmiseInstance => {
    const [
        CreateTokenFn,
        setCreateTokenFn,
    ] = useState<CreateTokenFunc | null>(null);
  const [
    createSourceFn,
    setCreateSourceFn,
  ] = useState<CreateSourceFunc | null>(null);
  const [
    createTokenPromiseFn,
    setCreateTokenPromiseFn,
  ] = useState<CreateTokenPromiseType | null>(null);
  const [
    createSourcePromiseFn,
    setCreateSourcePromiseFn,
  ] = useState<CreateSourcePromiseType| null>(null);
  const [loadingScript, errorLoadingScript] = OmiseReactScript(scriptType);

  useEffect(() => {
    if (window.Omise) {
      window.Omise.setPublicKey(publicKey);
    }
  }, [publicKey, loadingScript]);

  useEffect(() => {
    if (window.Omise) {
      const { Omise } = window;
      const omiseCreateToken: CreateTokenFunc = Omise.createToken.bind(
        Omise
      );
      const omiseCreateSource: CreateSourceFunc = Omise.createSource.bind(
        Omise
      );

      const createToken = () => omiseCreateToken;
      const createSource = () => omiseCreateSource;

      // Promisify the original createToken function.
      const createTokenPromise = (): CreateTokenPromiseType => {
        return (as, attributes) => {
          return new Promise((resolve, reject) => {
            omiseCreateToken(as, attributes, (status, response) => {
              const hasError = checkCreateError(status, response);
              if (hasError) {
                reject(response);
              } else {
                resolve(response?.id);
              }
            });
          });
        };
      };

      // Promisify the original createSource function.
      const createSourcePromise = (): CreateSourcePromiseType => {
        return (type, attributes) => {
          return new Promise((resolve, reject) => {
            omiseCreateSource(type, attributes, (status, response) => {
              if (status !== 200) {
                reject(response);
              } else {
                resolve(response?.id);
              }
            });
          });
        };
      };

      setCreateTokenFn(createToken);
      setCreateSourceFn(createSource);
      setCreateTokenPromiseFn(createTokenPromise);
      setCreateSourcePromiseFn(createSourcePromise);
    }
  }, [loadingScript]);

  return {
    loading: loadingScript,
    loadingError: errorLoadingScript,
    createToken: CreateTokenFn,
    createTokenPromise: createTokenPromiseFn,
    createSourcePromise: createSourcePromiseFn,
    checkCreateError,
    createSource: createSourceFn,
  };
};
