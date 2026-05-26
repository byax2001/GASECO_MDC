package gaseco.backend.AppWeb.Info_Permisos.Queries;

public class UserQuery {
    public static final String GET_USER_INFO_APP = """
        SELECT * 
        FROM USER_COMPANY_APPGASECO 
        WHERE login = ?
    """;
}
