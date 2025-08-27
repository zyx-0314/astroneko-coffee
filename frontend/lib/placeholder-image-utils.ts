export function GenerateMenuItemPlaceholder(type:string) {
    switch (type) {
      case 'COFFEE':
        return '/placeholder/product-services/Cosmic_Coffee_Creations_(Signature_Blends).png';
      case 'PASTRIES':
        return '/placeholder/product-services/Pastries_and_Treats.png';
      case 'DRINKS':
        return '/placeholder/product-services/Non_Coffee_Galactic_Drinks.png';
      case 'BUNDLES':
        return '/placeholder/product-services/Special_Bundles_and_Services.png';
      case 'VEGETARIAN':
        return '/placeholder/product-services/Vegetarian_and_Light_Options.png';
      case 'INSTANT':
        return '/placeholder/product-services/Instant_and_Take_Home.png';
      case 'COMBO':
        return '/placeholder/product-services/Special_Bundles_and_Services.png';
      default:
        return '/placeholder/menu-item.jpg';
    }
  };
