//$ multithreading in JS using worker-threads-module
//$ multithreading in JS using worker-threads-module
//$ multithreading in JS using worker-threads-module
//$ multithreading in JS using worker-threads-module

// Import Worker stuff from Node.js
const {
  Worker,
  isMainThread,
  parentPort,
  threadId,
} = require("worker_threads");

// Check if this code is running in the main thread
if (isMainThread) {
  //! MAIN THREAD: the "boss" that makes workers
  //! BOSS's JOB: this is job of the boss and not the worker
  console.log(`Main thread is running with PID: ${process.pid}`);

  const numWorkers = 4; // How many workers we want to make

  // the usual boss's job to make workers
  for (let i = 0; i < numWorkers; i++) {
    // Create a new worker using the same file
    const worker = new Worker(__filename);

    //? we need this to Listen to messages from the worker
    // why do u need this, see communication is key.
    // what if the worker wants to communicate with the boss, like it did in the last line parentPort.postMessage
    // this specific code-block helps to get messages from the worker to the boss
    worker.on("message", (msg) => {
      console.log(`Received from worker ${worker.threadId}:`, msg);
    });

    // Listen for when the worker stops
    // need to know when worker stops, so the boss knows which worker is free
    // we need this block so boss is aware of the worker's stop,
    // so he can assign him the next work
    worker.on("exit", () => {
      console.log(`Worker ${worker.threadId} exited`);
    });
  }
} else {
  //! WORKER THREAD: these are the "helpers" that do the heavy work
  //! WORKER's JOB: this is the job of the worker,
  //! the if-block-code was the job of the boss and this else-block-code is the job of the worker
  console.log(`Worker ${process.pid} started, threadId: ${threadId}`);

  // Do some heavy calculation (takes time, but main thread is free)
  let sum = 0;
  for (let i = 0; i < 1e8; i++) sum += i;

  // Send the result back to the main thread
  parentPort.postMessage(`Sum is ${sum}`);
}
