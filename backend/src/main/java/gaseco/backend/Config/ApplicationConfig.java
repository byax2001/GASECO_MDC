package gaseco.backend.Config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.reactive.function.client.WebClient;

import gaseco.backend.Entitys.User.UserRepository;
import lombok.RequiredArgsConstructor;

@Configuration
@RequiredArgsConstructor
public class ApplicationConfig {

    private final UserRepository userRepository;
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config){
        return config.getAuthenticationManager();
    }

    @Bean
    public AuthenticationProvider authenticationProvider(){
        DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider(userDetailService());
        authenticationProvider.setPasswordEncoder(passwordEncoder());
        return authenticationProvider;
    }
    @Bean
    public PasswordEncoder passwordEncoder(){
        // si se quiere validar la contraseña encriptada, se debe descomentar la línea de encriptación en el método register de AuthService
        //return new BCryptPasswordEncoder();
        //Sin embargo si la contraseña se validara como texto plano, se debe comentar la línea de encriptación en el método register de AuthService
        return NoOpPasswordEncoder.getInstance();
    }
    
    @Bean
    public UserDetailsService userDetailService(){
        return login -> userRepository.findByLogin(login)
        .orElseThrow(() -> new RuntimeException("User not found"));
    }   

    // PARA CONSUMIR APIS
    @Bean
    public WebClient webClient() {
        return WebClient.builder().build();
    }

    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public class LoginIncorrectoException extends RuntimeException {
        public LoginIncorrectoException() {
            super("Usuario o contraseña incorrectos");
        }
    }

    
}
