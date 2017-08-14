var board = [["","",""],["","",""],["","",""]];
var str = "";
var tmove;
var thinking = false;

lis = document.getElementsByTagName("li");

function check(){
	var filled = true;

	for(var j=0; j< lis.length; j++)
	{
		board[Math.floor(j/3)][j%3] = lis[j].innerHTML;
		if(lis[j].innerHTML == "")
		{
			filled = false;
		}
	}
	for(var m =0;m < 3; m++)//horizontal checking
	{
		if(board[m][0] == board[m][1] && board[m][2] == board[m][0]
			&& board[m][0] !== ""){
			alert(board[m][0] + " wins");
		}
	}

	for(var n=0;n < 3; n++)
	{
		if(board[0][n] == board[1][n] && board[2][n] == board[0][n]
			&& board[0][n] !== ""){
			alert(board[0][n] + " wins");
		}
	}

	if(((board[0][0] == board[1][1] && board[2][2] == board[0][0])
		|| (board[2][0] == board[1][1] && board[0][2] == board[1][1]))
			&& board[1][1] !== "")
	{
		alert(board[1][1] + " wins");
	}else if(filled){
		alert("Draw!");
	}

	console.log(board.toString());
}

var turn = 0;
console.log(lis.length);

for(var i =0; i<lis.length;i++){
	lis[i].addEventListener("click", function(e){
		if(e.currentTarget.innerHTML == "" && thinking == false)
		{
			e.currentTarget.innerHTML = "O";
			ajx();
		}



	},false);
}

function ajx(){
	thinking = true;
	xhttp = new XMLHttpRequest();
	xhttp.open("POST","http://"+self.location.host+"/ajax", true);
	xhttp.setRequestHeader("content-type","application/x-www-form-urlencoded")
	xhttp.onreadystatechange = function(){
		//alert(xhttp.readyState);
		if (xhttp.readyState == 4 && xhttp.status == 200)
		{
			tmove = JSON.parse(xhttp.responseText);
			console.log(tmove);
			console.log("nempty");
			if(tmove[2] == 0 || tmove[0] == 50)//no possible wins for X
			{
				alert("Draw!");
				return;
			}
			if(lis[tmove[0]*3 + tmove[1]].innerHTML == "")
			{
				console.log("empty");
				lis[tmove[0]*3 + tmove[1]].innerHTML = "X";
			}


			check();
			thinking = false;
		}
		else if(xhttp.status !== 200){
			alert("AJAX failed:" + xhttp.status );
		}
	}
	for(var j=0; j< lis.length; j++)
	{
		board[Math.floor(j/3)][j%3] = lis[j].innerHTML;
	}
	xhttp.send("b="+JSON.stringify(board));
}
