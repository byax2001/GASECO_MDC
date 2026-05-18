package gaseco.backend.AppVentas.Services;
import java.util.List;
import java.util.Map;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.reactive.function.client.WebClient;

import gaseco.backend.Constants.AppConstants;
import gaseco.backend.Epicor.services.EpicorService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AppVentasService {

    private final EpicorService epicorService;
    private  final WebClient webClient;

    public List<Map<String, Object>> ListarClientes(String Company,String CodVendedor){
        String username = AppConstants.EPICOR_USER;
        String password = AppConstants.EPICOR_PASS;
        if("ALL".equals(Company)){
            Company = "165943";
        }

        System.out.println("Obteniendo token de Epicor...");
        String token = epicorService.getToken(username, password);
        System.out.println("Token obtenido: " + token);

         if (token == null) {
        return List.of(Map.of("error", "Error al obtener el token"));
        }

        Map<String, Object> response = webClient.get()
            .uri(AppConstants.EPICOR_URL+"/api/v2/odata/" + Company + "/BaqSvc/App_V_Customer/Data?$top=100")
            .header("x-api-key", AppConstants.EPICOR_API_KEY)
            .header("Authorization", "Bearer " + token)
            .accept(MediaType.APPLICATION_JSON)
            .retrieve()
            .bodyToMono(Map.class)
            .block();

        return (List<Map<String, Object>>) response.get("value");
        }

}
