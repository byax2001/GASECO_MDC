package gaseco.backend.AppWeb.AppVentas.Querys;

public class QueryCilindrosCli {

    public static final String GET_CILINDROS_EN_CLIENTE = """
       
        WITH base AS (
            SELECT
                c.idcilindro,
                c.serie,
                c.refubactual AS numremision,
                c.sucursal,
                c.cveproducto_cp,
                f.cveenvase_f,
                f.descenvase_f AS descenvase,
                p.desccorta AS desccorta_cp
            FROM c_cilindro c
            JOIN tipoenvase t
                ON t.cveenvase = c.cveenvase
            JOIN familiaenvase f
                ON f.cveenvase_f = t.fam_envase
            JOIN c_catalogoproductos p
                ON p.cveproducto_cp = c.cveproducto_cp
            WHERE c.status = 'AC'
              AND c.ubactual = 'CLI'
              AND t.clasif = 'C'
        ),

        cliente_actual_o AS (
            SELECT
                esp.idcilindro,
                rem.sucursal,
                rem.numremision,
                MIN(rem.cvecliente) AS cvecliente
            FROM c_remisioncil rem
            JOIN c_espdetremcil esp
                ON esp.numremision = rem.numremision
            WHERE rem.cveoperacion NOT LIKE 'TR%'
              AND (esp.cveoperacion NOT LIKE 'TR%' OR esp.cveoperacion IS NULL)
            GROUP BY esp.idcilindro, rem.sucursal, rem.numremision
        ),

        cliente_bk_o AS (
            SELECT
                sucursal,
                numremision,
                MIN(cvecliente) AS cvecliente
            FROM c_remisioncil_bk
            WHERE cveoperacion NOT LIKE 'TR%'
            GROUP BY sucursal, numremision
        ),

        fecha_o AS (
            SELECT
                sucursal,
                numremision,
                MIN(fhemision) AS fhemision
            FROM (
                SELECT sucursal, numremision, fhemision
                FROM c_remisioncil
                WHERE cveoperacion NOT LIKE 'TR%'

                UNION ALL

                SELECT sucursal, numremision, fhemision
                FROM c_remisioncil_bk
                WHERE cveoperacion NOT LIKE 'TR%'
            )
            GROUP BY sucursal, numremision
        )

        SELECT
            NVL(cao.cvecliente, cbo.cvecliente) AS cvecliente_c,
            cl.nombre_c,
            fo.fhemision,
            b.cveproducto_cp,
            b.cveenvase_f,
            b.descenvase,
            b.desccorta_cp,
            b.idcilindro,
            b.serie,
            b.numremision,
            b.sucursal
        FROM base b
        LEFT JOIN cliente_actual_o cao
            ON cao.idcilindro = b.idcilindro
           AND cao.sucursal = b.sucursal
           AND cao.numremision = b.numremision
        LEFT JOIN cliente_bk_o cbo
            ON cbo.sucursal = b.sucursal
           AND cbo.numremision = b.numremision
        LEFT JOIN fecha_o fo
            ON fo.sucursal = b.sucursal
           AND fo.numremision = b.numremision
        JOIN c_clientes cl
            ON cl.cvecliente_c = NVL(cao.cvecliente, cbo.cvecliente)
        WHERE cl.cvecliente_c = ?
        """;
}
