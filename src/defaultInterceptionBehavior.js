(function(proxy) {

    proxy.interceptionBehaviors.push(function() {
        console.log('>> pre execute of default behavior');
        this.getNext().apply(this, arguments);
        console.log('>> post execute of default behavior');
    });

}(proxy, undefined));
