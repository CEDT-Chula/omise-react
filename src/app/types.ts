declare global {
    interface Window {
        Omise : any;
    }
}

export type ScriptTypes = 'primary' | 'secondary';

export interface OmiseReactArgs {
    publicKey : string;
    scriptType? : ScriptTypes;
}


// Token/Source Params 
export type CreateTokenAsTypes = 'card';
type TokenParams = Record<string , string | number>;
type SourceParams = Record<string,string | number>;

export type CreateHandler = (
    status : number,
    response : Record<string,string>
) => void;

export type CreateTokenFunc = (
    type : CreateTokenAsTypes,
    tokenParams : TokenParams,
    handler : CreateHandler,
) => void;

export type CreateSourceFunc = (
    type : string,
    sourceParams : SourceParams,
    handler : CreateHandler,
) => void;

export type CreateTokenPromiseType = (
    type : CreateTokenAsTypes,
    tokenParams : TokenParams,
) => Promise<string>;

export type CreateSourcePromiseType = (
    type : string,
    sourceParams : SourceParams,
) => Promise<string>;

export type CardFormValueType = (
    name: string,
    number: string,
    security_code: string,
    expiration_month: string,
    expiration_year: string
) => void;



export interface OmiseInstance {
    loading : boolean;
    loadingError : boolean;
    createToken : CreateTokenFunc | null;
    createSource : CreateSourceFunc | null;
    createTokenPromise : CreateTokenPromiseType | null;
    createSourcePromise : CreateSourcePromiseType | null;
    checkCreateError : (
        status : number,
        response : Record<string,any>
    ) => string | null;
}