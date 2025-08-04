function common_count() {
  const callback_common_count = function(data) {
    if (data && data['success']) {
      // マイチケット
      if (data["result"]["myticket_count"]["count"] && parseInt(data["result"]["myticket_count"]["count"], 10) > 0) {
        $(".js-myticket-count").show();
        $(".js-myticket-count").text(data["result"]["myticket_count"]["count"]);
      } else {
        $(".js-myticket-count").hide();
      }

      // お知らせ一覧
      if (data["result"]["unread_count"] && parseInt(data["result"]["unread_count"], 10) > 0) {
        $(".js-notification-count").show();
        $(".js-notification-count-sidemenu").show();
        $(".js-notification-count").text(data["result"]["unread_count"]);
      } else {
        $(".js-notification-count").hide();
        $(".js-notification-count-sidemenu").hide();
      }

      if (/\/e\/|\/t\//.test(location.href)) {
        // /e/または/t/の場合は処理を軽くするためクッキーに値を設定してクッキーの値を使用する
        set_cookie(lists_cookie_name, data, 300, '/');
      } else {
        // /e/または/t/以外の場合はクッキーを使用しないでAPIの値を使用するためクッキーを削除
        delete_cookie([lists_cookie_name, sns_status_cookie_name, display_init_cookie_name], '/');
      }
    }
  };

  const cookies = get_cookie();

  if (/\/e\/|\/t\//.test(location.href) && cookies[lists_cookie_name]) {
    //クッキーから値を取得
    callback_common_count(cookies[lists_cookie_name]);
  } else {
    // キャッシュ避けのタイムスタンプ
    API.get('common/lists?dev=sp&mytimestamp=' + (new Date().getTime()), callback_common_count);
  }
}

