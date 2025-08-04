$(document).bind("mobileinit", function(){
    // 下記のクラスを追加するとその要素と子孫要素はjquerymobileのスタイルが効かなくなる
    $.mobile.page.prototype.options.keepNative = ".js-data-role-none, js-data-role-none *";  
});