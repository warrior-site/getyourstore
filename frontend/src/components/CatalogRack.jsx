import React from "react";

// Example Data Structure for your 17 catalogs
const CATALOG_DATA = [
  {
    id: 1,
    title: "DOMESTOWARE Catalog 2023-24",
    coverUrl: "https://images.unsplash.com/photo-1606787366850-de6330128bfc?auto=format&fit=crop&w=500&q=80", // Modern plastic food containers
    driveUrl: "https://drive.google.com/file/d/11_Z4RV-CqP6V-pqLM0ITeJKSadQe2Yi0/view",
  },
  {
    id: 2,
    title: "DOMESTOWARE Catalog 2019-20",
    coverUrl: "https://images.unsplash.com/photo-1595341595378-fcab93dfa910?auto=format&fit=crop&w=500&q=80", // Organized kitchen storage jars
    driveUrl: "https://drive.google.com/file/d/1UWte1Ddr4c7pEceAO8nU1eSOoXcpIN4l/view",
  },
  {
    id: 3,
    title: "Festival Special Catalog",
    coverUrl: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=500&q=80", // Bright, colorful festive theme
    driveUrl: "https://drive.google.com/file/d/1JxFdYc49YVW49z5oDPpDrRS8lxvSeQuG/view",
  },
  {
    id: 4,
    title: "Cello Bottle Catalog",
    coverUrl: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=500&q=80", // Sleek, modern reusable water bottle
    driveUrl: "https://drive.google.com/file/d/1Ncy_1pCYSlJqlspWckvBjsv1-31Jv2TV/view",
  },
  {
    id: 5,
    title: "Fridge Bottle Catalog",
    coverUrl: "https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=500&q=80", // Clear bottles perfect for refrigerator storage
    driveUrl: "https://drive.google.com/file/d/16ncOz6oIiwmbsVbnd4nKO67eVHPWS2lA/view",
  },
  {
    id: 6,
    title: "Cello Hydration Bottle Catalog",
    coverUrl: "https://images.unsplash.com/photo-1551831868-f995f68cc6cc?auto=format&fit=crop&w=500&q=80", // Sports/fitness hydration bottle
    driveUrl: "https://drive.google.com/file/d/1k6h_e8_5ifYpPfvM2X7wj6R53DalnZCl/view",
  },
  {
    id: 7,
    title: "SKI Back To School Catalog",
    coverUrl: "https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=500&q=80", // School essentials, lunchboxes, and backpacks
    driveUrl: "https://drive.google.com/file/d/1DrOtMaXE5gvJqW8dm0PEpQKiu5OQAS03/view",
  },
  {
    id: 8,
    title: "Cello Max Fresh Catalog",
    coverUrl: "https://images.unsplash.com/photo-1543083569-8f5d72b2c145?auto=format&fit=crop&w=500&q=80", // Fresh food in airtight lunch boxes
    driveUrl: "https://drive.google.com/file/d/13NOlBW6XZV64VTvhRxTeFvrFTYtv0foD/view",
  },
  {
    id: 9,
    title: "Nakoda Catalog 2025-26",
    coverUrl: "https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?auto=format&fit=crop&w=500&q=80", // Household plastic utility items
    driveUrl: "https://drive.google.com/file/d/1QHWzawPyYo9xvxENXWb1cwKRwcqp3mrv/view",
  },
  {
    id: 10,
    title: "SUMWIN Catalog",
    coverUrl: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=500&q=80", // Bright, premium home & bath organization
    driveUrl: "https://drive.google.com/file/d/1iYeF7H_g4REgHWEOiPMkfceGLsGey9Yl/view",
  },
  {
    id: 11,
    title: "Puro Bottle Catalog",
    coverUrl: "https://images.unsplash.com/photo-1575435345714-3d607f2df790?auto=format&fit=crop&w=500&q=80", // Pastel/minimalist premium bottles
    driveUrl: "https://drive.google.com/file/d/1PJ4DD205KZ4OKpy4D4R_-xKugndcI1TF/view",
  },
  {
    id: 12,
    title: "Premium Cello Puro Catalog",
    coverUrl: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=500&q=80", // Premium insulated stainless steel flasks
    driveUrl: "https://drive.google.com/file/d/1HwuunXlrJXCBNzqg4KVlk3wzKWLa6Yin/view",
  },
  {
    id: 13,
    title: "Ritu Kitchenware Catalog 2025",
    coverUrl: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=500&q=80", // Cooking utensils and kitchen tools
    driveUrl: "https://drive.google.com/file/d/1AG5ZljBUvbvrQsldVp278YNroBqEdIz8/view",
  },
  {
    id: 14,
    title: "Cello Thermoware Catalog 2025",
    coverUrl: "https://images.unsplash.com/photo-1594385208974-2e75f9d3a48a?auto=format&fit=crop&w=500&q=80", // Insulated casseroles and hot-pots
    driveUrl: "https://drive.google.com/file/d/1IltZoGcUpT5bbx_3sUoIsXyZaw74W7gK/view",
  },
  {
    id: 15,
    title: "Cello Thermoware Catalog 2021",
    coverUrl: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=500&q=80", // Classic insulated water jugs and flasks
    driveUrl: "https://drive.google.com/file/d/1gZSusLCEO2i44AEwmzIZX5dtUZ9EQgXh/view",
  },
  {
    id: 16,
    title: "Cello Thermoware 2023-24 Catalog",
    coverUrl: "https://images.unsplash.com/photo-1610399214764-3a542b8e1e9c?auto=format&fit=crop&w=500&q=80", // Vacuum insulated steel bottles
    driveUrl: "https://drive.google.com/file/d/1MkmXkCC9Ez7Q0wBHZ3unmvkGGAuIXKhb/view",
  },
];

export default function CatalogRack() {
  return (
    <section className="w-full bg-base-100 py-6 px-4 md:px-8 border-b border-base-200">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto mb-4 flex justify-between items-center">
        <div>
          <h2 className="text-xs font-bold uppercase tracking-widest text-emerald-400">Digital Showroom</h2>
          <p className="text-xl font-semibold text-base-content">Our Catalogs ({CATALOG_DATA.length})</p>
        </div>
        <span className="hidden md:inline-block text-xs text-base-content/50 bg-base-200 px-3 py-1 rounded-full">
          Scroll horizontally ➔
        </span>
      </div>

      {/* Main Catalog Container constrained to ~30vh */}
      <div className="max-w-7xl mx-auto">
        <div 
          className="
            /* Mobile Layout: Responsive Grid */
            grid grid-cols-2 sm:grid-cols-3 gap-4 max-h-[50vh] overflow-y-auto pr-1
            
            /* Desktop Layout: Sleek Horizontal Row (at ~30vh height) */
            md:flex md:grid-cols-none md:gap-6 md:h-[32vh] md:overflow-x-auto md:overflow-y-hidden md:whitespace-nowrap md:pb-4
            
            /* Custom Scrollbar Styling */
            scrollbar-thin scrollbar-thumb-emerald-500/20 scrollbar-track-transparent
          "
        >
          {CATALOG_DATA.map((catalog) => (
            <a
              key={catalog.id}
              href={catalog.driveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="
                group relative flex flex-col justify-end overflow-hidden rounded-xl bg-neutral-900 shadow-lg transition-all duration-300
                /* Desktop sizing constraints */
                md:inline-block md:h-full md:aspect-[3/4] md:flex-shrink-0
                /* Hover animations */
                hover:-translate-y-1 hover:shadow-emerald-500/10 hover:shadow-xl hover:border-emerald-500/30 border border-transparent
              "
            >
              {/* Cover Image */}
              <img
                src={catalog.coverUrl}
                alt={catalog.title}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />

              {/* Elegant Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

              {/* Title & Badge Meta Text */}
              <div className="relative p-3 md:p-4 z-10 flex flex-col h-full justify-between">
                {/* PDF Badge */}
                <div className="self-end bg-red-600/90 text-[10px] font-bold text-white px-2 py-0.5 rounded uppercase tracking-wider shadow-sm">
                  PDF
                </div>
                
                {/* Title */}
                <div>
                  <h3 className="text-sm font-medium text-white line-clamp-2 whitespace-normal group-hover:text-emerald-300 transition-colors">
                    {catalog.title}
                  </h3>
                  <p className="text-[11px] text-emerald-400 mt-1 font-semibold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    View Catalog ➔
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}