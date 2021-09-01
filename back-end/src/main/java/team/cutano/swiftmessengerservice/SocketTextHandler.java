package team.cutano.swiftmessengerservice;

import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;
import team.cutano.swiftmessengerservice.json.ws.Converter;
import team.cutano.swiftmessengerservice.json.ws.Data;
import team.cutano.swiftmessengerservice.json.ws.WsData;
import team.cutano.swiftmessengerservice.mapper.ChatMapper;
import team.cutano.swiftmessengerservice.pojo.Message;

import javax.annotation.Resource;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class SocketTextHandler extends TextWebSocketHandler {
    @Resource
    private ChatMapper chatMapper;
    private final Map<Long, WebSocketSession> clients = new HashMap<>();
    private long chatRoomMsgCnt = 0;

    public SocketTextHandler() {
        chatMapper = ApplicationContextHolder.getContext().getBean(ChatMapper.class);
    }

    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message)
            throws InterruptedException, IOException {
        String payload = message.getPayload();
        WsData wsData = Converter.fromJsonString(payload);
        switch (wsData.getType()) {
            case "userLogin": {
                Data data = wsData.getData();
                if (clients.containsKey(data.getUserID())) {
                    clients.get(data.getUserID()).close();
                }
                clients.put(data.getUserID(), session);
                session.sendMessage(new TextMessage(payload));
                List<HashMap<String, Object>> maps = chatMapper.friendList(data.getUserID().intValue());
                wsData.setType("friendLogin");
                for (HashMap<String, Object> item : maps) {
                    Long friendID = Long.valueOf((Integer) item.get("friendID"));
                    if (clients.containsKey(friendID)) {
                        clients.get(friendID).sendMessage(new TextMessage(Converter.toJsonString(wsData)));
                    }
                }

                for (HashMap<String, Object> item : maps) {
                    Long friendID = Long.valueOf((Integer) item.get("friendID"));
                    if (clients.containsKey(friendID)) {
                        data.setUserID(friendID);
                        wsData.setData(data);
                        session.sendMessage(new TextMessage(Converter.toJsonString(wsData)));
                    }
                }
                break;
            }

            case "userLogout": {
                Data data = wsData.getData();
                clients.remove(data.getUserID());
                session.sendMessage(new TextMessage(payload));
                List<HashMap<String, Object>> maps = chatMapper.friendList(data.getUserID().intValue());
                wsData.setType("friendLogout");
                for (HashMap<String, Object> item : maps) {
                    Long friendID = Long.valueOf((Integer) item.get("friendID"));
                    if (clients.containsKey(friendID)) {
                        clients.get(friendID).sendMessage(new TextMessage(Converter.toJsonString(wsData)));
                    }
                }
                break;
            }

            case "newMsg": {
                Data data = wsData.getData();
                Message msg = new Message(data.getSenderID().intValue(), data.getReceiverID().intValue(), data.getTimeStamp().toString(), chatMapper.getSessionID(data.getReceiverID().intValue(), data.getSenderID().intValue()), data.getHasRead(), data.getText());
                Integer res = chatMapper.newMsg(msg);
                Integer res2 = chatMapper.setRecentMsg(msg);
                if (res != null && res != 0 && res2 != null && res2 != 0) {
                    data.setMsgID(msg.getMsgID().longValue());
                    wsData.setData(data);
                    session.sendMessage(new TextMessage(Converter.toJsonString(wsData)));
                    if (clients.containsKey(data.getReceiverID()))
                        clients.get(data.getReceiverID()).sendMessage(new TextMessage(Converter.toJsonString(wsData)));
                } else session.sendMessage(new TextMessage("{\"result\": \"error\"}"));
                break;
            }

            case "chatRoomMsg": {
                chatRoomMsgCnt++;
                Data data = wsData.getData();
                HashMap<String, Object> map = chatMapper.userInfo(data.getSenderID().intValue());
                data.setAvatar((String) map.get("userAvatar"));
                data.setSenderName((String) map.get("username"));
                data.setMsgID(chatRoomMsgCnt);
                wsData.setData(data);
                for (WebSocketSession s : clients.values()) {
                    s.sendMessage(new TextMessage(Converter.toJsonString(wsData)));
                }
                break;
            }

            default: {
                System.out.println("Unknown Message Type.");
            }
        }

    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {

    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        long userID = -1;
        for (long key : clients.keySet()) {
            if (clients.get(key) == session) {
                userID = key;
                break;
            }
        }
        if (userID != -1) {
            WsData wsData = new WsData();
            Data data = new Data();
            data.setTimeStamp(System.currentTimeMillis());
            data.setUserID(userID);
            wsData.setData(data);
            wsData.setType("friendLogout");
            List<HashMap<String, Object>> maps = chatMapper.friendList((int) userID);
            for (HashMap<String, Object> item : maps) {
                Long friendID = Long.valueOf((Integer) item.get("friendID"));
                if (clients.containsKey(friendID) && clients.get(friendID).isOpen()) {
                    clients.get(friendID).sendMessage(new TextMessage(Converter.toJsonString(wsData)));
                }
            }
            clients.remove(userID);
        }
    }
}
