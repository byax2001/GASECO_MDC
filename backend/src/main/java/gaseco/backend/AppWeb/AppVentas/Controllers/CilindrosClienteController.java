package gaseco.backend.AppWeb.AppVentas.Controllers;

import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import gaseco.backend.AppWeb.AppVentas.Services.CilindrosClienteService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/ventas/cilcli")
@RequiredArgsConstructor
public class CilindrosClienteController {
    private final CilindrosClienteService cilindrosClienteService;

    
    @GetMapping("/{CustID}")
    public List<Map<String, Object>> getCilindrosPorCliente(@PathVariable String CustID) {
        System.out.println("CustID recibido: " + CustID); // Imprime el valor de CustID en la consola
        return cilindrosClienteService.getCilindrosPorCliente(CustID);
    }

}
