import { useEffect, useState } from "react";
import Cover from "../../Components/Cover/Cover";
import TabContent from "../../Components/TabContent/TabContent";
import image from '../../assets/shop/banner2.jpg'
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import 'react-tabs/style/react-tabs.css';
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";

const OurShop = () => {
    const categoryList = ['soup', 'pizza', 'dessert', 'salad', 'offered', 'popular', 'drinks'];
    const category = useParams();
    console.log(category.category);
    const initialIndex = categoryList.indexOf(category.category) < 0 ? 0 : categoryList.indexOf(category.category);
    const [tabIndex, setTabIndex] = useState(initialIndex);
    return (
        <div className="max-w-screen-xl mx-auto">
            <Helmet>
                <title>Shop</title>
            </Helmet>
            <Cover img={image} title={"OUR SHOP"}></Cover>
            <div className="mt-10">
                <Tabs className={'w-full'} selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                    <TabList className={'w-fit mx-auto font-bold flex items-center md:flex-nowrap flex-wrap justify-center text-center gap-10'}>
                        {
                            categoryList.map((c, i) => {
                                return (
                                    <Tab key={i} selectedClassName={"text-[#BB8506] border-b-4 border-[#BB8506]"} className={'uppercase pb-2'}>{c}</Tab>
                                )
                            })
                        }
                    </TabList>
                    {
                        categoryList.map((c, i) => {
                            return (
                                <TabPanel key={i} className={'w-full mt-20'}>
                                    <TabContent category={c}></TabContent>
                                </TabPanel>
                            )
                        })
                    }
                </Tabs>

            </div>
        </div>
    )
};

export default OurShop;