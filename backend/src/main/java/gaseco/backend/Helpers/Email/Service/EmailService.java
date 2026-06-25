package gaseco.backend.Helpers.Email.Service;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import gaseco.backend.Constants.AppConstants;
import gaseco.backend.Helpers.Email.DTO.Response.CorreoResponse;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmailService {
     private final JavaMailSender mailSender;


    public CorreoResponse enviarCorreo(String para, String copia, String asunto, String mensaje) {
        try{
            SimpleMailMessage email = new SimpleMailMessage();
            email.setFrom(AppConstants.EMAIL_EMISOR);
            email.setTo(para);

            if (copia != null && !copia.trim().isEmpty()) {
                // Permite múltiples direcciones de correo separadas por coma
                //email.setCc(copia.split("\\s*,\\s*")); 
                // Permite múltiples direcciones de correo separadas por punto y coma o coma
                email.setCc(copia.split("\\s*[;,]\\s*"));
            }
            //setReplyTo indica a qué dirección se debe responder cuando el destinatario haga clic en "Responder"
            email.setReplyTo("facturacion@gasecosa.com");
            email.setSubject(asunto);
            email.setText(mensaje);

            mailSender.send(email);
            return CorreoResponse.builder()
                    .mensaje("Correo enviado exitosamente")
                    .status("Ok")
                    .build();
        }catch (Exception e) {
            return CorreoResponse.builder()
                    .status("Error")
                    .mensaje("Error al enviar el correo: " + e.getMessage())
                    .build();
        }
    }
}
