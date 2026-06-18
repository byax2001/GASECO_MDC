package gaseco.backend.Helpers.EpicorToken.services;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.reactive.function.client.WebClient;

import gaseco.backend.Constants.AppConstants;
import gaseco.backend.Helpers.EpicorToken.EpicorTokenResponse;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EpicorService {

    private  final WebClient webClient;
  

    public String getToken(String username, String password) {

        //Map<String,String> body = new HashMap<>();
        //body.put("userName", username);
        //body.put("password", password);

        EpicorTokenResponse response = webClient.post()
            .uri(AppConstants.EPICOR_URL + "/TokenResource.svc/")
            .header("x-api-key", AppConstants.EPICOR_API_KEY)
            .header("userName", username)
            .header("password", password)
            .contentType(MediaType.APPLICATION_JSON)
            //.bodyValue(body)
            .retrieve()
            //.bodyToMono(String.class)
            .bodyToMono(EpicorTokenResponse.class)
            .block();

        return response.getAccessToken();
    }



}
