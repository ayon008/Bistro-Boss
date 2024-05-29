import { Oval } from 'react-loader-spinner';

const Loader = () => {
    const spinnerSize = 80; // Match this to the font size
    const strokeWidth = 5; // Increase this for a bolder look

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 backdrop-blur-lg z-50">
            <div className="flex items-center space-x-2 text-8xl font-bold text-neutral-900">
                <span>L</span>
                <Oval
                    height={spinnerSize}
                    width={spinnerSize}
                    color="#4fa94d"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                    ariaLabel='oval-loading'
                    secondaryColor="#4fa94d"
                    strokeWidth={strokeWidth}
                    strokeWidthSecondary={strokeWidth}
                />
                <span>ading...</span>
            </div>
        </div>
    );
};

export default Loader;
