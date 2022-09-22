import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ImageCarousel.css'

export const ImageCarousel = () => {
  return (
    <Carousel>
      <Carousel.Item interval={1000} className="carousel-item">
        <img
          className="img-carousel"
          src="https://res.cloudinary.com/dupram4w7/image/upload/v1663810872/Screen_Shot_2022-09-21_at_8.32.07_PM_mgiklq.png"
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item className="carousel-item">
        <img
          className="img-carousel"
          src="https://res.cloudinary.com/dupram4w7/image/upload/v1663811503/Screen_Shot_2022-09-21_at_8.51.05_PM_g8mbmg.png"
        />
      </Carousel.Item>
      <Carousel.Item className="carousel-item">
        <img
          className="img-carousel"
          src="https://res.cloudinary.com/dupram4w7/image/upload/v1663811681/backyard-string-lights-6-1586290751_vkpm5j.jpg"
          alt="Third slide"
        />
      </Carousel.Item>
      <Carousel.Item className="carousel-item">
        <img
          className="img-carousel"
          src="https://res.cloudinary.com/dupram4w7/image/upload/v1663798567/__cs4xct.jpg"
          alt="Fourth slide"
        />
      </Carousel.Item>
      <Carousel.Item interval={1400}>
        <img
          className="img-carousel"
          src="https://res.cloudinary.com/dupram4w7/image/upload/v1663798567/__1_rrqrxn.jpg"
          alt="Fifth slide"
        />
      </Carousel.Item>
      <Carousel.Item className="carousel-item">
        <img
          className="img-carousel"
          src="https://res.cloudinary.com/dupram4w7/image/upload/v1663798567/Interior_Decor_s_Instagram_post__Find_more_at_bohoshoppers_This_lovely_bathroom_was_made_ideal_by_the_color_scheme_and_the_wood_accent_Isn_t_it_a_beauty____Image_by_vtvwol.jpg"
          alt="Sixth slide"
        />
      </Carousel.Item>
    </Carousel>
  );
}
