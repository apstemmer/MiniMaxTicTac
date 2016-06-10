var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var url = require('url');
var app = express();

console.log("commenccing minimax");
var board = [["","",""],["","",""],["","",""]];

function minimax(board){
	var filled = true; 
	var score = 0;
	var xs = 0;
	var os = 0;
	for(var i = 0; i < 3; i++){//vertical
		for(var j=0; j < 3 ;j++){//horizontal
			//Switch statement??
			if(board[i][j] == undefined){
				filled = false;
			}if(board[i][j] == "X"){
				xs += 1;
			}if(board[i][j] == "O"){
				os += 1;
			}
		}
	}

	////////BEGIN CHECKING////////
	if(filled == true){
		console.log("c");
		for(var m =0;m < 3; m++)//horizontal checking
	{
		if(board[m][0] == board[m][1] && board[m][2] == board[m][0] ){
			if(board[m][0] == "X")
			{
				score += 1;
			}else if(board[m][0] == "O")
			{
				score += -1;
			}
		}
	}

		for(var n=0;n < 3; n++)
		{
			if(board[0][n] == board[1][n] && board[2][n] == board[0][n] ){
				if(board[0][n] == "X"){
					score += 1;
				}
				else if(board[0][n] == "O"){
					score += -1;
				}
			}
		}

		if((board[0][0] == board[1][1] && board[2][2] == board[0][0]) 
			|| (board[2][0] == board[1][1] && board[0][2] == board[1][1]))
		{
			if(board[1][1] == "X"){
				score += 1;
			}else if(board[1][1] == "O")
			{
				score += -1;
			}

		}

		return score;
	}
	////////END CHECKING//////////


	else if(filled == false){
		for(var k = 0; k < 3; k++){
			for(var l = 0; l < 3; l++)
			{
				if(board[k][l] == undefined){
					if(xs > os){
						board[k][l] = "O";
					}else if(xs <= os){
						board[k][l] = "X";
					}
					score += minimax(board);
				}
			}
		}
	}


	return score;
}

console.log(minimax(board));
console.log("ending minimax");

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.get('/', function(req, res){
	res.sendFile(__dirname + "/index.html");
});

app.post('/ajax', function(req, res){
	//minimax(JSON.parse(req.body.b));
	c//onsole.log(req.body.b);
	//res.send();
});


app.listen(8080);