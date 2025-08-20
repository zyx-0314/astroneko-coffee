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
  private PasswordEncoder passwordEncoder;

  @Override
  public void run(String... args) throws Exception {
    // Only seed if database is empty
    if (userRepository.count() == 0) {
      seedUsers();
    }
  }

  private void seedUsers() {
    List<User> users = new ArrayList<>();

    // Client users (12 clients for better demo data)
    User clientUser1 = new User();
    clientUser1.setFirstName("John");
    clientUser1.setLastName("Smith");
    clientUser1.setUsername("johnsmith");
    clientUser1.setEmail("john.smith@example.com");
    clientUser1.setPassword(passwordEncoder.encode("password123"));
    clientUser1.setRole(User.Role.CLIENT);
    clientUser1.setSex(User.Sex.MALE);
    clientUser1.setPoints(1250);
    clientUser1.setIsActive(true);
    users.add(clientUser1);

    User clientUser2 = new User();
    clientUser2.setFirstName("Jane");
    clientUser2.setLastName("Doe");
    clientUser2.setUsername("janedoe");
    clientUser2.setEmail("jane.doe@example.com");
    clientUser2.setPassword(passwordEncoder.encode("password123"));
    clientUser2.setRole(User.Role.CLIENT);
    clientUser2.setSex(User.Sex.FEMALE);
    clientUser2.setPoints(890);
    clientUser2.setIsActive(true);
    users.add(clientUser2);

    User clientUser3 = new User();
    clientUser3.setFirstName("Michael");
    clientUser3.setLastName("Johnson");
    clientUser3.setUsername("michaeljohnson");
    clientUser3.setEmail("michael.johnson@example.com");
    clientUser3.setPassword(passwordEncoder.encode("password123"));
    clientUser3.setRole(User.Role.CLIENT);
    clientUser3.setSex(User.Sex.MALE);
    clientUser3.setPoints(2100);
    clientUser3.setIsActive(true);
    users.add(clientUser3);

    User clientUser4 = new User();
    clientUser4.setFirstName("Emily");
    clientUser4.setLastName("Davis");
    clientUser4.setUsername("emilydavis");
    clientUser4.setEmail("emily.davis@example.com");
    clientUser4.setPassword(passwordEncoder.encode("password123"));
    clientUser4.setRole(User.Role.CLIENT);
    clientUser4.setSex(User.Sex.FEMALE);
    clientUser4.setPoints(750);
    clientUser4.setIsActive(true);
    users.add(clientUser4);

    User clientUser5 = new User();
    clientUser5.setFirstName("Robert");
    clientUser5.setLastName("Wilson");
    clientUser5.setUsername("robertwilson");
    clientUser5.setEmail("robert.wilson@example.com");
    clientUser5.setPassword(passwordEncoder.encode("password123"));
    clientUser5.setRole(User.Role.CLIENT);
    clientUser5.setSex(User.Sex.MALE);
    clientUser5.setPoints(1800);
    clientUser5.setIsActive(true);
    users.add(clientUser5);

    User clientUser6 = new User();
    clientUser6.setFirstName("Jessica");
    clientUser6.setLastName("Brown");
    clientUser6.setUsername("jessicabrown");
    clientUser6.setEmail("jessica.brown@example.com");
    clientUser6.setPassword(passwordEncoder.encode("password123"));
    clientUser6.setRole(User.Role.CLIENT);
    clientUser6.setSex(User.Sex.FEMALE);
    clientUser6.setPoints(950);
    clientUser6.setIsActive(false); // Inactive user
    users.add(clientUser6);

    User clientUser7 = new User();
    clientUser7.setFirstName("William");
    clientUser7.setLastName("Miller");
    clientUser7.setUsername("williammiller");
    clientUser7.setEmail("william.miller@example.com");
    clientUser7.setPassword(passwordEncoder.encode("password123"));
    clientUser7.setRole(User.Role.CLIENT);
    clientUser7.setSex(User.Sex.MALE);
    clientUser7.setPoints(3200);
    clientUser7.setIsActive(true);
    users.add(clientUser7);

    User clientUser8 = new User();
    clientUser8.setFirstName("Ashley");
    clientUser8.setLastName("Garcia");
    clientUser8.setUsername("ashleygarcia");
    clientUser8.setEmail("ashley.garcia@example.com");
    clientUser8.setPassword(passwordEncoder.encode("password123"));
    clientUser8.setRole(User.Role.CLIENT);
    clientUser8.setSex(User.Sex.FEMALE);
    clientUser8.setPoints(1450);
    clientUser8.setIsActive(true);
    users.add(clientUser8);

    User clientUser9 = new User();
    clientUser9.setFirstName("Christopher");
    clientUser9.setLastName("Martinez");
    clientUser9.setUsername("christophermartinez");
    clientUser9.setEmail("christopher.martinez@example.com");
    clientUser9.setPassword(passwordEncoder.encode("password123"));
    clientUser9.setRole(User.Role.CLIENT);
    clientUser9.setSex(User.Sex.MALE);
    clientUser9.setPoints(680);
    clientUser9.setIsActive(false); // Inactive user
    users.add(clientUser9);

    User clientUser10 = new User();
    clientUser10.setFirstName("Amanda");
    clientUser10.setLastName("Taylor");
    clientUser10.setUsername("amandataylor");
    clientUser10.setEmail("amanda.taylor@example.com");
    clientUser10.setPassword(passwordEncoder.encode("password123"));
    clientUser10.setRole(User.Role.CLIENT);
    clientUser10.setSex(User.Sex.FEMALE);
    clientUser10.setPoints(1125);
    clientUser10.setIsActive(true);
    users.add(clientUser10);

    User clientUser11 = new User();
    clientUser11.setFirstName("Daniel");
    clientUser11.setLastName("Anderson");
    clientUser11.setUsername("danielanderson");
    clientUser11.setEmail("daniel.anderson@example.com");
    clientUser11.setPassword(passwordEncoder.encode("password123"));
    clientUser11.setRole(User.Role.CLIENT);
    clientUser11.setSex(User.Sex.MALE);
    clientUser11.setPoints(2750);
    clientUser11.setIsActive(true);
    users.add(clientUser11);

    User clientUser12 = new User();
    clientUser12.setFirstName("Melissa");
    clientUser12.setLastName("Thomas");
    clientUser12.setUsername("melissathomas");
    clientUser12.setEmail("melissa.thomas@example.com");
    clientUser12.setPassword(passwordEncoder.encode("password123"));
    clientUser12.setRole(User.Role.CLIENT);
    clientUser12.setSex(User.Sex.FEMALE);
    clientUser12.setPoints(825);
    clientUser12.setIsActive(true);
    users.add(clientUser12);

    // Staff users
    User manager = new User();
    manager.setFirstName("Alex");
    manager.setLastName("Thompson");
    manager.setUsername("alexthompson");
    manager.setEmail("alex.thompson@astroneko.com");
    manager.setPassword(passwordEncoder.encode("password123"));
    manager.setRole(User.Role.MANAGER);
    manager.setSex(User.Sex.MALE);
    manager.setAvatar("/placeholder/user/Male.png");
    manager.setShiftStart("08:00");
    manager.setShiftEnd("17:00");
    users.add(manager);

    User cashier = new User();
    cashier.setFirstName("Sarah");
    cashier.setLastName("Johnson");
    cashier.setUsername("sarahjohnson");
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
    cook.setFirstName("Mike");
    cook.setLastName("Rodriguez");
    cook.setUsername("mikerodriguez");
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
    barista.setFirstName("Emma");
    barista.setLastName("Wilson");
    barista.setUsername("emmawilson");
    barista.setEmail("emma.wilson@astroneko.com");
    barista.setPassword(passwordEncoder.encode("password123"));
    barista.setRole(User.Role.BARISTA);
    barista.setSex(User.Sex.FEMALE);
    barista.setAvatar("/placeholder/user/Female.png");
    barista.setShiftStart("10:00");
    barista.setShiftEnd("19:00");
    users.add(barista);

    User helper = new User();
    helper.setFirstName("David");
    helper.setLastName("Chen");
    helper.setUsername("davidchen");
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
}
