package gaseco.backend.AppWeb.Finanzas.Controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import gaseco.backend.AppWeb.Finanzas.DTO.Response.NewIDLvResponse;
import gaseco.backend.AppWeb.Finanzas.Services.LiqViaticosService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/fin/lv")
@RequiredArgsConstructor
public class LiqViaticosController {
    private final LiqViaticosService liqViaticosService;

    
    @GetMapping("/newid/{company}")
    public ResponseEntity<NewIDLvResponse> getNewID(@PathVariable String company) {
        NewIDLvResponse newID = liqViaticosService.getNewID(company);
        return ResponseEntity.ok(newID);
    } 
}
