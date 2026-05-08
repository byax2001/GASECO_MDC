package gaseco.backend.JwtAuthenticationFilter;

import java.io.IOException;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {


    //Al extender de OncePerRequestFilter, se asegura que este filtro se ejecute una sola vez por 
    // cada solicitud HTTP, lo que es ideal para la autenticación basada en JWT, 
    // ya que no es necesario procesar el token más de una vez por solicitud.
    // El método doFIlterInternal es obligatorio de implementar, y es donde se coloca la lógica para extraer el token JWT de la solicitud,
    // validar el token y establecer la autenticación en el contexto de seguridad de Spring si el

    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        final String token = getTokenFromRequest(request);
        final String username;

        String path = request.getServletPath();

        // SI LA RUTA ES /auth/** O /epicormdc/**, SE PERMITE EL ACCESO SIN NECESIDAD DE AUTENTICACIÓN
        if (path.startsWith("/epicormdc") || path.startsWith("/auth")) {
            filterChain.doFilter(request, response);
            return;
        }

        // Todas las rutas pueden ser accedidas sin autenticación si el token es nulo, sin embargo
        // gracias al .permitAll().anyRequest().authenticated()
        // Si no tiene que ver con /auth/** o /epicormdc/** lanzará un error de autenticación 401 Unauthorized,
        // ya que no se le permitirá el acceso a ninguna ruta sin un token válido.
        if (token == null) {
            // Aquí se establecería la autenticación en el contexto de seguridad de Spring
            // utilizando el token JWT validado.
            filterChain.doFilter(request, response);
            return;
        }

        // Si el token no es nulo, se procede a validar el token y establecer la autenticación en el contexto de seguridad de Spring
        // lo que permitirá el acceso a las rutas protegidas si el token es válido.
        username = jwtService.getUsernameFromToken(token);
        if (username != null && jwtService.isTokenValid(token, userDetailsService.loadUserByUsername(username))) {
            var userDetails = userDetailsService.loadUserByUsername(username);
            if (jwtService.isTokenValid(token, userDetails)) {
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(userDetails,null,userDetails.getAuthorities());
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }
        filterChain.doFilter(request, response);
    }

    //Este metodo es una función auxiliar que se encarga de extraer el token JWT del encabezado de autorización de la solicitud HTTP.
    private String getTokenFromRequest(HttpServletRequest request) {
        // En el encabezado del request es donde se encuentra el token JWT, y se espera que tenga el formato "Bearer <token>".
        final String bearerToken = request.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            //Despues del 7 por el espacio despues de "Bearer "
            return bearerToken.substring(7);
        }
        return null;
    }   
    
  

}
