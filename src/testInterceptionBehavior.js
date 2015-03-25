(function(proxy) {

    proxy.interceptionBehaviors.push(function() {
        console.log('>> pre execute of test behavior');

        var behaviorList = arguments[0].behaviorList;
        behaviorList.getNext().apply(this, behaviorList.isLast() ? arguments[0].arguments : arguments);

        console.log('>> post execute of test behavior');
    });

}(proxy, undefined));
