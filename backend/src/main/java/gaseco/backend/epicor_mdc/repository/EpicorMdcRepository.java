package gaseco.backend.epicor_mdc.repository;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import gaseco.backend.epicor_mdc.queries.EpicorMdcQueries;

@Repository
public class EpicorMdcRepository {
    private final JdbcTemplate jdbc;

    public EpicorMdcRepository(@Qualifier("modulocilindroJdbcTemplate") JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    // Método para obtener los cilindros desde la base de datos utilizando JdbcTemplate
    public List<Map<String, Object>> getCilindros() {
    return jdbc.queryForList(EpicorMdcQueries.GET_CILINDROS);
    }

    // Método para obtener los cilindros en cliente desde la base de datos
    public List<Map<String, Object>> getCilindrosEnCliente(String idcliente) {
        return jdbc.queryForList(EpicorMdcQueries.GET_CILINDROS_EN_CLIENTE,idcliente,idcliente);
    }

    // Método para obtener n cantidad de cilindros en cliente que llevan mas de n dias sin movimiento
    public List<Map<String, Object>> getQtyCilindrosEnClienteDias(String idcliente, int dias) {
        return jdbc.queryForList(EpicorMdcQueries.GET_CANTIDAD_CIL_DIAS_V2, dias, idcliente);
    }  
    
    // Método para obtener n cantidad de cilindros en cliente que llevan mas de n dias sin movimiento y que contengan una parte del numero de serie
    public List<Map<String, Object>> getQtyCilindrosEnClienteDiasParte(String idcliente, int dias, String parte) {
        System.out.println("ID Cliente: " + idcliente);
        System.out.println("Días: " + dias);
        System.out.println("Parte: " + parte);
        System.out.println("Query: " + EpicorMdcQueries.GET_CANTIDAD_CIL_DIAS_PARTE);

        return jdbc.queryForList(EpicorMdcQueries.GET_CANTIDAD_CIL_DIAS_PARTE, dias,parte, idcliente);
    }
}
