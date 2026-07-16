package gaseco.backend.AppWeb.AppVentas.Controllers;

import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import gaseco.backend.AppWeb.AppVentas.Services.PresupuestosService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/ventas/ppto")
@RequiredArgsConstructor
public class PresupuestosController {
    private final PresupuestosService presupuestosService;

    @GetMapping("/{Company}/{Anio}/{PresupuestoPor}/{CodVendedor}")
    public List<Map<String, Object>> GetVentas(@PathVariable String Company, @PathVariable  int Anio, @PathVariable String PresupuestoPor, @PathVariable int CodVendedor) {
        //Aquí se llamaría al servicio de presupuestos para obtener la información
         return presupuestosService.GetVentas(Company, Anio, PresupuestoPor, CodVendedor);
    }

    @GetMapping("/vendedores/{Company}/{CodVendedor}")
    public List<Map<String, Object>> GetVendedores(@PathVariable String Company, @PathVariable String CodVendedor) {
        return presupuestosService.GetVendedores(Company, CodVendedor);
    }

}
