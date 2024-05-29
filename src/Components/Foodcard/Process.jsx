import { Oval } from 'react-loader-spinner';

const Process = ({ height = 80, width = 80, color = "#4fa94d" }) => {
    const loaderStyle = {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 9999,
        backgroundColor: 'rgba(255, 255, 255, 0.8)', // Adjust the background color and opacity as needed
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
    };

    return (
        <div style={loaderStyle}>
            <Oval
                height={height}
                width={width}
                color={color}
                visible={true}
                ariaLabel='oval-loading'
                secondaryColor={color}
                strokeWidth={2}
                strokeWidthSecondary={2}
            />
        </div>
    );
};

export default Process;
