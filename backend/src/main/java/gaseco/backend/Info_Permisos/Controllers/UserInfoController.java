package gaseco.backend.Info_Permisos.Controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import gaseco.backend.Info_Permisos.Services.UserInfoService;
import lombok.RequiredArgsConstructor;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/user-info")
@RequiredArgsConstructor
public class UserInfoController {
    private final UserInfoService userInfoService;

    @GetMapping("/app/{username}")
    public ResponseEntity<List<Map<String, Object>>> getUserInfo(@PathVariable String username) {
        List<Map<String, Object>> userInfo = userInfoService.getUserInfo(username);
        return ResponseEntity.ok(userInfo);
    }
}
