"use client";
import Image, { StaticImageData } from "next/image";
import Slider, { Settings } from "react-slick";
export type Brand = {
  imgURL?: StaticImageData;
  id: number;
  icon?: string;
  label?: string;
};

type MobileSliderProps = {
  brands: Brand[][];
};

export const MobileSlider: React.FC<MobileSliderProps> = ({ brands }) => {
  const settings: Settings = {
    dots: false,
    infinite: true,
    slidesToScroll: 1,
    autoplay: true,
    speed: 7500,
    cssEase: "linear",
    autoplaySpeed: 0,
    arrows: false,
    variableWidth: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 425,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 375,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className=" flex w-full justify-center text-center  ">
      <div className=" w-[100%]  z-10  ">
        {brands.map((i, index) => (
          <Slider
            key={index + " slider"}
            className="w-full [&>.slick-list]:py-2 [&>.slick-list>.slick-track]:flex [&>.slick-list>.slick-track]:gap-x-5 [&>.slick-list>.slick-track>..slick-slide]:w-[100px] "
            {...settings}
            rtl={index % 2 === 0}
          >
            {[...i, ...i].map((brand, index) => (
              <div key={`${brand}-${index}`} className=" ">
                <div
                  className="bg-white border border-black rounded-full px-9 py-2 flex items-center justify-center
                              transition-all duration-300 hover:scale-105 shadow-lg
                              hover:bg-gray-50"
                >
                  {brand.imgURL && (
                    <Image
                      key={brand.id}
                      alt=""
                      height={60}
                      src={brand.imgURL}
                      width={60}
                    />
                  )}
                  {brand.icon && brand.label && (
                    <div className=" flex-row  gap-4 md:gap-2 py-[4px] px-6 flex items-center justify-center">
                      <Image
                        alt="asd"
                        height={24}
                        src={brand.icon}
                        width={24}
                      />
                      <p className="text-xs text-nowrap font-normal text-black">
                        {brand.label}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </Slider>
        ))}
      </div>
    </div>
  );
};
