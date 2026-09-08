package gaseco.backend.Config.Exepciones;

import java.time.LocalDateTime;


//EL RESPONSE EN CASO DE ERRORES
public record ApiErrorResponse(
    int status,
    String code,
    String message,
    LocalDateTime timestamp
) {}