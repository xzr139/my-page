function formatDate(date, option) {
    var option = option ? option : null;
    /*
     if(option && !option.noday){
     return $.exDate(date, 'yyyy-mm-dd hh:mi:ss').toChar('yyyy年mm月dd日(day)');
     }else{
     return $.exDate(date, 'yyyy-mm-dd hh:mi:ss').toChar('yyyy年mm月dd日(day)');
     }*/
    if (option === "date_only"){
        return $.exDate(date, 'yyyy-mm-dd hh:mi:ss').toChar('yyyy年mm月dd日(day)');
    }else{
        return $.exDate(date, 'yyyy-mm-dd hh:mi:ss').toChar('yyyy年mm月dd日(day) hh24:mi');
    }
}

function formatDateOnly2(date){
    var y = $.exDate(date, 'yyyy-mm-dd hh:mi:ss').toChar('yyyy');
    var m = $.exDate(date, 'yyyy-mm-dd hh:mi:ss').toChar('mm');
    var d = $.exDate(date, 'yyyy-mm-dd hh:mi:ss').toChar('dd');
    if (m < 10) {
        m = '0' + m;
    }
    if (d < 10) {
        d = '0' + d;
    }
    var ymd = y + '/' + m + '/' + d;
    return ymd;
}

function formatTime(date) {
    return $.exDate(date, 'yyyy-mm-dd hh:mi:ss').toChar('hh24:mi');
}

function formatDateTime(date) {
    return formatDate(date);
}

function formatDateOnly(date, en){
    if(en){
        return $.exDate(date, 'yyyy-mm-dd hh:mi:ss').toChar('yyyy/mm/dd');
    }else{
        return $.exDate(date, 'yyyy-mm-dd hh:mi:ss').toChar('yyyy年mm月dd日');
    }

}
function formatDateDay(date){
    return $.exDate(date, 'yyyy-mm-dd hh:mi:ss').toChar('(day)');
}

function addFigure(str) {
    var num = new String(str).replace(/,/g, "");
    while(num != (num = num.replace(/^(-?\d+)(\d{3})/, "$1,$2")));
    return num;
}

function getTicketStatusLabel(status) {
    status = parseInt(status);
    switch (status) {
        case 1 :
            return '販売中';
        case 2 :
            return '販売前';
        case 3 :
            return '販売終了';
        case 4 :
            return '受付中';
        case 5 :
            return '受付終了';
        case 6 :
            return '売切間近';
        case 7 :
            return '無料';
        case 8 :
            return '予定販売数終了';
        default :
            return '';
    }
}

function getLotteryStatusLabel(status) {
    switch (status) {
    case 'waiting' :
        return '抽選待ち';
    case 'won' :
        return '当選';
    case 'lost' :
        return '落選';
    case 'canceled':
        return 'キャンセル';
    default:
        return '';
    }
}

function getLotteryStatusColors(status) {
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
}

function getOrderStatusLabel(status) {
    switch (status) {
    case 'unpaid' :
        return '入金待ち';
    case 'committed' : case "credited" :
        return '入金済み';
    case 'canceled':
        return 'キャンセル';
    default:
        return '';
    }
}

function getOrderStatusColors(status) {
    switch (status) {
    case 'unpaid' :
        return "color:#fff; background-color: #" + 'FF0000;';
    case 'canceled' : case 'committed' : case "credited" :
        return "color:#fff; background-color: #" + 'D7D7D7;';
    default :
        return '';
    }
}

function getTicketLimitJson(min, max, remain) {
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
}

function checkHash(hash) {
    return location.hash == ('#' + hash);
}


function getAfterHours(startTime) {
    var start = $.exDate(startTime, 'yyyy-mm-dd hh:mi:ss');
    var currentdate = new Date();
    return (Math.ceil((start.getTime() - currentdate.getTime())/(1000*60*60))) + "h後";
}


//文字を指定も字数で切り取り
function mbellipsis(str, byt) {
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
}

function post_request(url, params) {

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
}

function display_confirm_go_to_full_usable_form(form_selector_str,options) {

    var def_options = {
        'msg':"登録メールアドレスに送信された「メールアドレス確認」メールから確認用URLをクリックして、登録を完了させてください。\n\nWe have emailed you at the address provided. Please complete your registration by clicking the email address confirmation link in this message."
        };
    if(typeof(options) === 'object'){
        for(var i in options){
            def_options[i] = options[i];
        }
    }

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
        //post_request('/mypage/entry_usable',{});
        post_request('/my_top',{});
        return true;
    }

    //send_form.attr('action' , '/mypage/entry_usable');
    send_form.attr('action' , '/my_top');

    send_form.submit();
    return true;
}

function appliKick(data){

    if (data.success){
        var checkedAt = new Date();
        var result = data.result;
        if (result.is_iphone){//ios
            if(result.is_ios9){window.location.href = result.scheme;
                setTimeout(function() {
                    window.location.href=result.open_url;
                }, 2000);
            }
            else {
                var iframe = document.createElement('iframe');

                iframe.style.visibility = "hidden";
                iframe.src = result.scheme;
                document.body.appendChild(iframe);
                setTimeout(function () {
                    var t = new Date() - checkedAt;
                    document.body.removeChild(iframe);
                    if (t < 3000) {
                        window.location.href = result.open_url;
                    }
                }, 2000);
            }
        }else{//Android
            if( userAgentDetect() == 'gecko') {// firefox
                var scheme = result.scheme.replace("intent", "livepocket");
                window.location.href = scheme;
            }else {
                window.location.href = result.scheme;
            }
        }
    }else{
        
        if(data.errcode){
            alert(data.errmsg);
            
        }else{
            alert("ダウンロード処理に失敗しました。");
        }
    }
}

function downloadTicket(ticket_id, confirm_type){
        if (confirm_type){
            switch(confirm_type){
                case "start":
                    var conf = confirm('ダウンロードされたチケットは、アプリから操作が必要です。\nアプリを起動しますか？\n\nDownloaded tickets must be managed through the app.\nWould you like to start the app?');
                    break;
            }
            if (!conf){
                return false;
            }
        }
        showProgress();
        API.post('purchased_tickets/download_prepare', {ticket_id: ticket_id}, appliKick);
        hideProgress();
}

function downloadTickets(order_id){
    showProgress();
    API.post('purchased_tickets/download_prepare', {order_id: order_id}, appliKick);
    hideProgress();
}


function downloadMyTickets(user_id, event_id){
    showProgress();
    API.post('purchased_tickets/download_prepare', {user_id: user_id, event_id: event_id}, appliKick);
    hideProgress();
}

function resumeAppli(confirm_type, ticket_id){
    
    if (confirm_type){
            switch(confirm_type){
                case "start":
                    var conf = confirm('ダウンロードされたチケットは、アプリから操作が必要です。\nアプリを起動しますか？\n\nDownloaded tickets must be managed through the app.\nWould you like to start the app?');
                    break;
            }
            if (!conf){
                return false;
            }
            showProgress();
            API.post('purchased_tickets/download_prepare', {ticket_id: ticket_id , type:'send'}, appliKick);
            hideProgress();
    }else{
        
        showProgress();
        API.post('purchased_tickets/download_prepare', {}, appliKick);
        hideProgress();
    }

}

function showDownloadedTicket(ticket_id){
    showProgress();
    API.post('purchased_tickets/download_prepare', {ticket_id: ticket_id, type: 'show'}, appliKick);
    hideProgress();
}

//文字列をエスケープ
function html_escape(string){
    return string.replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

// モーダル
var Modal  = function() {

    this.overlay = $('#js_md_overlay');
    this.modal = $('#js_modal');
    this.modal_id = this.modal.attr('id');
    this.buttons = {
        ok         : $('#' + this.modal_id + ' .js-md-btn-ok'),
        cancel     : $('#' + this.modal_id + ' .js-md-btn-cancel'),
        close      : $('#' + this.modal_id + ' .js-md-btn-close')
    };
};

Modal.prototype = {
    removeModal : function() {
        this.modal.removeClass('md-start-transition');
        var current_this_modal = this.modal;
        setTimeout(function() {
            current_this_modal.removeClass('md-show');
        }, 100);
    },
    showModal : function() {
        this.modal.addClass('md-show');
        var current_this_modal = this.modal;
        setTimeout(function() {
            current_this_modal.addClass('md-start-transition');
        }, 100);
    }
};

function userAgentDetect() {
    var uaName = 'unknown';
    var userAgent = window.navigator.userAgent.toLowerCase();
    var appVersion = window.navigator.appVersion.toLowerCase();
     
    if (userAgent.indexOf('msie') != -1) {
      uaName = 'ie';
      if (appVersion.indexOf('msie 6.') != -1) {
        uaName = 'ie6';
      } else if (appVersion.indexOf('msie 7.') != -1) {
        uaName = 'ie7';
      } else if (appVersion.indexOf('msie 8.') != -1) {
        uaName = 'ie8';
      } else if (appVersion.indexOf('msie 9.') != -1) {
        uaName = 'ie9';
      } else if (appVersion.indexOf('msie 10.') != -1) {
        uaName = 'ie10';
      }
    } else if (userAgent.indexOf('chrome') != -1) {
      uaName = 'chrome';
    } else if (userAgent.indexOf('ipad') != -1) {
      uaName = 'ipad';
    } else if (userAgent.indexOf('ipod') != -1) {
      uaName = 'ipod';
    } else if (userAgent.indexOf('iphone') != -1) {
      uaName = 'iphone';
      var ios = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
      uaName = [parseInt(ios[1], 10), parseInt(ios[2], 10), parseInt(ios[3] || 0, 10)];
    } else if (userAgent.indexOf('safari') != -1) {
      uaName = 'safari';
    } else if (userAgent.indexOf('gecko') != -1) {
      uaName = 'gecko';
    } else if (userAgent.indexOf('opera') != -1) {
      uaName = 'opera';
    } else if (userAgent.indexOf('android') != -1) {
      uaName = 'android';
    } else if (userAgent.indexOf('mobile') != -1) {
      uaName = 'mobile';
    };
    return uaName;
}

function navigatePurchaseConfirmPage(time_for_payment) {
    if (new Date(time_for_payment).getTime() < new Date().getTime()) {
        alert('支払期限を過ぎています。\n\nThe payment deadline has passed.');
        return false;
    } else {
        return true;
    }
}

function switchGenderDisplayName(gender) {
    switch (gender) {
        case 'male': return '男性';
        case 'female': return '女性';
        default : return '未選択';
    }
}