package gaseco.backend.Config.Exepciones;


public class LoginIncorrectoException extends RuntimeException {

    public LoginIncorrectoException() {
        super("Usuario o contraseña incorrectos");
    }
}