const ItemSection = ({ image, heading }) => {
    return (
        <div className="relative">
            <img src={image} className="md:h-auto h-[200px] w-full" alt="" />
            <div className="text-center w-3/4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white md:py-10 md:px-16 p-4 space-y-2">
                <h3 className="uppercase Cinzel md:text-3xl text-sm text-center">{heading}</h3>
                <p className="md:block hidden">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis repudiandae assumenda debitis asperiores esse. Quisquam officia magni, odit eligendi assumenda et cupiditate dicta iure! Mollitia optio vel eligendi voluptas accusamus?</p>
            </div>
        </div>
    );
};

export default ItemSection;