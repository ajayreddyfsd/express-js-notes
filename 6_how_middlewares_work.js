// ------------------------ EXECUTION FLOW FOR /friends ------------------------
//
// 1. A request comes in: GET /friends
//
// 2. Express first runs app.use(...) middleware (because middleware runs before routes)
//
//    - const start = Date.now()   // record current time
//    - console.log(`${req.method}, ${req.url}`)
//        → prints "GET, /friends"
//    - next() is called
//        → this tells Express: "go find the matching route now"
//
// 3. Express looks for the route that matches "GET /friends"
//    - It finds: app.get("/friends", (req, res) => {...})
//    - This route executes res.json(friends)
//        → sends the whole friends array back to the browser/client
//
// 4. Response is sent to the client (browser/Postman shows the data)
//
// 5. After the route finishes, code AFTER next() in middleware runs:
//    - const finish = Date.now()   // get the end time
//    - console.log(`time = ${finish - start}ms`)
//        → prints how long the request took, example: "time = 2ms"
//
// ------------------------ SUMMARY ------------------------
//
// Flow looks like this:
//
// Request comes in → app.use middleware runs → next()
//                     ↓
//                 app.get("/friends") runs → sends data to client
//                     ↓
//         Back to middleware (after next) → log time taken
//
// ----------------------------------------------------------
