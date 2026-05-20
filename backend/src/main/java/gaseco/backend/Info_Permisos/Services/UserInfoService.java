package gaseco.backend.Info_Permisos.Services;
import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Service;

import gaseco.backend.Info_Permisos.Repository.UserInfoRepository;

@Service
public class UserInfoService {
    private final UserInfoRepository userInfoRepository;

    public UserInfoService(UserInfoRepository userInfoRepository) {
        this.userInfoRepository = userInfoRepository;
    }

    public List<Map<String, Object>> getUserInfo(String username) {
        return userInfoRepository.getUserInfo(username);
    }
}
