package gaseco.backend.Auth;

import java.math.BigDecimal;
import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {
    String login;
    String password;
    String desusuario;
    String cveapp;
    String cvedepto;
    String cvecc;
    String cveareaconsumo;
    String cveemp;
    String status;
    String siglas;
    String cvedeptocxp;
    String clasifMtto;
    String email;
    String cvearea;
    String cvedireccion;
    BigDecimal diasespusomes;
    String cvesucursal;
    String cvealmacen;
    LocalDate fhVencimineto;
    int intentosPassword;
}
