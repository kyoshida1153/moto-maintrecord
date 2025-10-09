import BikeCard from "@/components/BikeCard";
import Heading from "@/components/Heading";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import MuiLink from "@mui/material/Link";

export default function BikePage() {
  const dummyBikes = [
    {
      id: "1",
      name: "YAMAHA MT-09",
      mileage_km: "1,200",
      image_url: "/dummy-320x160.png",
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
      <Heading level={1}>所有バイク</Heading>
      <div className="my-4 text-center md:my-6 md:text-left">
        <Button
          component={MuiLink}
          variant="contained"
          disableElevation
          startIcon={<AddIcon />}
          href="/bike/create"
        >
          所有バイクの登録
        </Button>
      </div>
      <div className="my-4 flex w-full max-w-3xl flex-col gap-4 md:my-6">
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
