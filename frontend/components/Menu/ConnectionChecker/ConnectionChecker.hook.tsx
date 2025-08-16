import { MenuItem } from "@/schema/menuItem.schema";
import axios from "axios";
import { useEffect, useState } from "react";

export function ConnectionCheckerMenuHook() {
  const [menu, setMenu] = useState<MenuItem[]>([]);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/${process.env.NEXT_PUBLIC_API_VERSION}/expose/menu`)
      .then((response) => {
        if (Array.isArray(response.data)) {
          setMenu(response.data);
        } else {
          console.error("Unexpected response format:", response.data);
          setMenu([]);
        }
      })
      .catch((error) => console.error("Error fetching menu:", error));
  }, []);

  return { menu };
};