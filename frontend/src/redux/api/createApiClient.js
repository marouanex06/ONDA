import axios from "axios";

const location = typeof window !== "undefined" ? window.location : null;
const DEFAULT_API_ORIGIN =
  process.env.REACT_APP_API_ORIGIN ||
  (location ? `${location.protocol}//${location.hostname}` : "http://localhost");
const DEFAULT_API_PATH =
  process.env.REACT_APP_API_PATH ||
  (location?.hostname === "localhost"
    ? "/onda-main/backend/api"
    : "/backend/api");
const API_BASE_URL = (
  process.env.REACT_APP_API_BASE_URL ||
  `${DEFAULT_API_ORIGIN}${DEFAULT_API_PATH}`
).replace(/\/+$/, "");

const API_FILE_BY_RESOURCE = {
  affectation: "affectationApi.php",
  bon_sortie: "bon_sortieApi.php",
  bonsortie: "bon_sortieApi.php",
  categorie: "categorieApi.php",
  demandes: "demandesApi.php",
  justificatif: "justificatifApi.php",
  materiel: "materielApi.php",
  mouvements: "mouvementsApi.php",
  service: "servicesApi.php",
  services: "servicesApi.php",
  stock: "stockApi.php",
  users: "usersApi.php",
};

const resolveApiFile = (resourcePath = "") => {
  const normalized = String(resourcePath).replace(/^\/+|\/+$/g, "");

  if (!normalized) {
    return "";
  }

  if (normalized.endsWith(".php")) {
    return normalized;
  }

  return API_FILE_BY_RESOURCE[normalized] || `${normalized}Api.php`;
};

export const createApiClient = (resourcePath) => {
  const apiFile = resolveApiFile(resourcePath);

  const axiosClient = axios.create({
    baseURL: apiFile ? `${API_BASE_URL}/${apiFile}` : API_BASE_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  axiosClient.interceptors.request.use((config) => {
    if (apiFile && typeof config.url === "string" && config.url.startsWith("?")) {
      config.baseURL = API_BASE_URL;
      config.url = `${apiFile}${config.url}`;
    }

    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  axiosClient.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/login";
      }
      return Promise.reject(error);
    },
  );

  return axiosClient;
};
