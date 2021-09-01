package team.cutano.swiftmessengerservice.json;

import com.fasterxml.jackson.annotation.*;

public class ConversationHistoryMsg {
    private String result;
    private ConversationHistoryMsgData data;

    @JsonProperty("result")
    public String getResult() { return result; }
    @JsonProperty("result")
    public void setResult(String value) { this.result = value; }

    @JsonProperty("data")
    public ConversationHistoryMsgData getData() { return data; }
    @JsonProperty("data")
    public void setData(ConversationHistoryMsgData value) { this.data = value; }
}
