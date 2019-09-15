const Deferred = () => {};
Deferred.prototype.all = function(promises) {
  var count = promises.length;
  var that = this;
  var results = [];
  promises.forEach((promise, i) => {
    promise.then(
      function(data) {
        count--;
        results[i] = data;
        if (count === 0) {
          that.resolve(results);
        }
      },
      function(err) {
        that.reject(err);
      }
    );
  });
  return this.promise;
};

// all方法 将两个单独的Promise重新抽象组合成一个新的Promise
// 只有所有异步操作成功, 这个异步操作才算成功, 一旦其中一个异步操作失败, 整个异步操作就失败
var promise1 = readFile("foo.text", "utf-8");
var promise2 = readFile("bar.text", "utf-8");
var deferred = new Deferred();
deferred.all([promise1, promise2]).then(
  function(results) {
    // TODO
  },
  function() {
    // TODO
  }
);
