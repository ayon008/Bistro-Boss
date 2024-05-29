import Lottie from "lottie-react";
import errorElement from "../../assets/Animation - 1716893441793.json";
const Error = () => {
    return (
        <div className="h-screen flex flex-col">
            <Lottie className="w-[600px] h-[600px] m-auto" animationData={errorElement} loop={true} />
        </div>
    );
};

export default Error;