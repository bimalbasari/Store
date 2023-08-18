
import Head from "next/head"
import { BiRupee } from "react-icons/bi";
import { useForm } from "react-hook-form"
import { Country, State, City } from 'country-state-city';
import { Breadcrump } from "@/components/breadcrump/Breadcrump"
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import jsCookie from "js-cookie";
import Cookies from "js-cookie";


const Checkout = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [cartItems, setCartItems] = useState(1)
    const [bill, setBill] = useState("")
    const conutry = Country.getAllCountries()
    const myCountry = watch('country')?.slice(0, 2).toUpperCase()
    const MyStates = State.getStatesOfCountry(myCountry)
    const router = useRouter()
    const { buyAll, yourCart } = router.query

    const onSubmit = data => {
        if (buyAll) { Cookies.remove("cartItems") }
        router.push({
            pathname: "/thank-you",
            query: {
                cart: JSON.stringify(cartItems)
            }
        })
    }

    useEffect(() => {

        if (buyAll===true) {
            console.log(yourCart)
            setBill(JSON.parse(yourCart));
            setCartItems()

        } else {
            console.log(yourCart)
            const product = JSON.parse(yourCart)
            const gstAmount = (product.price * 20) / 100;
            setBill({
                subTotal: product.price,
                gstAmount: gstAmount,
                grandTotal: product.price + gstAmount
            })

        }

    }, [])


    return (
        <>
            <Head>
                <title>Checkout</title>
            </Head>
            <Breadcrump title="Checkout" />
            <form className="grid gap-3 grid-cols-6" onSubmit={handleSubmit(onSubmit)} >

                <div className="grid gap-2 grid-cols-6 sm:col-span-4 col-span-6  bg-blue-100 p-2 font-medium text-gray-500 rounded">
                    <div className="sm:col-span-3 col-span-6 flex flex-col">
                        {errors.firstName && <small className="text-red-600 rounded-md absolute bg-white p-1">First name require </small>}
                        <label className="py-2" >First name</label>
                        <input type="text" className=" border border-current px-1 rounded outline-none" id="firstName" {...register("firstName", { required: true })} />
                    </div>
                    <div className="sm:col-span-3 col-span-6 flex flex-col">
                        {errors.lastName && <small className="text-red-600 rounded-md absolute bg-white p-1">Last name require </small>}
                        <label className="py-2">Last name</label>
                        <input type="text" className=" border border-current px-1 rounded outline-none" id="lastName" {...register("lastName", { required: true })} />
                    </div>
                    <div className="col-span-6 flex flex-col">
                        {errors.mobile && <small className="text-red-600 rounded-md absolute bg-white p-1">valid 10 digit mobile number required </small>}
                        <label className="py-2">Mobile</label>
                        <input type="tel" className=" border border-current px-1 rounded outline-none" placeholder="+91" id="mobile" {...register("mobile", { required: true })} />
                    </div>
                    <div className="col-span-6 flex flex-col">
                        {errors.email && <small className="text-red-600 rounded-md absolute bg-white p-1">Enter a valid Email </small>}
                        <label className="py-2">Email</label>
                        <input type="email" className=" border border-current px-1 rounded outline-none" placeholder="abc@example.com" id="email" {...register("email", { required: true })} />
                    </div>
                    <div className="col-span-6 flex flex-col">
                        {errors.address && <small className="text-red-600 rounded-md absolute bg-white p-1">Adress is  require </small>}
                        <label className="py-2">Address </label>
                        <input type="text" className=" border border-current px-1 rounded outline-none" placeholder="Apartment, studio, or floor" id="address" {...register("address", { required: true })} />
                    </div>
                    <div className="col-span-6 flex flex-col">
                        {errors.landmark && <small className="text-red-600 rounded-md absolute bg-white p-1">Landmrk is require </small>}
                        <label className="py-2">Landmark</label>
                        <input type="text" className=" border border-current px-1 rounded outline-none" placeholder="Near" id="landmark" {...register("landmark", { required: true })} />
                    </div>

                    <div className="col-span-6 sm:col-span-2 flex flex-col w-full">
                        {errors.country && <small className="text-red-600 rounded-md absolute bg-white p-1">Country is require </small>}
                        <label className="py-2">Country</label>
                        <select className=" border border-current px-1 rounded outline-none" name="country"  {...register("country", { required: true })}>
                            <option value="">Choose...</option>
                            {conutry.map(e => <option key={e.name} value={e.name}>{e.name}</option>)}

                        </select>
                    </div>
                    <div className="col-span-6 sm:col-span-2 flex flex-col">
                        {errors.state && <small className="text-red-600 absolute rounded-md bg-white p-1 ">State is  require </small>}
                        <label className="py-2">State</label>
                        <select className=" border border-current px-1 rounded outline-none" name="state" {...register("state", { required: true })}>
                            <option value="">Choose...</option>
                            {MyStates?.map((e) => (
                                <option key={e.name} value={e.name}>{e.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-span-6 sm:col-span-2 flex flex-col">
                        {errors.zip && <small className="text-red-600 rounded-md absolute bg-white p-1">Zip code is require </small>}
                        <label className="py-2">Zip</label>
                        <input type="number" className=" border border-current px-1 rounded outline-none" id="zip" {...register("zip", { required: true })} />
                    </div>

                    <div className="col-span-6  p-2  my-2 bg-white rounded">
                        {errors.paymentMathod && <small className="text-red-600 rounded-md absolute bg-white p-1">Select a payment mathod </small>}
                        <h4>Payment</h4>
                        <input type="radio" value="cod" name="paymentMathod" {...register("paymentMathod", { required: true })} />
                        <label className="mx-1">Cash on Delivery</label>
                    </div>

                </div>
                <div className="sm:col-span-2 col-span-6 flex flex-col" >
                    <h4 className="text-blue-400 font-semibold text-xl py-2"><span>Your Cart</span> <span></span></h4>

                    <div>
                        <ul className="rounded overflow-hidden  border border-gray-200">
                            <li className="flex justify-between  p-1 border-b border-gray-200 ">
                                <div className="flex items-center text-sm">Subtotal (<BiRupee />)</div>
                                <strong>{bill?.subTotal}</strong>
                            </li>
                            <li className="flex justify-between  p-1  border-b border-gray-200 ">
                                <div className="flex items-center text-sm">GST 20% (<BiRupee />)</div>
                                <strong>{bill?.gstAmount}</strong>
                            </li>
                            <li className="flex justify-between  p-1 border-b border-gray-200 ">
                                <div className="flex items-center text-sm">Total (<BiRupee />)</div>
                                <strong>{bill?.grandTotal}</strong>
                            </li>
                        </ul>
                        <div className="border border-gray-200 p-1 rounded my-2">
                            <button type="submit" className="p-1 w-full text-white font-semibold text-center bg-blue-500 rounded">Order Place</button>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}

export default Checkout