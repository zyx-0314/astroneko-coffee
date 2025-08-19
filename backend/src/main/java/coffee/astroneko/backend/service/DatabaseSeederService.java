package coffee.astroneko.backend.service;

import coffee.astroneko.backend.entity.MenuItem;
import coffee.astroneko.backend.entity.User;
import coffee.astroneko.backend.repository.MenuItemRepository;
import coffee.astroneko.backend.repository.UserRepository;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class DatabaseSeederService implements CommandLineRunner {

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private MenuItemRepository menuItemRepository;

  @Autowired
  private PasswordEncoder passwordEncoder;

  @Override
  public void run(String... args) throws Exception {
    // Only seed if database is empty
    if (userRepository.count() == 0) {
      seedUsers();
    }
    if (menuItemRepository.count() == 0) {
      seedMenuItems();
    }
  }

  private void seedUsers() {
    List<User> users = new ArrayList<>();

    // Client users
    User clientUser = new User();
    clientUser.setName("John Smith");
    clientUser.setEmail("john.smith@example.com");
    clientUser.setPassword(passwordEncoder.encode("password123"));
    clientUser.setRole(User.Role.CLIENT);
    clientUser.setSex(User.Sex.MALE);
    clientUser.setPoints(1250);
    users.add(clientUser);

    User femaleClient = new User();
    femaleClient.setName("Jane Doe");
    femaleClient.setEmail("jane.doe@example.com");
    femaleClient.setPassword(passwordEncoder.encode("password123"));
    femaleClient.setRole(User.Role.CLIENT);
    femaleClient.setSex(User.Sex.FEMALE);
    femaleClient.setPoints(890);
    users.add(femaleClient);

    // Staff users
    User manager = new User();
    manager.setName("Alex Thompson");
    manager.setEmail("alex.thompson@astroneko.com");
    manager.setPassword(passwordEncoder.encode("password123"));
    manager.setRole(User.Role.MANAGER);
    manager.setSex(User.Sex.MALE);
    manager.setAvatar("/placeholder/user/Male.png");
    manager.setShiftStart("08:00");
    manager.setShiftEnd("17:00");
    users.add(manager);

    User cashier = new User();
    cashier.setName("Sarah Johnson");
    cashier.setEmail("sarah.johnson@astroneko.com");
    cashier.setPassword(passwordEncoder.encode("password123"));
    cashier.setRole(User.Role.CASHIER);
    cashier.setSex(User.Sex.FEMALE);
    cashier.setAvatar("/placeholder/user/Female.png");
    cashier.setShiftStart("09:00");
    cashier.setShiftEnd("18:00");
    cashier.setClockInTime("08:55");
    users.add(cashier);

    User cook = new User();
    cook.setName("Mike Rodriguez");
    cook.setEmail("mike.rodriguez@astroneko.com");
    cook.setPassword(passwordEncoder.encode("password123"));
    cook.setRole(User.Role.COOK);
    cook.setSex(User.Sex.MALE);
    cook.setAvatar("/placeholder/user/Male.png");
    cook.setShiftStart("07:30");
    cook.setShiftEnd("16:30");
    cook.setClockInTime("07:25");
    users.add(cook);

    User barista = new User();
    barista.setName("Emma Wilson");
    barista.setEmail("emma.wilson@astroneko.com");
    barista.setPassword(passwordEncoder.encode("password123"));
    barista.setRole(User.Role.BARISTA);
    barista.setSex(User.Sex.FEMALE);
    barista.setAvatar("/placeholder/user/Female.png");
    barista.setShiftStart("10:00");
    barista.setShiftEnd("19:00");
    users.add(barista);

    User helper = new User();
    helper.setName("David Chen");
    helper.setEmail("david.chen@astroneko.com");
    helper.setPassword(passwordEncoder.encode("password123"));
    helper.setRole(User.Role.HELPER);
    helper.setSex(User.Sex.MALE);
    helper.setShiftStart("11:00");
    helper.setShiftEnd("20:00");
    users.add(helper);

    userRepository.saveAll(users);
    System.out.println("✅ Seeded " + users.size() + " users");
  }

  private void seedMenuItems() {
    List<MenuItem> menuItems = new ArrayList<>();

    // Cosmic Coffee Creations (Signature Blends)
    MenuItem milkyWay = new MenuItem();
    milkyWay.setName("Milky Way");
    milkyWay.setDescription(
      "White coffee base, creamy and light with stellar smoothness"
    );
    milkyWay.setPrice(3.99);
    milkyWay.setOriginalPrice(4.50);
    milkyWay.setType(MenuItem.ItemType.COFFEE);
    milkyWay.setImage(
      "/placeholder/product-services/Cosmic_Coffee_Creations_(Signature_Blends).png"
    );
    milkyWay.setRating(4.8);
    milkyWay.setReviewsCount(245);
    milkyWay.setWeeklyReviews(18);
    milkyWay.setMonthlyReviews(67);
    milkyWay.setWeeklyBuys(89);
    milkyWay.setMonthlyBuys(312);
    milkyWay.setPositiveReviewsWeekly(16);
    milkyWay.setPositiveReviewsMonthly(59);
    milkyWay.setTags("signature,bestseller,creamy");
    milkyWay.setInStock(true);
    milkyWay.setIsOnSale(true);
    milkyWay.setPromoType(MenuItem.PromoType.NEEKOGUST);
    menuItems.add(milkyWay);

    MenuItem darkMatter = new MenuItem();
    darkMatter.setName("Dark Matter");
    darkMatter.setDescription(
      "Chocolate-infused rich coffee with cosmic depths"
    );
    darkMatter.setPrice(5.25);
    darkMatter.setOriginalPrice(6.00);
    darkMatter.setType(MenuItem.ItemType.COFFEE);
    darkMatter.setImage(
      "/placeholder/product-services/Cosmic_Coffee_Creations_(Signature_Blends).png"
    );
    darkMatter.setRating(4.9);
    darkMatter.setReviewsCount(312);
    darkMatter.setWeeklyReviews(25);
    darkMatter.setMonthlyReviews(89);
    darkMatter.setWeeklyBuys(145);
    darkMatter.setMonthlyBuys(567);
    darkMatter.setPositiveReviewsWeekly(23);
    darkMatter.setPositiveReviewsMonthly(82);
    darkMatter.setTags("chocolate,rich,bestseller");
    darkMatter.setInStock(true);
    darkMatter.setIsOnSale(true);
    menuItems.add(darkMatter);

    MenuItem cormasNebula = new MenuItem();
    cormasNebula.setName("Cormas Nebula");
    cormasNebula.setDescription(
      "Cookies & cream coffee blend with stellar cookie crumbles"
    );
    cormasNebula.setPrice(4.75);
    cormasNebula.setOriginalPrice(5.50);
    cormasNebula.setType(MenuItem.ItemType.COFFEE);
    cormasNebula.setImage(
      "/placeholder/product-services/Cosmic_Coffee_Creations_(Signature_Blends).png"
    );
    cormasNebula.setRating(4.7);
    cormasNebula.setReviewsCount(189);
    cormasNebula.setWeeklyReviews(12);
    cormasNebula.setMonthlyReviews(43);
    cormasNebula.setWeeklyBuys(67);
    cormasNebula.setMonthlyBuys(234);
    cormasNebula.setPositiveReviewsWeekly(11);
    cormasNebula.setPositiveReviewsMonthly(38);
    cormasNebula.setTags("cookies,cream,sweet");
    cormasNebula.setInStock(true);
    cormasNebula.setIsOnSale(true);
    menuItems.add(cormasNebula);

    MenuItem cosmosBlend = new MenuItem();
    cosmosBlend.setName("Cosmos Blend");
    cosmosBlend.setDescription(
      "Merkat coffee bean specialty with interstellar aroma"
    );
    cosmosBlend.setPrice(5.50);
    cosmosBlend.setType(MenuItem.ItemType.COFFEE);
    cosmosBlend.setImage(
      "/placeholder/product-services/Cosmic_Coffee_Creations_(Signature_Blends).png"
    );
    cosmosBlend.setRating(4.6);
    cosmosBlend.setReviewsCount(156);
    cosmosBlend.setWeeklyReviews(14);
    cosmosBlend.setMonthlyReviews(52);
    cosmosBlend.setWeeklyBuys(78);
    cosmosBlend.setMonthlyBuys(289);
    cosmosBlend.setPositiveReviewsWeekly(12);
    cosmosBlend.setPositiveReviewsMonthly(47);
    cosmosBlend.setTags("specialty,premium,signature");
    cosmosBlend.setInStock(false);
    menuItems.add(cosmosBlend);

    MenuItem starlightLatte = new MenuItem();
    starlightLatte.setName("Starlight Latte");
    starlightLatte.setDescription(
      "Vanilla latte with galaxy art, a visual and taste masterpiece"
    );
    starlightLatte.setPrice(4.25);
    starlightLatte.setOriginalPrice(5.00);
    starlightLatte.setType(MenuItem.ItemType.COFFEE);
    starlightLatte.setImage(
      "/placeholder/product-services/Cosmic_Coffee_Creations_(Signature_Blends).png"
    );
    starlightLatte.setRating(4.8);
    starlightLatte.setReviewsCount(278);
    starlightLatte.setWeeklyReviews(22);
    starlightLatte.setMonthlyReviews(78);
    starlightLatte.setWeeklyBuys(134);
    starlightLatte.setMonthlyBuys(456);
    starlightLatte.setPositiveReviewsWeekly(20);
    starlightLatte.setPositiveReviewsMonthly(71);
    starlightLatte.setTags("vanilla,latte art,instagram worthy");
    starlightLatte.setInStock(true);
    starlightLatte.setIsOnSale(true);
    starlightLatte.setPromoType(MenuItem.PromoType.WELCOME_BACK_SCHOOL);
    menuItems.add(starlightLatte);

    // Add some pastries
    MenuItem meteorBrownie = new MenuItem();
    meteorBrownie.setName("Meteor Brownie");
    meteorBrownie.setDescription(
      "Rich chocolate brownie with cosmic dust and stellar nuts"
    );
    meteorBrownie.setPrice(3.25);
    meteorBrownie.setType(MenuItem.ItemType.PASTRIES);
    meteorBrownie.setImage(
      "/placeholder/product-services/Space_Pastries_&_Treats.png"
    );
    meteorBrownie.setRating(4.6);
    meteorBrownie.setReviewsCount(123);
    meteorBrownie.setWeeklyReviews(8);
    meteorBrownie.setMonthlyReviews(29);
    meteorBrownie.setWeeklyBuys(45);
    meteorBrownie.setMonthlyBuys(167);
    meteorBrownie.setPositiveReviewsWeekly(7);
    meteorBrownie.setPositiveReviewsMonthly(26);
    meteorBrownie.setTags("chocolate,brownie,nuts");
    meteorBrownie.setInStock(true);
    menuItems.add(meteorBrownie);

    MenuItem cosmicCroissant = new MenuItem();
    cosmicCroissant.setName("Cosmic Croissant");
    cosmicCroissant.setDescription(
      "Buttery croissant with stardust filling and galactic glaze"
    );
    cosmicCroissant.setPrice(2.75);
    cosmicCroissant.setType(MenuItem.ItemType.PASTRIES);
    cosmicCroissant.setImage(
      "/placeholder/product-services/Space_Pastries_&_Treats.png"
    );
    cosmicCroissant.setRating(4.4);
    cosmicCroissant.setReviewsCount(89);
    cosmicCroissant.setWeeklyReviews(6);
    cosmicCroissant.setMonthlyReviews(22);
    cosmicCroissant.setWeeklyBuys(32);
    cosmicCroissant.setMonthlyBuys(118);
    cosmicCroissant.setPositiveReviewsWeekly(5);
    cosmicCroissant.setPositiveReviewsMonthly(19);
    cosmicCroissant.setTags("croissant,buttery,pastry");
    cosmicCroissant.setInStock(true);
    menuItems.add(cosmicCroissant);

    // Add some drinks
    MenuItem galaxyTea = new MenuItem();
    galaxyTea.setName("Galaxy Green Tea");
    galaxyTea.setDescription(
      "Refreshing green tea with cosmic herbs and stellar honey"
    );
    galaxyTea.setPrice(3.50);
    galaxyTea.setType(MenuItem.ItemType.DRINKS);
    galaxyTea.setImage(
      "/placeholder/product-services/Non-Coffee_Galactic_Drinks.png"
    );
    galaxyTea.setRating(4.3);
    galaxyTea.setReviewsCount(67);
    galaxyTea.setWeeklyReviews(4);
    galaxyTea.setMonthlyReviews(15);
    galaxyTea.setWeeklyBuys(23);
    galaxyTea.setMonthlyBuys(84);
    galaxyTea.setPositiveReviewsWeekly(3);
    galaxyTea.setPositiveReviewsMonthly(13);
    galaxyTea.setTags("tea,green tea,healthy");
    galaxyTea.setInStock(true);
    menuItems.add(galaxyTea);

    MenuItem starburstSmoothie = new MenuItem();
    starburstSmoothie.setName("Starburst Smoothie");
    starburstSmoothie.setDescription(
      "Mixed berry smoothie with cosmic protein and stellar energy"
    );
    starburstSmoothie.setPrice(5.99);
    starburstSmoothie.setType(MenuItem.ItemType.DRINKS);
    starburstSmoothie.setImage(
      "/placeholder/product-services/Non-Coffee_Galactic_Drinks.png"
    );
    starburstSmoothie.setRating(4.7);
    starburstSmoothie.setReviewsCount(145);
    starburstSmoothie.setWeeklyReviews(11);
    starburstSmoothie.setMonthlyReviews(38);
    starburstSmoothie.setWeeklyBuys(56);
    starburstSmoothie.setMonthlyBuys(201);
    starburstSmoothie.setPositiveReviewsWeekly(10);
    starburstSmoothie.setPositiveReviewsMonthly(34);
    starburstSmoothie.setTags("smoothie,berry,protein");
    starburstSmoothie.setInStock(true);
    menuItems.add(starburstSmoothie);

    menuItemRepository.saveAll(menuItems);
    System.out.println("✅ Seeded " + menuItems.size() + " menu items");
  }
}
