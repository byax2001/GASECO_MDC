package gaseco.backend.Entitys.User;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "USUARIO", uniqueConstraints = {@UniqueConstraint(columnNames = "login")})
public class User implements UserDetails {
    @Id
    @Column(name = "LOGIN", length = 12, nullable = false)
    String login;
    @Column(name = "PASSWORD", length = 20)
    String password;

    @Column(name = "DESUSUARIO", length = 100)
    String desusuario;

    @Column(name = "CVEAPP", length = 8, nullable = false)
    String cveapp;

    @Column(name = "CVEDEPTO", length = 8)
    String cvedepto;

    @Column(name = "CVECC", length = 5)
    String cvecc;

    @Column(name = "CVEAREACONSUMO", length = 5)
    String cveareaconsumo;

    @Column(name = "CVEEMP", length = 6)
    String cveemp;

    @Column(name = "STATUS", length = 1)
    String status;

    @Column(name = "SIGLAS", length = 4)
    String siglas;

    @Column(name = "CVEDEPTOCXP", length = 4)
    String cvedeptocxp;

    @Column(name = "CLASIF_MTTO", length = 20)
    String clasifMtto;

    @Column(name = "EMAIL", length = 40)
    String email;

    @Column(name = "CVEAREA", length = 6)
    String cvearea;

    @Column(name = "CVEDIRECCION", length = 3)
    String cvedireccion;

    @Column(name = "DIASESPUSOMES", precision = 2, scale = 0)
    BigDecimal diasespusomes;

    @Column(name = "CVESUCURSAL", length = 6)
    String cvesucursal;

    @Column(name = "CVEALMACEN", length = 5)
    String cvealmacen;

    @Column(name = "FH_VENCIMINETO")
    LocalDate fhVencimineto;

    @Column(name = "INTENTOS_PASSWORD", precision = 1, scale = 0)
    int intentosPassword;

    @Column(name = "ROL_APP", length = 8)
    String Rol;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // La autoridad sera la variable AREA_WEB, pero se le antepone el prefijo "ROLE_"
        return List.of(new SimpleGrantedAuthority("ROLE_" + this.Rol));
    }

    @Override
    public String getUsername() {
        // TODO Auto-generated method stub
        return this.login; 
    }

    @Override
    public String getPassword() {
        // TODO Auto-generated method stub
        return this.password;
    }

     @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return this.intentosPassword == 0;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return this.fhVencimineto.isAfter(LocalDate.now());
    }

    @Override
    public boolean isEnabled() {
        return this.status.equals("A");
    }
    


}
