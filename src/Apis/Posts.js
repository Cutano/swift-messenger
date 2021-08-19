import {urlBase, version} from "./UrlBase";

/*
Provides friends information with the current state
POST: Chatters ID, S
 */
export const friendList = `${urlBase}/${version}/chat/friend-list`
export const conversationHistoryMsg = `${urlBase}/${version}/chat/conv-his-msg`
export const clearUnread = `${urlBase}/${version}/chat/cls-unread`