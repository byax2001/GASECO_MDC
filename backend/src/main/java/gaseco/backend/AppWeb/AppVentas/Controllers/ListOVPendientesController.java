package gaseco.backend.AppWeb.AppVentas.Controllers;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import gaseco.backend.AppWeb.AppVentas.Services.ListOVPendientesService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/ventas/ovpendientes")
@RequiredArgsConstructor
public class ListOVPendientesController {
    private final ListOVPendientesService listOVPendientesService;

    @GetMapping("/{company}/{FechaI}/{FechaF}")
    public ResponseEntity<List<Map<String, Object>>> getOVPendientes(@PathVariable String company, @PathVariable LocalDate FechaI, @PathVariable LocalDate FechaF) { // Imprime el valor de company en la consola
        System.out.println("Valor de company: " + company);
        System.out.println("Valor de FechaI: " + FechaI);
        System.out.println("Valor de FechaF: " + FechaF);
        return ResponseEntity.ok(listOVPendientesService.getOVPendientes(company, FechaI, FechaF));
    }


}
