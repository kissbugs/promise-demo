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
      throw new Error("不是一个函数");
    }
    fn(this.resolve.bind(this), this.reject.bind(this));
  }
  then(succeed?, fail?) {
    let temp = [];
    temp[0] = succeed;
    temp[1] = fail;
    this.callbacks.push(temp);
  }
}

export default Promise2;
