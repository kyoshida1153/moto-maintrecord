import BikeCard from "@/components/BikeCard";
import Heading from "@/components/Heading";

export default function BikePage() {
  const dummyBikes = [
    {
      id: "1",
      name: "YAMAHA MT-09",
      mileage_km: "1,200",
      image_url: "/dummy-320x320.png",
    },
    {
      id: "2",
      name: "KAWASAKI NINJA ZX-6R",
      mileage_km: "800",
      image_url: "/dummy-320x320.png",
    },
    {
      id: "3",
      name: "HONDA CBR650R",
      mileage_km: "950",
      image_url: "/dummy-320x320.png",
    },
  ];

  return (
    <>
      <Heading level={1}>所有バイクの登録</Heading>
      <div className="flex w-full max-w-3xl flex-col gap-4">
        {dummyBikes.map((bike) => (
          <BikeCard
            key={bike.id}
            id={bike.id}
            name={bike.name}
            mileage_km={bike.mileage_km}
            image_url={bike.image_url}
          />
        ))}
      </div>
    </>
  );
}
