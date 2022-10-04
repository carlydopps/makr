import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ImageCarousel.css'

export const ImageCarousel = () => {
  return (
    <Carousel>
      <Carousel.Item interval={900} className="carousel-item">
        <img
          className="img-carousel"
          src="https://res.cloudinary.com/dupram4w7/image/upload/v1663810872/Screen_Shot_2022-09-21_at_8.32.07_PM_mgiklq.png"
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item className="carousel-item">
        <img
          className="img-carousel"
          src="https://res.cloudinary.com/dupram4w7/image/upload/v1663909476/1_gsrlbx.png"
        />
      </Carousel.Item>
      <Carousel.Item className="carousel-item">
        <img
          className="img-carousel"
          src="https://res.cloudinary.com/dupram4w7/image/upload/v1663907153/Screen_Shot_2022-09-22_at_11.25.03_PM_sj87ga.png"
        />
      </Carousel.Item>
      <Carousel.Item className="carousel-item">
        <img
          className="img-carousel"
          src="https://res.cloudinary.com/dupram4w7/image/upload/v1663908446/Screen_Shot_2022-09-22_at_11.46.18_PM_iqvh00.png"
        />
      </Carousel.Item>
    </Carousel>
  );
}
