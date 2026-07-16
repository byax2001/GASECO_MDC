package gaseco.backend.AppWeb.Inventario.Repository;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import gaseco.backend.AppWeb.Inventario.Querys.InventoryQuery;

@Repository
public class C_CilindroRepository {
    private final JdbcTemplate jdbc;

    public C_CilindroRepository(@Qualifier("modulocilindroJdbcTemplate") JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    public List<Map<String, Object>>  GetCilBySerie(String Serie){
        return jdbc.queryForList(InventoryQuery.GET_CIL_BY_SERIE, Serie);
    }
}
