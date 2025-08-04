/** added by sonix **/
var Common = new Object();
Common.init = function() {
    
}
/** added by sonix **/

$(document).ready(function(){
    /** added by sonix **/
    if (load_count) return;
    load_count++;

    $("a").attr('rel', 'external');
    $("form").attr('data-ajax', 'false');
    Common.init();
    /** added by sonix **/
    
    $(".bookmark").click(function() {
        //$(".bookmark span").toggleClass("active");  
    });
    
    $( "#mypage" ).trigger( "updatelayout" );
    
    $(".information").click(function () {
        $(".information").slideToggle('fast');
    });
    $(".search-detailed-tab").click(function () {
        //$("#js_btn_search_detail").slideToggle('fast');
        $(".search-detailed dl").slideToggle('fast');
        
        var sd = $(".search-detailed");
        sd.toggleClass('open');
        sd.find('.search-detailed-tab img').attr('src', sd.hasClass('open') ? '/images/tab_search_up.png' : '/images/tab_search.png');
    });
    $("#js_btn_search_detail").click(function () {
        //$(this).slideToggle('fast');
        $(".search-detailed dl").slideToggle('fast');
        
        var sd = $(".search-detailed");
        sd.toggleClass('open');
        sd.find('.search-detailed-tab img').attr('src', sd.hasClass('open') ? '/images/tab_search_up.png' : '/images/tab_search.png');
    });
    $(".search-input").click( function () { 
        //$("#js_btn_search_detail").slideUp('fast');
        $(".search-detailed dl").slideDown('fast');
        
        var sd = $(".search-detailed");
        sd.addClass('open');
        sd.find('.search-detailed-tab img').attr('src', sd.hasClass('open') ? '/images/tab_search_up.png' : '/images/tab_search.png');
    });
    
    $(".slide .js-btn-open").click(function(){
        //$(this).slideUp("fast");
        $(this).toggleClass('open');
        $(this).next("div").slideToggle("fast");
        //$(this).next("div").next("div").Toggle("fast");
        
    });
    $(".slide .close").click(function(){
        $(this).slideUp("fast");
        $(this).prev("div").slideUp("fast");
        $(this).prev("div").prev("div").slideDown("fast");
    });
    if ($(".search-detailed h1").size()) {
        
    } else {
        //$(".search-form").css("margin-bottom","15px");
    }

    /* header myaccount */
    /* ドロップダウンメニュー */
    var dropDownMenu = $("#dropdownMenu");
    var dropDownBtn = $("header .menu a");

    dropDownMenu.hide();
    dropDownBtn.click(function(){
        $("header #dropdownMenu").slideToggle();
    });
    // 閉じる
    dropDownMenu.skOuterClick(function() {
        $(this).slideUp();
    },dropDownBtn);

    $("header #dropdownMenu p").click(function(){
        $("header #dropdownMenu").slideUp();
    });

    // ------------------------------------------------
    // スムーススクロール
    // ------------------------------------------------
    $('a[href^=#]').click(function(){
        var speed = 500;
        var href= $(this).attr("href");
        var target = $(href == "#" || href == "" ? 'html' : href);
        var position = target.offset().top;
        $("html, body").animate({scrollTop:position}, speed, "swing");
        return false;
    });

    var isResizing;
    // and the body scrollpane
    var setContainerHeight = function()
    {
        // IE triggers the onResize event internally when you do the stuff in this function
        // so make sure we don't enter an infinite loop and crash the browser
        if (!isResizing) { 
    
            isResizing = true;
            if ($(".account-conf").size()) {
                //$(".account-conf .mail strong").css("width",$(window).width()-164);
            }
            if ($(".myticket-data").size()) {
                $(".myticket-data dl dd").css("width",$(window).width()-230);
                $(".myticket-data dl").css("width",$(".myticket-data dl dd").width()+$(".myticket-data dl dt").width()+25);
            }
            
            isResizing = false; 
        
        }
    }
    $(window).bind('resize', setContainerHeight);
setContainerHeight();
// it seems like you need to call this twice to get consistantly correct results cross browser...
setContainerHeight();

//namespance
var lp = {};

});

