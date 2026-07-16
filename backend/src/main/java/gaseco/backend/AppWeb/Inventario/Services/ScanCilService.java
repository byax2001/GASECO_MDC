package gaseco.backend.AppWeb.Inventario.Services;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import gaseco.backend.AppWeb.Inventario.Repository.C_CilindroRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ScanCilService {
    private final C_CilindroRepository cCilindroRepository;

    public List<Map<String, Object>> getCilBySerie(String serie) {
        return cCilindroRepository.GetCilBySerie(serie);
    }
}
