package gaseco.backend.AppWeb.AppVentas.Repository;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import gaseco.backend.AppWeb.AppVentas.Querys.QueryCilindrosCli;

@Repository
public class CilindrosCliRepository {
    private final JdbcTemplate jdbc;

    public CilindrosCliRepository(@Qualifier("modulocilindroJdbcTemplate") JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    public List<Map<String, Object>>  GetCilCli(String CustID){
        return jdbc.queryForList(QueryCilindrosCli.GET_CILINDROS_EN_CLIENTE, CustID, CustID, CustID, CustID);
    }


}
