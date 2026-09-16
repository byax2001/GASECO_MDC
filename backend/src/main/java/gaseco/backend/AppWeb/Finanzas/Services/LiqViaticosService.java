package gaseco.backend.AppWeb.Finanzas.Services;

import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import gaseco.backend.AppWeb.Finanzas.DTO.Response.NewIDLvResponse;
import gaseco.backend.AppWeb.AppVentas.DTO.Request.pptoUploadRequest;
import gaseco.backend.AppWeb.AppVentas.DTO.Response.pptoUploadResponse;
import gaseco.backend.AppWeb.Finanzas.DTO.Response.NewIDLvResponse;
import gaseco.backend.Config.Exepciones.EpicorException;
import gaseco.backend.Constants.AppConstants;
import gaseco.backend.Helpers.EpicorToken.services.EpicorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;

@Service
@RequiredArgsConstructor
public class LiqViaticosService {
    private final EpicorService epicorService;
    private  final WebClient webClient;
    
    public NewIDLvResponse getNewID(String Company) {
        String username = AppConstants.EPICOR_USER;
        String password = AppConstants.EPICOR_PASS;

        //El nombre de la Función en Epicor para crear una orden de Venta
        String fx_consult = "/api/v2/efx/"+Company+"/LiquidacionViaticos/GetNewID";
       
        System.out.println("Obteniendo token de Epicor...");
        String token = epicorService.getToken(username, password);
        System.out.println("Token obtenido: " + token);

         if (token == null) {
            //ARROJA UN ERROR DE EPICOR SI NO SE PUEDE OBTENER EL TOKEN
            throw new EpicorException("No se pudo obtener el token de Epicor");
        }

        
        NewIDLvResponse response = webClient.post()
            .uri(AppConstants.EPICOR_URL+fx_consult)
            .header("x-api-key", AppConstants.EPICOR_API_KEY)
            .header("Authorization", "Bearer " + token)
            //.bodyValue(request)
            .accept(MediaType.APPLICATION_JSON)
            .retrieve()
            .bodyToMono(NewIDLvResponse.class)
            .block();

        return response;
    }
}
