package gaseco.backend.Helpers.Email.Controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import gaseco.backend.Helpers.Email.DTO.Request.CorreoRequest;
import gaseco.backend.Helpers.Email.Service.EmailService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/correo")
@RequiredArgsConstructor
public class EmailController {
    private final EmailService emailService;
    
    @PostMapping("/enviar")
    public ResponseEntity<String> enviar(@RequestBody CorreoRequest request) {

        System.out.println("Correo recibido: " + request);

        emailService.enviarCorreo(
            request.getPara(),
            request.getCopia(),
            request.getAsunto(),
            request.getMensaje()
        );

        return ResponseEntity.ok("Correo enviado correctamente");
    }

}
