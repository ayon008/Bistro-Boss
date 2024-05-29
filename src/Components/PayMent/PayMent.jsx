import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import SectionTitles from "../SectionTitles/SectionTitles";
import CheckoutForm from '../StripeContainer/StripeContainer.jsx'

// TODO: add publishable key
const stripePromise = loadStripe('pk_test_51PBVoLRpKZBTemtIioRu0MG9srbyUguVidzEO6xZhXaqbIudyHdhH7yo7EuRGvv6cIH5KGRuzTqyHJS775M6KtWx00j3tzBa4X');
const Payment = () => {
    return (
        <div className="w-full md:px-24 px-6 mt-10">
            <SectionTitles heading="Payment" subHeading="Please pay to eat"></SectionTitles>
            <div>
                <Elements stripe={stripePromise}>
                    <CheckoutForm></CheckoutForm>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;