"use client"


export default function TestForm(props:any){

    const data11 ={
        name: "Example card holder",
        number: "4242424242424242",
        security_code: "111",
        expiration_month: "06",
        expiration_year: "2020"
      }
    return (
        <div>
            <form >
            <button type = "button" className='btn' onClick={props.handleSubmit(data11)}>
            Pay with Omise
            </button>
            </form>
        </div>
    )
}