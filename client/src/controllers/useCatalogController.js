import { useEffect, useState } from "react";
import { Api } from "../services/api";

export default function useCatalogController() {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [q, setQ] = useState("");

  useEffect(() => {
    Api.listBooks().then((data) => {
      setItems(data);
      setLoading(false);
    });
  }, []);

  const filtered = items.filter(
    (b) =>
      b.title.toLowerCase().includes(q.toLowerCase()) ||
      b.author.toLowerCase().includes(q.toLowerCase())
  );

  return { loading, items: filtered, q, setQ };
}
