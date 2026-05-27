package gaseco.backend.AppWeb.AppVentas.Controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import gaseco.backend.AppWeb.AppVentas.Services.OrdenVentaService;
import lombok.RequiredArgsConstructor;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/ventas/ov")
@RequiredArgsConstructor
public class OrdenVentaController {
    private final OrdenVentaService ordenVentaService;

    @GetMapping("/CustInfo/{Company}/{CustID}")
    public List<Map<String, Object>> listarClientes(@PathVariable String Company, @PathVariable String CustID) {
        return ordenVentaService.CustInfo(Company, CustID);
    }
}
