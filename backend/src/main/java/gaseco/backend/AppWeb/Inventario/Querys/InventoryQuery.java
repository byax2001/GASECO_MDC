package gaseco.backend.AppWeb.Inventario.Querys;

public class InventoryQuery {
    public static final String GET_CIL_BY_SERIE = "SELECT c.*, cat.desccorta, cat.UDM, cat.LINEA_CUBO FROM c_cilindro c " + //
                "inner join c_catalogoproductos cat on cat.cveproducto_cp = c.cveproducto_cp " + //
                "WHERE SERIE = ?";
}
