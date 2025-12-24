"use client";

import Image from "next/image";
import { Navigation, Pagination, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./swiper-custom.css";

import { tv } from "tailwind-variants";

export default function FeatureCard({
  children,
  title,
  pcImages,
  spImages,
  isColReverse = false,
}: {
  children: React.ReactNode;
  title: string;
  pcImages?: {
    key: number;
    url: string;
    alt?: string;
  }[];
  spImages?: {
    key: number;
    url: string;
    alt?: string;
  }[];
  isColReverse?: boolean;
}) {
  const tvIsColReverse = tv({
    base: "flex flex-col flex-nowrap gap-4  md:gap-8",
    variants: {
      isColReverse: {
        initial: "md:flex-row",
        true: "md:flex-row-reverse",
        false: "md:flex-row",
      },
    },
  });

  return (
    <section className="rounded-3xl bg-white p-8">
      <div className={tvIsColReverse({ isColReverse })}>
        <div className="w-full md:w-[50%]">
          {pcImages && (
            <div className="hidden md:block">
              <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={30}
                slidesPerView={1}
                centeredSlides={true}
                navigation
                pagination={{ clickable: true }}
                className="swiper-custom"
              >
                {pcImages.map((image) => {
                  return (
                    <SwiperSlide key={`${image.key}_${image.url}`}>
                      <Image
                        src={image.url}
                        width={500}
                        height={0}
                        alt={image.alt ?? ""}
                        className="mx-auto w-full max-w-[500px] shadow-md"
                      />
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
          )}

          {spImages && (
            <div className="block md:hidden">
              <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={30}
                slidesPerView={1}
                centeredSlides={true}
                navigation
                pagination={{ clickable: true }}
                className="swiper-custom"
              >
                {spImages.map((image) => {
                  return (
                    <SwiperSlide key={`${image.key}_${image.url}`}>
                      <Image
                        src={image.url}
                        width={200}
                        height={0}
                        alt={image.alt ?? ""}
                        className="mx-auto w-full max-w-[200px] shadow-md"
                      />
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
          )}
        </div>
        <div className="w-full md:w-[50%]">
          <h3 className="mb-4 w-full text-xl font-[500]">{title}</h3>
          <p>{children}</p>
        </div>
      </div>
    </section>
  );
}
