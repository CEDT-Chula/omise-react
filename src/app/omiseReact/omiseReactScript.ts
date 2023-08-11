import {useState,useEffect} from 'react';
import type { ScriptTypes } from "../types";
import { ScriptElementKind } from "typescript";

export const OMISE_SCRIPTS : {
    [key in ScriptTypes] : string;
} = {
    primary: 'https://cdn.omise.co/omise.js',
    secondary: 'https://cdn2.omise.co/omise.js',
};

const IsBrowser = typeof window !== 'undefined';

const HasExistingScript = (src : string) : boolean => {
    const existingScript : NodeListOf<Element> = document.querySelectorAll(
        `script[src="${src}"]`
    );
    return existingScript.length > 0;
}

export const OmiseReactScript = (
    scriptType : ScriptTypes = 'primary'
) : boolean[] => {
    const [loading,setLoading] = useState<boolean>(false);
    const [loadingError,setLoadingError] = useState<boolean>(false);

    const scriptsrc: string = OMISE_SCRIPTS[scriptType];

    useEffect(() => {
        const hasExistingScript = HasExistingScript(scriptsrc);
        if(!IsBrowser || hasExistingScript){
            return;
        }
        setLoading(true);
        const scriptEle : HTMLElement = document.createElement('script');
        scriptEle.setAttribute('src',scriptsrc);
        scriptEle.setAttribute('type','text/javascript');

        const handleLoad = () => setLoading(false);
        const handleError = ()  => {
            setLoading(false);
            setLoadingError(true);
            scriptEle.remove();
        }

        scriptEle.addEventListener('load',handleLoad);
        scriptEle.addEventListener('error',handleError);

        document.body.appendChild(scriptEle);

        return () => {
            scriptEle.removeEventListener('load',handleLoad);
            scriptEle.removeEventListener('error',handleError);
        };
    },[]);
    return[loading,loadingError];
};