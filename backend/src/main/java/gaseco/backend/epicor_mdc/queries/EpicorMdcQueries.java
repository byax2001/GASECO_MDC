package gaseco.backend.epicor_mdc.queries;

public class EpicorMdcQueries {
    public static final String GET_CILINDROS = """
        SELECT * 
        FROM c_cilindro 
        WHERE status = 'AC' and CVEPRODUCTO_CP = 'ACE-15-CI'
    """;

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
              AND rem.uso_remision = 'O'
              AND (esp.cveoperacion NOT LIKE 'TR%' OR esp.cveoperacion IS NULL)
              AND esp.cveproducto_cp NOT IN ('OXY-25-CM', 'OXY-25-CRIM')
            GROUP BY esp.idcilindro, rem.sucursal, rem.numremision
        ),

        cliente_bk_o AS (
            SELECT
                sucursal,
                numremision,
                MIN(cvecliente) AS cvecliente
            FROM c_remisioncil_bk
            WHERE cveoperacion NOT LIKE 'TR%'
              AND uso_remision = 'O'
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
                  AND uso_remision = 'O'

                UNION ALL

                SELECT sucursal, numremision, fhemision
                FROM c_remisioncil_bk
                WHERE cveoperacion NOT LIKE 'TR%'
                  AND uso_remision = 'O'
            )
            GROUP BY sucursal, numremision
        ),

        cliente_actual_m AS (
            SELECT
                esp.idcilindro,
                rem.sucursal,
                rem.numremision,
                MIN(rem.cvecliente) AS cvecliente
            FROM c_remisioncil rem
            JOIN c_espdetremcil esp
                ON esp.numremision = rem.numremision
            WHERE rem.cveoperacion NOT LIKE 'TR%'
              AND rem.uso_remision = 'M'
              AND (esp.cveoperacion NOT LIKE 'TR%' OR esp.cveoperacion IS NULL)
              AND esp.cveproducto_cp  IN ('OXY-25-CM', 'OXY-25-CRIM')
            GROUP BY esp.idcilindro, rem.sucursal, rem.numremision
        ),

        cliente_bk_m AS (
            SELECT
                sucursal,
                numremision,
                MIN(cvecliente) AS cvecliente
            FROM c_remisioncil_bk
            WHERE cveoperacion NOT LIKE 'TR%'
              AND uso_remision = 'M'
            GROUP BY sucursal, numremision
        ),

        fecha_m AS (
            SELECT
                sucursal,
                numremision,
                MIN(fhemision) AS fhemision
            FROM (
                SELECT sucursal, numremision, fhemision
                FROM c_remisioncil
                WHERE cveoperacion NOT LIKE 'TR%'
                  AND uso_remision = 'M'

                UNION ALL

                SELECT sucursal, numremision, fhemision
                FROM c_remisioncil_bk
                WHERE cveoperacion NOT LIKE 'TR%'
                  AND uso_remision = 'M'
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
        WHERE b.cveproducto_cp NOT IN ('OXY-25-CM','OXY-25-CRIM')
          AND cl.cvecliente_c = ?

        UNION ALL

        SELECT
            NVL(cam.cvecliente, cbm.cvecliente) AS cvecliente_c,
            cl.nombre_c,
            fm.fhemision,
            b.cveproducto_cp,
            b.cveenvase_f,
            b.descenvase,
            b.desccorta_cp,
            b.idcilindro,
            b.serie,
            b.numremision,
            b.sucursal
        FROM base b
        LEFT JOIN cliente_actual_m cam
            ON cam.idcilindro = b.idcilindro
           AND cam.sucursal = b.sucursal
           AND cam.numremision = b.numremision
        LEFT JOIN cliente_bk_m cbm
            ON cbm.sucursal = b.sucursal
           AND cbm.numremision = b.numremision
        LEFT JOIN fecha_m fm
            ON fm.sucursal = b.sucursal
           AND fm.numremision = b.numremision
        JOIN c_clientes cl
            ON cl.cvecliente_c = NVL(cam.cvecliente, cbm.cvecliente)
        WHERE b.cveproducto_cp IN ('OXY-25-CM','OXY-25-CRIM')
          AND cl.cvecliente_c = ?
        """;
    
    public static final String GET_CILINDROS_EN_CLIENTE_DIAS =  """
    WITH base AS (
        SELECT
            c.idcilindro,
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
          AND rem.uso_remision = 'O'
          AND (esp.cveoperacion NOT LIKE 'TR%' OR esp.cveoperacion IS NULL)
          AND esp.cveproducto_cp NOT IN ('OXY-25-CM', 'OXY-25-CRIM')
        GROUP BY esp.idcilindro, rem.sucursal, rem.numremision
    ),

    cliente_bk_o AS (
        SELECT
            sucursal,
            numremision,
            MIN(cvecliente) AS cvecliente
        FROM c_remisioncil_bk
        WHERE cveoperacion NOT LIKE 'TR%'
          AND uso_remision = 'O'
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
              AND uso_remision = 'O'

            UNION ALL

            SELECT sucursal, numremision, fhemision
            FROM c_remisioncil_bk
            WHERE cveoperacion NOT LIKE 'TR%'
              AND uso_remision = 'O'
        )
        GROUP BY sucursal, numremision
    ),

    cliente_actual_m AS (
        SELECT
            esp.idcilindro,
            rem.sucursal,
            rem.numremision,
            MIN(rem.cvecliente) AS cvecliente
        FROM c_remisioncil rem
        JOIN c_espdetremcil esp
            ON esp.numremision = rem.numremision
        WHERE rem.cveoperacion NOT LIKE 'TR%'
          AND rem.uso_remision = 'M'
          AND (esp.cveoperacion NOT LIKE 'TR%' OR esp.cveoperacion IS NULL)
          AND esp.cveproducto_cp  IN ('OXY-25-CM', 'OXY-25-CRIM')
        GROUP BY esp.idcilindro, rem.sucursal, rem.numremision
    ),

    cliente_bk_m AS (
        SELECT
            sucursal,
            numremision,
            MIN(cvecliente) AS cvecliente
        FROM c_remisioncil_bk
        WHERE cveoperacion NOT LIKE 'TR%'
          AND uso_remision = 'M'
        GROUP BY sucursal, numremision
    ),

    fecha_m AS (
        SELECT
            sucursal,
            numremision,
            MIN(fhemision) AS fhemision
        FROM (
            SELECT sucursal, numremision, fhemision
            FROM c_remisioncil
            WHERE cveoperacion NOT LIKE 'TR%'
              AND uso_remision = 'M'

            UNION ALL

            SELECT sucursal, numremision, fhemision
            FROM c_remisioncil_bk
            WHERE cveoperacion NOT LIKE 'TR%'
              AND uso_remision = 'M'
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
    WHERE b.cveproducto_cp NOT IN ('OXY-25-CM','OXY-25-CRIM')
      AND cl.cvecliente_c = ?
      AND fo.fhemision <= TRUNC(SYSDATE) - ?

    UNION ALL

    SELECT
        NVL(cam.cvecliente, cbm.cvecliente) AS cvecliente_c,
        cl.nombre_c,
        fm.fhemision,
        b.cveproducto_cp,
        b.cveenvase_f,
        b.descenvase,
        b.desccorta_cp,
        b.idcilindro,
        b.numremision,
        b.sucursal
    FROM base b
    LEFT JOIN cliente_actual_m cam
        ON cam.idcilindro = b.idcilindro
       AND cam.sucursal = b.sucursal
       AND cam.numremision = b.numremision
    LEFT JOIN cliente_bk_m cbm
        ON cbm.sucursal = b.sucursal
       AND cbm.numremision = b.numremision
    LEFT JOIN fecha_m fm
        ON fm.sucursal = b.sucursal
       AND fm.numremision = b.numremision
    JOIN c_clientes cl
        ON cl.cvecliente_c = NVL(cam.cvecliente, cbm.cvecliente)
    WHERE b.cveproducto_cp IN ('OXY-25-CM','OXY-25-CRIM')
      AND cl.cvecliente_c = ?
      AND fm.fhemision <= TRUNC(SYSDATE) - ?
    """;

    // Consulta para obtener la cantidad de cilindros que un cliente tiene desde hace una cantidad de días determinada
    public static final String GET_CANTIDAD_CIL_DIAS = """
            WITH base AS (
                SELECT
                    c.idcilindro,
                    c.serie,
                    c.refubactual AS numremision,
                    c.sucursal,
                    c.cveproducto_cp
                FROM c_cilindro c
                WHERE c.status = 'AC'
                AND c.ubactual = 'CLI'
            ),

            cliente_actual AS (
                SELECT
                    esp.idcilindro,
                    rem.sucursal,
                    rem.numremision,
                    MIN(rem.cvecliente) AS cvecliente,
                    MIN(rem.fhemision) AS fhemision
                FROM c_remisioncil rem
                JOIN c_espdetremcil esp
                    ON esp.numremision = rem.numremision
                WHERE rem.cveoperacion NOT LIKE 'TR%'
                AND (esp.cveoperacion NOT LIKE 'TR%' OR esp.cveoperacion IS NULL)
                GROUP BY esp.idcilindro, rem.sucursal, rem.numremision
            )
            SELECT
                COUNT(*) AS NUMCIL
            FROM base b
            JOIN cliente_actual cao
                ON cao.idcilindro = b.idcilindro
            AND cao.sucursal = b.sucursal
            AND cao.numremision = b.numremision
            WHERE cao.cvecliente = ?
            AND cao.fhemision <= TRUNC(SYSDATE) - ?
            """;   
            
    public static final String GET_CANTIDAD_CIL_DIAS_V2 ="""
            WITH base AS (
                SELECT
                    c.idcilindro,
                    c.serie,
                    c.refubactual AS numremision,
                    c.sucursal,
                    c.cveproducto_cp
                FROM c_cilindro c
                WHERE c.status = 'AC'
                AND c.ubactual = 'CLI'
            ),

            cliente_actual AS (
                SELECT
                    esp.idcilindro,
                    rem.sucursal,
                    rem.numremision,
                    MIN(rem.cvecliente) AS cvecliente,
                    MIN(rem.fhemision) AS fhemision
                FROM c_remisioncil rem
                JOIN c_espdetremcil esp
                    ON esp.numremision = rem.numremision
                WHERE rem.cveoperacion NOT LIKE 'TR%'
                AND (esp.cveoperacion NOT LIKE 'TR%' OR esp.cveoperacion IS NULL)
                GROUP BY esp.idcilindro, rem.sucursal, rem.numremision
            )

            SELECT
                COUNT(*) AS NUMCILCLI,
                SUM(
                    CASE
                        WHEN cao.fhemision <= TRUNC(SYSDATE) - ?
                        THEN 1
                        ELSE 0
                    END
                ) AS NUMCILCLIDIAS
            FROM base b
            JOIN cliente_actual cao
                ON cao.idcilindro = b.idcilindro
            AND cao.sucursal = b.sucursal
            AND cao.numremision = b.numremision
            WHERE cao.cvecliente = ?
            """;
    
        // Consulta para obtener la cantidad de cilindros que un cliente tiene
        // a mas de X días y X producto(parte))
        public static final String GET_CANTIDAD_CIL_DIAS_PARTE = """
            WITH base AS (
                SELECT
                    c.idcilindro,
                    c.serie,
                    c.refubactual AS numremision,
                    c.sucursal,
                    c.cveproducto_cp
                FROM c_cilindro c
                WHERE c.status = 'AC'
                AND c.ubactual = 'CLI'
            ),

            cliente_actual AS (
                SELECT
                    esp.idcilindro,
                    rem.sucursal,
                    rem.numremision,
                    MIN(rem.cvecliente) AS cvecliente,
                    MIN(rem.fhemision) AS fhemision
                FROM c_remisioncil rem
                JOIN c_espdetremcil esp
                    ON esp.numremision = rem.numremision
                WHERE rem.cveoperacion NOT LIKE 'TR%'
                AND (esp.cveoperacion NOT LIKE 'TR%' OR esp.cveoperacion IS NULL)
                GROUP BY esp.idcilindro, rem.sucursal, rem.numremision
            )
            SELECT
                COUNT(*) AS NUMCILCLI,
                SUM(
                    CASE
                        WHEN cao.fhemision <= TRUNC(SYSDATE) - ?
                        THEN 1
                        ELSE 0
                    END
                ) AS NUMCILCLIDIAS
            FROM base b
            JOIN cliente_actual cao
                ON cao.idcilindro = b.idcilindro
            AND cao.sucursal = b.sucursal
            AND b.cveproducto_cp = ?
            AND cao.numremision = b.numremision
            WHERE cao.cvecliente = ?
            """;    


    public static final String GET_CANTIDAD_CIL_DIAS_IND_MED = """
           WITH base AS (
                SELECT
                    c.idcilindro,
                    c.serie,
                    c.refubactual AS numremision,
                    c.sucursal,
                    c.cveproducto_cp
                FROM c_cilindro c
                WHERE c.status = 'AC'
                AND c.ubactual = 'CLI'
            ),

            cliente_actual_o AS (
                SELECT
                    esp.idcilindro,
                    rem.sucursal,
                    rem.numremision,
                    MIN(rem.cvecliente) AS cvecliente,
                    MIN(rem.fhemision) AS fhemision
                FROM c_remisioncil rem
                JOIN c_espdetremcil esp
                    ON esp.numremision = rem.numremision
                WHERE rem.cveoperacion NOT LIKE 'TR%'
                AND rem.uso_remision = 'O'
                AND (esp.cveoperacion NOT LIKE 'TR%' OR esp.cveoperacion IS NULL)
                AND esp.cveproducto_cp NOT IN ('OXY-25-CM', 'OXY-25-CRIM')
                GROUP BY esp.idcilindro, rem.sucursal, rem.numremision
            ),

            cliente_actual_m AS (
                SELECT
                    esp.idcilindro,
                    rem.sucursal,
                    rem.numremision,
                    MIN(rem.cvecliente) AS cvecliente,
                    MIN(rem.fhemision) AS fhemision
                FROM c_remisioncil rem
                JOIN c_espdetremcil esp
                    ON esp.numremision = rem.numremision
                WHERE rem.cveoperacion NOT LIKE 'TR%'
                AND rem.uso_remision = 'M'
                AND (esp.cveoperacion NOT LIKE 'TR%' OR esp.cveoperacion IS NULL)
                AND esp.cveproducto_cp  IN ('OXY-25-CM', 'OXY-25-CRIM')
                GROUP BY esp.idcilindro, rem.sucursal, rem.numremision
            )

            SELECT
                COUNT(*) AS NUMCIL
            FROM base b
            JOIN cliente_actual_o cao
                ON cao.idcilindro = b.idcilindro
            AND cao.sucursal = b.sucursal
            AND cao.numremision = b.numremision
            WHERE b.cveproducto_cp NOT IN ('OXY-25-CM', 'OXY-25-CRIM')
            AND cao.cvecliente = ?
            AND cao.fhemision <= TRUNC(SYSDATE) - ?

            UNION ALL

            SELECT
            COUNT(*) AS NUMCIL
            FROM base b
            JOIN cliente_actual_m cam
                ON cam.idcilindro = b.idcilindro
            AND cam.sucursal = b.sucursal
            AND cam.numremision = b.numremision
            WHERE b.cveproducto_cp  IN ('OXY-25-CM', 'OXY-25-CRIM')
            AND cam.cvecliente = ?
            AND cam.fhemision <= TRUNC(SYSDATE) - ?
            """;
    
}
