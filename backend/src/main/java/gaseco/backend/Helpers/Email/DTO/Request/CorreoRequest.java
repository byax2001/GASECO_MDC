package gaseco.backend.Helpers.Email.DTO.Request;

import lombok.Data;

@Data
public class CorreoRequest {
    private String para;
    private String copia;
    private String asunto;
    private String mensaje;
}