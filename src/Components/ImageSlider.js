import React from 'react'
import SimpleImageSlider from "react-simple-image-slider";

export const ImageSlider = () => {
    const images = [
        { url: "../assets/slider.jpeg" },
        { url: "../assets/slider1.jpeg" },
        { url: "../assets/slider2.jpg" },
        { url: "../assets/slider3.jpg" },
        { url: "../assets/slider4.jpg" },

      ];
  return (
    <div>
         <SimpleImageSlider
            width={"90%"}
            height={500}
            images={images}
            showNavs={true}
            autoPlay={true}
         />
    </div>
  )
}