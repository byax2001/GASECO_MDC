package gaseco.backend.Config;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.ErrorResponse;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.reactive.function.client.WebClientResponseException;

import gaseco.backend.Config.Exepciones.ApiErrorResponse;
import gaseco.backend.Config.Exepciones.EpicorException;
import gaseco.backend.Config.Exepciones.LoginIncorrectoException;
import gaseco.backend.Config.Exepciones.PasswordExpiredException;
import gaseco.backend.Config.Exepciones.UserDisabledException;
import gaseco.backend.Config.Exepciones.AccountLockedException;

import java.time.LocalDateTime;

@RestControllerAdvice
public class GlobalExceptionHandler {

    //
    @ExceptionHandler(LoginIncorrectoException.class)
    public ResponseEntity<ApiErrorResponse> handleLoginIncorrecto(
            LoginIncorrectoException ex) {

        ApiErrorResponse error = new ApiErrorResponse(
            HttpStatus.UNAUTHORIZED.value(),
            "INVALID_CREDENTIALS",
            ex.getMessage(),
            LocalDateTime.now()
        );

        return ResponseEntity
            .status(HttpStatus.UNAUTHORIZED)
            .body(error);
    }

    //MENSAJE DE ERROR POR CONTRAEÑAS INCORRECTAS
    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ApiErrorResponse> handleBadCredentials(
            BadCredentialsException ex) {

        ApiErrorResponse error = new ApiErrorResponse(
            HttpStatus.UNAUTHORIZED.value(),
            "INVALID_CREDENTIALS",
            "Usuario o contraseña incorrectos",
            LocalDateTime.now()
        );

        return ResponseEntity
            .status(HttpStatus.UNAUTHORIZED)
            .body(error);
    }

    // USUARIO BLOQUEADO POR MÁXIMO DE INTENTOS
    @ExceptionHandler(AccountLockedException.class)
    public ResponseEntity<ApiErrorResponse> handleAccountLocked(
            AccountLockedException ex) {

        ApiErrorResponse error = new ApiErrorResponse(
            HttpStatus.LOCKED.value(),
            "ACCOUNT_LOCKED",
            ex.getMessage(),
            LocalDateTime.now()
        );

        return ResponseEntity
            .status(HttpStatus.LOCKED)
            .body(error);
    }


    // USUARIO DESHABILITADO
    @ExceptionHandler(UserDisabledException.class)
    public ResponseEntity<ApiErrorResponse> handleUserDisabled(
            UserDisabledException ex) {

        ApiErrorResponse error = new ApiErrorResponse(
            HttpStatus.FORBIDDEN.value(),
            "USER_DISABLED",
            ex.getMessage(),
            LocalDateTime.now()
        );

        return ResponseEntity
            .status(HttpStatus.FORBIDDEN)
            .body(error);
    }


    // CONTRASEÑA VENCIDA
    @ExceptionHandler(PasswordExpiredException.class)
    public ResponseEntity<ApiErrorResponse> handlePasswordExpired(
            PasswordExpiredException ex) {

        ApiErrorResponse error = new ApiErrorResponse(
            HttpStatus.UNAUTHORIZED.value(),
            "PASSWORD_EXPIRED",
            ex.getMessage(),
            LocalDateTime.now()
        );

        return ResponseEntity
            .status(HttpStatus.UNAUTHORIZED)
            .body(error);
    }


    //ERROR AL CONSULTAR UN ENDPOINT
    @ExceptionHandler(WebClientResponseException.class)
    public ResponseEntity<ApiErrorResponse> handleWebClient(
            WebClientResponseException ex) {

        ApiErrorResponse error = new ApiErrorResponse(
            HttpStatus.BAD_GATEWAY.value(),
            "EXTERNAL_API_ERROR",
            "Error al consultar un servicio externo",
            LocalDateTime.now()
        );

        return ResponseEntity
            .status(HttpStatus.BAD_GATEWAY)
            .body(error);
    }

    //ERROR INTERNO DEL SERVIDOR
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiErrorResponse> handleGeneral(
            Exception ex) {

        ApiErrorResponse error = new ApiErrorResponse(
            HttpStatus.INTERNAL_SERVER_ERROR.value(),
            "INTERNAL_ERROR",
            "Ocurrió un error interno en el servidor",
            LocalDateTime.now()
        );

        return ResponseEntity
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .body(error);
    }

    //ERROR AL CONSULTAR UN SERVICIO DE EPICOR O EJECUTAR UNA FUNCION
    @ExceptionHandler(EpicorException.class)
    public ResponseEntity<ApiErrorResponse> handleEpicor(
            EpicorException ex) {

        ApiErrorResponse error = new ApiErrorResponse(
            HttpStatus.BAD_GATEWAY.value(),
            "EPICOR_ERROR",
            ex.getMessage(),
            LocalDateTime.now()
        );

        return ResponseEntity
            .status(HttpStatus.BAD_GATEWAY)
            .body(error);
    }
}