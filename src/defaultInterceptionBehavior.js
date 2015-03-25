(function(proxy) {

    proxy.interceptionBehaviors.push(function() {
        console.log('>> pre execute of default behavior');

        var behaviorList = arguments[0].behaviorList;
        behaviorList.getNext().apply(this, behaviorList.isLast() ? arguments[0].arguments : arguments);

        console.log('>> post execute of default behavior');
    });

}(proxy, undefined));
