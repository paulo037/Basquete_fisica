

window.onload = function(){

    var cnv = document.querySelector("canvas")
    var ctx = cnv.getContext("2d")

    //back-grond
    var fundo = new Image()
    fundo.src = "./Imagens/fundo2.jpg"
    
    //jogador
    var spriteSheet = new Image()
    spriteSheet.src = "./Imagens/sprite2.png"
    var player = new Sprite(spriteSheet)

    //Bola
    var spriteBall = new Image()
    spriteBall.src = "./Imagens/ball.png"
    var ball = new Ball(spriteBall)
    
    //cesta
    var spriteCesta = new Image()
    spriteCesta.src = "./Imagens/cesta340.png"
    var cesta = new Cesta(spriteCesta)

    //tempo
    var visualizer_time = new Tempo()

    var game = 0
    let tempo =  0
    var frame = 0
    
    var intervalo = setInterval(() => {//tempo
        if (game && frame){
        tempo += 1;
    }
    }, 10);

    

    loop()

    function loop(){
        window.requestAnimationFrame(loop, cnv)
        update()
        draw()
    }

    function update(){
        if (game == 1){
            a = player.animation()
            if(a == 1){
                frame = a
            }
        }
        
    }

    
    function draw(){

        ctx.clearRect(0,0, cnv.width, cnv.height) //Limpa a tela
        ctx.drawImage(fundo, 300, -150, 900, 650, 0, 0, 1200, 500) //desenha o fundo
        
        WriteRegua() //desenha a regua
        
        cesta.draw(ctx)//desenha a cesta
        
        player.draw(ctx) //desenha o jogador
        
        visualizer_time.draw(ctx, tempo)
        
        if (frame){
            ball.draw(ctx, tempo, game) //desenha a bola
            visualizer_time.draw(ctx, tempo)
        }

        
    }

    
    
    function WriteRegua(){
        ctx.fillStyle = 'rgb(177, 182, 158)';
        ctx.fillRect(0, cnv.height - 35, 1185, 5);
        let x = 0
        for (x = 0; x < 12; x++){
            ctx.font = '12px serif';
            ctx.fillText(`${(x - 12) * -1 }m`, x * 100,  cnv.height - 40);
        }
    }
    
   



   let reset = document.getElementById("reset")

   reset.onclick = () => {
        tempo = 0
        game = 0
        frame = 0
        player.contImg = 0
        player.srcX = 0

   }



   let arremessar = document.getElementById("arremessar")

   arremessar.onclick = () => {
        if (game == 1){
            reset.onclick()
            game = 0
            arremessar.onclick()
        }else{
            ball.teta = getTeta()
            ball.v0 = getV0()
            game = 1
        }
   }

  
 

}