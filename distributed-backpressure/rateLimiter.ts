export class RateLimiter{

    private rate=5;

    update(tokens:number){

        if(tokens===0){

            this.rate=Math.max(1,this.rate-1);

        }

        else{

            this.rate=Math.min(5,this.rate+1);

        }

    }

    getRate(){

        return this.rate;

    }

}