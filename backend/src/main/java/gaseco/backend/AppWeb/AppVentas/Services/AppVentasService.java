package gaseco.backend.AppWeb.AppVentas.Services;
import java.math.BigDecimal;
import java.util.Base64;
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

    //REGRESA UN LISTADO DE CLIENTES, 
    //SI SE PROPORCIONA EL CODIGO DE VENDEDOR REGRESA LOS CLIENTES ASIGNADOS A ESE VENDEDOR, 
    //SI NO SE PROPORCIONA REGRESA TODOS LOS CLIENTES
    public List<Map<String, Object>> ListarClientes(String Company,String CodVendedor){
        String username = AppConstants.EPICOR_USER;
        String password = AppConstants.EPICOR_PASS;

        //El nombre del BAQ es App_V_Customer
        String baq_consult = "/BaqSvc/App_V_Customer/Data?";

        if(!"".equals(CodVendedor)){
            baq_consult += "CodVendedor='" + CodVendedor + "'";
        }

        System.out.println("Obteniendo token de Epicor...");
        String token = epicorService.getToken(username, password);
        System.out.println("Token obtenido: " + token);

         if (token == null) {
        return List.of(Map.of("error", "Error al obtener el token de Epicor"));
        }

        Map<String, Object> response = webClient.get()
            .uri(AppConstants.EPICOR_URL+"/api/v2/odata/" + Company + baq_consult)
            .header("x-api-key", AppConstants.EPICOR_API_KEY)
            .header("Authorization", "Bearer " + token)
            .accept(MediaType.APPLICATION_JSON)
            .retrieve()
            .bodyToMono(Map.class)
            .block();

        return (List<Map<String, Object>>) response.get("value");
        }
    
    //REGRESA UN LISTADO DE PARTES DE LA COMPAÑIA PERMITIDAS PARA LA VENTA
    //YA QUE NO TRAE INFORMACIÓN IMPORTANTE SE CONSULTARA CON LA V1 DEL API DE EPICOR
    //LA CUAL NO REQUIERE EL TOKEN DE AUTENTICACIÓN
    //PERO SI REQUIERE UNA AUTENTICACIÓN BASICA CON EL USUARIO Y CONTRASEÑA DE EPICOR
    public List<Map<String, Object>> ListarPartes(String Company){
        String username = AppConstants.EPICOR_USER;
        String password = AppConstants.EPICOR_PASS;

        //El nombre del BAQ es App_V_Part
        String baq_consult = "/BaqSvc/App_V_Part("+Company+")/Data";
        Map<String, Object> response = webClient.get()
            .uri(AppConstants.EPICOR_URL+"/api/v1/"+ baq_consult)
            .header("x-api-key", AppConstants.EPICOR_API_KEY)
            .header("Authorization", "Basic "+Base64.getEncoder().encodeToString((username + ":" + password).getBytes()))
            //.header("Authorization", "Bearer " + token)
            .accept(MediaType.APPLICATION_JSON)
            .retrieve()
            .bodyToMono(Map.class)
            .block();

        return (List<Map<String, Object>>) response.get("value");
    }



    //REGRESA UN LISTADO DE LAS MONEDAS DE LA COMPAÑIA CON SU RESPECTIVO SIMBOLO
    //YA QUE NO TRAE INFORMACIÓN IMPORTANTE SE CONSULTARA CON LA V1 DEL API DE EPICOR
    //LA CUAL NO REQUIERE EL TOKEN DE AUTENTICACIÓN
    //PERO SI REQUIERE UNA AUTENTICACIÓN BASICA CON EL USUARIO Y CONTRASEÑA DE EPICOR
    public List<Map<String, Object>> ListarMonedas(String Company){
        String username = AppConstants.EPICOR_USER;
        String password = AppConstants.EPICOR_PASS;

        //El nombre del BAQ es App_V_Currency
        String baq_consult = "/BaqSvc/App_V_CurrencyCode("+Company+")/Data";


        Map<String, Object> response = webClient.get()
            .uri(AppConstants.EPICOR_URL+"/api/v1/"+ baq_consult)
            .header("x-api-key", AppConstants.EPICOR_API_KEY)
            .header("Authorization", "Basic "+Base64.getEncoder().encodeToString((username + ":" + password).getBytes()))
            //.header("Authorization", "Bearer " + token)
            .accept(MediaType.APPLICATION_JSON)
            .retrieve()
            .bodyToMono(Map.class)
            .block();

        return (List<Map<String, Object>>) response.get("value");
    }

    //REGRESA UN LISTADO DE LOS TIPOS DE CILINDROS DE LA COMPAÑIA
    //YA QUE NO TRAE INFORMACIÓN IMPORTANTE SE CONSULTARA CON LA V1 DEL API DE EPICOR
    //LA CUAL NO REQUIERE EL TOKEN DE AUTENTICACIÓN
    //PERO SI REQUIERE UNA AUTENTICACIÓN BASICA CON EL USUARIO Y CONTRASEÑA DE EPICOR
    public List<Map<String, Object>> ListarTiposCilindros(String Company){
        String username = AppConstants.EPICOR_USER;
        String password = AppConstants.EPICOR_PASS;

        //El nombre del BAQ es App_V_TCilindros
        String baq_consult = "/BaqSvc/App_V_TCilindros("+Company+")/Data";


        Map<String, Object> response = webClient.get()
            .uri(AppConstants.EPICOR_URL+"/api/v1/"+ baq_consult)
            .header("x-api-key", AppConstants.EPICOR_API_KEY)
            .header("Authorization", "Basic "+Base64.getEncoder().encodeToString((username + ":" + password).getBytes()))
            //.header("Authorization", "Bearer " + token)
            .accept(MediaType.APPLICATION_JSON)
            .retrieve()
            .bodyToMono(Map.class)
            .block();

        List<Map<String, Object>> tcilindros =(List<Map<String, Object>>) response.get("value");
        tcilindros.forEach(row -> {
            Object valor = row.get("UDCodes_NUMERO01_c");

            if (valor != null) {
                row.put("UDCodes_NUMERO01_c", new BigDecimal(valor.toString()));
            }
        });

        return tcilindros;
    }

    //REGRESA UN LISTADO DE UOM (UNIDAD DE MEDIDA) PERMITIDOS PARA LA PARTE ESPECIFICADA
    //YA QUE NO TRAE INFORMACIÓN IMPORTANTE SE CONSULTARA CON LA V1 DEL API DE EPICOR
    //LA CUAL NO REQUIERE EL TOKEN DE AUTENTICACIÓN
    //PERO SI REQUIERE UNA AUTENTICACIÓN BASICA CON EL USUARIO Y CONTRASEÑA DE EPICOR
    public List<Map<String, Object>> ListarUOM(String Company, String PartNum){
        String username = AppConstants.EPICOR_USER;
        String password = AppConstants.EPICOR_PASS;

        //El nombre del BAQ es App_V_PartUOM
        String baq_consult = "/BaqSvc/App_V_PartUOM("+Company+")/Data?PartNum='" + PartNum + "'";
        Map<String, Object> response = webClient.get()
            .uri(AppConstants.EPICOR_URL+"/api/v1/"+ baq_consult)
            .header("x-api-key", AppConstants.EPICOR_API_KEY)
            .header("Authorization", "Basic "+Base64.getEncoder().encodeToString((username + ":" + password).getBytes()))
            //.header("Authorization", "Bearer " + token)
            .accept(MediaType.APPLICATION_JSON)
            .retrieve()
            .bodyToMono(Map.class)
            .block();

        return (List<Map<String, Object>>) response.get("value");
    }

}