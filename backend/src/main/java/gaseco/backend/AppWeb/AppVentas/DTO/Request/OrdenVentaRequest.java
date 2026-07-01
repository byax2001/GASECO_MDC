package gaseco.backend.AppWeb.AppVentas.DTO.Request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;



@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrdenVentaRequest {
     private String CustID;
     private int CustNum;
     private String CurrencyCod;
     private String FechaR;
     private String Proyecto;
     private String TOperacion;
}

