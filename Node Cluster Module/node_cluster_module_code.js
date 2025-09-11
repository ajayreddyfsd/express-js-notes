//$ master's job is just to make new workers, monitor them, and make new worker if any worker dies
//$ so if-block-in-below-code talks about master's job

//$ the else-block-in-below-code delegates work to workers, each of them follows the same server code
//$ but when requests come, they share it among them
//$ and if any worker is totally occupied, the other workers take care of incoming requests

//? this is not multi-threading at all,
//? just one server expands into x-no-of-servers to cater to all the requests, even if one gets too busy
//? x is the no.of cores in your cpu
//? like krishna expanded in RL, in Dwaraka, and in war

// Load the cluster module so we can make multiple workers
const cluster = require("cluster");
// Load the HTTP module to create a server
const http = require("http");
// Load the OS module to find out how many CPU cores we have
const os = require("os");

// Figure out how many CPU cores are available
const numCPUs = os.cpus().length;

// Check if this is the master process (the main manager)
if (cluster.isMaster) {
  //! master's job
  //! master's job
  //! master's job
  //! master's job
  console.log(`Master process ${process.pid} is running`);

  // Make one worker for each CPU core
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork(); // create a new worker process
  }

  // If a worker dies for some reason, restart it
  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died. Starting a new one.`);
    cluster.fork();
  });
} else {
  //! worker's job - each follow the same server code
  //! worker's job - each follow the same server code
  //! worker's job - each follow the same server code
  //! worker's job - each follow the same server code
  // This is a worker process (a "teller" that handles requests)
  http
    .createServer((req, res) => {
      // If someone visits /block, we simulate heavy work
      if (req.url === "/block") {
        const start = Date.now();
        // Keep CPU busy for 5 seconds (this will block only this worker)
        while (Date.now() - start < 5000) {}
        res.end(`Worker ${process.pid} finished blocking work`);
      } else {
        // Normal requests respond immediately
        res.end(`Hello from Worker ${process.pid}`);
      }
    })
    .listen(3000); // All workers listen on the same port

  console.log(`Worker ${process.pid} started`);
}
