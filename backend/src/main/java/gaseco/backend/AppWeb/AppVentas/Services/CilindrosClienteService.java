package gaseco.backend.AppWeb.AppVentas.Services;


import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import gaseco.backend.AppWeb.AppVentas.Repository.CilindrosCliRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CilindrosClienteService {
    private final CilindrosCliRepository cilindrosCliRepository;

    public List<Map<String, Object>> getCilindrosPorCliente(String CustID) {
        return cilindrosCliRepository.GetCilCli(CustID);
    }

}
