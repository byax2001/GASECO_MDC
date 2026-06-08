package gaseco.backend.AppWeb.AppVentas.Services;

import java.util.List;
import java.util.Map;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import gaseco.backend.AppWeb.AppVentas.DTO.Request.OrdenVentaRequest;
import gaseco.backend.AppWeb.AppVentas.DTO.Response.OrdenVentaResponse;
import gaseco.backend.Constants.AppConstants;
import gaseco.backend.Epicor.services.EpicorService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OrdenVentaService {
    private final EpicorService epicorService;
    private  final WebClient webClient;

    public List<Map<String, Object>> CustInfo(String Company, String CustID) {
        String username = AppConstants.EPICOR_USER;
        String password = AppConstants.EPICOR_PASS;

        //El nombre de la Función en Epicor para crear una orden de Venta
        String baq_consult = "/api/v2/odata/"+Company+"/BaqSvc/App_V_CustInfo/Data?CustID="+CustID;
       
        System.out.println("Obteniendo token de Epicor...");
        String token = epicorService.getToken(username, password);
        System.out.println("Token obtenido: " + token);

         if (token == null) {
            return List.of(Map.of("error", "Error al obtener el token de Epicor"));
        }

        Map<String, Object> response = webClient.get()
            .uri(AppConstants.EPICOR_URL+baq_consult)
            .header("x-api-key", AppConstants.EPICOR_API_KEY)
            .header("Authorization", "Bearer " + token)
            .accept(MediaType.APPLICATION_JSON)
            .retrieve()
            .bodyToMono(Map.class)
            .block();

        return (List<Map<String, Object>>) response.get("value");
    }

     public OrdenVentaResponse CrearOV(OrdenVentaRequest request, String Company) {
        String username = AppConstants.EPICOR_USER;
        String password = AppConstants.EPICOR_PASS;

        //El nombre de la Función en Epicor para crear una orden de Venta
        String fx_consult = "/api/v2/efx/"+Company+"/CrearOV/CrearOV";
       
        System.out.println("Obteniendo token de Epicor...");
        String token = epicorService.getToken(username, password);
        System.out.println("Token obtenido: " + token);

         if (token == null) {
        return OrdenVentaResponse.builder()
                .Result("Error al obtener el token de Epicor")
                .build();
        }

        OrdenVentaResponse response = webClient.post()
            .uri(AppConstants.EPICOR_URL+fx_consult)
            .header("x-api-key", AppConstants.EPICOR_API_KEY)
            .header("Authorization", "Bearer " + token)
            .bodyValue(request)
            .accept(MediaType.APPLICATION_JSON)
            .retrieve()
            .bodyToMono(OrdenVentaResponse.class)
            .block();

        return response;
        }

}
