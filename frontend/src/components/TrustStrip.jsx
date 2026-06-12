import { CreditCardIcon, HeadphonesIcon, ShieldCheckIcon, TruckIcon } from "lucide-react";

const items = [
  {
    icon: TruckIcon,
    title: "Bulk Availability",
    desc: "Wide range of plastic items & kitchenware ready for supply",
  },
  {
    icon: ShieldCheckIcon,
    title: "Trusted Quality",
    desc: "We deal in reliable and well-known brands",
  },
  {
    icon: CreditCardIcon,
    title: "Best Pricing",
    desc: "Competitive rates for retailers and bulk buyers",
  },
  {
    icon: HeadphonesIcon,
    title: "Direct Support",
    desc: "Contact us anytime for orders, queries, or assistance",
  },
];

export function TrustStrip() {
  return (
    <section className="grid gap-4 rounded-box border border-base-300 bg-base-100 p-6 sm:grid-cols-2 lg:grid-cols-4">
      {items.map(({ icon, title, desc }) => {
        const IconCmp = icon;
        return (
          <div key={title} className="flex gap-3">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <IconCmp className="size-5" aria-hidden />
            </div>
            <div>
              <h3 className="font-semibold text-base-content">{title}</h3>
              <p className="mt-0.5 text-sm text-base-content/65">{desc}</p>
            </div>
          </div>
        );
      })}
    </section>
  );
}