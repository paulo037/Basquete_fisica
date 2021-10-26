

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
    var vizualizer_pontuacao = new Pontuacao()
    var game = 0
    let tempo =  0
    var frame = 0
    var distancia = getDistancia()
    let vizualizer_vetores = {
        a : 0,
        V0x :0,
        V0y : 0

    }
    const  flag = {
        value : 1
    }
    const pontuacao  = {
        pts : 0
    }

    var intervalo = setInterval(() => {//tempo
        if (game && frame){
        tempo += 1;
    }
    }, 10);

    var objetos = []
   
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
            a = player.animation(ball, ctx, cnv)
            if(a == 1){
                frame = a
            }
        }
        
    }
    
    
    function draw(){


        getCheckBox(vizualizer_vetores)
        
      
        ctx.clearRect(0,0, cnv.width, cnv.height) //Limpa a tela
        ctx.drawImage(fundo, 300, -150, 900, 650, 0, 0, cnv.width, cnv.height) //desenha o fundo
        
        WriteRegua(cnv) //desenha a regua
        
        
        player.draw(ctx, cnv) //desenha o jogador
        teta_vet_inicial(ctx, cnv, Math.floor( player.contImg/6) )
        
        visualizer_time.draw(ctx, tempo, cnv)
        vizualizer_pontuacao.draw(pontuacao.pts, cnv, ctx)
        if (frame){
           
            ball.vetores(ctx, tempo/100, cnv, vizualizer_vetores)
            ball.draw(ctx, tempo, distancia, cnv) //desenha a bola
        }
        cesta.draw(ctx, cnv)//desenha a cesta
        if(flag.value == 1){
          ball.checkColizao(objetos, cnv, pontuacao, flag)  
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
        player.acao = 1
   }



   let arremessar = document.getElementById("arremessar")

   arremessar.onclick = () => {
        if (game == 1){
            reset.onclick()
            game = 0
            arremessar.onclick()
            player.acao = 1
        }else{
            ball.teta = getTeta()
            ball.v0 = getV0()
            distancia = getDistancia()
            game = 1
            flag.value  = 1
        }
   }

  



   ///colisores
   objetos.push(new Colisor(1090, cesta.posY + 74, 45, 8, "cesta"))
}