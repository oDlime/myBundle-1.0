$(function(){
    log("初始化地图中...");
    setMap();
    log("初始化地图完成");
    $("body").click(function(){
        openFullscreen();
    })
})
var times;
var walka = [1,0];
var walkah = [1,0];
var speed = 100;
function walk(){
    log("初始化行为");
    control();
    function walk4(){
        var p = [0,0];
        p = snakePosition();
        var x = p[0]+walka[0];
        var y = p[1]+walka[1];
        if(x>49){
            x = 0;
        }else if(x<0){
            x = 49;
        }else if(y>51){
            y = 0;
        }else if(y<0){
            y = 51;
        }
        setSnakePosition([x,y]);
        walkah = walka;
    }
    times = setInterval(walk4,speed);
    function restart(){
        log("");
        log("重置界面");
        $(".reset")[0].innerHTML = "重新开始"
        log("重置变量");
        $(".snakebody").removeClass("snakebody")
        walka= walkh = [1,0];
        $(".snake").removeClass("snake");
        log("重置计时器");
        clearInterval(times);
        log("初始化地图");
        mapreset();  
        log("速度:"+speed);
        log("开启计时器");
        times = setInterval(walk4,speed);
    }
    $(".reset").click(function(){
        restart();
    })
    function control(){
        // var box = document.getElementsByClassName("main")
        document.onkeydown = keyDown;
        document.onkeyup = keyUp;
        function keyDown(event){
            var event = event || window.event;
            switch(event.keyCode){
                case 65 ://左
                    if(walka[1]!=0&&walkah[0]!=1)
                    walka = [-1,0];
                    break;
                case 68  ://右
                if(walka[1]!=0&&walkah[0]!=-1)
                    walka = [1,0]
                    break;
                case 87  ://上
                if(walka[0]!=0&&walkah[1]!=1)
                    walka = [0,-1]
                    break;
                case 83  ://
                if(walka[0]!=0&&walkah[1]!=-1)
                    walka = [0,1]
                    break;
                case 69  :break;//e
            }
            return false
        }
        function keyUp(event){
            var event = event || window.event;
            switch(event.keyCode){
                case 69  :break;//e
            }
        }
    }
    $(".settingItem")[0].onclick = function(){
        speed = 200;
        log("速度调整为200，重新开始以启用更改");
    }
    $(".settingItem")[1].onclick = function(){
        speed = 100;
        log("速度调整为100，重新开始以启用更改");
    }
    $(".settingItem")[2].onclick = function(){
        speed = 60;
        log("速度调整为60，重新开始以启用更改");
    }
    $(".settingItem")[3].onclick = function(){
        closeFullscreen();
    }



}
function gameOver(){
    clearInterval(times);
}
