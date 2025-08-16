export interface MenuItem {
    id: string;
    name: string;
    price: string;
}

// Schema for creating a new menu item (without ID)
export interface CreateMenuItemRequest {
    name: string;
    price: number;
}

// Schema for updating a menu item
export interface UpdateMenuItemRequest {
    name: string;
    price: number;
}

// Schema for the backend response (with numeric price)
export interface MenuItemResponse {
    id: number;
    name: string;
    price: number;
}
