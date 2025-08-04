//cookieのKey定数
/** Key:sns_status*/
const sns_status_cookie_name = 'sns_status';
/** Key:display_init*/
const display_init_cookie_name = 'display_init';
/** Key:list_count*/
const lists_cookie_name = 'list_count';

/**
 * 受け取った値を整形してクッキーに設定する
 * @param key クッキーに設定するキー名
 * @param value クッキーの値
 * @param limit クッキーの有効期限
 * @param path クッキーのパス
 */
function set_cookie(key, value, limit,path) {
    var cookies = get_cookie();
    //指定されているクッキー名が無ければクッキーを設定する、あればクッキーを設定しない
    //クッキーがある場合にクッキーを設定しないのは有効期限切れさせて一度クッキーを破棄させたいから
    if (!cookies[key]) {
        value = (value instanceof String)? value : JSON.stringify(value);

        document.cookie = key + '=' + value + ';max-age=' + limit+';path=' + path;
    }
}

/**
 * クッキーを整形して返却する
 * @returns {Array}
 */
function get_cookie() {
    var result = [];
    var cookies = document.cookie;

    if (cookies != '') {
        var cookieArray = cookies.split(';');
        for (var i = 0; i < cookieArray.length; i++) {
            var cookie = cookieArray[i].split('=');
            if (cookie.length == 1) {
                cookie.push('');
            }
            if (cookie[1].constructor === null) {
                //何もなければ処理スキップ
            } else if (cookie[1].constructor === undefined) {
                //何もなければ処理スキップ
            } else {
                try {
                    //JSONの場合
                    result[cookie[0].trim()] = JSON.parse(cookie[1]);
                } catch (e) {
                    //JSON以外の場合
                    result[cookie[0].trim()] = decodeURI(cookie[1].trim());
                }
            }
        }
    }
    return result;
}

/**
 * クッキーを削除する
 * @param key 削除対象のクッキー名
 * @param path クッキーのパス
 */
function delete_cookie(key,path) {
    key = (key instanceof Array) ? key : [key];
    key.forEach(function (value){
        document.cookie = value + '=;max-age=0;path='+path
    });
}
