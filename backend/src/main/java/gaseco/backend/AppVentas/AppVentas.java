package gaseco.backend.AppVentas;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/appventas")
@RequiredArgsConstructor
public class AppVentas {

    @PostMapping(value = "welcome")
    public String Welcome() {
        
        return "Welcome to AppVentas!";
    }
    

}
