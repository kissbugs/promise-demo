class Promise2 {
  callbacks = [];
  state = "pending";
  resolve(result) {
    // result 2.2.2
    // onFulfilled
    if (this.state === "fulfilled") return;
    this.state = "fulfilled";
    setTimeout(() => {
      this.callbacks.forEach(temp => {
        if (typeof temp[0] !== "function") return;
        temp[0].call(undefined, result);
      });
    }, 0);
  }
  reject(reason) {
    // reason 2.2.3
    if (this.state === "rejected") return;
    this.state = "rejected";
    setTimeout(() => {
      this.callbacks.forEach(temp => {
        if (typeof temp[1] !== "function") return;
        temp[1].call(undefined, reason);
      });
    }, 0);
  }
  constructor(fn) {
    if (typeof fn !== "function") {
      throw new Error("我只接受函数");
    }
    fn(this.resolve.bind(this), this.reject.bind(this));
  }
  then(succeed?, fail?) {
    let handle = [];
    if (typeof succeed === "function") {
      handle[0] = succeed;
    }
    if (typeof fail === "function") {
      handle[1] = fail;
    }
    // 2.2.7
    handle[2] = new Promise2(() => {});

    // 把函数推到callbacks里面
    this.callbacks.push(handle);

    return handle[2];
  }
}

export default Promise2;
