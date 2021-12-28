
 function _getKey(key) {
    return `Insider-${key}`;
}


function load(key) {
    return JSON.parse(localStorage.getItem(_getKey(key)));
}


function save(key, gameState) {
    localStorage.setItem(_getKey(key), JSON.stringify(gameState));
}

function isExist(key) {
    return !!localStorage.getItem(_getKey(key));
}

function remove(key) {
    return localStorage.removeItem(_getKey(key));
}

export default {
    save,
    load,
    isExist,
    remove
};