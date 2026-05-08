package gaseco.backend.Config;


import javax.sql.DataSource;

import org.springframework.boot.jdbc.autoconfigure.DataSourceProperties;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

import com.zaxxer.hikari.HikariDataSource;

@Configuration
@EnableWebSecurity
public class DataBaseConfig {

    @Bean
    @ConfigurationProperties("spring.datasource.modulocilindro")
    public DataSourceProperties modulocilindroProperties() {
        return new DataSourceProperties();
    }

    @Bean(name = "modulocilindroDataSource")
    @Primary
    public DataSource modulocilindroDataSource() {
        return modulocilindroProperties()
                .initializeDataSourceBuilder()
                .type(HikariDataSource.class)
                .build();
    }

    @Bean
    public org.springframework.jdbc.core.JdbcTemplate modulocilindroJdbcTemplate(
            @Qualifier("modulocilindroDataSource") DataSource dataSource) {
        return new org.springframework.jdbc.core.JdbcTemplate(dataSource);
    }

    // BASE DE DATOS DE SEGURIDAD
    @Bean
    @ConfigurationProperties("spring.datasource.seguridad")
    public DataSourceProperties seguridadProperties() {
        return new DataSourceProperties();
    }

    @Bean(name = "seguridadDataSource")
    public DataSource seguridadDataSource() {
        return seguridadProperties()
                .initializeDataSourceBuilder()
                .type(HikariDataSource.class)
                .build();
    }

     @Bean
    public org.springframework.jdbc.core.JdbcTemplate seguridadJdbcTemplate(
            @Qualifier("seguridadDataSource") DataSource dataSource) {
        return new org.springframework.jdbc.core.JdbcTemplate(dataSource);
    }
    
}