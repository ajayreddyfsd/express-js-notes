//$ multithreading in JS using worker-threads-module
//$ multithreading in JS using worker-threads-module
//$ multithreading in JS using worker-threads-module
//$ multithreading in JS using worker-threads-module

// Import Worker stuff from Node.js
const { Worker, parentPort } = require("worker_threads");

//! Define different tasks for workers
//! this is basically an array of functions
const tasks = [
  () => {
    let sum = 0;
    for (let i = 0; i < 1e8; i++) sum += i;
    return `Sum: ${sum}`;
  },
  () => {
    let product = 1;
    for (let i = 1; i <= 20; i++) product *= i;
    return `Factorial: ${product}`;
  },
  () => {
    return `Current Date: ${new Date().toLocaleString()}`;
  },
];

//! Function to create a worker and also to assign them a specific task
//! taskFn is one of the functions in tasks
function runTask(taskFn) {
  return new Promise((resolve, reject) => {
    const worker = new Worker(
      `
      const { parentPort } = require('worker_threads');
      parentPort.postMessage( (${taskFn.toString()})() );
    `,
      { eval: true }
    );

    //! we need these ONs to listen to the messages from workers
    //! to know when they exit, i mean when they complete their assigned job
    //! to know when they are functioning as expected
    worker.on("message", resolve);
    worker.on("error", reject);
    worker.on("exit", (code) => {
      if (code !== 0)
        reject(new Error(`Worker stopped with exit code ${code}`));
    });
  });
}

async function runAllTasks() {
  const task1Promise = runTask(tasks[0]); //! we assigned task1 to worker1
  const task2Promise = runTask(tasks[1]); //! we assigned task2 to worker2
  const task3Promise = runTask(tasks[2]); //! we assigned task3 to worker3

  //! each of the above runTask() returns a promise
  //! we need to resolve all those promises,
  //! what we can do is resolve all of them parallelly using Promise.all()

  // Await all promises in parallel
  const results = await Promise.all([task1Promise, task2Promise, task3Promise]);

  console.log("Results from all workers:", results);
}

//! start the process
runAllTasks();
