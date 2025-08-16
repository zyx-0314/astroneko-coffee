package coffee.astroneko.backend.config;

import java.util.Properties;
import javax.sql.DataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.PlatformTransactionManager;

@Configuration
public class JpaConfig {

  @Autowired
  private DataSource dataSource;

  @Bean
  public LocalContainerEntityManagerFactoryBean entityManagerFactory() {
    LocalContainerEntityManagerFactoryBean factoryBean =
      new LocalContainerEntityManagerFactoryBean();
    factoryBean.setDataSource(dataSource);
    factoryBean.setPackagesToScan("coffee.astroneko.backend.entity");
    factoryBean.setJpaVendorAdapter(new HibernateJpaVendorAdapter());

    Properties jpaProperties = new Properties();
    jpaProperties.put(
      "hibernate.dialect",
      "org.hibernate.dialect.PostgreSQLDialect"
    );
    jpaProperties.put("hibernate.hbm2ddl.auto", "update");
    jpaProperties.put("hibernate.show_sql", "true");
    factoryBean.setJpaProperties(jpaProperties);

    return factoryBean;
  }

  @Bean
  public PlatformTransactionManager transactionManager() {
    JpaTransactionManager transactionManager = new JpaTransactionManager();
    transactionManager.setEntityManagerFactory(
      entityManagerFactory().getObject()
    );
    return transactionManager;
  }
}
