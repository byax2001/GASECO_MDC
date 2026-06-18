package gaseco.backend.Helpers.EpicorToken;

import lombok.Data;

@Data
public class EpicorTokenResponse {
    private String AccessToken;
    private int ExpiresIn;
    private String TokenType;
}
