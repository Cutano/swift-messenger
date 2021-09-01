package team.cutano.swiftmessengerservice.json;

import com.fasterxml.jackson.annotation.*;

public class UserInfo {
    private String result;
    private UserInfoData data;

    @JsonProperty("result")
    public String getResult() { return result; }
    @JsonProperty("result")
    public void setResult(String value) { this.result = value; }

    @JsonProperty("data")
    public UserInfoData getData() { return data; }
    @JsonProperty("data")
    public void setData(UserInfoData value) { this.data = value; }
}
