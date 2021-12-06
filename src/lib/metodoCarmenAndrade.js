/**
 * 
 * @param {number} resistivity 
 * @param {number} t 
 * @param {number} t0 
 * @param {number} q 
 * @param {number} rcl 
 * @param {number} fa 
 * @param {number} cover 
 */
 export  function MetodoCarmenAndrade(resistivity,t,t0,q,rcl,fa,cover){
    this.resistivity = resistivity;
    this.t=t;
    this.t0=t0;
    this.q = q;
    this.rcl=rcl;
    this.fa=fa;
    this.cover=cover;
    this.Kcorr = 26;
    this.Pcorr = 0.01;
    this.Ws = 1;

    this.Status = function(){
        return 1;
    } 

    this.Tp = function(){
        return (this.Pcorr*this.resistivity*Math.pow((this.t/this.t0),q)*this.Ws)/(this.Kcorr*0.00116);
    }

    this.Ti = function(){
        return (Math.pow(this.cover,2)*this.resistivity*Math.pow((this.t/this.t0),q)*this.rcl)/this.fa;
    }

    this.Tl = function(){
        return this.Ti() + this.Tp();
    }
    
}

