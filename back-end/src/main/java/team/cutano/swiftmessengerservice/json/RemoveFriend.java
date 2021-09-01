package team.cutano.swiftmessengerservice.json;

import com.fasterxml.jackson.annotation.*;

public class RemoveFriend {
    private String result;

    @JsonProperty("result")
    public String getResult() { return result; }
    @JsonProperty("result")
    public void setResult(String value) { this.result = value; }
}
