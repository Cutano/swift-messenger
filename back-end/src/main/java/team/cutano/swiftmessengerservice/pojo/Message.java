package team.cutano.swiftmessengerservice.pojo;

public class Message {
    private Integer msgID;
    private Integer senderID;
    private Integer receiverID;
    private String timeStamp;
    private Integer sessionID;
    private Boolean hasRead;
    private String text;

    public Message(Integer msgID, Integer senderID, Integer receiverID, String timeStamp, Integer sessionID, Boolean hasRead, String text) {
        this.msgID = msgID;
        this.senderID = senderID;
        this.receiverID = receiverID;
        this.timeStamp = timeStamp;
        this.sessionID = sessionID;
        this.hasRead = hasRead;
        this.text = text;
    }

    public Message(Integer senderID, Integer receiverID, String timeStamp, Integer sessionID, Boolean hasRead, String text) {
        this.senderID = senderID;
        this.receiverID = receiverID;
        this.timeStamp = timeStamp;
        this.sessionID = sessionID;
        this.hasRead = hasRead;
        this.text = text;
    }

    public Integer getMsgID() {
        return msgID;
    }

    public void setMsgID(Integer msgID) {
        this.msgID = msgID;
    }

    public Integer getSenderID() {
        return senderID;
    }

    public void setSenderID(Integer senderID) {
        this.senderID = senderID;
    }

    public Integer getReceiverID() {
        return receiverID;
    }

    public void setReceiverID(Integer receiverID) {
        this.receiverID = receiverID;
    }

    public String getTimeStamp() {
        return timeStamp;
    }

    public void setTimeStamp(String timeStamp) {
        this.timeStamp = timeStamp;
    }

    public Integer getSessionID() {
        return sessionID;
    }

    public void setSessionID(Integer sessionID) {
        this.sessionID = sessionID;
    }

    public Boolean getHasRead() {
        return hasRead;
    }

    public void setHasRead(Boolean hasRead) {
        this.hasRead = hasRead;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }
}
