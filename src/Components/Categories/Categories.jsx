import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from 'swiper/modules';
import "swiper/css";
import "swiper/css/pagination";
import img1 from '../../assets/home/slide1.jpg';
import img2 from '../../assets/home/slide2.jpg';
import img3 from '../../assets/home/slide3.jpg';
import img4 from '../../assets/home/slide4.jpg';
import img5 from '../../assets/home/slide5.jpg';

const Categories = () => {
    return (
        <Swiper
            spaceBetween={20}
            slidesPerView={4}
            autoplay={{ delay: 1500 }}
            pagination={{ clickable: true, dynamicBullets: true }}
            modules={[Pagination, Autoplay]}
            className="mySwiper mb-24"
            breakpoints={{
                320: {
                    slidesPerView: 1,
                    spaceBetween: 10,
                },
                640: {
                    slidesPerView: 2,
                    spaceBetween: 10,
                },
                768: {
                    slidesPerView: 3,
                    spaceBetween: 15,
                },
                1024: {
                    slidesPerView: 4,
                    spaceBetween: 20,
                },
            }}
        >
            <SwiperSlide className="relative">
                <img src={img1} alt="Salads" className="w-full h-full object-cover" />
                <h3 className="text-2xl md:text-4xl uppercase absolute bottom-6 left-1/2 transform -translate-x-1/2 text-white Cinzel">Salads</h3>
            </SwiperSlide>
            <SwiperSlide className="relative">
                <img src={img2} alt="Pizzas" className="w-full h-full object-cover" />
                <h3 className="text-2xl md:text-4xl uppercase absolute bottom-6 left-1/2 transform -translate-x-1/2 text-white Cinzel">Pizzas</h3>
            </SwiperSlide>
            <SwiperSlide className="relative">
                <img src={img3} alt="Soups" className="w-full h-full object-cover" />
                <h3 className="text-2xl md:text-4xl uppercase absolute bottom-6 left-1/2 transform -translate-x-1/2 text-white Cinzel">Soups</h3>
            </SwiperSlide>
            <SwiperSlide className="relative">
                <img src={img4} alt="Desserts" className="w-full h-full object-cover" />
                <h3 className="text-2xl md:text-4xl uppercase absolute bottom-6 left-1/2 transform -translate-x-1/2 text-white Cinzel">Desserts</h3>
            </SwiperSlide>
            <SwiperSlide className="relative">
                <img src={img5} alt="Salads" className="w-full h-full object-cover" />
                <h3 className="text-2xl md:text-4xl uppercase absolute bottom-6 left-1/2 transform -translate-x-1/2 text-white Cinzel">Salads</h3>
            </SwiperSlide>
        </Swiper>
    );
};

export default Categories;
