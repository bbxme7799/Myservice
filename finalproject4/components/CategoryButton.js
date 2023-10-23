import React from "react";
import Image from "next/image";

const CategoryButton = ({ name, image, onClick }) => (
  <div className="bg-gray-100 flex-grow-0 overflow-hidden lg:flex-[calc((96.5%-12px)/5)] md:flex-[calc((96.5%-12px)/4)] sm:flex-[calc((96.5%-12px)/2)] rounded-md">
    <button
      onClick={onClick}
      className="w-full h-full text-sm py-2 px-3 bg-white hover:bg-gray-200 transition-colors duration-200 rounded-md"
    >
      <div className="flex items-center">
        <Image
          src={image}
          alt={name}
          width={30} // Set the width to the desired size (e.g., 30px)
          height={30} // Set the height to the desired size (e.g., 30px)
          className="mx-2 my-2 icon-size" // Add a class to control the max size
        />
        <h2 className="mx-2">{name}</h2>
      </div>
    </button>
  </div>
);

export default CategoryButton;
