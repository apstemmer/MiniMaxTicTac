var board = [["","",""],["","",""],["","",""]];
var str = "";

lis = document.getElementsByTagName("li");

function check(){
	for(var j=0; j< lis.length; j++)
	{
		board[Math.floor(j/3)][j%3] = lis[j].innerHTML; 
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
	}

	console.log(board.toString());
}

var turn = 0;
console.log(lis.length);

for(var i =0; i<lis.length;i++){
	lis[i].addEventListener("click", function(e){
		if(e.currentTarget.innerHTML == "")
		{
			if(turn%2 == 0){
				e.currentTarget.innerHTML = "X";
			}
			else{
				e.currentTarget.innerHTML = "O";
			}
			ajx();
			alert(str);
			turn++;
			
		}

		check();
	},false);
}

function ajx(){
	xhttp = new XMLHttpRequest();
	xhttp.open("POST","http://127.0.0.1:8080/ajax", true);
	xhttp.setRequestHeader("content-type","application/x-www-form-urlencoded")
	xhttp.onreadystatechange = function(){
		if (xhttp.readyState == 4 && xhttp.status == 200)
		{
			str = xhttp.responseText;
		}
		else if(xhttp.status !== 200){
			alert("AJAX failed:" + xhttp.status );
		}
	}
	xhttp.send("b="+JSON.stringify(board));
}


