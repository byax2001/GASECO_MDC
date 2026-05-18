package gaseco.backend.AppVentas.Controllers;

import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import gaseco.backend.AppVentas.Services.AppVentasService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/ventas")
@RequiredArgsConstructor
public class AppVentasController {
    
    private final AppVentasService appVentasService;


    //Todos los clientes
    @GetMapping("/lclientes/{Company}")
    public List<Map<String, Object>> listarClientes( @PathVariable String Company) {

        System.out.println("Listar clientes en Epicor");
        return appVentasService.ListarClientes(Company,"");
    }
}
