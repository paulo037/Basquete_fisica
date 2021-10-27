const g = 9.81

///////player////////
function Sprite(img){
    ///////////////////////////////
    ///Propriedades do elemento////
    //////////////////////////////
    this.srcX = 0
    this.srcY = 0
    this.width = 89.16
    this.height = 240
    this.posX = 0
    this.posY = 500 - this.height - 10
    this.img = img
    this.contImg = 0
    this.acao = 1
    
    //////////função de desenho//////
    this.draw = function(ctx, cnv){
        let d = getDistancia()

        if (d > 12) {
            d = 12
        }

        
        if (d < 0) {
            d = 0
        }
        const pixel = cnv.width/1200
        this.posX = 1200 - ( d*100) -50
        ctx.drawImage(this.img, this.srcX, this.srcY, this.width, this.height, this.posX * pixel, this.posY * pixel, this.width * pixel , pixel *240)
    }

    /////////Animação do personagem///
    this.animation = function(ctx, cnv){
        this.contImg += 1
        if (this.contImg < 36 && this.acao){
            this.srcX = Math.floor(this.contImg/6) * 89.16

            if (2 == Math.floor(this.contImg/6)){ //Hora de começar a contar o tempo
                return 1
            }
        }else{
            this.srcX =  0
            this.contImg = 0
            this.acao = 0
        }
    }
}

////////cesta/////////
function Cesta(img){
    
    ///////////////////////////////
    ///Propriedades do elemento////
    //////////////////////////////
    this.srcX = this.srcY = 0
    this.width = 241
    this.height = 340
    this.posX = 1270 - this.width
    this.posY = 500 - 370
    this.img = img
    
    ///////função de desenho/////
    this.draw = function(ctx, cnv){
        const pixel = cnv.width/1200
        ctx.drawImage(this.img, this.srcX, this.srcY, this.width, this.height, this.posX * pixel, this.posY * pixel, this.width * pixel, this.height* pixel)
     
    }
}

////////////bola////////////
function Ball(img){
     ///////////////////////////////
    ///Propriedades do elemento////
    //////////////////////////////
    
    this.srcX = 0
    this.srcY = 0

    this.width = 30
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
    this.draw = function(ctx, tempo, distancia, cnv){

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
            
            
            
        this.tragetoria(tempo, ctx, cnv, distancia)
        this.vetores(ctx, tempo, cnv)
        ///desenhando a bola////
        ctx.drawImage(this.img, this.srcX, this.srcY, // Imagem
                        this.width, this.height,//tamanho da imagem
                        this.posX * pixel, this.posY * pixel, //posição
                        this.width * pixel, this.height * pixel//tamanho da imagem na tela                
                        )
     
        
    }

    //////função de desenho da tragetoria///// 
    this.tragetoria = function (tempo, ctx, cnv, distancia){
        let x1, y1, x2, y2, il
        const pixel = cnv.width/1200
        for(let i = 0.01; i < tempo; i += 0.01){
            il = i - 0.01

            // x1 =  this.v0 * Math.cos(this.teta) * (il) 
            // x1 = (1165 - getDistancia() * 100) + x1 * 100 + 40
            x1 = this.getX(il, distancia) + 10
            y1 = this.getY(il) + 10

            x2 = this.getX(i, distancia) + 10
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
        const  visualisa = {
            a : 0,
            V0x :0,
            V0y : 0
            
        }
        getCheckBox(visualisa)

        if (visualisa.V0x){
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
        }
        if (visualisa.V0y){
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

        if (visualisa.a){
            
            ctx.beginPath()
            ctx.strokeStyle = 'blue';
            ctx.moveTo((this.posX + 15) * pixel , (this.posY + 15) * pixel);
            ctx.lineWidth = 3 * pixel
            ctx.lineCap = 'round';
            ctx.lineTo((this.posX  + 15) * pixel ,( this.posY + g * 10) * pixel);
            ctx.stroke()
            ctx.beginPath();
            ctx.moveTo((this.posX + 10) * pixel  ,   (this.posY + g * 10) * pixel);
            ctx.lineTo((this.posX   + 15) * pixel ,  (this.posY + g * 10 + 10)* pixel);
            ctx.lineTo((this.posX + 20) * pixel   ,  (this.posY + g * 10) * pixel);
            ctx.stroke();
            ctx.fillStyle = 'blue'
            ctx.fill()
            ctx.closePath();
        }
        

    }

    //componente da velocidade
    this.getVx =  () => this.v0 * Math.cos(this.teta).toFixed(4)
    
    this.getVy = (tempo) => this.v0 * Math.sin(this.teta) - g * tempo
    
    this.getX =  (tempo, distancia) =>{
        if (distancia) {
            return  (1165 - distancia * 100) + ( this.v0 * Math.cos(this.teta) * (tempo) ) * 100
        }else{
            return (1165 - getDistancia() * 100) + ( this.v0 * Math.cos(this.teta) * (tempo) ) * 100
        } 

    }

    this.getY = (tempo) => (260 - ( this.v0 * Math.sin(this.teta) * (tempo) + (-1/2 * g *( (tempo) * (tempo) ) ) ) * 100)




    this.checkColizao = function(objetos, cnv, pontuacao, flag){
        let right = this.posX + this.width
        const pixel = cnv.width/1200
        // let colidiu = true
        objetos.forEach(objeto => {
            
            if ((this.posY + this.height < objeto.y) ||
            (this.posY > objeto.y + objeto.height) ||
            (this.posX + this.width < objeto.x) ||
            (this.posX > objeto.x + objeto.width)) {
              colidiu = false;
            }else{
                if (this.posY + this.height >= objeto.y
                 && this.posX > objeto.x + 2
                 && this.posX + this.width < objeto.x + objeto.width){
                    pontuacao.pts++
                   flag.value = 0
                    return 1
                }
                
            }
            
            // if (this.posX > objeto.x &&
            //     this.posX + this.width < objeto.x + objeto.width &&
            //     (this.posY > objeto.y  ||
            //     this.posY < objeto.y + 55) ){
            //     pontuacao.pts++
            //     flag.value = 0
            //     console.log(`${this.posX } > ${objeto.x} e ${this.posX + this.width} < ${objeto.x + objeto.width}`)
            //     return 0
            // }
            
            

        });
        return 1
    }
}




function Tempo(){
    this.value = 0
    //////função de desenho////////
    this.draw = function(ctx, tempo, cnv){
        const pixel = cnv.width/1200
        ctx.beginPath();
        ctx.lineWidth = 1 * pixel
        ctx.fillStyle = "white"
        ctx.rect(10 * pixel, 10 * pixel, 80 * pixel, 40 * pixel);
        ctx.fill();
        ctx.strokeStyle = 'black';
        ctx.strokeRect(10 * pixel, 10 * pixel, 80 * pixel, 40 * pixel, 70 * pixel);
        ctx.fillStyle = "black"
        ctx.font = `${18* pixel}px serif`;
        ctx.fillText(`${(tempo /100).toFixed(1)} s`, 15 * pixel, 40 * pixel)
    }
}

function Pontuacao(){
    //////função de desenho////////
    this.draw = function(valor, cnv, ctx){
        const pixel = cnv.width/1200
        ctx.beginPath();
        ctx.fillStyle = "white"
        ctx.rect(120 * pixel, 10 * pixel, 150 * pixel, 40 * pixel);
        ctx.fill();
        ctx.strokeStyle = 'black';
        ctx.strokeRect(120 * pixel, 10 * pixel, 150 * pixel, 40 * pixel);
        ctx.fillStyle = "black"
        ctx.font = `${16 * pixel}px serif`;
        ctx.fillText(`Pontuação: ${valor} `, 130 * pixel, 40 * pixel)
    }
}


///////////////////////////
/////////BUTÔES////////////
///////////////////////////


////retorna distancia do pleyer////
function getDistancia(){
    let spanD = document.getElementById("distancia");
    return parseFloat(spanD.value) 
}

//////retorna velocidade inicial//////
function getV0(){
    let v0 = document.getElementById("v0");
    return parseFloat(v0.value)
}

/////retorna teta//////////
function getTeta(){
    let angulo = document.getElementById("angulo");
    let Teta = Math.PI * parseFloat(angulo.value) / 180
    return Teta
}



function teta_vet_inicial(ctx, cnv, time){
    let posY = 0
    let posX = getDistancia()
    let teta = getTeta() 
    let v0 = getV0()
    let x, y
    const pixel = cnv.width / 1200
    
    if (time == 0){      
        posY = 360 * pixel
        posX =( (1200 - (posX * 100)) + 22) * pixel
    }else if(time == 1){
        posY = 340 * pixel
        posX =( (1200 - (posX * 100)) + 8) * pixel
    }else{
        return
    }
    
    
    x = posX + ( Math.cos(teta) * v0 * 10 - Math.sin(teta) * 0) * pixel
    y = posY - (( Math.sin(teta) * v0 * 10 + Math.cos(teta) * 0)) * pixel

    ctx.beginPath();
    ctx.strokeStyle = 'yellow';
    ctx.moveTo(posX, posY);
    ctx.lineWidth = 3 * pixel;
    ctx.lineCap = 'round';
    ctx.lineTo(x , y);
    ctx.stroke()
    
    let xl, yl
    
    xl = x + ( Math.cos(teta) * 0 - Math.sin(teta) * -5) * pixel
    yl = y - (( Math.sin(teta) * 0 + Math.cos(teta) * -5)) * pixel
    ctx.moveTo( xl , yl);

    xl = x + ( Math.cos(teta) * 5 - Math.sin(teta) * 0) * pixel
    yl = y - (( Math.sin(teta) * 5 + Math.cos(teta) * 0)) * pixel
    ctx.lineTo( xl, yl);

    xl = x + ( Math.cos(teta) * 0 - Math.sin(teta) * 5) * pixel
    yl = y - (( Math.sin(teta) * 0 + Math.cos(teta) * 5)) * pixel
    ctx.lineTo( xl , yl);

    ctx.stroke();
    ctx.fillStyle = 'yellow'
    ctx.fill()
    ctx.closePath()


    // ctx.beginPath()
    // ctx.strokeStyle = 'white';
    // ctx.moveTo(posX, posY)
    // ctx.lineWidth = 1 * pixel;
    // ctx.lineCap = 'round';
    // ctx.lineTo(posX + 200 * pixel, posY)
    // ctx.stroke()
    // ctx.moveTo( posX + 200 * pixel, posY -5 * pixel);
    // ctx.lineTo( posX + (200 + 5) * pixel, posY );
    // ctx.lineTo( posX + 200 * pixel, posY +5 * pixel);
    // ctx.stroke()
    // ctx.fillStyle = 'white'
    // ctx.fill()
    // ctx.closePath()

    // ctx.beginPath()
    // ctx.strokeStyle = 'white';
    // ctx.moveTo(posX, posY)
    // ctx.lineWidth = 1 * pixel;
    // ctx.lineCap = 'round';
    // ctx.lineTo(posX, posY - 200 * pixel)
    // ctx.stroke()
    // ctx.moveTo( posX - 5 * pixel, posY - 200 * pixel);
    // ctx.lineTo( posX  , posY - 205 * pixel);
    // ctx.lineTo( posX + 5 * pixel, posY - 200 * pixel);
    // ctx.stroke()
    // ctx.fillStyle = 'white'
    // ctx.fill()
    // ctx.closePath()

    
}

function Colisor (x, y, width, height, name){
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.name = name
}


function getCheckBox( visualisa){
    let checks = document.getElementsByClassName('check')
    
    visualisa.a = checks[0].checked
    visualisa.V0x = checks[1].checked
    visualisa.V0y = checks[2].checked
    
}