console.log('[Henrique Siqueira Lima] Flappy Bird');

let frames = 0;
const som_Hit = new Audio();
som_Hit.src = "./efeitos/hit.wav"

const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');

const planoDeFundo = {
  spriteX:390,
  spriteY:0,
  largura:275,
  altura:204,
  x:0,
  y:canvas.height-204,
  desenha(){
    contexto.fillStyle = "#70c5ce";
    contexto.fillRect(0,0,canvas.width,canvas.height)

    contexto.drawImage(
      sprites,
      planoDeFundo.spriteX, planoDeFundo.spriteY, //Sprite X e Sprite Ys
      planoDeFundo.largura, planoDeFundo.altura, //Tamanho do Sprite
      planoDeFundo.x, planoDeFundo.y,
      planoDeFundo.largura,planoDeFundo.altura,
    );

    contexto.drawImage(
      sprites,
      planoDeFundo.spriteX, planoDeFundo.spriteY, //Sprite X e Sprite Ys
      planoDeFundo.largura, planoDeFundo.altura, //Tamanho do Sprite
      (planoDeFundo.x + planoDeFundo.largura), planoDeFundo.y,
      planoDeFundo.largura,planoDeFundo.altura,
    );
  }
}

function criaChao(){
  const chao = {
    spriteX:0,
    spriteY:610,
    largura:224,
    altura:112,
    x:0,
    y:canvas.height-112,
    atualiza(){
      const movimentoDoChao = 1;
      const repeteEm = chao.largura / 2;
      const movimentacao = chao.x - movimentoDoChao;

      chao.x = movimentacao % repeteEm;

    },
    desenha(){
      contexto.drawImage(
        sprites,
        chao.spriteX, chao.spriteY, //Sprite X e Sprite Ys
        chao.largura, chao.altura, //Tamanho do Sprite
        chao.x, chao.y,
        chao.largura,chao.altura,
      );
  
      contexto.drawImage(
        sprites,
        chao.spriteX, chao.spriteY, //Sprite X e Sprite Ys
        chao.largura, chao.altura, //Tamanho do Sprite
        (chao.x + chao.largura), chao.y,
        chao.largura,chao.altura,
      );
    }
  }
  return chao
}


function fazColisao(flappyBird,chao){
    const flappyBirdY = flappyBird.y + flappyBird.altura;
    const chaoY = chao.y;

    if(flappyBirdY >= chaoY){
      return true;
    }

    return false;
  
}

function criaFlappyBird(){
  const flappyBird = {
    spriteX:0,
    spriteY:0,
    largura:33,
    altura:24,
    x:10,
    y:50,
    pulo:4.6,
    pula(){
      flappyBird.velocidade = - flappyBird.pulo
    },
    gravidade:0.25,
    velocidade:0,
    atualiza(){
      if(fazColisao(flappyBird,globais.chao)){
        som_Hit.play();

        setTimeout(() => {
          mudaParaTela(telas.GAME_OVER)
        },500);
        return;
      }
      flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade
      flappyBird.y = flappyBird.y + flappyBird.velocidade
    },
    movimentos: [
      {spriteX: 0, spriteY: 0,},
      {spriteX: 0, spriteY: 26,},
      {spriteX: 0, spriteY: 52,},
      {spriteX: 0, spriteY: 26,},
    ],
    frameAtual: 0,
    atualizaFrameAtual(){
      const intervaloDeFrames = 10;
      const passouOIntervalo = frames % intervaloDeFrames === 0;

      if(passouOIntervalo){
        const baseDoIncremento = 1;
        const incremento = baseDoIncremento + flappyBird.frameAtual;
        const baseRepeticao = flappyBird.movimentos.length;
        flappyBird.frameAtual = incremento % baseRepeticao;
      }
    },
    desenha(){
      flappyBird.atualizaFrameAtual();
      const { spriteX, spriteY } = flappyBird.movimentos[flappyBird.frameAtual];

      contexto.drawImage(
        sprites,
        spriteX, spriteY, //Sprite X e Sprite Ys
        flappyBird.largura, flappyBird.altura, //Tamanho do Sprite
        flappyBird.x, flappyBird.y,
        flappyBird.largura,flappyBird.altura,
      );
    }
  }
  return flappyBird;
}

const mensagemGetReady = {
  sX:134,
  sY:0,
  w:174,
  h:152,
  x:(canvas.width / 2) - 174 / 2,
  y:50,
  desenha(){
    contexto.drawImage(
      sprites,
      mensagemGetReady.sX, mensagemGetReady.sY, //Sprite X e Sprite Ys
      mensagemGetReady.w, mensagemGetReady.h, //Tamanho do Sprite
      mensagemGetReady.x, mensagemGetReady.y,
      mensagemGetReady.w,mensagemGetReady.h,
    );
  }
}

const mensagemGameOver = {
  sX:134,
  sY:153,
  w:226,
  h:200,
  x:(canvas.width / 2) - 226 / 2,
  y:50,
  desenha(){
    contexto.drawImage(
      sprites,
      mensagemGameOver.sX, mensagemGameOver.sY, //Sprite X e Sprite Ys
      mensagemGameOver.w, mensagemGameOver.h, //Tamanho do Sprite
      mensagemGameOver.x, mensagemGameOver.y,
      mensagemGameOver.w,mensagemGameOver.h,
    );
  }
}

const globais = {}
let telaAtiva = {}
function mudaParaTela(novaTela){
  telaAtiva = novaTela
  if(telaAtiva.inicializa){
    telaAtiva.inicializa();
  }
}

function criaCanos(){
  const canos = {
    largura:52,
    altura:400,
    chao:{
      spriteX:0,
      spriteY:169,
    },
    ceu:{
      spriteX:52,
      spriteY:169,
    },
    espaco:85,
    desenha(){
      canos.pares.forEach(function (par){
      const yRandom = par.y;
      const espacamentoEntreCanos = 90;

      const canoCeuX = par.x;
      const canoCeuY = yRandom;

      contexto.drawImage(
        sprites,
        canos.ceu.spriteX, canos.ceu.spriteY,
        canos.largura,canos.altura,
        canoCeuX,canoCeuY,
        canos.largura,canos.altura
      )

      const canoChaoX = par.x;
      const canoChaoY = canos.altura + espacamentoEntreCanos + yRandom;

      contexto.drawImage(
        sprites,
        canos.chao.spriteX, canos.chao.spriteY,
        canos.largura,canos.altura,
        canoChaoX,canoChaoY,
        canos.largura,canos.altura
      )

      par.canoCeu = {
        x: canoCeuX,
        y: canos.altura + canoCeuY
      }
      par.canoChao = {
        x: canoChaoX,
        y: canoChaoY
      }
    })
    }
    ,
    temColisaoComFlappyBird(par){      
      const cabecaDoFlappy = globais.flappyBird.y;
      const peDoFlappy = globais.flappyBird.y + globais.flappyBird.altura
      
      if(globais.flappyBird.x + globais.flappyBird.largura >= par.x){
        if(cabecaDoFlappy <= par.canoCeu.y){
          return true
        }

        if(peDoFlappy >= par.canoChao.y){
          return true
        }
      }

      return false;
    },
    pares:[],
    atualiza(){
      const passou100Frames = frames % 100 === 0;
      if(passou100Frames){
        canos.pares.push({
          x: canvas.width,
          y: -150 * (Math.random() + 1),
        })
      }
      canos.pares.forEach(function (par){
        par.x = par.x - 1.5;

        if(canos.temColisaoComFlappyBird(par)){
          som_Hit.play();
          mudaParaTela(telas.GAME_OVER)
        }

        if(par.x + canos.largura <= 0){
          canos.pares.shift();
        }
      });
    }
    
  }
  
  return canos;
}

function criaPlacar(){
  const placar = {
    pontuacao:0,
    pontuacaoMaisRecente:0,
    atualiza(){
      const intervaloDeFrames = 50;
      const passouOIntervalo = frames % intervaloDeFrames === 0;
      
      if(passouOIntervalo){
        placar.pontuacao = placar.pontuacao + 10
      }
      
      placar.pontuacaoMaisRecente = placar.pontuacao
    },
    desenha(){
      contexto.font = '35px "VT323"';
      contexto.textAlign = 'right'
      contexto.fillStyle = 'white'
      contexto.fillText(`Pontuação:${placar.pontuacao}`,canvas.width- 10,35)
    },
  }
  return placar;
}

const telas = {
  INICIO: {
    inicializa(){
      globais.flappyBird = criaFlappyBird();
      globais.chao = criaChao();
      globais.canos = criaCanos();
    },
    desenha(){
      planoDeFundo.desenha();
      globais.flappyBird.desenha();
      globais.chao.desenha();
      mensagemGetReady.desenha();
    },
    click(){
      mudaParaTela(telas.JOGO)
    },
    atualiza(){
      globais.chao.atualiza();
    }
  }
}

telas.JOGO = {
  inicializa() {
    globais.placar = criaPlacar();
  },
  desenha() {
    planoDeFundo.desenha();
    globais.flappyBird.desenha();
    globais.canos.desenha();
    globais.chao.desenha();
    globais.placar.desenha();
  },
  click(){
    globais.flappyBird.pula();
  },
  atualiza(){
    globais.canos.atualiza();
    globais.chao.atualiza();
    globais.flappyBird.atualiza();
    globais.placar.atualiza();
  } 
}

telas.GAME_OVER = {
  desenha(){
    mensagemGameOver.desenha();
  },
  click(){
    mudaParaTela(telas.INICIO)
  },
  inicializa(){
    
  },
  atualiza(){

  }
}

function loop(){

  telaAtiva.desenha();
  telaAtiva.atualiza();

  frames = frames + 1;
  requestAnimationFrame(loop);
}

window.addEventListener("click", function() {
  if(telaAtiva.click)
  telaAtiva.click();
})
mudaParaTela(telas.GAME_OVER);
loop();