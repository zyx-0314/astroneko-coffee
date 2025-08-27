"use client";

import { Clock, Coffee, Gift, GlassWater, Leaf, ShoppingBag, Utensils } from 'lucide-react';
import { useEffect, useState } from 'react';

import { CreateMenuItemRequest, CRUMenuItemModalProps, ItemType } from '@/schema/menuItem.schema';

export const useCRUMenuItemModalState = ({
  open,
  onOpenChange,
  onSubmit,
  item,
  mode,
}: CRUMenuItemModalProps) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<CreateMenuItemRequest>({
    name: "",
    description: "",
    price: 0,
    type: "COFFEE" as ItemType,
    image: "",
    inStock: true,
    isOnSale: false,
    isCombo: false,
  });
  const [isOnSale, setIsOnSale] = useState(false);

  useEffect(() => {
    if (item && (mode === "edit" || mode === "view")) {
      setFormData({
        name: item.name,
        description: item.description,
        price: item.price,
        originalPrice: item.originalPrice,
        type: item.type,
        image: item.image,
        tags: item.tags || "",
        inStock: item.inStock,
        isOnSale: item.isOnSale || false,
        isCombo: item.isCombo || false,
        promoType: item.promoType,
      });
    } else if (mode === "create") {
      setFormData({
        name: "",
        description: "",
        price: 0,
        type: "COFFEE" as ItemType,
        image: "",
        inStock: true,
        isOnSale: false,
        isCombo: false,
      });
    }
  }, [item, mode, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "view") return;

    setLoading(true);
    try {
      await onSubmit(formData);
      onOpenChange(false);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    field: keyof CreateMenuItemRequest,
    value: string | number | boolean | undefined | null
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const isReadOnly = mode === "view";
  const title =
    mode === "create"
      ? "Add New Menu Item"
      : mode === "edit"
      ? "Edit Menu Item"
      : "View Menu Item";

  const typeOptions = [
    {
      value: "COFFEE",
      label: "Coffee",
      icon: <Coffee className="w-4 h-4" />,
    },
    {
      value: "PASTRIES",
      label: "Pastries",
      icon: <Utensils className="w-4 h-4" />,
    },
    {
      value: "DRINKS",
      label: "Drinks",
      icon: <GlassWater className="w-4 h-4" />,
    },
    {
      value: "BUNDLES",
      label: "Bundles",
      icon: <Gift className="w-4 h-4" />,
    },
    {
      value: "VEGETARIAN",
      label: "Vegetarian",
      icon: <Leaf className="w-4 h-4" />,
    },
    {
      value: "INSTANT",
      label: "Instant",
      icon: <Clock className="w-4 h-4" />,
    },
    {
      value: "COMBO",
      label: "Combo",
      icon: <ShoppingBag className="w-4 h-4" />,
    },
  ];

  return {
    loading,
    formData,
    handleInputChange,
    handleSubmit,
    isReadOnly,
    title,
    typeOptions,
    isOnSale,
    setIsOnSale,
  };
};
