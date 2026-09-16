package gaseco.backend.AppWeb.Info_Permisos.Controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.core.Authentication;

import gaseco.backend.AppWeb.Info_Permisos.DTO.Response.RolResponse;
import gaseco.backend.AppWeb.Info_Permisos.DTO.Response.UsernameResponse;
import gaseco.backend.AppWeb.Info_Permisos.DTO.Response.EpicorUserResponse;
import gaseco.backend.AppWeb.Info_Permisos.Services.UserInfoService;
import gaseco.backend.Entitys.User.User;
import gaseco.backend.JwtAuthenticationFilter.JwtService;
import lombok.RequiredArgsConstructor;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/user-info")
@RequiredArgsConstructor
public class UserInfoController {
    private final UserInfoService userInfoService;
    private final JwtService jwtService;
    

    @GetMapping("/username")  //Se puede obtener directamente el Authentication como parámetro del método, Spring lo inyectará automáticamente con la información del usuario autenticado.
    public ResponseEntity<UsernameResponse> getUsername(Authentication authInfo) {
        // Obtener la autenticación actual del contexto de seguridad de Spring
        // Esto se hace para obtener información sobre el usuario autenticado, como su nombre de usuario, roles, etc.
        // Metodos que se desarrollaron  en el archivo JwtService.java para generar el token JWT y extraer información del mismo, como el nombre de usuario.
        //Authentication authInfo = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) authInfo.getPrincipal();

        UsernameResponse usernameResponse = UsernameResponse.builder()
                .username(authInfo.getName())
                .rol(authInfo.getAuthorities().stream().findFirst().map(authority -> authority.getAuthority().replace("ROLE_", "")).orElse(""))
                .desusuario(user.getDesusuario()) //NOMBRE DE USUARIO
                .epicorU(user.getEpicorU()) //USUARIO DE EPICOR
                .build();

        return ResponseEntity.ok(usernameResponse);
    }

    @GetMapping("/rol")
    public ResponseEntity<RolResponse> getUserRole(Authentication authInfo) { // Imprimir el token para verificar su valor
       
        String rol = authInfo.getAuthorities()
        .stream()
        .findFirst()
        .map(authority -> authority.getAuthority().replace("ROLE_", ""))
        .orElse("");

        RolResponse rolResponse = RolResponse.builder()
                .rol(rol)
                .build();

        return ResponseEntity.ok(rolResponse);
    }

    //SE OBTENDRA EL USUARIO DE EPICOR DESDE EL CLAIM
    @GetMapping("/epicoru")
    public ResponseEntity<EpicorUserResponse> getEpicorU(Authentication authInfo) {
        User user = (User) authInfo.getPrincipal();
        String epicorU = user.getEpicorU();
        EpicorUserResponse response = EpicorUserResponse.builder().EpicorU(epicorU).build();
        return ResponseEntity.ok(response);
    }
    

    @GetMapping("/{username}")
    public ResponseEntity<List<Map<String, Object>>> getUserInfo(@PathVariable String username) {
        List<Map<String, Object>> userInfo = userInfoService.getUserInfo(username);
        return ResponseEntity.ok(userInfo);
    }

    
}
