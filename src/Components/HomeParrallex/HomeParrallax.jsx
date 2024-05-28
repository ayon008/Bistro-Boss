import bgImage from '../../assets/home/featured.jpg';
import SectionTitles from '../SectionTitles/SectionTitles';
import '../HomeParrallex/HomeParrallax.css';

const HomeParrallax = () => {
    return (
        <div className='md:h-[620px] h-auto w-full my-20 feature'>
            <div className='h-full w-full flex'>
                <div className='text-white w-full h-fit'>
                    <SectionTitles subHeading="check it out" heading="Featured Item" ></SectionTitles>
                    <div className='flex md:flex-row flex-col items-center gap-6 w-3/4 mx-auto pb-10'>
                        <div>
                            <img src={bgImage} alt="" />
                        </div>
                        <div className=''>
                            <div>
                                <h5 className='text-xl'>March 20, 2023 <br />
                                    WHERE CAN I GET SOME?
                                </h5>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. A odio ipsum doloribus voluptate suscipit aspernatur alias quisquam, optio nobis autem voluptates minus vel molestiae blanditiis enim quae officiis accusamus obcaecati.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeParrallax;