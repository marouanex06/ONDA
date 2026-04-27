const formatDate = (value) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return date.toLocaleDateString("fr-FR");
};

export const normalizeStock = (stock = {}, fallback = {}) => ({
  ...stock,
  id_stock: stock.id_stock ?? stock.id ?? fallback.id_stock ?? null,
  id_materiel:
    stock.id_materiel ?? stock.materielId ?? fallback.id_materiel ?? null,
  designation:
    stock.designation ??
    stock.materielName ??
    fallback.designation ??
    "Materiel inconnu",
  qte_stock: stock.qte_stock ?? stock.quantity ?? fallback.qte_stock ?? 0,
  date_maj: formatDate(stock.date_maj ?? stock.lastUpdated ?? new Date()),
});

export const normalizeStocks = (stocks = [], getFallback) =>
  stocks.map((stock) =>
    normalizeStock(stock, getFallback ? getFallback(stock) : undefined),
  );
