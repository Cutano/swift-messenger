package team.cutano.swiftmessengerservice.json;

import com.fasterxml.jackson.annotation.*;
import java.util.List;

public class ConversationHistoryMsgData {
    private Long time;
    private List<Message> messages;

    @JsonProperty("time")
    public Long getTime() { return time; }
    @JsonProperty("time")
    public void setTime(Long value) { this.time = value; }

    @JsonProperty("messages")
    public List<Message> getMessages() { return messages; }
    @JsonProperty("messages")
    public void setMessages(List<Message> value) { this.messages = value; }
}
