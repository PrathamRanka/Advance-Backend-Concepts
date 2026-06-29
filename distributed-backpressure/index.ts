import {TokenManager} from "./tokenManager";
import {RateLimiter} from "./rateLimiter";

const tokenManager=new TokenManager();
const limiter=new RateLimiter();

let requestId=1;

// Simulated Database
setInterval(()=>{

    const capacity=Math.floor(Math.random()*6);

    console.log("\nDatabase Capacity:",capacity);

    tokenManager.refill(capacity);

},5000);


// Gateway

setInterval(()=>{

    limiter.update(tokenManager.available());

    console.log("\nGateway Rate:",limiter.getRate());

    for(let i=0;i<limiter.getRate();i++){

        if(tokenManager.getToken()){

            console.log("Request",requestId++,"Processed");

        }

        else{

            console.log("Backpressure! Request Blocked");

        }

    }

},1000);