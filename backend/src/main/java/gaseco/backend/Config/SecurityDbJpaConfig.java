package gaseco.backend.Config;

import java.util.HashMap;
import java.util.Map;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.PlatformTransactionManager;

@Configuration
@EnableJpaRepositories(
    basePackages = "gaseco.backend.Entitys.User",
    entityManagerFactoryRef = "seguridadEntityManagerFactory",
    transactionManagerRef = "seguridadTransactionManager"
)
public class SecurityDbJpaConfig {

    @Bean
    public LocalContainerEntityManagerFactoryBean seguridadEntityManagerFactory(
            @Qualifier("seguridadDataSource") DataSource dataSource) {

        LocalContainerEntityManagerFactoryBean em = new LocalContainerEntityManagerFactoryBean();
        em.setDataSource(dataSource);
        em.setPackagesToScan("gaseco.backend.Entitys.User");
        em.setPersistenceUnitName("seguridadPU");

        HibernateJpaVendorAdapter vendorAdapter = new HibernateJpaVendorAdapter();
        em.setJpaVendorAdapter(vendorAdapter);

        Map<String, Object> properties = new HashMap<>();
        properties.put("hibernate.hbm2ddl.auto", "none");
        properties.put("hibernate.show_sql", "true");
        properties.put("hibernate.format_sql", "true");
        properties.put("hibernate.dialect", "org.hibernate.dialect.OracleDialect");

        em.setJpaPropertyMap(properties);

        return em;
    }

    @Bean
    public PlatformTransactionManager seguridadTransactionManager(
            @Qualifier("seguridadEntityManagerFactory")
            LocalContainerEntityManagerFactoryBean seguridadEntityManagerFactory) {
        return new JpaTransactionManager(seguridadEntityManagerFactory.getObject());
    }
}