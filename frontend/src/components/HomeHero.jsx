import { Link } from "react-router";
import { ArrowRightIcon, SparklesIcon, MapPinIcon } from "lucide-react";
import Marquee from "./Marquee";
export function HomeHero({ categories, loadingCategories }) {
  return (
    <section className="relative overflow-hidden rounded-box border border-base-300 bg-linear-to-br from-base-100 via-base-100 to-primary/10 shadow-lg">
      <div
        className="absolute right-0 top-0 h-64 w-64 translate-x-1/4 -translate-y-1/4 rounded-full bg-primary/10 blur-3xl"
        aria-hidden
      />

      <div className="relative grid gap-8 p-8 md:grid-cols-2 md:items-center md:p-12 lg:p-14">
        <div className="text-left">
          <h1 className="text-3xl font-bold tracking-tight text-base-content md:text-4xl lg:text-5xl">
            Plastic &amp; kitchenware, <span className="text-primary">ready for bulk supply</span> <span className="text-primary">ready for every home</span>
          </h1>

          <p className="mt-4 max-w-lg text-base leading-relaxed text-base-content/70">
            All types of plastic items and kitchenware—reliable, durable, and ready for everyday use.
            From storage solutions to essential household products, we supply trusted brands for homes and shops.
            Easy ordering with support available after purchase.
          </p>
          {/* //address */}
          <div className="mt-4 flex items-start gap-2 text-sm text-base-content/70">
            <MapPinIcon className="mt-0.5 size-4 text-primary shrink-0" aria-hidden />

            <a
              href="https://www.google.com/maps/search/?api=1&query=Shri+Hari+Market+Near+Madar+Gate+Chowki+Madar+Gate+Aligarh"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              Shri Hari Market, Near Madar Gate Chowki,<br />
              Madar Gate, Aligarh — Distributor of all types of plastic items & kitchenware
            </a>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <a href="#catalog" className="btn btn-primary gap-2 shadow-md">
              Shop catalog
              <ArrowRightIcon className="size-4" aria-hidden />
            </a>

            <Link to="/cart" className="btn btn-outline btn-primary">
              View cart
            </Link>
          </div>
        </div>

        <div className="grid gap-3">
          <div className="stat rounded-box border border-base-300 bg-base-100/80 px-4 py-3 shadow-sm">
            <div className="stat-title text-xs uppercase text-base-content/50">Categories</div>

            <div className="stat-value text-2xl text-secondary">
              {loadingCategories ? (
                <span className="skeleton inline-block h-8 w-10 rounded" aria-hidden />
              ) : (
                categories.length
              )}
            </div>

            <div className="stat-desc text-xs">Curated groups</div>
          </div>

          <div className="rounded-box border border-dashed border-primary/30 bg-primary/5 px-4 py-3">
            <div className="flex items-center gap-2 text-sm font-medium text-base-content">
              <SparklesIcon className="size-4 text-primary" aria-hidden />
              Trusted quality · Wholesale rates · Quick WhatsApp support
            </div>
          </div>
        </div>
      </div>
      {/* <Marquee/> */}
    </section>
  );
}