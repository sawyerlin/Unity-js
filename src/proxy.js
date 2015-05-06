/*jshint -W083 */
(function(window) {

    var proxy = {};

    proxy.interceptionBehaviors = [];

    function BehaviorList(func) {
        this.func = func;
        this.index = 0;

        this.isLast = function() {
            return this.index > proxy.interceptionBehaviors.length;
        };

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

    function proxyFunc(argu, val, obj) {
        return function() {
            var behaviorList = new BehaviorList(val);
            argu[0].behaviorList = behaviorList;
            behaviorList.getNext().apply(obj, behaviorList.isLast() ? arguments : argu);
        };
    }

    proxy.build = function(obj, allowedList) {

        var proxyObj = Object.create(obj);

        for (var prop in obj) {
            if (allowedList.indexOf(prop) === -1) continue;
            var val = obj[prop];
            if (typeof val === 'function') {
                var argu = [{arguments: arguments, name: prop}];
                proxyObj[prop] = new proxyFunc(argu, val, obj);
            }
        }

        return proxyObj;
    };

    if (typeof define === 'function' && define.amd) {
        define('proxy', [], function() {
            return proxy;
        });
    } else {
        window.proxy = proxy;
    }

}(window, undefined));
