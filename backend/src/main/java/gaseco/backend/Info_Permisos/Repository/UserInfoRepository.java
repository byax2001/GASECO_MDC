package gaseco.backend.Info_Permisos.Repository;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import gaseco.backend.Info_Permisos.Queries.UserQuery;

@Repository

public class UserInfoRepository {
    private final JdbcTemplate jdbc;

     public UserInfoRepository(@Qualifier("seguridadJdbcTemplate") JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }
    public List<Map<String, Object>> getUserInfo(String username) {
        return jdbc.queryForList(UserQuery.GET_USER_INFO_APP, username);
    }

}
