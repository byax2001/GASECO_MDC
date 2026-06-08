package gaseco.backend.AppWeb.AppVentas.DTO.Request;


import java.time.OffsetDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.OffsetDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrdenVentaRequest {
     private String CustID;
     private long CustNum;
     private String CurrencyCod;
     private String FechaR;
}

