package gaseco.backend.AppWeb.AppVentas.Controllers;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import gaseco.backend.AppWeb.AppVentas.Services.ReporteVentasService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/ventas/reporte")
@RequiredArgsConstructor
public class ReporteVentasController {

    private final ReporteVentasService reporteVentasService;

    @GetMapping("/sellers/{Company}/{FhInicial}/{FhFinal}")
    public ResponseEntity<List<Map<String, Object>>> VentasVendedores(@PathVariable String Company, @PathVariable String FhInicial, @PathVariable String FhFinal) {
        System.out.println("Company: " + Company);
        System.out.println("FhInicial: " + FhInicial);
        System.out.println("FhFinal: " + FhFinal);
        List<Map<String, Object>> vendedores = reporteVentasService.VentasVendedores(Company, FhInicial, FhFinal);
        return ResponseEntity.ok(vendedores);
    }


}
