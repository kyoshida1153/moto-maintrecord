"use client";

import { useEffect, useState } from "react";
import Loading from "@/components/Loading";
import { Prisma } from "@prisma/client";
import BikeCard from "../BikeCard";

export type Bike = Prisma.BikeGetPayload<{
  select: {
    id: true;
    name: true;
    mileage: true;
    memo: true;
    imageUrl: true;
  };
}>;

async function findBike(): Promise<Bike[] | false> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/bike/`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (response.ok) {
    const { result: data } = await response.json();
    return data;
  } else {
    return false;
  }
}

export default function BikeCardList() {
  const [bikes, setBikes] = useState<Bike[]>([]);
  const [bikesLoading, setBikesLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      const result = await findBike();
      setBikesLoading(false);

      if (result) {
        setBikes(result);
      }
    })();
  }, []);

  return (
    <div className="my-4 flex flex-col gap-4 md:my-6">
      {bikesLoading ? (
        <div className="flex w-full justify-center py-4">
          <Loading size="36px" />
        </div>
      ) : bikes && bikes.length > 0 ? (
        bikes?.map((bike) => (
          <BikeCard
            key={bike.id}
            id={bike.id}
            name={bike.name}
            mileage={bike.mileage}
            imageUrl={bike.imageUrl}
          />
        ))
      ) : (
        <p>所有バイクはまだ登録されていません。</p>
      )}
    </div>
  );
}
