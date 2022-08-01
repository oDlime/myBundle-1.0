var allpixel;
var point1 = [401,123,35];
var point2 = [642,373,53]
$(function(){
	$(".drawmap").click(function(){
		$(".drawmap").hide()
		var pixel = "<div class='pixel'></div>";
		for (let i = 0; i < 116*66; i++) {
		   	$(".drawmain").append(pixel);
			$(".pixel")[i].innerHTML = i%116+","+Math.floor(i/116);
		}
		allpixel = document.getElementsByClassName("pixel");
		$(".drawcube").click(function(){
			$(".blackpoint").removeClass("blackpoint")
			point1 = $(".point1")[0].value.split(',')
			point2 = $(".point2")[0].value.split(',')
			point1[0] = Number(point1[0])
			point1[1] = Number(point1[1])
			point1[2] = Number(point1[2])
			point2[0] = Number(point2[0])
			point2[1] = Number(point2[1])
			point2[2] = Number(point2[2])
			// drawCube([[22,40,35],[80,77,87]]);
			drawCube([point1,point2]);
			conmove();
			mouseMove();
			setInterval(function(){
				
			},500)
			
		})
		
		
		
	})
});



function getpIndex(position){
	if(position.length!=2){
		var position = position.split(",");
	}
	return Number(position[0])+Number(position[1]*116);
}
function getpPosition(index){
	var position = allpixel[index].innerHTML.split(',');
	return position;
}
function getpixel(pai){
	if(pai.length==2){
		pai = getpIndex(pai);
	}
	return allpixel[pai];
}
function parsePosition(position){
	position = position.split(',');
	return [Number(position[0]),Number(position[1])];
}
function drawPoint(position,color){
	if(!(position[0]<0||position[0]>115||position[1]<0||position[1]>65)){
		var pixel = getpixel(position);
		if(color!=null){
			pixel.classList.add(color);
		}else{
			pixel.classList.add("blackpoint");
		}
	}
}
function drawLine(point1,point2,color){
	var tan = (point1[1]-point2[1])/(point1[0]-point2[0]);
	if(tan>=-1&&tan<=1){
		var b = point2[1]-tan*point2[0];
		point1[0]=Math.floor(point1[0])
		point1[1]=Math.floor(point1[1])
		point2[0]=Math.floor(point2[0])
		point2[1]=Math.floor(point2[1])
		var mate = point1[0]-point2[0]>0?-1:1;
		for(;point1[0]!=point2[0];point1[0]+=mate){
			drawPoint([Math.floor(point1[0]),Math.floor(tan*point1[0]+b)]);
		}
		drawPoint(point2);
	}else{
		tan = (point1[0]-point2[0])/(point1[1]-point2[1]);
		var b = point2[0]-tan*point2[1];
		point1[0]=Math.floor(point1[0])
		point1[1]=Math.floor(point1[1])
		point2[0]=Math.floor(point2[0])
		point2[1]=Math.floor(point2[1])
		var mate = point1[1]-point2[1]>0?-1:1;
		for(;point1[1]!=point2[1];point1[1]+=mate){
			drawPoint([Math.floor(tan*point1[1]+b),Math.floor(point1[1])]);
		}
		drawPoint(point2);
	}
}
var p = 5;
function drawCube(point3v2){
	var point1 = point3v2[0];
	var point2 = point3v2[1];
	//顶面
	drawLine([p*point1[0]/point1[2],p*point1[1]/point1[2]],[p*point2[0]/point1[2],p*point1[1]/point1[2]]);
	drawLine([p*point2[0]/point1[2],p*point1[1]/point1[2]],[p*point2[0]/point2[2],p*point1[1]/point2[2]]);
	drawLine([p*point2[0]/point2[2],p*point1[1]/point2[2]],[p*point1[0]/point2[2],p*point1[1]/point2[2]]);
	drawLine([p*point1[0]/point2[2],p*point1[1]/point2[2]],[p*point1[0]/point1[2],p*point1[1]/point1[2]]);
	//底面
	drawLine([p*point1[0]/point1[2],p*point2[1]/point1[2]],[p*point2[0]/point1[2],p*point2[1]/point1[2]]);
	drawLine([p*point2[0]/point1[2],p*point2[1]/point1[2]],[p*point2[0]/point2[2],p*point2[1]/point2[2]]);
	drawLine([p*point2[0]/point2[2],p*point2[1]/point2[2]],[p*point1[0]/point2[2],p*point2[1]/point2[2]]);
	drawLine([p*point1[0]/point2[2],p*point2[1]/point2[2]],[p*point1[0]/point1[2],p*point2[1]/point1[2]]);
	//高线
	drawLine([p*point1[0]/point1[2],p*point1[1]/point1[2]],[p*point1[0]/point1[2],p*point2[1]/point1[2]]);
	drawLine([p*point2[0]/point1[2],p*point1[1]/point1[2]],[p*point2[0]/point1[2],p*point2[1]/point1[2]]);
	drawLine([p*point2[0]/point2[2],p*point1[1]/point2[2]],[p*point2[0]/point2[2],p*point2[1]/point2[2]]);
	drawLine([p*point1[0]/point2[2],p*point1[1]/point2[2]],[p*point1[0]/point2[2],p*point2[1]/point2[2]]);
	//A  [p*point1[0]/point1[2],p*point1[1]/point1[2]]
	//B  [p*point2[0]/point1[2],p*point1[1]/point1[2]]
	//C  [p*point2[0]/point2[2],p*point1[1]/point2[2]]
	//D  [p*point1[0]/point2[2],p*point1[1]/point2[2]]
	
	//A1 [p*point1[0]/point1[2],p*point2[1]/point1[2]]
	//B1 [p*point2[0]/point1[2],p*point2[1]/point1[2]]
	//C1 [p*point2[0]/point2[2],p*point2[1]/point2[2]]
	//D1 [p*point1[0]/point2[2],p*point2[1]/point2[2]]
}
function conmove(){
	var box = document.getElementsByClassName("drawmain")
	    document.onkeydown = keyDown;
	    function keyDown(event){
	        var event = event || window.event;
	        switch(event.keyCode){
	            case 37 :
				console.log("aa")
	                point1[0]-=2;
	                point2[0]-=2;
	                break;
	            case 39 :
	                point1[0]+=2;
	                point2[0]+=2;
	                break;
	            case 38 :
	                point1[1]-=2;
	                point2[1]-=2;
	                break;
	            case 40 :
	                point1[1]+=2;
	                point2[1]+=2;
	                break;
	        }
			$(".blackpoint").removeClass("blackpoint")
			drawCube([point1,point2]);
			
			$(".point1")[0].value= point1;
			$(".point2")[0].value= point2;
			
	        return false
	    }
}
function objmouse(move){
	point1[0]+=move[0]*2;
	point2[0]+=move[0]*2;
	point1[1]+=move[1]*2;
	point2[1]+=move[1]*2;
	$(".blackpoint").removeClass("blackpoint")
	drawCube([point1,point2]);
	
	$(".point1")[0].value= point1;
	$(".point2")[0].value= point2;
	
}
function mouseMove(){
	var mousem = [0,0];
	var hposition = [0,0];
	var position = [0,0];
	$(".pixel").mouseover(function(){
		if(!(hposition[0]==0&&hposition[1]==0)){
			position = parsePosition(this.innerText);
			mousem[0] = hposition[0]-position[0];
			mousem[1] = hposition[1]-position[1];
		}
		hposition = parsePosition(this.innerText);
		objmouse(mousem);
		
	});
	$(".pixel").mouseout(function(){
		
	});
	$(".drawmain").mouseleave(function(){
		 mousem = [0,0];
		 hposition = [0,0];
		 position = [0,0];
	});
}











