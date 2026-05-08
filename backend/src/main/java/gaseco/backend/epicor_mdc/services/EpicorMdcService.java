package gaseco.backend.epicor_mdc.services;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import gaseco.backend.epicor_mdc.repository.EpicorMdcRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EpicorMdcService {
    private final EpicorMdcRepository epicorMdcRepository;


    public List<Map<String, Object>> getCilindros() {
        // Lógica para obtener los cilindros desde la base de datos
        return epicorMdcRepository.getCilindros();
    }

    public List<Map<String, Object>> getCilindrosEnCliente(String idcliente) {
        // Lógica para obtener los cilindros en cliente desde la base de datos
        return epicorMdcRepository.getCilindrosEnCliente(idcliente);
    }

    public List<Map<String, Object>> getQtyCilindrosEnClienteDias(String idcliente, int dias) {
        // Lógica para obtener n cantidad de cilindros en cliente que llevan mas de n dias sin movimiento
        return epicorMdcRepository.getQtyCilindrosEnClienteDias(idcliente, dias);
    }

    public List<Map<String, Object>> getQtyCilindrosEnClienteDiasParte(String idcliente, int dias, String parte) {
        // Lógica para obtener n cantidad de cilindros en cliente que llevan mas de n dias sin movimiento y que contengan una parte del numero de serie
        return epicorMdcRepository.getQtyCilindrosEnClienteDiasParte(idcliente, dias, parte);
    }
}
