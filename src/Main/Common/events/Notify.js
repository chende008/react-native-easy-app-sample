import NotifyEvent from './NotifyEvent'

export const Notify = {
    LOGIN_SUCCESS: new NotifyEvent('LOGIN_SUCCESS'), // 登陆成功
    LOGOUT_SUCCESS: new NotifyEvent('LOGOUT_SUCCESS'), // 退出成功
    H5_RELOAD_URL: new NotifyEvent('H5_RELOAD_URL'), //刷新H5页面
    TOKEN_EXPIRED: new NotifyEvent('TOKEN_EXPIRED'), //Token过期
};

