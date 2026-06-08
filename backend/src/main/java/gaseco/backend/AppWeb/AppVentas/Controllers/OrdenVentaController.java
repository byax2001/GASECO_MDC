package gaseco.backend.AppWeb.AppVentas.Controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import gaseco.backend.AppWeb.AppVentas.DTO.Request.OrdenVentaRequest;
import gaseco.backend.AppWeb.AppVentas.DTO.Response.OrdenVentaResponse;
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


    @PostMapping("/CrearOV/{Company}")
    public ResponseEntity<OrdenVentaResponse> crearOrdenVenta(@RequestBody OrdenVentaRequest request, @PathVariable String Company) {
        OrdenVentaResponse response = ordenVentaService.CrearOV(request, Company);
        //El responseEntity ayuda a manipular la respuesta pudiendo modificarse el status, headers, body, etc. 
        if (!response.isContinuar()) {
            return ResponseEntity.badRequest().body(response);
        }
        
        return ResponseEntity.ok(
            response
        );
    }
}
