function showProgress(message) {
    if (!message) {
        message = '処理中です...';
    }
    $.blockUI({
        message: '<div><img src="../images/indicator.gif" style="margin-right:5px;">' + message + '</div>',
        css: { padding:'10px', width : '80%', left : '5%',}
    });
}

function hideProgress() {
    $.unblockUI();
}

function showNavigation(text, options) {
    if(options == undefined) {options = {}};
    $('#navigation > div > p').html(text);
    if(options.important){
        $('#navigation').addClass('red');
    }
    $('#navigation').show('fast');
    $("html, body").animate({scrollTop: 0}, 'fast');
}

function showZeroResultLayout(msg) {
    $('#content-body').hide();
    //$('#error-title').text('Error!');
    $('#error-message').text(msg);
    $('#search-err-layout').show();
}
