import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { PlusIcon, ArrowUpCircle, Layers,IndianRupee } from "lucide-react";
import { formatPrice } from "../utils/format.js";
import { IK_PRESETS, imageKitOptimizedUrl } from "../lib/imagekitUrl.js";
import { useCart } from "../store/cart.js";
import { useMe } from "../hooks/useMe.js";

// --- 1. YOUR ORIGINAL PRODUCT CARD COMPONENT ---
export function CatalogProductCard({ product }) {
  if (!product) return null;

  const addItem = useCart((s) => s.addItem);
  const { data: meData, isLoading } = useMe();
  const role = meData?.user?.role;

  const basePrice = product.priceCents ?? 0;
  const priceToShow = role === "retailer" 
    ? product.priceCents_retailer ?? basePrice 
    : basePrice;

  return (
    <article className="card group h-full overflow-hidden border border-base-300 bg-base-100 shadow-md transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-xl">
      <Link to={`/product/${product.slug}`} className="relative block overflow-hidden">
        <figure className="aspect-4/3 bg-base-300">
          {product.imageUrl && (
            <img
              src={imageKitOptimizedUrl(product.imageUrl, IK_PRESETS.catalogCard)}
              alt=""
              className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
              loading="lazy"
              decoding="async"
            />
          )}
        </figure>
        <span className="badge badge-sm absolute left-3 top-3 border-0 bg-base-100/90 text-xs font-medium text-base-content/80 backdrop-blur">
          {product.category ?? "General"}
        </span>
      </Link>

      <div className="card-body grow gap-3 p-5 text-left">
        <Link to={`/product/${product.slug}`} className="card-title line-clamp-2 text-lg transition group-hover:text-primary">
          {product.name}
        </Link>
        <p className="line-clamp-3 text-sm leading-relaxed text-base-content/70">
          {product.description}
        </p>
        <div className="card-actions mt-auto items-center justify-between border-t border-base-200 pt-4">
          <span className="text-lg font-bold tabular-nums text-base-content">
            {formatPrice(priceToShow, product.currency)}
          </span>
          <button
            type="button"
            onClick={() => addItem(product.id)}
            className="btn btn-primary btn-sm gap-1 shadow"
            disabled={isLoading}
          >
            <PlusIcon className="size-4" />
            Add
          </button>
        </div>
      </div>
    </article>
  );
}

// --- 2. THE MASTER SECTION COMPONENT ---
export default function CatalogProductSection({ products = [] }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const MAX_RESTRICTED_COUNT = 8; // Change this value to adjust your 'X' limit

  // Generate unique categories dynamically from the products list
  const categories = useMemo(() => {
    const list = new Set(products.map((p) => p.category).filter(Boolean));
    return ["All", ...Array.from(list)];
  }, [products]);

  // Step 1: Filter products based on selected category pill
  const filteredProducts = useMemo(() => {
    if (selectedCategory === "All") return products;
    return products.filter((p) => p.category === selectedCategory);
  }, [products, selectedCategory]);

  // Step 2: Determine restriction states
  const isCategoryChosen = selectedCategory !== "All";
  const hasTooManyProducts = filteredProducts.length > MAX_RESTRICTED_COUNT;
  
  // Show message ONLY if they haven't picked a specific category yet AND they have more than X items
  const shouldRestrict = hasTooManyProducts && !isCategoryChosen;

  // Step 3: Get the exact slice to display
  const visibleProducts = shouldRestrict
    ? filteredProducts.slice(0, MAX_RESTRICTED_COUNT)
    : filteredProducts;

  // Helper to smoothly scroll up to the filter bar
  const scrollToFilters = () => {
    window.scrollTo({ top: document.getElementById("category-filters")?.offsetTop - 20, behavior: "smooth" });
  };

  return (
    <section className="w-full bg-base-100 py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Category Filter Pills */}
        <div id="category-filters" className="mb-8 border-b border-base-200 pb-5">
          <div className="flex items-center gap-2 mb-3 text-base-content/60 text-xs font-bold uppercase tracking-wider">
            <Layers className="size-4 text-primary" />
            Filter by Category
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`btn btn-sm rounded-full normal-case transition-all ${
                  selectedCategory === category
                    ? "btn-primary shadow-md px-5"
                    : "btn-ghost bg-base-200/60 hover:bg-base-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Header Status Info */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <h3 className="text-xl font-bold tracking-tight text-base-content">
            {isCategoryChosen ? `${selectedCategory} Products` : "Featured Collection"}
            <span className="ml-2 text-sm font-normal text-base-content/50">
              ({filteredProducts.length} items available)
            </span>
          </h3>
          {shouldRestrict && (
            <span className="text-xs text-amber-500 bg-amber-500/10 font-medium px-3 py-1 rounded-md self-start sm:self-auto">
              Showing top {MAX_RESTRICTED_COUNT} products. Select a category to see all.
            </span>
          )}
        </div>

        {/* Product Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {visibleProducts.map((product) => (
            <CatalogProductCard key={product.id} product={product} />
          ))}

          {/* Smart Notice Card Card at the end of the truncated display */}
          {shouldRestrict && (
            <div 
              onClick={scrollToFilters}
              className="card border-2 border-dashed border-base-300 hover:border-primary/40 bg-base-200/30 hover:bg-base-200/60 p-6 flex flex-col items-center justify-center text-center gap-4 rounded-2xl cursor-pointer transition-all duration-300 min-h-[340px]"
            >
              <div className="bg-primary/10 text-primary p-3 rounded-full shadow-inner group-hover:scale-110 transition-transform">
                <ArrowUpCircle className="size-7 animate-bounce" />
              </div>
              <div>
                <h4 className="font-bold text-base-content text-lg">And many more products...</h4>
                <p className="text-sm text-base-content/60 mt-1 max-w-[220px] mx-auto">
                  Click here to scroll up and choose a category to see everything.
                </p>
              </div>
              <span className="text-xs font-semibold text-primary underline underline-offset-4">
                View Categories
              </span>
            </div>
          )}
        </div>

        {/* Fallback Empty State */}
        {visibleProducts.length === 0 && (
          <div className="text-center py-16 bg-base-200/20 rounded-2xl border border-base-200">
            <p className="text-base-content/50 text-base">No products found in this category.</p>
          </div>
        )}

      </div>
    </section>
  );
}