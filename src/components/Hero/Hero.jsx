import React, { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import styles from "./hero.module.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { img as heroImages } from "./img/data";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Hero = () => {
  const total = heroImages.length;
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={styles.heroWrapper}>
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        interval={3500}
        transitionTime={700}
        swipeable
        emulateTouch
        showArrows
        showIndicators={false}
        stopOnHover={false}
        swipeScrollTolerance={5}
        renderArrowPrev={(onClickHandler, hasPrev, label) =>
          total > 1 && (
            <button
              type="button"
              onClick={onClickHandler}
              title={label}
              className={`${styles.carouselArrow} ${styles.carouselArrowPrev}`}
            >
              <FaChevronLeft
                size={isMobile ? 20 : 30} // Responsive icon size
                className={styles.carouselArrowIcon}
              />
            </button>
          )
        }
        renderArrowNext={(onClickHandler, hasNext, label) =>
          total > 1 && (
            <button
              type="button"
              onClick={onClickHandler}
              title={label}
              className={`${styles.carouselArrow} ${styles.carouselArrowNext}`}
            >
              <FaChevronRight
                size={isMobile ? 20 : 30} // Responsive icon size
                className={styles.carouselArrowIcon}
              />
            </button>
          )
        }
      >
        {heroImages.map((img, idx) => (
          <div key={idx}>
            <img src={img} alt={`Amazon hero ${idx + 1}`} />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Hero;
