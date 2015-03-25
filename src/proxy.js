/*jshint -W083 */
(function(window) {

    var proxy = {};

    proxy.interceptionBehaviors = [];

    function BehaviorList(func) {
        this.func = func;
        this.index = 0;
        this.getNext = function() {
            if (this.index <= proxy.interceptionBehaviors.length) {
                var returnValue = this.func; 

                if (this.index < proxy.interceptionBehaviors.length)
                    returnValue = proxy.interceptionBehaviors[this.index];

                this.index ++;
                return returnValue;
            }
        };
    }

    proxy.build = function(obj, allowedList) {

        var proxyObj = Object.create(obj);

        for (var prop in obj) {
            if (allowedList.indexOf(prop) === -1) continue;
            var val = obj[prop];
            if (typeof val === 'function') {
                proxyObj[prop] = function () {
                    var behaviorList = new BehaviorList(val);
                    behaviorList.getNext().apply(behaviorList, arguments);
                };
            }
        }

        return proxyObj;
    };

    window.proxy = proxy;

}(window, undefined));
