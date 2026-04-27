const statusToFrontend = {
  pending: "en_attente",
  approved: "acceptee",
  rejected: "refusee",
  fulfilled: "livree",
};

const statusToBackend = {
  en_attente: "pending",
  acceptee: "approved",
  refusee: "rejected",
  livree: "fulfilled",
};

const formatDate = (value) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return date.toISOString().split("T")[0];
};

export const mapStatusToFrontend = (status) => statusToFrontend[status] || status;
export const mapStatusToBackend = (status) => statusToBackend[status] || status;

export const normalizeDemande = (demande = {}, fallback = {}) => ({
  ...demande,
  id_demande: demande.id_demande ?? demande.id ?? fallback.id_demande ?? null,
  id_user: demande.id_user ?? demande.userId ?? fallback.id_user ?? null,
  username:
    demande.username ??
    demande.userName ??
    fallback.username ??
    "Utilisateur",
  id_materiel:
    demande.id_materiel ?? demande.materielId ?? fallback.id_materiel ?? null,
  designation:
    demande.designation ??
    demande.materielName ??
    fallback.designation ??
    "Materiel",
  quantite: demande.quantite ?? demande.quantity ?? fallback.quantite ?? 0,
  statut: mapStatusToFrontend(
    demande.statut ?? demande.status ?? fallback.statut ?? "en_attente",
  ),
  date_demande: formatDate(
    demande.date_demande ?? demande.requestDate ?? fallback.date_demande,
  ),
  reste_livrer:
    demande.reste_livrer ??
    fallback.reste_livrer ??
    String(demande.quantite ?? demande.quantity ?? fallback.quantite ?? 0),
  qte_stock:
    demande.qte_stock ??
    fallback.qte_stock ??
    demande.quantite ??
    demande.quantity ??
    0,
});

export const normalizeDemandes = (demandes = [], getFallback) =>
  demandes.map((demande) =>
    normalizeDemande(demande, getFallback ? getFallback(demande) : undefined),
  );
