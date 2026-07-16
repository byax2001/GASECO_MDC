package gaseco.backend.AppWeb.AppVentas.Services;
import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Base64;
import org.springframework.http.MediaType;
import org.springframework.web.reactive.function.client.WebClient;
import gaseco.backend.Constants.AppConstants;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ListOVPendientesService {
    private  final WebClient webClient;

/*"OrderDtl_OrderNum": 26131,
        "OrderDtl_OrderLine": 1,
        "Part_PartNum": "OXY-25-CRIM",
        "Part_PartDescription": "OXIGENO GAS MEDICO 2.5 CRI",
        "Part_ProdCode": "VEOM",
        "OrderDtl_CustNum": 269,
        "Customer_Name": "EDGAR HUMBERTO GARCÍA ORELLANA",
        "OrderHed_OrderDate": "2026-05-26T00:00:00",
        "OrderDtl_OrderQty": "440.00000000",
        "OrderDtl_SalesUM": "FT3",
        "OrderDtl_NUMCILINDROS_c": 2,
        "Calculated_Capacidad": "220.0000000000000000000",
        "OrderDtl_CVEENVASE_c": "143",
        "Calculated_DescCilindro": "KMJ",
        "OrderDtl_LineStatus": "ABIERTA",
        "OrderDtl_IUM": "FT3",
        "OrderHed_DocTotalCharges": "0.000",
        "OrderHed_DocTotalTax": "0.000",
        "OrderHed_DocOrderAmt": "0.000",
        "OrderHed_CVEOPERACION_c": "LLC",
        "Calculated_OperacionDesc": "LLENADO PROPIEDAD DE CLIENTE",
        "RowIdent": "00000001-0000-0000-0000-000000000000" */

    public List<Map<String, Object>> getOVPendientes(String company, LocalDate FechaI, LocalDate FechaF) {
        String username = AppConstants.EPICOR_USER;
        String password = AppConstants.EPICOR_PASS;

        //El nombre del BAQ es RepVPNCilindro
        String baq_consult = "/BaqSvc/RepVPNCilindros("+company+")/Data?FechaInicio="+FechaI+"&FechaFin="+FechaF;
        Map<String, Object> response = webClient.get()
            .uri(AppConstants.EPICOR_URL+"/api/v1/"+ baq_consult)
            .header("x-api-key", AppConstants.EPICOR_API_KEY)
            .header("Authorization", "Basic "+Base64.getEncoder().encodeToString((username + ":" + password).getBytes()))
            //.header("Authorization", "Bearer " + token)
            .accept(MediaType.APPLICATION_JSON)
            .retrieve()
            .bodyToMono(Map.class)
            .block();
        List<Map<String, Object>> ovpendientes = (List<Map<String, Object>>) response.get("value");
        List<String> listNumber = List.of(
            "OrderDtl_OrderQty",
            "Calculated_Capacidad",
            "OrderHed_DocOrderAmt",
            "OrderHed_DocTotalCharges",
            "OrderHed_DocTotalTax"
        );
        
        ovpendientes.forEach(row -> {
            listNumber.forEach(field -> {
                Object valor = row.get(field);
                if (valor != null) {
                    row.put(field, new BigDecimal(valor.toString()));
                }
            });
        });


        return ovpendientes;// Devuelve una lista vacía por ahora
    }

}
