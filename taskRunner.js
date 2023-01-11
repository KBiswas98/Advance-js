const MockComputation = (cb, delay) => setTimeout(cb, delay);

// it should take 2 sec
const taskA = (cb) => MockComputation(cb, 1000);
const taskB = (cb) => MockComputation(cb, 1000);
const taskC = (cb) => MockComputation(cb, 1000);
const taskD = (cb) => MockComputation(cb, 1000);
const taskE = (cb) => MockComputation(cb, 1000);
const taskF = (cb) => MockComputation(cb, 1000);

const allComputation = Array(20).fill(1).map((itm, index) => (cb) => MockComputation(cb, Math.floor(Math.random() * 8000 + 1000)))



const concurrentPromise = () => {
  const mockPromise = (delay, promiseNumber) => new Promise((resolve, reject) => {
    console.log('Promise: ', promiseNumber, ' and delay: ', delay)
    setTimeout(() => {
      resolve('Resolved Promise.')
    }, delay * 1000)
  })

  const allTasks = Array(20).fill(1).map((itm, index) => mockPromise(Math.floor(Math.random() * 20), index))


  const TaskQueue = function (allTask, concurrencyLimit) {
    this.count = concurrencyLimit;
    this.todo = allTask;
    this.running = [];
    this.compleate = [];
  }

  TaskQueue.prototype.runNext = function () {
    return (this.running.length < this.count) && this.todo.length
  }

  TaskQueue.prototype.run = function () {
    const group = []
    while (this.runNext()) {
      const promise = this.todo.shift();
      promise.then(res => {
        this.compleate.push(this.running.shift())
        this.run();
      })
      this.running.push(promise);
    }
    console.log('end task at: ', performance.now() - start)
  }

  const start = performance.now()

  const taskQueue = new TaskQueue(allTasks, 10)
  taskQueue.run();

}


const concurrentPromiseWithCallback = () => {
  const mockPromise = (delay, promiseNumber) => new Promise((resolve, reject) => {
    console.log('Promise: ', promiseNumber, ' and delay: ', delay)
    setTimeout(() => {
      resolve('Resolved Promise.')
    }, delay * 1000)
  })

  const allTasks = Array(6).fill(1).map((itm, index) => mockPromise(Math.floor(Math.random() * 10), index))

  const TaskRunner = function (tasks, concurrencyLimit) {
    this.count = concurrencyLimit;
    this.todo = tasks;
    this.running = [];
    this.completed = []
  }

  TaskRunner.prototype.runNext = function () {
    return ((this.running.length < this.count) && this.todo.length)
  }


  TaskRunner.prototype.run = function (cb) {
    while (this.runNext()) {
      const task = this.todo.shift();
      if (typeof task === 'function') {
        this.running.push(task)
        task((message = `Status =>  running: ${this.running.length} ---------${performance.now().toFixed(2) - start.toFixed(2)}---- todo: ${this.todo.length} => completed: ${this.completed.length}`) => {
          this.completed.push(this.running.shift())
          cb(message)
          this.run(cb)
        })
      } else {
        // it must be promise
        task.then((message = `Status =>  running: ${this.running.length} --------${performance.now().toFixed(2) - start.toFixed(2)}----- todo: ${this.todo.length} => completed: ${this.completed.length}`) => {
          this.completed.push(this.running.shift())
          cb(message)
          this.run(cb)
        })
        this.running.push(task)
      }
    }
  }
  const start = performance.now()

  // const taskQueue = new TaskRunner(allTasks, 2)
  const taskQueue = new TaskRunner(allComputation, 6)
  taskQueue.run((mess) => console.log('=======: ', mess));
}



module.exports = { concurrentPromiseWithCallback }