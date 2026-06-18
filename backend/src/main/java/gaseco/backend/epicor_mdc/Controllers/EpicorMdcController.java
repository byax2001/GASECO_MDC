package gaseco.backend.epicor_mdc.Controllers;

import java.sql.Connection;
import java.util.List;
import java.util.Map;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import gaseco.backend.Helpers.EpicorToken.services.EpicorService;
import gaseco.backend.epicor_mdc.services.EpicorMdcService;

import org.springframework.jdbc.core.JdbcTemplate;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/epicormdc")
@RequiredArgsConstructor
public class EpicorMdcController {

    private final EpicorMdcService epicorMdcService;
    private final EpicorService epicorService;
    /* 
    private final DataSource modulocilindroDataSource;

    public EpicorMdcController(@Qualifier("modulocilindroDataSource") DataSource modulocilindroDataSource) {
        this.modulocilindroDataSource = modulocilindroDataSource;
    }
    

    @GetMapping("/test")
    public String testDb2() {
        try (Connection conn = modulocilindroDataSource.getConnection()) {
            return "Conectado a DB2: " + conn.getMetaData().getURL();
        } catch (Exception e) {
            return "Error DB2: " + e.getMessage();
        }
    }
    */

    @GetMapping("/cilindros")
    public List<Map<String, Object>> getCilindros() {

        return epicorMdcService.getCilindros();
    }

    @GetMapping("/cilcli/{idcliente}")
    public List<Map<String, Object>> getCilindrosEnCliente(@PathVariable String idcliente) {
        return epicorMdcService.getCilindrosEnCliente(idcliente);
    }

    @GetMapping("/qtyccli/{idcliente}/{dias}")
    public List<Map<String, Object>> getQtyCilindrosEnClienteDias(@PathVariable String idcliente, @PathVariable int dias) {
        return epicorMdcService.getQtyCilindrosEnClienteDias(idcliente, dias);
    }

    @GetMapping("/qtyccli/{idcliente}/{dias}/{parte}")
    public List<Map<String, Object>> getQtyCilindrosEnClienteDiasParte(@PathVariable String idcliente, @PathVariable int dias, @PathVariable String parte) {
        return epicorMdcService.getQtyCilindrosEnClienteDiasParte(idcliente, dias, parte);
    }

    @GetMapping("/test")
    public String test() {
        return epicorService.getToken("serviceconnect", "Cr10G@s2020");
    }
}
