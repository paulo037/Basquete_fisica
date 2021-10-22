const g = 9.81

///////player////////
function Sprite(img){
    ///////////////////////////////
    ///Propriedades do elemento////
    //////////////////////////////
    this.srcX = 0
    this.srcY = 0
    this.widh = 89.16
    this.height = 240
    this.posX = 0
    this.posY = 500 - this.height - 10
    this.img = img
    this.contImg = 0

    //////////função de desenho//////
    this.draw = function(ctx, cnv){
        const pixel = cnv.width/1200
        console.log( cnv.width)
        this.posX = 1200 - (getDistancia() *100) -50
        ctx.drawImage(this.img, this.srcX, this.srcY, this.widh, this.height, this.posX * pixel, this.posY * pixel, this.widh * pixel , pixel *240)
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
    this.draw = function(ctx, cnv){
        const pixel = cnv.width/1200
        ctx.drawImage(this.img, this.srcX, this.srcY, this.widh, this.height, this.posX * pixel, this.posY * pixel, this.widh * pixel, this.height* pixel)
        
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
    this.Vx = 0
    this.Vy = 0

    this.teta = 0

    this.massa = 0.623
    
    this.img = img
    

    //////////função de desenho////////
    this.draw = function(ctx, tempo, game, cnv){

        let x, y
        const pixel = cnv.width/1200
        tempo = tempo / 100


        
       
        
        //////variação da posição de x e y ///////
        x =  this.v0 * Math.cos(this.teta) * (tempo) 
        y = this.v0 * Math.sin(this.teta) * (tempo) + (-1/2 * g *( (tempo) * (tempo) ) ) 

        
        // if (rodando){
            
            this.posY = this.getY(tempo)
            this.posY >=460 ? this.posY = 460 :   this.posX = this.getX(tempo)
            
            //desenhando tragetoria///
            
            
            
        this.tragetoria(tempo, ctx, cnv)
        this.vetores(ctx, tempo, cnv)
        ///desenhando a bola////
        ctx.drawImage(this.img, this.srcX, this.srcY, // Imagem
                        this.widh, this.height,//tamanho da imagem
                        this.posX * pixel, this.posY * pixel, //posição
                        this.widh * pixel, this.height * pixel//tamanho da imagem na tela                
                        )
     
        
    }

    //////função de desenho da tragetoria///// 
    this.tragetoria = function (tempo, ctx, cnv){
        let x1, y1, x2, y2, il
        const pixel = cnv.width/1200
        for(let i = 0.01; i < tempo; i += 0.01){
            il = i - 0.01

            // x1 =  this.v0 * Math.cos(this.teta) * (il) 
            // x1 = (1165 - getDistancia() * 100) + x1 * 100 + 40
            x1 = this.getX(il) + 10
            y1 = this.getY(il) + 10

            x2 = this.getX(i) + 10
            y2 = this.getY(i) + 10

    
            if (y2 <= 465){
                ctx.beginPath()
                ctx.strokeStyle = 'rgb(23, 155, 199)';
                ctx.moveTo(x2 * pixel, y2 * pixel)
                ctx.lineWidth = 3 * pixel
                ctx.lineCap = 'round';
                ctx.lineTo(x1 * pixel, y1 * pixel)
                ctx.stroke()
            }
        }
    }   

    this.vetores = function (ctx, tempo, cnv){
        const pixel = cnv.width/1200
        /////vetor velocidade em x e y//////
        this.Vx = this.getVx()
        this.Vy = this.getVy(tempo)
        console.log(this.Vx, this.Vy)

        if (this.Vx > 0){
            ctx.beginPath();
            ctx.strokeStyle = 'red';
            ctx.moveTo((this.posX + 28) * pixel, (this.posY + 16) * pixel);
            ctx.lineWidth = 3 * pixel;
            ctx.lineCap = 'round';
            ctx.lineTo((this.posX  + 28 + (this.Vx * 10)) * pixel, ( (this.posY) + 16) * pixel );
            ctx.stroke()
            ctx.beginPath();
            ctx.moveTo( ( this.posX  + 28 + (this.Vx * 10)) * pixel ,  ( ((this.posY) + 16 )  - 5) * pixel);
            ctx.lineTo(( ( this.posX  + 28 + (this.Vx * 10)) +5) * pixel  ,   ((this.posY) + 16 ) * pixel);
            ctx.lineTo( ( this.posX  + 28 + (this.Vx * 10))  * pixel ,   (((this.posY) + 16 )  +5)  * pixel);
            ctx.stroke();
            ctx.fillStyle = 'red'
            ctx.fill()
            ctx.closePath();
        }


        ctx.beginPath()
        ctx.strokeStyle = 'green';

        if (this.Vy > 0){
            ctx.moveTo( (this.posX + 15) * pixel , (this.posY + 10) * pixel);
            ctx.lineWidth = 3 * pixel;
            ctx.lineCap = 'round';
            ctx.lineTo( (this.posX  + 15 ) * pixel , (this.posY + 10  - (this.Vy) * 10 - 10) * pixel);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo( (this.posX + 10) * pixel ,   (this.posY + 10 - this.Vy *10) * pixel );
            ctx.lineTo( (this.posX + 15) * pixel ,   (this.posY + 10 - this.Vy *10  -10) * pixel );
            ctx.lineTo( (this.posX+  20) * pixel ,   (this.posY + 10 - this.Vy *10) * pixel );
            ctx.stroke();
            ctx.fillStyle = 'green'
            ctx.fill()
            ctx.closePath();


        }else{
            ctx.moveTo((this.posX + 15) * pixel , (this.posY + 10) * pixel);
            ctx.lineWidth = 3 * pixel
            ctx.lineCap = 'round';
            ctx.lineTo((this.posX  + 15) * pixel ,( this.posY + 10 - this.Vy *10 + 10) * pixel);
            ctx.stroke()
            ctx.beginPath();
            ctx.moveTo((this.posX + 10) * pixel  ,   (this.posY + 10 - this.Vy *10 + 10) * pixel);
            ctx.lineTo((this.posX   + 15) * pixel ,  (this.posY + 10 - this.Vy *10 + 20) * pixel);
            ctx.lineTo((this.posX + 20) * pixel   ,  (this.posY + 10 - this.Vy *10 + 10) * pixel);
            ctx.stroke();
            ctx.fillStyle = 'green'
            ctx.fill()
            ctx.closePath();
           
        }
        

    }

    //componente da velocidade
    this.getVx =  () => this.v0 * Math.cos(this.teta).toFixed(4)
    
    this.getVy = (tempo) => this.v0 * Math.sin(this.teta) - g * tempo
    
    this.getX =  (tempo) =>  (1165 - getDistancia() * 100) + ( this.v0 * Math.cos(this.teta) * (tempo) ) * 100 + 40

    this.getY = (tempo) => (260 - ( this.v0 * Math.sin(this.teta) * (tempo) + (-1/2 * g *( (tempo) * (tempo) ) ) ) * 100 + 10)
}




function Tempo(){
    this.value = 0
    //////função de desenho////////
    this.draw = function(ctx, tempo, cnv){
        const pixel = cnv.width/1200
        ctx.beginPath();
        ctx.fillStyle = "white"
        ctx.rect(10 * pixel, 10 * pixel, 80 * pixel, 40 * pixel);
        ctx.fill();
        ctx.strokeStyle = 'black';
        ctx.strokeRect(10 * pixel, 10 * pixel, 80 * pixel, 40 * pixel);
        ctx.fillStyle = "black"
        ctx.font = `${24 * pixel}px serif`;
        ctx.fillText(`${(tempo /100).toFixed(1)} s`, 40 * pixel, 40 * pixel, 24 * pixel)
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



