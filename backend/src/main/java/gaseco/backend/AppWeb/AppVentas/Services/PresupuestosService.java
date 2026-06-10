package gaseco.backend.AppWeb.AppVentas.Services;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import gaseco.backend.Constants.AppConstants;
import lombok.RequiredArgsConstructor;

import java.math.BigDecimal;
import java.util.Base64;
import org.springframework.http.MediaType;

@Service
@RequiredArgsConstructor
public class PresupuestosService {
    private  final WebClient webClient;

    public List<Map<String, Object>> GetVentas(String Company, int Anio, int CodVendedor) {
        String username = AppConstants.EPICOR_USER;
        String password = AppConstants.EPICOR_PASS;

        String baq_consult = "/api/v1/BaqSvc/App_V_Presupuestos("+Company+")/Data?Anio="+Anio;
        if(CodVendedor != 0){
            baq_consult +="&CodVendedor="+CodVendedor;
        }
        //El nombre de la Función en Epicor para crear una orden de Venta
       
        Map<String, Object> response = webClient.get()
            .uri(AppConstants.EPICOR_URL+ baq_consult)
            .header("x-api-key", AppConstants.EPICOR_API_KEY)
            .header("Authorization", "Basic "+Base64.getEncoder().encodeToString((username + ":" + password).getBytes()))
            //.header("Authorization", "Bearer " + token)
            .accept(MediaType.APPLICATION_JSON)
            .retrieve()
            .bodyToMono(Map.class)
            .block();


        String[] meses = {
                "Calculated_Enero",
                "Calculated_Febrero",
                "Calculated_Marzo",
                "Calculated_Abril",
                "Calculated_Mayo",
                "Calculated_Junio",
                "Calculated_Julio",
                "Calculated_Agosto",
                "Calculated_Septiembre",
                "Calculated_Octubre",
                "Calculated_Noviembre",
                "Calculated_Diciembre"};

        List<Map<String, Object>> ventas = (List<Map<String, Object>>) response.get("value");
        ventas.forEach(row -> {

            for (String mes : meses) {
                Object valor = row.get(mes);

                if (valor != null && !valor.toString().isBlank()) {
                    row.put(mes, new BigDecimal(valor.toString()));
                }
            }
        });
        return ventas;
    }

    public List<Map<String, Object>> GetVendedores(String Company) {
        String username = AppConstants.EPICOR_USER;
        String password = AppConstants.EPICOR_PASS;

        //BAQ a consultar para obtener los vendedores, el nombre de la función en Epicor es App_V_Vendedores
        String baq_consult = "/api/v1/BaqSvc/App_V_Vendedores("+Company+")/Data?Anio=";
       
        Map<String, Object> response = webClient.get()
            .uri(AppConstants.EPICOR_URL+ baq_consult)
            .header("x-api-key", AppConstants.EPICOR_API_KEY)
            .header("Authorization", "Basic "+Base64.getEncoder().encodeToString((username + ":" + password).getBytes()))
            //.header("Authorization", "Bearer " + token)
            .accept(MediaType.APPLICATION_JSON)
            .retrieve()
            .bodyToMono(Map.class)
            .block();


        List<Map<String, Object>> ventas = (List<Map<String, Object>>) response.get("value");
        return ventas;
    }
}
