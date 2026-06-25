package gaseco.backend.Constants;
import io.github.cdimascio.dotenv.Dotenv;

public class AppConstants {
    public static final Dotenv dotenv = Dotenv.load();
    public static final String EPICOR_URL = dotenv.get("EPICOR_URL");

    public static final String EPICOR_API_KEY = dotenv.get("EPICOR_API_KEY");

    public static final String TOKEN_KEY = dotenv.get("TOKEN_KEY");

    public static final String EPICOR_USER = dotenv.get("EPICOR_USER");
    
    public static final String EPICOR_PASS = dotenv.get("EPICOR_PASS");

    public static final String EMAIL_EMISOR = dotenv.get("EMAIL_EMISOR");


}