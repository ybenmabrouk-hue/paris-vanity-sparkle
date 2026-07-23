import { Truck, RefreshCcw, ShieldCheck, Headphones, HeartHandshake } from "lucide-react";

const ITEMS = [
  {
    icon: Truck,
    label: "Delivered in 3-7 days",
  },
  {
    icon: RefreshCcw,
    label: "30-Day Returns",
  },
  {
    icon: ShieldCheck,
    label: "Secure Checkout",
  },
  {
    icon: HeartHandshake,
    label: "Prepared With Care",
  },
  {
    icon: Headphones,
    label: "Customer Support",
  },
];

export function ReassuranceIcons() {
  return (
    <section className="w-full bg-white text-black">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-x-6 gap-y-8 md:gap-4">
          {ITEMS.map(({ icon: Icon, label }) => (
            <div key={label} className="flex flex-col items-center text-center gap-3">
              <Icon className="h-7 w-7" strokeWidth={1.25} />
              <span className="font-sans text-[13px] leading-tight text-black/80" style={{ fontWeight: 300 }}>
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
