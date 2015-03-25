* Javascript Dependency Injection Container like Unity Enterprise Library 

* Usage
`` var obj = {
            a: 0, 
            execute: function(val) {
                console.log('>> execute ' + val);
            }
        };
        var proxyObj = proxy.build(obj, ['execute']);
        proxyObj.execute('test');
``
