import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { photos } from "../../data/photos";

export default function PhotoChart() {
  const router = useRouter();
  const { priceId } = router.query;
  const [product, setProduct] = useState();

  useEffect(() => {
    priceId && setProduct(photos[priceId]);
  }, [priceId]);

  if (!product) {
    return null;
  }

  return <div>{product.price}</div>;
}
