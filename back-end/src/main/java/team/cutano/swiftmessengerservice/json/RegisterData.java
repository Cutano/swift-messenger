package team.cutano.swiftmessengerservice.json;

import com.fasterxml.jackson.annotation.*;

public class RegisterData {
    private Long userID;

    @JsonProperty("userID")
    public Long getUserID() { return userID; }
    @JsonProperty("userID")
    public void setUserID(Long value) { this.userID = value; }
}
