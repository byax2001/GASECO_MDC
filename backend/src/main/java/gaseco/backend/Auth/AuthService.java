package gaseco.backend.Auth;


import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import gaseco.backend.Entitys.User.User;
import gaseco.backend.Entitys.User.UserRepository;
import gaseco.backend.JwtAuthenticationFilter.JwtService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final AuthenticationManager authenticationManager;    
    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;

    public AuthResponse login(LoginRequest request) {
     
        
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                request.getLogin(),
                request.getPassword()
            )
        );

        User user=userRepository.findByLogin(request.getLogin()).orElseThrow();
        String token=jwtService.getToken(user);
        return AuthResponse.builder()
            .token(token)
            .build();

    }

    public AuthResponse register(RegisterRequest request) {
        User user = User.builder()
            .login(request.getLogin())
            //Se encripta la contraseña antes de guardarla en la base de datos
            //.password(passwordEncoder.encode( request.getPassword()))
            .password(request.getPassword())
            .desusuario(request.getDesusuario())
            .cveapp(request.getCveapp())
            .cvedepto(request.getCvedepto())
            .cvecc(request.getCvecc())
            .cveareaconsumo(request.getCveareaconsumo())
            .cveemp(request.getCveemp())
            .status(request.getStatus())
            .siglas(request.getSiglas())
            .cvedeptocxp(request.getCvedeptocxp())
            .clasifMtto(request.getClasifMtto())
            .email(request.getEmail())
            .cvearea(request.getCvearea())
            .cvedireccion(request.getCvedireccion())
            .diasespusomes(request.getDiasespusomes())
            .cvesucursal(request.getCvesucursal())
            .cvealmacen(request.getCvealmacen())
            .fhVencimineto(request.getFhVencimineto())
            .intentosPassword(request.getIntentosPassword())
            .build();

        userRepository.save(user);

        return AuthResponse.builder()
            .token(jwtService.getToken(user))
            .build();
        
    }

}
