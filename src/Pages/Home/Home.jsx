import chefService from '../../assets/home/chef-service.jpg'
import Banner from '../../Components/Banner/Banner';
import SectionTitles from '../../Components/SectionTitles/SectionTitles';
import Categories from '../../Components/Categories/Categories';
import ItemSection from '../../Components/ItemSection/ItemSection';
import MenuItems from '../../Components/MenuItems/MenuItems';
import useFetch from '../../Hooks/useFetch';
import FoodCard from '../../Components/Foodcard/FoodCard';
import HomeParrallax from '../../Components/HomeParrallex/HomeParrallax';
import Testimonial from '../../Components/Testimonial/Testimonial';

const Home = () => {
    const { data } = useFetch('http://localhost:5000/menu');
    return (
        <div className='max-w-screen-xl mx-auto'>
            <Banner />
            <div className='md:px-24 px-6'>
                <SectionTitles subHeading={'From 11:00am to 10:00pm'} heading={'ORDER ONLINE'} />
                <Categories />
                <ItemSection image={chefService} heading={'bistro boss'}></ItemSection>
                <SectionTitles subHeading={'Check it out'} heading={'FROM OUR MENU'} />
                <MenuItems btnName={'View full Menu'} url={"http://localhost:5000/menu//popular"} link={'/menu'}></MenuItems>
                <div className='bg-black md:my-16 my-8'>
                    <h2 className='md:text-3xl text-sm font-bold text-center text-white p-16 Raleway'>Call Us: +88 0192345678910</h2>
                </div>
                <SectionTitles subHeading={'Should Try'} heading={'CHEF RECOMMENDS'} />
                <div className='grid md:grid-cols-3 grid-cols-1 gap-6'>
                    {
                        data?.slice(0, 3).map(d => <FoodCard key={d?._id} data={d}></FoodCard>)
                    }
                </div>
            </div>
            <HomeParrallax></HomeParrallax>
            <div className="md:px-24 px-6">
                <Testimonial></Testimonial>
            </div>
        </div>
    );
};

export default Home;