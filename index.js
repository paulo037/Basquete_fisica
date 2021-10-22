

window.onload = function(){
    var cnv = document.querySelector("canvas")
    var ctx = cnv.getContext("2d")









    //back-grond
    var fundo = new Image()
    fundo.src = "https://i.postimg.cc/RZ7HDp2H/fundo2.jpg"
    
    //jogador
    var spriteSheet = new Image()
    spriteSheet.src = "https://i.postimg.cc/0N9wRdqH/sprite2.png"
    var player = new Sprite(spriteSheet)

    //Bola
    var spriteBall = new Image()
    spriteBall.src = "https://i.postimg.cc/3JDpgxB9/ball.png"
    var ball = new Ball(spriteBall)
    
    //cesta
    var spriteCesta = new Image()
    spriteCesta.src = "https://i.postimg.cc/Z5tNjzsm/cesta340.png"
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
    }, 30);

    

    loop()

    function loop(){
        let stylew = window.getComputedStyle(cnv).width;
        let valor = parseInt(stylew.substr(0,stylew.search("px")));
        cnv.width = valor
        cnv.height = valor * 5 /12
        
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
        ctx.drawImage(fundo, 300, -150, 900, 650, 0, 0, cnv.width, cnv.height) //desenha o fundo
        
        WriteRegua(cnv) //desenha a regua
        
        
        player.draw(ctx, cnv) //desenha o jogador
        cesta.draw(ctx, cnv)//desenha a cesta
        
        visualizer_time.draw(ctx, tempo, cnv)
        
        if (frame){
            ball.vetores(ctx, tempo/100, cnv)
            ball.draw(ctx, tempo, game, cnv) //desenha a bola
            visualizer_time.draw(ctx, tempo, cnv)
        }

        
    }

    
    
    function WriteRegua(){
        const pixel = cnv.width/1200
        ctx.fillStyle = 'rgb(177, 182, 158)';
        ctx.fillRect(0  * pixel, (cnv.height - 35 * pixel ), 1185 * pixel, 5 * pixel);
        let x = 0
        for (x = 0; x < 12; x++){
            ctx.font = `${12 * pixel}px serif`;
            ctx.fillText(`${(x - 12) * -1 }m`,( x * 100) * pixel,  cnv.height - 40 * pixel);
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