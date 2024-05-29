import image from '../../assets/menu/banner3.jpg'
import Cover from '../../Components/Cover/Cover';
import MenuItems from '../../Components/MenuItems/MenuItems';
import SectionTitles from '../../Components/SectionTitles/SectionTitles';
import dessert from '../../assets/menu/dessert-bg.jpeg'
import pizza from '../../assets/menu/pizza-bg.jpg'
import salad from '../../assets/menu/salad-bg.jpg'
import soup from '../../assets/menu/soup-bg.jpg'

const OurMenu = () => {
    const items = ['dessert', 'pizza', 'salad', 'soup'];
    const itemImage = [dessert, pizza, salad, soup];
    return (
        <div className='max-w-screen-xl mx-auto'>
            <Cover img={image} title={"OUR MENU"}></Cover>
            <div className='md:px-24 px-6 my-20'>
                <SectionTitles heading={"Don't miss"} subHeading={"TODAY'S OFFER"}></SectionTitles>
                <MenuItems btnName={"ORDER YOUR FAVOURITE FOOD"} url={"https://bistro-boss-server-three-liart.vercel.app/menupopular"} link={'/shop'}></MenuItems>
            </div>
            {
                items.map((item, i) => {
                    return (
                        <div key={i}>
                            <Cover img={itemImage[i]} title={item}></Cover>
                            <div className="md:px-24 px-6">
                                <MenuItems btnName={item} url={`https://bistro-boss-server-three-liart.vercel.app/menu${item}`} link={`/order/${item}`} item={item}></MenuItems>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    );
};

export default OurMenu;