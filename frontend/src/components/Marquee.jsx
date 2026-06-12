import React from "react";
import "./marquee.css";

const brands = [
  { name: "cello", logo: "/cello-removebg-preview.png" },
  { name: "ski", logo: "/ski.png" },
  { name: "nakoda", logo: "/images_2_-removebg-preview.png" },
  { name: "right industries", logo: "/right.png" },
  { name: "bittu kitchenware", logo: "/bittu.png" },
  { name: "gebi", logo: "/gebi.png" }, 
  { name: "shakti", logo: "/shakti.png" }, 
  { name: "taj", logo: "/taj-removebg-preview.png" },
];

export default function Marquee() {
  return (
    <section className="marquee-wrapper">
      <h2 className="marquee-heading">Our Partners</h2>
      
      <div className="marquee-container">
        <div className="marquee-track">
          {[...brands, ...brands].map((brand, index) => (
            <div key={`${brand.name}-${index}`} className="marquee-item" title={brand.name}>
              <img src={brand.logo} alt={brand.name} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}