exports.set = set_session;
exports.get = get_session;
exports.check_set = check_set_session;
exports.clear_session = clear_session;
exports.get_user = get_user_data;
exports.loginUser = loginUser
exports.hasSession = hasSession

function set_session(req, data, key) {
    var views = req.session.user;

    if (!views) {
        views = req.session.user = {};
    }

    req.session.user[key] = data;
}

function get_session(req, key) {
    return req.session.user[key];
}

function check_set_session(req) {
    if (req.session.user != null) {
        return true;
    }
    return false;
}

function clear_session(req) {
    if( req.session && req.session.user && req.session.user['login-user-model'] ) {
        req.session.user = null;
    }
}

function get_user_data(req,key) {
    if (typeof key == 'string') {
        return req.session.user['login-user-model'].rowData[key]
    }
    else {
        return req.session.user['login-user-model'].rowData
    }
}

function loginUser(req) {    
    return req.session && req.session.user && req.session.user['login-user-model'] ? req.session.user['login-user-model'] : false
}

function hasSession(req) {
    return req.session && req.session.user && req.session.user['login-user-model'] ? true : false
}