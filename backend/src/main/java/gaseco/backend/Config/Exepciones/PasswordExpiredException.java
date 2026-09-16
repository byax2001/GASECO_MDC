package gaseco.backend.Config.Exepciones;

public class PasswordExpiredException extends RuntimeException{
    public PasswordExpiredException(String message) {
        super(message);
    }
}
