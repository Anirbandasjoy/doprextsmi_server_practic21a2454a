import "dotenv/config";

const PORT = process.env.PORT || 5002;
const INVENTORY_SERVER_URL =
  (process.env.INVENTORY_SERVER_URL as string) || "http://localhost:5001";

export { PORT, INVENTORY_SERVER_URL };
