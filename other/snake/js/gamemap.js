var allpixel;
var slength;
var sbody = [];
var score = 0;
function setMap(){
    var pixel = "<span class='pixel'></span>";
    for(let i = 0;i<2600;i++){
        $(".main").append(pixel);
    }
    allpixel = document.getElementsByClassName("pixel");

    log("填充坐标");
    for(let i=0;i<allpixel.length;i++){
        // allpixel[i].onclick = function(){
        //     getPosition(i);
        // }
        allpixel[i].innerHTML = getPosition(i);
    }
    log("生成Snake")
    allpixel[0].classList.add("snake");
    log("长度设置为3");
    slength = 2;
    walk();
    putBean();
}
var x = 0;
var y = 0;
function getPosition(i){
    var position = [i%50,Math.floor(i/50)];
    return position;
}
function getindex(position){
    if(position.length==2){
        var index = position[1]*50+position[0];
    }else{
        var positionarr = position.splice(',');
        var index = Number(positionarr[1])*50+Number(positionarr[0]);
    }
    return index;
}
function snakePosition(){
    var positionStringarr = $(".snake")[0].innerHTML.split(',') 
    return [Number(positionStringarr[0]),Number(positionStringarr[1])];
}
function setSnakePosition(position){
    checkPixel();
    sbody.push(snakePosition());
    $(".snake").addClass("snakebody");
    $(".snake").removeClass("snake");
    var i = position[1]*50+position[0];
    allpixel[i].classList.add("snake")
    if(slength<=0){
        $(allpixel[getindex(sbody[0])]).removeClass("snakebody");
        sbody.shift();
    }
    if(slength>0)
    slength--;
}
function checkPixel(){
    if(allpixel[getindex(snakePosition())].classList.contains("bean")){
        slength++;
        score++;
        $(".score")[0].innerHTML = "分数: "+score;
        $(".jindu")[0].innerHTML = "进度: "+(score+3)/25+"%";
        $(".bean").removeClass("bean");
        putBean();
    }
    if(allpixel[getindex(snakePosition())].classList.contains("snakebody")){
        log("游戏结束!")
        gameOver();
    }
}
function randomPixel(){
    var x = Math.floor(Math.random()*50);
    var y = Math.floor(Math.random()*52);
    return allpixel[getindex([x,y])];
}
function putBean(){
    var pixel = randomPixel();
    while(true){
        if(pixel.classList.contains("snakebody")){
            pixel = randomPixel();
        }else{
            break;
        }
    }
    pixel.classList.add("bean");
}
function mapreset(){
    log("初始化参数");
    sbody = [];
    score = 0;
    $(".score")[0].innerHTML = "分数: 0";
    $(".jindu")[0].innerHTML = "进度: 0%";
    slength = 2;
    log("重新生成Snake");
    allpixel[0].classList.add("snake")
}


