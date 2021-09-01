package team.cutano.swiftmessengerservice.pojo;

public class User {
    private Integer userID;
    private String username;
    private String userAvatar;
    private String password;

    public User(Integer userID, String username, String userAvatar, String password) {
        this.userID = userID;
        this.username = username;
        this.userAvatar = userAvatar;
        this.password = password;
    }

    public Integer getUserID() {
        return userID;
    }

    public void setUserID(Integer userID) {
        this.userID = userID;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getUserAvatar() {
        return userAvatar;
    }

    public void setUserAvatar(String userAvatar) {
        this.userAvatar = userAvatar;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
