package team.cutano.swiftmessengerservice.pojo;

public class Link {
    private Integer userID;
    private Integer sessionID;

    public Link(Integer userID, Integer sessionID) {
        this.userID = userID;
        this.sessionID = sessionID;
    }

    public Integer getUserID() {
        return userID;
    }

    public void setUserID(Integer userID) {
        this.userID = userID;
    }

    public Integer getSessionID() {
        return sessionID;
    }

    public void setSessionID(Integer sessionID) {
        this.sessionID = sessionID;
    }
}
