package gaseco.backend.Auth;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

import java.sql.Connection;
import java.util.List;
import java.util.Map;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;


@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

  
    /* 
    private final JdbcTemplate jdbc;

    public AuthController(@Qualifier("modulocilindroJdbcTemplate") JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }
*/
    /* 
    private final DataSource modulocilindroDataSource;

    public AuthController(@Qualifier("modulocilindroDataSource") DataSource modulocilindroDataSource) {
        this.modulocilindroDataSource = modulocilindroDataSource;
    }*/
    /* 
    private final DataSource seguridadDataSource;
    
    public AuthController(@Qualifier("seguridadDataSource") DataSource modulocilindroDataSource) {
        this.seguridadDataSource = modulocilindroDataSource;
    }
        */
    private final AuthService authService;

    @PostMapping(value = "login")
    public ResponseEntity<AuthResponse> Login(@RequestBody LoginRequest request){
        try{
        return  ResponseEntity.ok(authService.login(request));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body( AuthResponse.builder()
                    .build());
        }

    }

    @PostMapping(value = "register")
    public String Register(){
        return "Register";
    }

    /* 
    @GetMapping("/test-db")
    public String testDb2() {
        try (Connection conn = seguridadDataSource.getConnection()) {
            return "Conectado a DB2: " + conn.getMetaData().getURL();
        } catch (Exception e) {
            return "Error DB2: " + e.getMessage();
        }
    }*/
    
  /* 
         @GetMapping("/cilindros")
    public List<Map<String, Object>> getCilindros() {

        String sql = "SELECT * FROM c_cilindro WHERE cveproducto_cp = 'ACE-15-CI'";

        return jdbc.queryForList(sql);
    }
        */

}
