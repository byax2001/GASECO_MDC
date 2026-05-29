package gaseco.backend.AppWeb.AppVentas.Controllers;

import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import gaseco.backend.AppWeb.AppVentas.Services.AppVentasService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/ventas")
@RequiredArgsConstructor
public class AppVentasController {
    
    private final AppVentasService appVentasService;

    //Regresa un listado de todos los clientes
    @GetMapping("/lclientes/{Company}")
    public List<Map<String, Object>> allLClientes( @PathVariable String Company) {

        System.out.println("Listar clientes en Epicor");
        return appVentasService.ListarClientes(Company,"");
    }

    // Regresa un listado de clientes por vendedor
    @GetMapping("/lclientes/{Company}/{CodVendedor}")
    public List<Map<String, Object>> listarClientes( @PathVariable String Company, @PathVariable String CodVendedor) {

        System.out.println("Listar clientes en Epicor");
        return appVentasService.ListarClientes(Company,CodVendedor);
    }

    // Regresa un listado de las partes permitidas para la venta 
    @GetMapping("/lpartes/{Company}")
    public List<Map<String, Object>> listarPartes( @PathVariable String Company) {
        System.out.println("Listar partes en Epicor");
        return appVentasService.ListarPartes(Company);
    }


    // Regresa un listado de las monedas de la compañia con su respectivo simbolo
    @GetMapping("/lmonedas/{Company}")
    public List<Map<String, Object>> listarMonedas( @PathVariable String Company) {

        System.out.println("Listar monedas en Epicor");
        return appVentasService.ListarMonedas(Company);
    }

    // Regresa un listado de los tipos de cilindros de la compañia
    @GetMapping("/ltcilindros/{Company}")
    public List<Map<String, Object>> listarTiposCilindros(@PathVariable String Company) {

        System.out.println("Listar tipos de cilindros en Epicor");
        return appVentasService.ListarTiposCilindros(Company);
    }

    // Regresa un listado con los UOM (Unidad de medida) permitidos para la parte especificada
    @GetMapping("/luom/{Company}/{PartNum}")
    public List<Map<String, Object>> listarUOM(@PathVariable String Company, @PathVariable String PartNum) {

        System.out.println("Listar UOM para la parte " + PartNum + " en Epicor");
        return appVentasService.ListarUOM(Company, PartNum);
    }   


}
