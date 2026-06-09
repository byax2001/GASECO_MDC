package gaseco.backend.AppWeb.AppVentas.DTO.Response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrdenVentaLineResponse {
    private String Result;
    private boolean Continuar;

}
