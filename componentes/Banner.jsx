import Image from "next/image";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

// ------------------------------------------------------------
// ------------------------------------------------------------
// - Componente para mostrar el banner de la página principal -
// ------------------------------------------------------------
// ------------------------------------------------------------
const Banner = () => {
  return (
    <div>
      <Carousel
        autoPlay
        infiniteLoop
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        showArrows={false}
        interval={10000}
      >
        <Image
          // loading="lazy"
          src="/banner1.jpg"
          width={3000}
          height={1200}
          alt="banner1"
          priority={true}
        />
        <Image
          loading="lazy"
          src="/banner2.jpg"
          width={3000}
          height={1200}
          alt="banner2"
        />
        <Image
          loading="lazy"
          src="/banner3.jpg"
          width={3000}
          height={1200}
          alt="banner3"
        />
      </Carousel>
    </div>
  );
};

export default Banner;
