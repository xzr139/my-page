var api = function() {};
api.prototype = {
    /**
     * Execute POST request to API.
     * 
     * How to use.
     * <pre>
     * params = {'login' : 'test@avex.co.jp', 'password' : 'password1234'};
     * API.post('sessions/create', params, my_func);
     * 
     * // callback function.
     * function my_func(data) {
     *     alert(data['success'];  // show 'true' or 'false'
     * }
     * </pre>
     * 
     * @param url ex) api/registration/send_mail
     * @param params request paramater
     * @param callback callback function
     * @param ignore_error (optional) If true, block display error messages.
     */
    post : function(url, params, callback, ignore_error) {
        $("#error_messages").hide();
        $.post(
                base_url + 'api/' + url + '?mytimestamp=' + new Date().getTime(),
                params,
                function(data) {
                    if (!ignore_error) {
                        API.show_error(data['errmsg']);
                    }
                    callback(data);
                },
                'JSON'
        );
    },
    
    /**
     * Execute GET request to API.
     * 
     * How to use.
     * <pre>
     * params = {'utoken' : 'hogefugafoobar', 'limit' : '10', 'offset' : 0};
     * API.get('events/list', params, my_func);
     * 
     * // callback function.
     * function my_func(data) {
     *     alert(data['success'];  // show 'true' or 'false'
     * }
     * </pre>
     * 
     * @param url ex) api/registration/send_mail
     * @param params request paramater
     * @param callback callback function
     * @param ignore_error (optional) If true, block display error messages.
     */
    get : function(url, params, callback, ignore_error) {
        $("#error_messages").hide();
    	params['mytimestamp'] = new Date().getTime();
        $.get(
                base_url + 'api/' + url,
                params,
                function(data) {
                    if (!ignore_error) {
                        API.show_error(data['errmsg']);
                    }
                    callback(data);
                },
                'JSON'
        );
    },
    
    show_error : function(errors) {
    	if (!errors) {
    		return;
    	}
    	
    	$("#error_messages").empty();
    	if (API.check_result(errors) != 'array') {
    		$("#error_messages").append('<li>' + errors + "</li>");
    		$("#error_messages").show();
    		scrollTo(0, 0);
    		return;
    	}
    	
    	for (var i in errors) {
            $("#error_messages").append('<li>' + errors[i]['message'] + "</li>");
        }
    	$("#error_messages").show();
    	scrollTo(0, 0);
    },
    
    check_result : function(obj) {
    	if ((typeof obj) == "object") {
    		if (obj.length != undefined) {
    			return "array";
    		} else {
    			for (t in obj) {
    				if(obj[t] != undefined) {
    					return "hash";
    				} else {
    					return "object";
    				}
    			}
    		}
    	} else {
    		return (typeof obj);
    	}
    }
};
var API = new api();
