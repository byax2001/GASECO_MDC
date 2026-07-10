package gaseco.backend.AppWeb.Inventario.Controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import gaseco.backend.AppWeb.Inventario.Services.ScanCilService;
import lombok.RequiredArgsConstructor;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/inv/scancil")
@RequiredArgsConstructor
public class ScanCilController {
    private final ScanCilService scanCilService;

    @GetMapping("/byserie/{serie}")
    public ResponseEntity<List<Map<String, Object>>> getCilBySerie(@PathVariable String serie) {  
        List<Map<String, Object>> cilindros = scanCilService.getCilBySerie(serie);
        return ResponseEntity.ok(cilindros);
    }
}
