package team.cutano.swiftmessengerservice.mapper;

import org.apache.ibatis.annotations.Mapper;
import team.cutano.swiftmessengerservice.pojo.User;

import java.util.HashMap;
import java.util.Map;

@Mapper
public interface AuthMapper {
    Integer userRegister(User user);
    Map<String, Object> userLogin(User user);
}
