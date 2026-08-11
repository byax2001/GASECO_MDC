package gaseco.backend.AppWeb.AppVentas.Services;

import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import gaseco.backend.Constants.AppConstants;
import lombok.RequiredArgsConstructor;
import java.util.List;
import java.util.Map;
import java.math.BigDecimal;
import java.util.Base64;
import org.springframework.http.MediaType;


@Service
@RequiredArgsConstructor
public class ReporteVentasService {
    private  final WebClient webClient;


    public List<Map<String, Object>> VentasVendedores(String Company, String FhInicial, String FhFinal) {
        String username = AppConstants.EPICOR_USER;
        String password = AppConstants.EPICOR_PASS;

        System.out.println("Company: " + Company);
        System.out.println("FhInicial: " + FhInicial);
        System.out.println("FhFinal: " + FhFinal);

        String baq_consult = "/api/v1/BaqSvc/AnaliticoR("+Company+")/Data?FhInicial="+FhInicial+"&FhFinal="+FhFinal;
        
        if(Company.equals("165943B") ){
            baq_consult = "/api/v1/BaqSvc/AnaliticoRHN("+Company+")/Data?FhInicial="+FhInicial+"&FhFinal="+FhFinal;
        }

        //El nombre de la Función en Epicor para crear una orden de Venta
        Map<String, Object> response = webClient.get()
            .uri(AppConstants.EPICOR_URL+baq_consult)
            .header("x-api-key", AppConstants.EPICOR_API_KEY)
            .header("Authorization", "Basic "+Base64.getEncoder().encodeToString((username + ":" + password).getBytes()))
            //.header("Authorization", "Bearer " + token)
            .accept(MediaType.APPLICATION_JSON)
            .retrieve()
            .bodyToMono(Map.class)
            .block();

        List<Map<String, Object>> ventasSeller = (List<Map<String, Object>>) response.get("value");

        List<String> listNumber = List.of(
            "Calculated_Venta",
            "Calculated_Costo",
            "Calculated_Peso",
            "Calculated_PPTO",
            "Calculated_Ejecutado",
            "Calculated_Pendiente",
            "Calculated_GAP",
            "Calculated_MG",
            "Calculated_MGp"
            
        );
        
        ventasSeller.forEach(row -> {
            listNumber.forEach(field -> {
                Object valor = row.get(field);
                if (valor != null) {
                    row.put(field, new BigDecimal(valor.toString()));
                }
            });
        });

        return ventasSeller;
    }



}
