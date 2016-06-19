angular.module('pizzaDayApp')
    .constant('AUTH_EVENTS', {
        loginSuccess: 'auth-login-success',
        loginFailed: 'auth-login-failed',
        logoutSuccess: 'auth-logout-success',
        sessionTimeout: 'auth-session-timeout',
        notAuthenticated: 'auth-not-authenticated',
        notAuthorized: 'auth-not-authorized'
    })
    //api interaction urls
    .constant('URLS', {
        domain: 'http://127.0.0.1:8000',
        login: '/rest-auth/login/',
        logout: '/rest-auth/logout/',
        register: '/rest-auth/registration/',
        verify: '/rest-auth/registration/verify-email/',
        posts: '/posts/:id'
    })
;
