// 最初嵌套
```
(function a() {
	var a = 1;
	(function b() {
		console.log(a);
		var b = 2;
		(function c() {
			console.log(b);
		})()
	})()
})()
```

// promise
```
new Promise(function(resolve, reject) {
	resolve(1)
}).then(function(res) {
	console.log(res);
	return new Promise(function(resolve, reject) {
		resolve(2)
	})
}).then(function(res) {
	console.log(res)
})
```


// 自己实现promise
```
function Promi(executor) {
    let _this = this;
    _this.$$status = 'pending';
    _this.failCallBack = undefined;
    _this.successCallback = undefined;
    _this.result = undefined;
    _this.error = undefined;
    executor(_this.resolve.bind(_this), _this.reject.bind(_this));
}

Promi.prototype.then = function(full, fail) {
    let newPromi = new Promi(_ => {});
    this.successCallback = full;
    this.failCallBack = fail;
    this.successDefer = newPromi.resolve.bind(newPromi);
    this.failDefer = newPromi.reject.bind(newPromi);
    return newPromi
};

Promi.prototype.resolve = function(params) {
    let _this = this;
    if (_this.$$status === 'pending') {
        _this.$$status = 'success';
        if (!_this.successCallback) return;
        let result = _this.successCallback(params);
        if (result && result instanceof Promi) {
            result.then(_this.successDefer, _this.failDefer);
            return ''
        }
        _this.successDefer(result)
    }
}

Promi.prototype.reject = function(params) {
    let _this = this;
    if (_this.$$status === 'pending') {
        _this.$$status = 'fail';
        if (!_this.failCallBack) return;
        let result = _this.failCallBack(params);
        if (result && result instanceof Promi) {
            result.then(_this.successDefer, _this.failDefer);
            return ''
        }
        _this.successDefer(result)
    }
}

// 测试代码
new Promi(function(res, rej) {
    setTimeout(_ => res('成功'), 500)
}).then(res => {
    console.log(res);
    return '第一个.then成功'
}).then(res => {
    console.log(res);
    return new Promi(function(resolve) {
        //当异步代码执行成功时，我们才会调用resolve(...), 当异步代码失败时就会调用reject(...)
        //在本例中，我们使用setTimeout(...)来模拟异步代码，实际编码时可能是XHR请求或是HTML5的一些API方法.
        setTimeout(_ => resolve('第二个.then成功'), 0)
    })
    resolve('第二个.then成功')
}).then(res => {
    console.log(res)
    return new Promi(function(resolve, reject) {
        setTimeout(_ => reject('第三个失败'), 0)
    })
}).then(res => {res
    console.log(res)
}, rej => console.log(rej));
```
