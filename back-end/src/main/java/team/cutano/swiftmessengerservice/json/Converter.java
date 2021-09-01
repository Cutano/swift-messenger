// To use this code, add the following Maven dependency to your project:
//
//
//     com.fasterxml.jackson.core     : jackson-databind          : 2.9.0
//     com.fasterxml.jackson.datatype : jackson-datatype-jsr310   : 2.9.0
//
// Import this package:
//
//     import team.cutano.swiftmessengerservice.json.Converter;
//
// Then you can deserialize a JSON string with
//
//     RemoveFriend data = Converter.AddFriendFromJsonString(jsonString);
//     RemoveFriend data = Converter.ClearUnreadFromJsonString(jsonString);
//     ConversationHistoryMsg data = Converter.ConversationHistoryMsgFromJsonString(jsonString);
//     FriendList data = Converter.FriendListFromJsonString(jsonString);
//     RemoveFriend data = Converter.LoginFromJsonString(jsonString);
//     Register data = Converter.RegisterFromJsonString(jsonString);
//     RemoveFriend data = Converter.RemoveFriendFromJsonString(jsonString);
//     UserInfo data = Converter.UserInfoFromJsonString(jsonString);

package team.cutano.swiftmessengerservice.json;

import java.io.IOException;
import com.fasterxml.jackson.databind.*;
import com.fasterxml.jackson.databind.module.SimpleModule;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import java.util.*;
import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.time.OffsetTime;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeFormatterBuilder;
import java.time.temporal.ChronoField;

public class Converter {
    // Date-time helpers

    private static final DateTimeFormatter DATE_TIME_FORMATTER = new DateTimeFormatterBuilder()
            .appendOptional(DateTimeFormatter.ISO_DATE_TIME)
            .appendOptional(DateTimeFormatter.ISO_OFFSET_DATE_TIME)
            .appendOptional(DateTimeFormatter.ISO_INSTANT)
            .appendOptional(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss.SX"))
            .appendOptional(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ssX"))
            .appendOptional(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"))
            .toFormatter()
            .withZone(ZoneOffset.UTC);

    public static OffsetDateTime parseDateTimeString(String str) {
        return ZonedDateTime.from(Converter.DATE_TIME_FORMATTER.parse(str)).toOffsetDateTime();
    }

    private static final DateTimeFormatter TIME_FORMATTER = new DateTimeFormatterBuilder()
            .appendOptional(DateTimeFormatter.ISO_TIME)
            .appendOptional(DateTimeFormatter.ISO_OFFSET_TIME)
            .parseDefaulting(ChronoField.YEAR, 2020)
            .parseDefaulting(ChronoField.MONTH_OF_YEAR, 1)
            .parseDefaulting(ChronoField.DAY_OF_MONTH, 1)
            .toFormatter()
            .withZone(ZoneOffset.UTC);

    public static OffsetTime parseTimeString(String str) {
        return ZonedDateTime.from(Converter.TIME_FORMATTER.parse(str)).toOffsetDateTime().toOffsetTime();
    }
    // Serialize/deserialize helpers

    public static RemoveFriend AddFriendFromJsonString(String json) throws IOException {
        return getAddFriendObjectReader().readValue(json);
    }

    public static String AddFriendToJsonString(RemoveFriend obj) throws JsonProcessingException {
        return getAddFriendObjectWriter().writeValueAsString(obj);
    }

    public static RemoveFriend ClearUnreadFromJsonString(String json) throws IOException {
        return getClearUnreadObjectReader().readValue(json);
    }

    public static String ClearUnreadToJsonString(RemoveFriend obj) throws JsonProcessingException {
        return getClearUnreadObjectWriter().writeValueAsString(obj);
    }

    public static ConversationHistoryMsg ConversationHistoryMsgFromJsonString(String json) throws IOException {
        return getConversationHistoryMsgObjectReader().readValue(json);
    }

    public static String ConversationHistoryMsgToJsonString(ConversationHistoryMsg obj) throws JsonProcessingException {
        return getConversationHistoryMsgObjectWriter().writeValueAsString(obj);
    }

    public static FriendList FriendListFromJsonString(String json) throws IOException {
        return getFriendListObjectReader().readValue(json);
    }

    public static String FriendListToJsonString(FriendList obj) throws JsonProcessingException {
        return getFriendListObjectWriter().writeValueAsString(obj);
    }

    public static RemoveFriend LoginFromJsonString(String json) throws IOException {
        return getLoginObjectReader().readValue(json);
    }

    public static String LoginToJsonString(RemoveFriend obj) throws JsonProcessingException {
        return getLoginObjectWriter().writeValueAsString(obj);
    }

    public static Register RegisterFromJsonString(String json) throws IOException {
        return getRegisterObjectReader().readValue(json);
    }

    public static String RegisterToJsonString(Register obj) throws JsonProcessingException {
        return getRegisterObjectWriter().writeValueAsString(obj);
    }

    public static RemoveFriend RemoveFriendFromJsonString(String json) throws IOException {
        return getRemoveFriendObjectReader().readValue(json);
    }

    public static String RemoveFriendToJsonString(RemoveFriend obj) throws JsonProcessingException {
        return getRemoveFriendObjectWriter().writeValueAsString(obj);
    }

    public static UserInfo UserInfoFromJsonString(String json) throws IOException {
        return getUserInfoObjectReader().readValue(json);
    }

    public static String UserInfoToJsonString(UserInfo obj) throws JsonProcessingException {
        return getUserInfoObjectWriter().writeValueAsString(obj);
    }

    private static ObjectReader AddFriendReader;
    private static ObjectWriter AddFriendWriter;

    private static void instantiateAddFriendMapper() {
        ObjectMapper mapper = new ObjectMapper();
        mapper.findAndRegisterModules();
        mapper.configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, false);
        SimpleModule module = new SimpleModule();
        module.addDeserializer(OffsetDateTime.class, new JsonDeserializer<>() {
            @Override
            public OffsetDateTime deserialize(JsonParser jsonParser, DeserializationContext deserializationContext) throws IOException, JsonProcessingException {
                String value = jsonParser.getText();
                return Converter.parseDateTimeString(value);
            }
        });
        mapper.registerModule(module);
        AddFriendReader = mapper.readerFor(RemoveFriend.class);
        AddFriendWriter = mapper.writerFor(RemoveFriend.class);
    }

    private static ObjectReader getAddFriendObjectReader() {
        if (AddFriendReader == null) instantiateAddFriendMapper();
        return AddFriendReader;
    }

    private static ObjectWriter getAddFriendObjectWriter() {
        if (AddFriendWriter == null) instantiateAddFriendMapper();
        return AddFriendWriter;
    }

    private static ObjectReader ClearUnreadReader;
    private static ObjectWriter ClearUnreadWriter;

    private static void instantiateClearUnreadMapper() {
        ObjectMapper mapper = new ObjectMapper();
        mapper.findAndRegisterModules();
        mapper.configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, false);
        SimpleModule module = new SimpleModule();
        module.addDeserializer(OffsetDateTime.class, new JsonDeserializer<>() {
            @Override
            public OffsetDateTime deserialize(JsonParser jsonParser, DeserializationContext deserializationContext) throws IOException, JsonProcessingException {
                String value = jsonParser.getText();
                return Converter.parseDateTimeString(value);
            }
        });
        mapper.registerModule(module);
        ClearUnreadReader = mapper.readerFor(RemoveFriend.class);
        ClearUnreadWriter = mapper.writerFor(RemoveFriend.class);
    }

    private static ObjectReader getClearUnreadObjectReader() {
        if (ClearUnreadReader == null) instantiateClearUnreadMapper();
        return ClearUnreadReader;
    }

    private static ObjectWriter getClearUnreadObjectWriter() {
        if (ClearUnreadWriter == null) instantiateClearUnreadMapper();
        return ClearUnreadWriter;
    }

    private static ObjectReader ConversationHistoryMsgReader;
    private static ObjectWriter ConversationHistoryMsgWriter;

    private static void instantiateConversationHistoryMsgMapper() {
        ObjectMapper mapper = new ObjectMapper();
        mapper.findAndRegisterModules();
        mapper.configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, false);
        SimpleModule module = new SimpleModule();
        module.addDeserializer(OffsetDateTime.class, new JsonDeserializer<>() {
            @Override
            public OffsetDateTime deserialize(JsonParser jsonParser, DeserializationContext deserializationContext) throws IOException, JsonProcessingException {
                String value = jsonParser.getText();
                return Converter.parseDateTimeString(value);
            }
        });
        mapper.registerModule(module);
        ConversationHistoryMsgReader = mapper.readerFor(ConversationHistoryMsg.class);
        ConversationHistoryMsgWriter = mapper.writerFor(ConversationHistoryMsg.class);
    }

    private static ObjectReader getConversationHistoryMsgObjectReader() {
        if (ConversationHistoryMsgReader == null) instantiateConversationHistoryMsgMapper();
        return ConversationHistoryMsgReader;
    }

    private static ObjectWriter getConversationHistoryMsgObjectWriter() {
        if (ConversationHistoryMsgWriter == null) instantiateConversationHistoryMsgMapper();
        return ConversationHistoryMsgWriter;
    }

    private static ObjectReader FriendListReader;
    private static ObjectWriter FriendListWriter;

    private static void instantiateFriendListMapper() {
        ObjectMapper mapper = new ObjectMapper();
        mapper.findAndRegisterModules();
        mapper.configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, false);
        SimpleModule module = new SimpleModule();
        module.addDeserializer(OffsetDateTime.class, new JsonDeserializer<>() {
            @Override
            public OffsetDateTime deserialize(JsonParser jsonParser, DeserializationContext deserializationContext) throws IOException, JsonProcessingException {
                String value = jsonParser.getText();
                return Converter.parseDateTimeString(value);
            }
        });
        mapper.registerModule(module);
        FriendListReader = mapper.readerFor(FriendList.class);
        FriendListWriter = mapper.writerFor(FriendList.class);
    }

    private static ObjectReader getFriendListObjectReader() {
        if (FriendListReader == null) instantiateFriendListMapper();
        return FriendListReader;
    }

    private static ObjectWriter getFriendListObjectWriter() {
        if (FriendListWriter == null) instantiateFriendListMapper();
        return FriendListWriter;
    }

    private static ObjectReader LoginReader;
    private static ObjectWriter LoginWriter;

    private static void instantiateLoginMapper() {
        ObjectMapper mapper = new ObjectMapper();
        mapper.findAndRegisterModules();
        mapper.configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, false);
        SimpleModule module = new SimpleModule();
        module.addDeserializer(OffsetDateTime.class, new JsonDeserializer<>() {
            @Override
            public OffsetDateTime deserialize(JsonParser jsonParser, DeserializationContext deserializationContext) throws IOException, JsonProcessingException {
                String value = jsonParser.getText();
                return Converter.parseDateTimeString(value);
            }
        });
        mapper.registerModule(module);
        LoginReader = mapper.readerFor(RemoveFriend.class);
        LoginWriter = mapper.writerFor(RemoveFriend.class);
    }

    private static ObjectReader getLoginObjectReader() {
        if (LoginReader == null) instantiateLoginMapper();
        return LoginReader;
    }

    private static ObjectWriter getLoginObjectWriter() {
        if (LoginWriter == null) instantiateLoginMapper();
        return LoginWriter;
    }

    private static ObjectReader RegisterReader;
    private static ObjectWriter RegisterWriter;

    private static void instantiateRegisterMapper() {
        ObjectMapper mapper = new ObjectMapper();
        mapper.findAndRegisterModules();
        mapper.configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, false);
        SimpleModule module = new SimpleModule();
        module.addDeserializer(OffsetDateTime.class, new JsonDeserializer<>() {
            @Override
            public OffsetDateTime deserialize(JsonParser jsonParser, DeserializationContext deserializationContext) throws IOException, JsonProcessingException {
                String value = jsonParser.getText();
                return Converter.parseDateTimeString(value);
            }
        });
        mapper.registerModule(module);
        RegisterReader = mapper.readerFor(Register.class);
        RegisterWriter = mapper.writerFor(Register.class);
    }

    private static ObjectReader getRegisterObjectReader() {
        if (RegisterReader == null) instantiateRegisterMapper();
        return RegisterReader;
    }

    private static ObjectWriter getRegisterObjectWriter() {
        if (RegisterWriter == null) instantiateRegisterMapper();
        return RegisterWriter;
    }

    private static ObjectReader RemoveFriendReader;
    private static ObjectWriter RemoveFriendWriter;

    private static void instantiateRemoveFriendMapper() {
        ObjectMapper mapper = new ObjectMapper();
        mapper.findAndRegisterModules();
        mapper.configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, false);
        SimpleModule module = new SimpleModule();
        module.addDeserializer(OffsetDateTime.class, new JsonDeserializer<>() {
            @Override
            public OffsetDateTime deserialize(JsonParser jsonParser, DeserializationContext deserializationContext) throws IOException, JsonProcessingException {
                String value = jsonParser.getText();
                return Converter.parseDateTimeString(value);
            }
        });
        mapper.registerModule(module);
        RemoveFriendReader = mapper.readerFor(RemoveFriend.class);
        RemoveFriendWriter = mapper.writerFor(RemoveFriend.class);
    }

    private static ObjectReader getRemoveFriendObjectReader() {
        if (RemoveFriendReader == null) instantiateRemoveFriendMapper();
        return RemoveFriendReader;
    }

    private static ObjectWriter getRemoveFriendObjectWriter() {
        if (RemoveFriendWriter == null) instantiateRemoveFriendMapper();
        return RemoveFriendWriter;
    }

    private static ObjectReader UserInfoReader;
    private static ObjectWriter UserInfoWriter;

    private static void instantiateUserInfoMapper() {
        ObjectMapper mapper = new ObjectMapper();
        mapper.findAndRegisterModules();
        mapper.configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, false);
        SimpleModule module = new SimpleModule();
        module.addDeserializer(OffsetDateTime.class, new JsonDeserializer<>() {
            @Override
            public OffsetDateTime deserialize(JsonParser jsonParser, DeserializationContext deserializationContext) throws IOException, JsonProcessingException {
                String value = jsonParser.getText();
                return Converter.parseDateTimeString(value);
            }
        });
        mapper.registerModule(module);
        UserInfoReader = mapper.readerFor(UserInfo.class);
        UserInfoWriter = mapper.writerFor(UserInfo.class);
    }

    private static ObjectReader getUserInfoObjectReader() {
        if (UserInfoReader == null) instantiateUserInfoMapper();
        return UserInfoReader;
    }

    private static ObjectWriter getUserInfoObjectWriter() {
        if (UserInfoWriter == null) instantiateUserInfoMapper();
        return UserInfoWriter;
    }
}
