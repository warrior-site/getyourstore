export function formatPrice(cents, currency) {
  const normalizedCurrency = (currency ?? "inr").toLowerCase();
  return new Intl.NumberFormat(
    normalizedCurrency === "inr" ? "en-IN" : undefined,
    {
      style: "currency",
      currency: normalizedCurrency.toUpperCase(),
    },
  ).format(cents / 100);
}

export function formatOrderWhen(iso, opts = {}) {
  const { dateStyle = "medium" } = opts;
  if (!iso) return "";

  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";

  return new Intl.DateTimeFormat(undefined, {
    dateStyle,
    timeStyle: "short",
  }).format(date);
}