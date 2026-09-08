package gaseco.backend.JwtAuthenticationFilter;

import java.io.IOException;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
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

        

        String path = request.getServletPath();

        // =============================================
        // RUTAS PÚBLICAS
        // =============================================
        if (path.startsWith("/epicormdc") ||
            path.startsWith("/auth")) {

            filterChain.doFilter(request, response);
            return;
        }

        final String token = getTokenFromRequest(request);

        // =============================================
        // NO VIENE TOKEN
        // =============================================
        if (token == null) {

            // Dejamos continuar.
            // SecurityConfig decidirá si la ruta necesita autenticación.
            filterChain.doFilter(request, response);
            return;
        }

        try {

            // =============================================
            // OBTENER USUARIO DEL TOKEN
            // =============================================
            final String username = jwtService.getUsernameFromToken(token);


        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {

            var userDetails = userDetailsService.loadUserByUsername(username);

            // =============================================
            // VALIDAR TOKEN
            // =============================================

            if (jwtService.isTokenValid(token, userDetails)) {
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(userDetails,null,userDetails.getAuthorities());
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }
        filterChain.doFilter(request, response);
        }
        // =============================================
        // TOKEN EXPIRADO
        // =============================================
        catch (ExpiredJwtException ex) {

            enviarError(
                response,
                HttpServletResponse.SC_UNAUTHORIZED,
                "TOKEN_EXPIRED",
                "La sesión ha expirado"
            );
        }
        // =============================================
        // TOKEN MAL FORMADO
        // =============================================
        catch (MalformedJwtException ex) {

            enviarError(
                response,
                HttpServletResponse.SC_UNAUTHORIZED,
                "MALFORMED_TOKEN",
                "El token tiene un formato inválido"
            );
        }

        // =============================================
        // FIRMA INCORRECTA
        // =============================================
        catch (SecurityException ex) {

            enviarError(
                response,
                HttpServletResponse.SC_UNAUTHORIZED,
                "INVALID_SIGNATURE",
                "La firma del token no es válida"
            );
        }

        // =============================================
        // JWT NO SOPORTADO
        // =============================================
        catch (UnsupportedJwtException ex) {

            enviarError(
                response,
                HttpServletResponse.SC_UNAUTHORIZED,
                "UNSUPPORTED_TOKEN",
                "El tipo de token no es soportado"
            );
        }

        // =============================================
        // TOKEN VACÍO / ARGUMENTO INVÁLIDO
        // =============================================
        catch (IllegalArgumentException ex) {

            enviarError(
                response,
                HttpServletResponse.SC_UNAUTHORIZED,
                "INVALID_TOKEN",
                "El token proporcionado no es válido"
            );
        }
    }

    private void enviarError(
            HttpServletResponse response,
            int status,
            String code,
            String message) throws IOException {

        response.setStatus(status);
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        response.getWriter().write(
            """
            {
                "status": %d,
                "code": "%s",
                "message": "%s"
            }
            """.formatted(status, code, message)
        );
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
