package team.cutano.swiftmessengerservice.json;

import com.fasterxml.jackson.annotation.*;

public class Register {
    private String result;
    private RegisterData data;

    @JsonProperty("result")
    public String getResult() { return result; }
    @JsonProperty("result")
    public void setResult(String value) { this.result = value; }

    @JsonProperty("data")
    public RegisterData getData() { return data; }
    @JsonProperty("data")
    public void setData(RegisterData value) { this.data = value; }
}
