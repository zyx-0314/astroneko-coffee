package coffee.astroneko.backend.service;

import coffee.astroneko.backend.dto.CustomerResponse;
import coffee.astroneko.backend.entity.User;
import coffee.astroneko.backend.repository.UserRepository;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class CustomerService {

  @Autowired
  private UserRepository userRepository;

  @Transactional(readOnly = true)
  public List<CustomerResponse> getAllCustomers() {
    List<User> customers = userRepository.findByRole(User.Role.CLIENT);
    return customers
      .stream()
      .map(this::mapToCustomerResponse)
      .collect(Collectors.toList());
  }

  @Transactional(readOnly = true)
  public List<CustomerResponse> getAllActiveCustomers() {
    List<User> customers = userRepository.findByRoleAndIsActiveTrue(
      User.Role.CLIENT
    );
    return customers
      .stream()
      .map(this::mapToCustomerResponse)
      .collect(Collectors.toList());
  }

  @Transactional(readOnly = true)
  public Optional<CustomerResponse> getCustomerById(Long id) {
    Optional<User> customer = userRepository.findByIdAndRole(
      id,
      User.Role.CLIENT
    );
    return customer.map(this::mapToCustomerResponse);
  }

  @Transactional(readOnly = true)
  public Optional<CustomerResponse> getCustomerByEmail(String email) {
    Optional<User> customer = userRepository.findByEmailAndRole(
      email,
      User.Role.CLIENT
    );
    return customer.map(this::mapToCustomerResponse);
  }

  @Transactional
  public void deactivateCustomer(Long id) {
    Optional<User> customerOpt = userRepository.findByIdAndRole(
      id,
      User.Role.CLIENT
    );
    if (customerOpt.isPresent()) {
      User customer = customerOpt.get();
      customer.setIsActive(false);
      userRepository.save(customer);
    } else {
      throw new RuntimeException("Customer not found with id: " + id);
    }
  }

  @Transactional
  public void activateCustomer(Long id) {
    Optional<User> customerOpt = userRepository.findByIdAndRole(
      id,
      User.Role.CLIENT
    );
    if (customerOpt.isPresent()) {
      User customer = customerOpt.get();
      customer.setIsActive(true);
      userRepository.save(customer);
    } else {
      throw new RuntimeException("Customer not found with id: " + id);
    }
  }

  private CustomerResponse mapToCustomerResponse(User user) {
    CustomerResponse response = new CustomerResponse();

    // User information
    response.setId(user.getId());
    response.setFirstName(user.getFirstName());
    response.setLastName(user.getLastName());
    response.setUsername(user.getUsername());
    response.setEmail(user.getEmail());
    response.setSex(user.getSex());
    response.setAvatar(user.getAvatar());
    response.setPoints(user.getPoints());
    response.setIsActive(user.getIsActive());
    response.setCreatedAt(user.getCreatedAt());
    response.setUpdatedAt(user.getUpdatedAt());

    return response;
  }
}
