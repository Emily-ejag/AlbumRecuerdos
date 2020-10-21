export class familiaresDatos{

    id: string;
    fecha:string;
    tiempoPreg1: number;
    tiempoPreg2: number;
    tiempoPreg3: number;
    errores:number;
    aciertos: number;

constructor(idUser:string,fecha:string,t1:number,t2:number,t3:number,errores:number,aciertos:number){
    this.id=idUser;
    this.fecha=fecha;
    this.tiempoPreg1=t1;
    this.tiempoPreg2=t2;
    this.tiempoPreg3=t3;   
    this.errores=errores;
    this.aciertos=aciertos; 
}

}