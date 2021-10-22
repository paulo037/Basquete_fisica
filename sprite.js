///////player////////
function Sprite(img){
    ///////////////////////////////
    ///Propriedades do elemento////
    //////////////////////////////
    this.srcX = 89.16 * 2
    this.srcY = 0
    this.widh = 89.16
    this.height = 240
    this.posX = 0
    this.posY = 500 - this.height - 10
    this.img = img
    this.contImg = 0

    //////////função de desenho//////
    this.draw = function(ctx){
        this.posX = 1200 - (getDistancia() *100) -50
        ctx.drawImage(this.img, this.srcX, this.srcY, this.widh, this.height, this.posX, this.posY, this.widh, 240)
    }

    /////////Animação do personagem///
    this.animation = function(blx){
        this.contImg++
        
        if (this.contImg < 36){
            this.srcX = Math.floor(this.contImg/6) * 89.16
            if (2 == Math.floor(this.contImg/6)){ //Hora de começar a contar o tempo
                return 1
            }
        }else{
            this.srcX =  0
        }
    }
}

////////cesta/////////
function Cesta(img){
    ///////////////////////////////
    ///Propriedades do elemento////
    //////////////////////////////
    this.srcX = this.srcY = 0
    this.widh = 241
    this.height = 340
    this.posX = 1270 - this.widh
    this.posY = 500 - 370
    this.img = img
    ///////função de desenho/////
    this.draw = function(ctx){
        ctx.drawImage(this.img, this.srcX, this.srcY, this.widh, this.height, this.posX, this.posY, this.widh, 340, 241)
        
    }
}

////////////bola////////////
function Ball(img){
     ///////////////////////////////
    ///Propriedades do elemento////
    //////////////////////////////
    
    this.srcX = 0
    this.srcY = 0

    this.widh = 30
    this.height = 30
   
    this.posX =  0
    this.posY = 0

    this.v0 = 0
    this.v0X = 0
    this.v0Y = 0

    this.massa = 0.623
    
    this.img = img
    this.tragetoria = []
    this.len = 0

    //////////função de desenho////////
    this.draw = function(ctx, tempo, game){

        let x, y

        tempo = tempo / 100


        /////vetor velocidade em x e y//////
        this.v0X = this.v0 * Math.cos(this.teta).toFixed(4)
        this.v0Y = this.v0 * Math.sin(this.teta).toFixed(4) - 9.8 * tempo
        
        //////variação da posição de x e y ///////
        x =  this.v0 * Math.cos(this.teta) * (tempo) 
        y = this.v0 * Math.sin(this.teta) * (tempo) + (-1/2 * 9.8 *( (tempo) * (tempo) ) ) 


       
        // if (rodando){

        this.posY = 260 - y * 100

        if (this.posY >= 460) {
            this.posY = 460
            this.posX = this.posX
        } else {
            this.posX = (1165 - getDistancia() * 100) + x * 100 + 30
        }

        //desenhando tragetoria///
       this.tragetoria(tempo, ctx)



        ///desenhando a bola////
        ctx.drawImage(this.img, this.srcX, this.srcY, // Imagem
                        this.widh, this.height,//tamanho da imagem
                        this.posX, this.posY, //posição
                        this.widh, this.height //tamanho da imagem na tela                
                        )
     
        
    }

    //////função de desenho da tragetoria///// 
    this.tragetoria = function (tempo, ctx){
        let x1, y1, x2, y2, il
            
        for(let i = 0.01; i < tempo; i += 0.01){
            il = i - 0.01
            x1 =  this.v0 * Math.cos(this.teta) * (il) 
            x1 = (1165 - getDistancia() * 100) + x1 * 100 + 40
    
            y1 = this.v0 * Math.sin(this.teta) * (il) + (-1/2 * 9.8 *( (il) * (il) ) ) 
            y1 = 260 - y1 * 100 + 10
    
            x2 =  this.v0 * Math.cos(this.teta) * (i) 
            
            x2 = (1165 - getDistancia() * 100) + x2 * 100 + 40
            y2 = this.v0 * Math.sin(this.teta) * (i) + (-1/2 * 9.8 *( (i) * (i) ) ) 
            y2 = 260 - y2 * 100 +10
    
            if (y2 <= 465){
                ctx.beginPath()
                ctx.strokeStyle = 'rgb(23, 155, 199)';
                ctx.moveTo(x2, y2)
                ctx.lineWidth = 3
                ctx.lineCap = 'round';
                ctx.lineTo(x1, y1)
                ctx.stroke()
            }
        }
    }   

    this.vetores = function (){
         
    }

}




function Tempo(){
    this.value = 0
    //////função de desenho////////
    this.draw = function(ctx, tempo){
        ctx.beginPath();
        ctx.fillStyle = "white"
        ctx.rect(10, 10, 80, 40);
        ctx.fill();
        ctx.strokeStyle = 'black';
        ctx.strokeRect(10, 10, 80, 40);
        ctx.fillStyle = "black"
        ctx.font = '24px serif';
        ctx.fillText(`${(tempo /100).toFixed(1)} s`, 40, 40, 24)
    }
}

///////////////////////////
/////////BUTÔES////////////
///////////////////////////


////retorna distancia do pleyer////
function getDistancia(){
    let spanD = document.getElementById("distancia");
    return spanD.value 
}

//////retorna velocidade inicial//////
function getV0(){
    let v0 = document.getElementById("v0");
    return v0.value 
}

/////retorna teta//////////
function getTeta(){
    let angulo = document.getElementById("angulo");
    Teta = Math.PI * angulo.value / 180
    return Teta
}



