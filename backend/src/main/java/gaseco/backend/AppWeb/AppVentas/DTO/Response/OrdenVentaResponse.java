package gaseco.backend.AppWeb.AppVentas.DTO.Response;


import java.time.OffsetDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrdenVentaResponse {
     private int OrderNum;
     private String Result;
     private boolean Continuar;
}
