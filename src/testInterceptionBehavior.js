(function(proxy) {

    proxy.interceptionBehaviors.push(function() {
        console.log('>> pre execute of test behavior');
        this.getNext().apply(this, arguments);
        console.log('>> post execute of test behavior');
    });

}(proxy, undefined));
