const formatDate = (value) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return date.toISOString().split("T")[0];
};

export const normalizeBonSortie = (bonSortie = {}, fallback = {}) => {
  const quantite =
    bonSortie.quantite ??
    bonSortie.quantityRequested ??
    fallback.quantite ??
    bonSortie.quantityReleased ??
    0;
  const nbSortie =
    bonSortie.nb_sortie ??
    bonSortie.quantityReleased ??
    fallback.nb_sortie ??
    0;

  return {
    ...bonSortie,
    id_bs: bonSortie.id_bs ?? bonSortie.id ?? fallback.id_bs ?? null,
    code_bs: bonSortie.code_bs ?? bonSortie.numero ?? fallback.code_bs ?? "",
    numero: bonSortie.numero ?? bonSortie.code_bs ?? fallback.numero ?? "",
    id_demande:
      bonSortie.id_demande ?? bonSortie.demandeId ?? fallback.id_demande ?? null,
    id_materiel:
      bonSortie.id_materiel ??
      bonSortie.materielId ??
      fallback.id_materiel ??
      null,
    designation:
      bonSortie.designation ??
      bonSortie.materielName ??
      fallback.designation ??
      "Materiel",
    quantite,
    nb_sortie: nbSortie,
    reste_livrer:
      bonSortie.reste_livrer ??
      fallback.reste_livrer ??
      String(Math.max(Number(quantite) - Number(nbSortie), 0)),
    date_sortie: formatDate(
      bonSortie.date_sortie ?? bonSortie.releaseDate ?? fallback.date_sortie,
    ),
  };
};

export const normalizeBonSorties = (bonSorties = [], getFallback) =>
  bonSorties.map((bonSortie) =>
    normalizeBonSortie(
      bonSortie,
      getFallback ? getFallback(bonSortie) : undefined,
    ),
  );
