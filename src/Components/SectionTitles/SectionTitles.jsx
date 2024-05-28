import React from 'react';

const SectionTitles = ({ heading, subHeading }) => {
    return (
        <div className="mx-auto text-center md:w-4/12 mb-8 mt-16">
            <i className="text-yellow-600 mb-2 block md:text-lg text-base">--- {subHeading} ---</i>
            <h3 className="text-3xl md:text-4xl uppercase border-y-4 py-4">{heading}</h3>
        </div>
    );
};

export default SectionTitles;
