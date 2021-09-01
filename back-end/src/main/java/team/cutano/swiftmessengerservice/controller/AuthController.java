package team.cutano.swiftmessengerservice.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.web.bind.annotation.*;
import team.cutano.swiftmessengerservice.json.Converter;
import team.cutano.swiftmessengerservice.json.Register;
import team.cutano.swiftmessengerservice.json.RegisterData;
import team.cutano.swiftmessengerservice.mapper.AuthMapper;
import team.cutano.swiftmessengerservice.pojo.User;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/v1.0/auth")
public class AuthController {
    @Resource
    private AuthMapper authMapper;

    @PostMapping("/register")
    public String userRegister(@RequestBody Map<String, Object> body) {
        String username = (String) body.get("username");
        String password = (String) body.get("password");
        String userAvatar = (String) body.get("userAvatar");
        User user = new User(null, username, userAvatar, password);
        Integer res = authMapper.userRegister(user);
        Integer userID = user.getUserID();
        if (res == 0 || userID == null) return "{\"result\": \"error\"}";

        Register register = new Register();
        RegisterData registerData = new RegisterData();
        registerData.setUserID((long) userID);
        register.setResult("success");
        register.setData(registerData);
        try {
            return Converter.RegisterToJsonString(register);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return "{\"result\": \"error\"}";
        }
    }

    @PostMapping("/login")
    public String userLogin(@RequestBody Map<String, Object> body) {
        Integer userID = (Integer) body.get("userID");
        String password = (String) body.get("password");
        User user = new User(userID, null, null, password);
        Map<String, Object> map = authMapper.userLogin(user);
        if (map.get("password") == null || !password.equals(map.get("password"))) return "{\"result\": \"error\"}";
        else return "{\"result\": \"success\"}";
    }
}
