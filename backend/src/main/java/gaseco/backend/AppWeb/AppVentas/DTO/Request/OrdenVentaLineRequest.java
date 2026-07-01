package gaseco.backend.AppWeb.AppVentas.DTO.Request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrdenVentaLineRequest {
    private String CustID;
    private int CustNum;
    private String PartNum;
    private int NoCilindros;
    private String TipoCilindro;
    private double Qty;
    private double PrecioUnit;
    private String UOM;
    private int OrderNum;
    private String Descripcion;
}
