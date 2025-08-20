'use client';

import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Star, TrendingUp, Users, Calendar, DollarSign, Package, Coffee, Utensils, GlassWater, Gift, Leaf, Clock, ShoppingBag } from 'lucide-react';
import { CreateMenuItemRequest, UpdateMenuItemRequest, MenuItemResponse, ItemType, PromoType } from '@/schema/menuItem.schema';

interface MenuItemDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: CreateMenuItemRequest | UpdateMenuItemRequest) => Promise<void>;
  item?: MenuItemResponse | null;
  mode: 'create' | 'edit' | 'view';
}

const typeOptions = [
  { value: 'COFFEE', label: 'Coffee', icon: <Coffee className="h-4 w-4" /> },
  { value: 'PASTRIES', label: 'Pastries', icon: <Utensils className="h-4 w-4" /> },
  { value: 'DRINKS', label: 'Drinks', icon: <GlassWater className="h-4 w-4" /> },
  { value: 'BUNDLES', label: 'Bundles', icon: <Gift className="h-4 w-4" /> },
  { value: 'VEGETARIAN', label: 'Vegetarian', icon: <Leaf className="h-4 w-4" /> },
  { value: 'INSTANT', label: 'Instant', icon: <Clock className="h-4 w-4" /> },
  { value: 'COMBO', label: 'Combo', icon: <ShoppingBag className="h-4 w-4" /> }
];

const promoTypeOptions = [
  { value: 'NEEKOGUST', label: 'Neekogust' },
  { value: 'WELCOME_BACK_SCHOOL', label: 'Welcome Back School' }
];

export default function MenuItemDialog({ open, onOpenChange, onSubmit, item, mode }: MenuItemDialogProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<CreateMenuItemRequest>({
    name: '',
    description: '',
    price: 0,
    type: 'COFFEE' as ItemType,
    image: '',
    inStock: true,
    isOnSale: false,
    isCombo: false,
  });

  useEffect(() => {
    if (item && (mode === 'edit' || mode === 'view')) {
      setFormData({
        name: item.name,
        description: item.description,
        price: item.price,
        originalPrice: item.originalPrice,
        type: item.type,
        image: item.image,
        tags: item.tags || '',
        inStock: item.inStock,
        isOnSale: item.isOnSale || false,
        isCombo: item.isCombo || false,
        promoType: item.promoType,
      });
    } else if (mode === 'create') {
      setFormData({
        name: '',
        description: '',
        price: 0,
        type: 'COFFEE' as ItemType,
        image: '',
        inStock: true,
        isOnSale: false,
        isCombo: false,
      });
    }
  }, [item, mode, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'view') return;

    setLoading(true);
    try {
      await onSubmit(formData);
      onOpenChange(false);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof CreateMenuItemRequest, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isReadOnly = mode === 'view';
  const title = mode === 'create' ? 'Add New Menu Item' : mode === 'edit' ? 'Edit Menu Item' : 'View Menu Item';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {mode === 'create' && 'Create a new menu item for your coffee shop.'}
            {mode === 'edit' && 'Update the details of this menu item.'}
            {mode === 'view' && 'View the details and analytics of this menu item.'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column - Basic Info */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
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
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Rich espresso with steamed milk foam..."
                  rows={3}
                  required
                  disabled={isReadOnly}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Price * ($)</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.price}
                    onChange={(e) => handleInputChange('price', parseFloat(e.target.value) || 0)}
                    placeholder="4.50"
                    required
                    disabled={isReadOnly}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="originalPrice">Original Price ($)</Label>
                  <Input
                    id="originalPrice"
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.originalPrice || ''}
                    onChange={(e) => handleInputChange('originalPrice', e.target.value ? parseFloat(e.target.value) : undefined)}
                    placeholder="5.00"
                    disabled={isReadOnly}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">Category *</Label>
                <Select 
                  value={formData.type} 
                  onValueChange={(value) => handleInputChange('type', value as ItemType)}
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
                <Label htmlFor="image">Image URL *</Label>
                <Input
                  id="image"
                  value={formData.image}
                  onChange={(e) => handleInputChange('image', e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  required
                  disabled={isReadOnly}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">Tags</Label>
                <Input
                  id="tags"
                  value={formData.tags || ''}
                  onChange={(e) => handleInputChange('tags', e.target.value)}
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
                  <CardTitle className="text-sm font-medium">Item Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>In Stock</Label>
                      <p className="text-sm text-muted-foreground">Item is available for order</p>
                    </div>
                    <Switch
                      checked={formData.inStock || false}
                      onCheckedChange={(checked) => handleInputChange('inStock', checked)}
                      disabled={isReadOnly}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>On Sale</Label>
                      <p className="text-sm text-muted-foreground">Item has a discounted price</p>
                    </div>
                    <Switch
                      checked={formData.isOnSale || false}
                      onCheckedChange={(checked) => handleInputChange('isOnSale', checked)}
                      disabled={isReadOnly}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Combo Item</Label>
                      <p className="text-sm text-muted-foreground">Item is part of a combo deal</p>
                    </div>
                    <Switch
                      checked={formData.isCombo || false}
                      onCheckedChange={(checked) => handleInputChange('isCombo', checked)}
                      disabled={isReadOnly}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Promo Type */}
              <div className="space-y-2">
                <Label htmlFor="promoType">Promotion Type</Label>
                <Select 
                  value={formData.promoType || 'none'} 
                  onValueChange={(value) => handleInputChange('promoType', value === 'none' ? null : value)}
                  disabled={isReadOnly}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="No promotion" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No promotion</SelectItem>
                    {promoTypeOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Analytics - Only show in view/edit mode */}
              {(mode === 'view' || mode === 'edit') && item && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm font-medium flex items-center gap-2">
                      <TrendingUp className="h-4 w-4" />
                      Analytics
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-1 mb-1">
                          <Star className="h-4 w-4 text-yellow-500" />
                        </div>
                        <p className="text-2xl font-bold">{item.rating?.toFixed(1) || '0.0'}</p>
                        <p className="text-xs text-muted-foreground">Rating</p>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-1 mb-1">
                          <Users className="h-4 w-4 text-blue-500" />
                        </div>
                        <p className="text-2xl font-bold">{item.reviewsCount || 0}</p>
                        <p className="text-xs text-muted-foreground">Reviews</p>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Weekly Sales</span>
                        <Badge variant="secondary">{item.weeklyBuys || 0}</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Monthly Sales</span>
                        <Badge variant="secondary">{item.monthlyBuys || 0}</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Weekly Reviews</span>
                        <Badge variant="outline">{item.weeklyReviews || 0}</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Monthly Reviews</span>
                        <Badge variant="outline">{item.monthlyReviews || 0}</Badge>
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
              <div className="relative w-full h-48 rounded-lg overflow-hidden border">
                <img
                  src={formData.image}
                  alt="Menu item preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/placeholder/menu-item.jpg';
                  }}
                />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            {!isReadOnly && (
              <Button type="submit" disabled={loading}>
                {loading ? 'Saving...' : mode === 'create' ? 'Create Item' : 'Update Item'}
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
