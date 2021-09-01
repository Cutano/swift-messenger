package team.cutano.swiftmessengerservice.pojo;

public class Session {
    private Integer sessionID;
    private String recentMsg;
    private String recentMsgTimeStamp;

    public Session(Integer sessionID, String recentMsg, String recentMsgTimeStamp) {
        this.sessionID = sessionID;
        this.recentMsg = recentMsg;
        this.recentMsgTimeStamp = recentMsgTimeStamp;
    }

    public Integer getSessionID() {
        return sessionID;
    }

    public void setSessionID(Integer sessionID) {
        this.sessionID = sessionID;
    }

    public String getRecentMsg() {
        return recentMsg;
    }

    public void setRecentMsg(String recentMsg) {
        this.recentMsg = recentMsg;
    }

    public String getRecentMsgTimeStamp() {
        return recentMsgTimeStamp;
    }

    public void setRecentMsgTimeStamp(String recentMsgTimeStamp) {
        this.recentMsgTimeStamp = recentMsgTimeStamp;
    }
}
