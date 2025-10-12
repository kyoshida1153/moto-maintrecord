import Heading from "@/components/Heading";
import BikeCard from "./_components/BikeCard";
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
    <div className="w-full max-w-3xl">
      <Heading level={1}>所有バイク</Heading>
      <div className="my-6 text-center md:my-8 md:text-left">
        <Button
          component={MuiLink}
          variant="contained"
          disableElevation
          startIcon={<AddIcon />}
          href="/bike/create"
          sx={{
            maxWidth: "fit-content",
            px: "1.5em",
            whiteSpace: "nowrap",
          }}
        >
          所有バイクの登録
        </Button>
      </div>
      <div className="my-4 flex flex-col gap-4 md:my-6">
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
    </div>
  );
}
