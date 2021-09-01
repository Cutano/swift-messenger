import {urlBase, version} from "./UrlBase";

export const register = `${urlBase}/${version}/auth/register`;
export const login = `${urlBase}/${version}/auth/login`;
export const userInfo = `${urlBase}/${version}/chat/user-info`;
export const friendList = `${urlBase}/${version}/chat/friend-list`;
export const addFriend = `${urlBase}/${version}/chat/add-friend`;
export const conversationHistoryMsg = `${urlBase}/${version}/chat/conv-his-msg`;
export const clearUnread = `${urlBase}/${version}/chat/cls-unread`;