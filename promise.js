
const myPromise = async () => {
  await Promise.all(promiseList.map(itm => promiseGenerator(itm.promiseName, itm.delay)))
    .then(res => console.log('res: ', res))
}

const promiseGenerator = (promiseName, delay) => {
  return new Promise((resolve) => {
    resolve(promiseName)
  }, delay)
}

const promiseList = [
  {
    promiseName: 'promise 1',
    delay: 500
  },
  {
    promiseName: 'promise 2',
    delay: 1000
  },
  {
    promiseName: 'promise 3',
    delay: 1500
  },
  {
    promiseName: 'promise 4',
    delay: 2500
  },
  {
    promiseName: 'promise 5',
    delay: 3500
  }
]






// ==================== Concurrent Promise Queue =======================

// 1. promise mock
const transactionStatus = (seconds) => new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('Your transaction is successful');
  }, seconds * 1000); //second argument is in milliseconds
})

// 2. all of the tasks
const tasks = [
  transactionStatus(5),
  transactionStatus(2),
  transactionStatus(1),
  transactionStatus(2),
  transactionStatus(6),
  transactionStatus(4),
  transactionStatus(7),
  transactionStatus(3)
];


// => Task queue implementations

const TaskQueue = function (tasks, concurrencyLimit) {
  this.todo = tasks
  this.count = concurrencyLimit
  this.running = []
  this.compleated = []
}

TaskQueue.prototype.runNext = function () {
  return (this.running.length < this.count) && this.todo.length
}

TaskQueue.prototype.run = function () {
  performance.now()
  if (this.runNext()) {

    const promise = this.todo.shift();
    this.running.push(promise)
    promise.then(res => {
      console.log('execution doen  ')
      this.compleated = this.running.shift();
      this.run()
    })
    console.log('end: ')
  }
}


// =============== Promise all ================

const promiseAllTask = [
  transactionStatus(5),
  transactionStatus(2),
  transactionStatus(1),
  transactionStatus(2),
  transactionStatus(6),
  transactionStatus(4),
  transactionStatus(7),
  transactionStatus(3),
  transactionStatus(5),
  transactionStatus(2),
  transactionStatus(1),
  transactionStatus(2),
  transactionStatus(6),
  transactionStatus(4),
  transactionStatus(7),
  transactionStatus(3),
  transactionStatus(5),
  transactionStatus(2),
  transactionStatus(1),
  transactionStatus(2),
  transactionStatus(6),
  transactionStatus(4),
  transactionStatus(7),
  transactionStatus(3),
  transactionStatus(5),
  transactionStatus(2),
  transactionStatus(1),
  transactionStatus(2),
  transactionStatus(6),
  transactionStatus(4),
  transactionStatus(7),
  transactionStatus(3)
];


const promise = async () => {

  // const promise1 = new Promise((resolve) => setTimeout(() => {
  //   resolve('promise1')
  // }, 2000))

  // const promise2 = new Promise((resolve) => resolve(1))
  // promise1.then(res => console.log(res))
  // myPromise();


  // const taskQueue = new TaskQueue(tasks, 3);
  // taskQueue.run();



  const start = performance.now();
  // await transactionStatus(5);
  // await transactionStatus(2);
  // await transactionStatus(1);
  // await transactionStatus(2);
  // await transactionStatus(6);
  // await transactionStatus(4);
  // await transactionStatus(7);
  // await transactionStatus(3);
  // await transactionStatus(5);
  // await transactionStatus(2);
  // await transactionStatus(1);
  // await transactionStatus(2);
  // await transactionStatus(6);
  // await transactionStatus(4);
  // await transactionStatus(7);
  // await transactionStatus(3);
  // await transactionStatus(5);
  // await transactionStatus(2);
  // await transactionStatus(1);
  // await transactionStatus(2);
  // await transactionStatus(6);
  // await transactionStatus(4);
  // await transactionStatus(7);
  // await transactionStatus(3);
  // await transactionStatus(5);
  // await transactionStatus(2);
  // await transactionStatus(1);
  // await transactionStatus(2);
  // await transactionStatus(6);
  // await transactionStatus(4);
  // await transactionStatus(7);
  // await transactionStatus(3)

  // console.log('value: ', 'End Promise All at: ', performance.now() - start)

  Promise.all(promiseAllTask)
    .then(res => {
      console.log('End Promise All at: ', performance.now() - start)
    })


}

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

const allPromises = () => {


  const p1 = new Promise((resolve, reject) => {
    setTimeout(() => resolve("one"), 1000);
  });
  const p2 = new Promise((resolve, reject) => {
    setTimeout(() => resolve("two"), 2000);
  });
  const p3 = new Promise((resolve, reject) => {
    setTimeout(() => resolve("three"), 3000);
  });
  const p4 = new Promise((resolve, reject) => {
    setTimeout(() => resolve("four"), 4000);
  });
  const p5 = new Promise((resolve, reject) => {
    reject(new Error("reject"));
  });

  // Using .catch:
  Promise.all([p1, p2, p3, p4, p5])
    .then((values) => {
      console.log(values);
    })
    .catch((error) => {
      console.error(error.message);
    });

  // Logs:
  // "reject"
}

module.exports = { promise, concurrentPromise, allPromises }