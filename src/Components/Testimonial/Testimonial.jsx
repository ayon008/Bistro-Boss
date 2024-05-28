import SectionTitles from '../SectionTitles/SectionTitles';
import useFetch from '../../Hooks/useFetch';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Rating } from "@smastrom/react-rating";
import '@smastrom/react-rating/style.css'
import { FaQuoteLeft } from 'react-icons/fa';

const Testimonial = () => {
    const { data } = useFetch("http://localhost:5000/reviews");
    return (
        <div>
            <SectionTitles
                subHeading="What Our Client Say"
                heading={'Testimonials'}
            ></SectionTitles>
            <Swiper
                navigation={true}
                modules={[Navigation]}
                className="mySwiper"
            >
                {
                    data?.map(d => {
                        return (
                            <SwiperSlide key={d._id}>
                                <div className='text-center w-3/4 mx-auto space-y-4'>
                                    <Rating
                                        value={d.rating}
                                        readOnly
                                        style={{ maxWidth: 180 }}
                                        className='mx-auto'
                                    />
                                    <FaQuoteLeft className='mx-auto mt-4' size={"5rem"} />
                                    <p className="py-8">{d.details}</p>
                                    <h3 className="text-2xl text-orange-400">{d.name}</h3>
                                </div>
                            </SwiperSlide>
                        )
                    })
                }
            </Swiper>
        </div>
    );
};

export default Testimonial;