export class TokenManager{

    private tokens=5;

    getToken(){

        if(this.tokens>0){

            this.tokens--;
            return true;

        }

        return false;
    }

    refill(count:number){

        this.tokens=count;
    }

    available(){

        return this.tokens;
    }

}