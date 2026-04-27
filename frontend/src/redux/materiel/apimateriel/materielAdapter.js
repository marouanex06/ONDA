export const normalizeMateriel = (materiel = {}, fallback = {}) => ({
  ...materiel,
  id_materiel: materiel.id_materiel ?? materiel.id ?? fallback.id_materiel ?? null,
  designation:
    materiel.designation ??
    materiel.name ??
    fallback.designation ??
    "Materiel",
  id_fourniture:
    materiel.id_fourniture ??
    fallback.id_fourniture ??
    materiel.category ??
    null,
  nom_fourniture:
    materiel.nom_fourniture ??
    materiel.category ??
    fallback.nom_fourniture ??
    "Sans categorie",
});

export const normalizeMateriels = (materiels = [], getFallback) =>
  materiels.map((materiel) =>
    normalizeMateriel(materiel, getFallback ? getFallback(materiel) : undefined),
  );
