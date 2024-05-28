import { Parallax } from 'react-parallax';

const Cover = ({ img, title }) => {
    return (
        <Parallax
            blur={{ min: -15, max: 15 }}
            bgImage={img}
            bgImageAlt="the dog"
            strength={-200}
        >
            <div className='h-[400px] md:h-[500px] lg:h-[600px] relative'>
                <div className="hero-content text-center z-30 text-white h-full Cinzel">
                    <div className="w-11/12 md:w-3/4 lg:w-2/3 p-6 md:p-10 lg:p-16 m-auto bg-[#15151599]">
                        <h1 className="mb-5 text-3xl md:text-4xl lg:text-5xl font-bold uppercase">{title}</h1>
                        <p className="mb-5 text-sm md:text-base lg:text-lg">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    </div>
                </div>
            </div>
        </Parallax>
    );
};

export default Cover;
