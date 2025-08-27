"use client";

import { Star, TrendingUp, Users } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { CreateMenuItemRequest, CRUMenuItemModalProps, ItemType } from '@/schema/menuItem.schema';

import { useCRUMenuItemModalState } from './CRUMenuItemModalhook';

export default function CRUMenuItemModal({
  open,
  onOpenChange,
  onSubmit,
  item,
  mode,
}: CRUMenuItemModalProps) {
  const {
    loading,
    formData,
    handleInputChange,
    handleSubmit,
    isReadOnly,
    title,
    typeOptions,
    isOnSale,
    setIsOnSale,
  } = useCRUMenuItemModalState({ open, onOpenChange, onSubmit, item, mode });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[50vw] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {mode === "create" &&
              "Create a new menu item for your coffee shop."}
            {mode === "edit" && "Update the details of this menu item."}
            {mode === "view" &&
              "View the details and analytics of this menu item."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="gap-6 grid grid-cols-1 lg:grid-cols-2">
            {/* Left Column - Basic Info */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Cappuccino"
                  required
                  disabled={isReadOnly}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  placeholder="Rich espresso with steamed milk foam..."
                  rows={3}
                  required
                  disabled={isReadOnly}
                />
              </div>

              <div className="gap-4 grid grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="price">Price * ($)</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.price}
                    onChange={(e) =>
                      handleInputChange(
                        "price",
                        parseFloat(e.target.value) || 0
                      )
                    }
                    placeholder="4.50"
                    required
                    disabled={isReadOnly}
                  />
                </div>

                {isOnSale && (
                  <div className="space-y-2">
                    <Label htmlFor="originalPrice">Original Price ($)</Label>
                    <Input
                      id="originalPrice"
                      type="number"
                      step="0.01"
                      min="0"
                      value={formData.originalPrice || ""}
                      onChange={(e) =>
                        handleInputChange(
                          "originalPrice",
                          e.target.value
                            ? parseFloat(e.target.value)
                            : undefined
                        )
                      }
                      placeholder="5.00"
                      disabled={isReadOnly}
                    />
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">Category *</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) =>
                    handleInputChange("type", value as ItemType)
                  }
                  disabled={isReadOnly}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {typeOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        <div className="flex items-center gap-2">
                          {option.icon}
                          {option.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Image URL</Label>
                <Input
                  id="image"
                  value={formData.image || ""}
                  onChange={(e) => handleInputChange("image", e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  disabled={isReadOnly}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">Tags</Label>
                <Input
                  id="tags"
                  value={formData.tags || ""}
                  onChange={(e) => handleInputChange("tags", e.target.value)}
                  placeholder="hot, caffeinated, popular"
                  disabled={isReadOnly}
                />
              </div>
            </div>

            {/* Right Column - Settings & Analytics */}
            <div className="space-y-4">
              {/* Toggles */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-medium text-sm">
                    Item Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="space-y-0.5">
                      <Label>In Stock</Label>
                      <p className="text-muted-foreground text-sm">
                        Item is available for order
                      </p>
                    </div>
                    <Switch
                      checked={formData.inStock || false}
                      onCheckedChange={(checked) =>
                        handleInputChange("inStock", checked)
                      }
                      disabled={isReadOnly}
                    />
                  </div>

                  <Separator />

                  <div className="flex justify-between items-center">
                    <div className="space-y-0.5">
                      <Label>On Sale</Label>
                      <p className="text-muted-foreground text-sm">
                        Item has a discounted price
                      </p>
                    </div>
                    <Switch
                      checked={formData.isOnSale || false}
                      onCheckedChange={(checked) => {
                        handleInputChange("isOnSale", checked);
                        setIsOnSale(checked);
                      }}
                      disabled={isReadOnly}
                    />
                  </div>

                  <Separator />

                  <div className="flex justify-between items-center">
                    <div className="space-y-0.5">
                      <Label>Combo Item</Label>
                      <p className="text-muted-foreground text-sm">
                        Item is part of a combo deal
                      </p>
                    </div>
                    <Switch
                      checked={formData.isCombo || false}
                      onCheckedChange={(checked) =>
                        handleInputChange("isCombo", checked)
                      }
                      disabled={isReadOnly}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Promo Type */}
              {isOnSale && (
                <div className="space-y-2">
                  <Label htmlFor="promoType">Promotion Type</Label>
                  <Input
                    id="promoType"
                    value={formData.promoType || ""}
                    onChange={(e) =>
                      handleInputChange("promoType", e.target.value || null)
                    }
                    placeholder="Enter promotion name (e.g. Summer Special)"
                    disabled={isReadOnly}
                  />
                </div>
              )}

              {/* Analytics - Only show in view/edit mode */}
              {(mode === "view" || mode === "edit") && item && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 font-medium text-sm">
                      <TrendingUp className="w-4 h-4" />
                      Analytics
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="gap-4 grid grid-cols-2">
                      <div className="text-center">
                        <div className="flex justify-center items-center gap-1 mb-1">
                          <Star className="w-4 h-4 text-yellow-500" />
                        </div>
                        <p className="font-bold text-2xl">
                          {item.rating?.toFixed(1) || "0.0"}
                        </p>
                        <p className="text-muted-foreground text-xs">Rating</p>
                      </div>
                      <div className="text-center">
                        <div className="flex justify-center items-center gap-1 mb-1">
                          <Users className="w-4 h-4 text-blue-500" />
                        </div>
                        <p className="font-bold text-2xl">
                          {item.reviewsCount || 0}
                        </p>
                        <p className="text-muted-foreground text-xs">Reviews</p>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground text-sm">
                          Weekly Sales
                        </span>
                        <Badge variant="secondary">
                          {item.weeklyBuys || 0}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground text-sm">
                          Monthly Sales
                        </span>
                        <Badge variant="secondary">
                          {item.monthlyBuys || 0}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground text-sm">
                          Weekly Reviews
                        </span>
                        <Badge variant="outline">
                          {item.weeklyReviews || 0}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground text-sm">
                          Monthly Reviews
                        </span>
                        <Badge variant="outline">
                          {item.monthlyReviews || 0}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Image Preview */}
          {formData.image && (
            <div className="space-y-2">
              <Label>Image Preview</Label>
              <div className="relative border rounded-lg w-full h-48 overflow-hidden">
                <img
                  src={formData.image}
                  alt="Menu item preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/placeholder/menu-item.jpg";
                  }}
                />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            {!isReadOnly && (
              <Button type="submit" disabled={loading}>
                {loading
                  ? "Saving..."
                  : mode === "create"
                  ? "Create Item"
                  : "Update Item"}
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
