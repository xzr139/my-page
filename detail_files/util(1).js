/**
 * SP, PC阪ともに利用する Utility オブジェクト
 *
 * N.Ohata
 */
var _util = function(){};
_util.prototype = {
    /**
     * 日付フォーマット変換
     *
     * @param[in] date      日付オブジェクト
     *
     * @return yyyy年mm月dd日(day)形式の文字列
     */
    formatDate: function(date)
    {
        return $.exDate(date, 'yyyy-mm-dd hh:mi:ss').toChar('yyyy年mm月dd日(day)');
    },

    /**
     * 時刻フォーマット変換
     *
     * @param[in] date      日付オブジェクト
     *
     * @return hh24:mi形式の文字列
     */
    formatTime: function(date) {
        return $.exDate(date, 'yyyy-mm-dd hh:mi:ss').toChar('hh24:mi');
    },

    /**
     * 日付フォーマットと時刻フォーマットを結合した文字列を返却
     *
     * @param[in] date      日付オブジェクト
     *
     * @return formatDate() + ' ' + formatTime()
     */
    formatDateTime: function(date) {
        return this.formatDate(date) + " " + this.formatTime(date);
    },

    /**
     * 3桁づつカンマを設定（金額文字列の作成）
     *
     * @param[in] str   3桁区切りの金額文字列
     *
     * @return 再調節した金額文字列
     */
    addFigure: function(str) {
        var num = new String(str).replace(/,/g, "");
        while(num != (num = num.replace(/^(-?\d+)(\d{3})/, "$1,$2")));
        return num;
    },

    /**
     * チケットステータスラベル名の取得
     *
     * @param[in] stat  チケットステータス
     *
     * @return チケットステータスラベル
     */
    getTicketStatusLabel: function(status) {
        status = parseInt(status);
        switch (status) {
            case 1 :
                return '販売中';
            case 2 :
                return '販売前';
            case 3 :
                return '売切';
            case 4 :
                return '受付中';
            case 5 :
                return '受付終了';
            case 6 :
                return '売切間近';
            case 7 :
                return '無料';
            default :
                return '';
        }
    },

    /**
     * 抽選ステータスラベル名の取得
     *
     * @param[in] status    ステータス値
     *
     * @return 抽選ステータスラベル名
     */
    getLotteryStatusLabel: function(status) {
        switch (status) {
        case 'waiting' :
            return '抽選待ち';
        case 'won' :
            return '当選';
        case 'lost' :
            return '落選';
        case 'canceled':
            return 'キャンセル';
        default :
            return '';
        }
    },

    /**
     * 抽選チケットステータスによって利用する色情報
     *
     * @param[in] status    ステータス値
     *
     * @return CSSの色情報
     */
    getLotteryStatusColors: function(status) {
        switch (status) {
        case 'waiting' :
            return "color:#fff; background-color: #" + 'FF9C00;';
        case 'won' :
            return "color:#fff; background-color: #" + 'FF9C00;';
        case 'lost' :
            return "color:#fff; background-color: #" + 'FF9C00;';
        case 'canceled' :
            return "color:#fff; background-color: #" + 'D7D7D7;';
        default :
            return '';
        }
    },

    /**
     * チケット利用可能な数を取得
     *
     * @param[in] min       最小値
     * @param[in] max       最大値
     * @param[in] remain    チケット利用数
     *
     * @return 残りのチケット数
     */
    getTicketLimitJson: function(min, max, remain) {
        if (remain < max) {
            max = remain;
        }

        var count = new Array();
        var c = 0;
        for (var i = min; i <= max; i++) {
            count[c] = i;
            c++;
        }
        return count;
    },

    /**
     * アンカーが同一であるか確認
     *
     * @param[in] hash  アンカー名
     *
     * @retval true     一致
     * @retval false    不一致
     */
    checkHash: function(hash) {
        return location.hash == ('#' + hash);
    },

    /**
     * 対象時刻までの必要時間を取得
     *
     * @param[in] startTime     開演時間
     *
     * @return 開演までの時間文字列
     */
    getAfterHours: function(startTime) {
    	var start = $.exDate(startTime, 'yyyy-mm-dd hh:mi:ss');
    	var currentdate = new Date();
    	return (Math.ceil((start.getTime() - currentdate.getTime())/(1000*60*60))) + "h後";
    },

    //文字を指定も字数で切り取り
    mbellipsis: function(str, byt) {
        if(!str){ return '';}
        byt = byt || 10;
        var bytes = 0;
        var len = 0;
        var unicode = ("｡".charCodeAt(0) == 0xFF61);
        var codeLF = "\n".charCodeAt(0);
        var codeCR = "\r".charCodeAt(0);
        var arr = [];

        for (var i = 0; i < str.length; i++, len++) {
            var code = str.charCodeAt(i);
            if (code < 0){ code += 0x0100;}
            if (code <= 0x7E) {
                bytes++;
                arr[i] = 1;
                if (code == codeLF) {
                    len--;
                } else if (code == codeCR) {
                    len--;
                }
            } else if ((!unicode && code >= 0xA1 && code <= 0xDF) || (unicode && code >= 0xFF61 && code <= 0xFF9F)) {
                bytes++;
                arr[i] = 1;
            } else {
                bytes += 2;
                arr[i] = 2;
            }
            if(bytes > byt){
                var cnt = 0;
                var sub = 0;
                var j = arr.length - 1;
                for(; j > 0; j --){
                    cnt += arr[j];
                    sub ++;
                    if(cnt > 2){ return str.substr(0,len-sub+1)+'...';}
                }
                return '...';
            }
        }
        return str;
    },

    /**
     * リクエスト送信処理
     *  formタグを動的に作成し、submit処理を行う
     *
     * @param[in] url       遷移先URL
     * @param[in] params    送付パラメータオブジェクト
     */
    _post_request: function(url, params) {

        $form = $('<form>').attr({
            action: url,
            method: 'POST',
            'data-ajax': false
        });

        $.each(params, function(k, v) {
            $('<input>').attr({
                type: 'hidden',
                name: k,
                value: v
            }).appendTo($form);
        });

        $form.appendTo('body').submit();
    },

    /**
     * new マークの表示
     */
    checknew:  function(data){
        if(!data){
            return false;
        }
        if(data && data['new']){
            return true;
        }else{
            return false;
        }
    },

    /**
     * 任意ユーザの本アドレス登録confirm 表示
     *
     * @param[in] form_selector_str jQueryセレクタ文字列
     * @param[in] options           確認ウィンドウのオプション値
     *
     * @retval true   実行
     * @retval false  キャンセル
     */
    display_confirm_go_to_full_usable_form: function(form_selector_str,options) {

        var def_options = {
            'msg':"登録メールアドレスに送信された「メールアドレス確認」メールから確認用URLをクリックして、登録を完了させてください。\n\nWe have emailed you at the address provided. Please complete your registration by clicking the email address confirmation link in this message."
            };
        if(typeof(options) === 'object'){
            for(var i in options){
                def_options[i] = options[i];
            }
        }

        // 確認ウィンドウの表示
        alert(def_options['msg']);
        //var is_go_to = confirm(def_options['msg']);
        //if(!is_go_to){
        //    return false;
        //}

        /**
         * send with post
         */
        var send_form = $(form_selector_str);

        if(send_form.length == 0){
            //this._post_request('/mypage/entry_usable',{});
            this._post_request('/my_top',{});
            return true;
        }

        //send_form.attr('action' , '/mypage/entry_usable');
        send_form.attr('action' , '/my_top');

        send_form.submit();
        return true;
    },
    
    send_ticket: function(purchase_id) {
        API.post('purchased_tickets/create_receive_url', {'id' : purchase_id, 'limit' : 1, 'offset' : 1}, function(data) {
            if (data['success']) {
                var tmpl = data['result'];
                var mailto = "mailto:?subject=" + tmpl.subject + "&body=" + tmpl.body;
                location.href = mailto;
            }
        });
    },

    collect_ticket: function(user, purchase_id) {
        if (window.confirm(this.unhtml_escape(user) + '様からチケットの回収を依頼します。よろしいですか？\n\nYou are asking to collect the ticket(s). Is this alright?')) {
            API.post('purchased_tickets/cancel_sent', {'utoken' : 'utoken', 'id' : purchase_id, 'send_cancel' : true}, function (data) {
                if (data && data['success']) {
                    showNavigation('チケット返却依頼を送信しました<br/>状況はマイチケットでご確認いただけます');
                } 
            });
        }
    },

    cancel_ticket_sending: function(purchase_id){
        var current_href = window.location.href;
        API.post('purchased_tickets/cancel_sending', {'id' : purchase_id}, function (data) {
            if (data && data['success']) {
                location.href = current_href;
            } else {
                showNavigation('チケットの受渡中止中にエラーが発生しました<br/>しばらく時間をおいてお試しください');
            }
        });
    },

    bring_back_ticket: function(purchase_id, owner){
        var current_href = window.location.href;
        if (window.confirm(this.unhtml_escape(owner) + '様にチケットを返却します。よろしいですか？\n\nYou will return the ticket(s). Is this alright?')) {
            API.post('purchased_tickets/bring_back', {'id' : purchase_id}, function (data) {
               if (data && data['success']) {
                   location.href = current_href;
               } else {
                   showNavigation('チケットの返却処理中にエラーが発生しました<br/>しばらく時間をおいてお試しください');
               }
            });
        }
    },

    //チケット回収で名前の表示でエスケープ処理されているものをデコード
    unhtml_escape: function(string) {
        var div = document.createElement("div");
        div.innerHTML = string.replace(/</g,"&lt;")
        .replace(/>/g,"&gt;")
        .replace(/ /g, "&nbsp;")
        .replace(/\r/g, "&#13;")
        .replace(/\n/g, "&#10;");

        return div.textContent || div.innerText;
    },

    isAndroid: function(){
        var ua = navigator.userAgent.toLowerCase();
        return !!(ua.indexOf("android"));
    },

    androidVersion: function(){
        var ua = navigator.userAgent.toLowerCase();
        var version = ua.substr(ua.indexOf('android')+8, 3);
        if(ua.indexOf("android")) {
            return version;  
        }else{
            return true;
        }
    },
            
    getSerialCodes: function(){
       var serial_code_inputs = $('input.js-serial-code-input');
       var is_empty = !!(serial_code_inputs.length === 0);
       if(is_empty){
           return null;
       }else{
           var serial_codes = [];
           $.each(serial_code_inputs, function(index, object){
               serial_codes.push($(object).val());
           });
           return serial_codes;
       }
    },

    getFanClubId: function(){
       var fan_club_id = $('input#fan_club_id');
       var is_empty = !!(fan_club_id.length === 0);
       if(is_empty){
           return null;
       }else{
           return fan_club_id.val();
       }
    },

    getFanClubPassword: function(){
       var fan_club_password = $('input#fan_club_password');
       var is_empty = !!(fan_club_password.length === 0);
       if(is_empty){
           return null;
       }else{
           return fan_club_password.val();
       }
    },
    
    getFanClubParams: function(){
        var self = this;
        var member_id = self.getFanClubId();
        var member_password = self.getFanClubPassword();
        
        if(member_id == null && member_password == null){
            return null;
        }else{
            return {member_id: member_id, member_password: member_password};
        }
    }


}

// インスタンス化
var UTIL = new _util();
