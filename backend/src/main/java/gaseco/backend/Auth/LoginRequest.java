package gaseco.backend.Auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

//Con estas anotaciones me evito crear constructores, getters y setters
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LoginRequest {
    String login;
    String password;
}
