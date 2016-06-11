var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var url = require('url');
var app = express();

//console.log("commencing minimax");
//var bord = [["X","X","O"],["O","X","O"],["","","X"]];

function minimax(board, rdepth){
	//console.log("called");
	var rdepth = typeof rdepth !== 'undefined' ?  rdepth : 1;
	var filled = true; 
	var score = 0;
	var xs = 0;
	var os = 0;
	for(var i = 0; i < 3; i++){//vertical
		for(var j=0; j < 3 ;j++){//horizontal
			//Switch statement??
			if(board[i][j] == ""){
				filled = false;
			}if(board[i][j] == "X"){
				xs += 1;
			}if(board[i][j] == "O"){
				os += 1;
			}
		}
	}
	//console.log(filled);
	////////BEGIN CHECKING////////
	if(filled == true){
		for(var m =0;m < 3; m++)//horizontal checking
	{
		if(board[m][0] == board[m][1] && board[m][2] == board[m][0] ){
			//console.log("horizontal");
			if(board[m][0] == "X")
			{
				score += 1/rdepth;
				return score;
			}else if(board[m][0] == "O")
			{
				score += -1/rdepth;
				return score;
			}
		}
	}

		for(var n=0;n < 3; n++)
		{
			if(board[0][n] == board[1][n] && board[2][n] == board[0][n] ){
				//console.log("vertical");
				if(board[0][n] == "X"){
					score += 1/rdepth;
					return score;
				}
				else if(board[0][n] == "O"){
					score += -1/rdepth;
					return score;
				}
			}
		}

		if((board[0][0] == board[1][1] && board[2][2] == board[0][0]) 
			|| (board[2][0] == board[1][1] && board[0][2] == board[1][1]))
		{
			//console.log("diag");
			if(board[1][1] == "X"){
				score += 1/rdepth;
				return score;
			}else if(board[1][1] == "O")
			{
				score += -1/rdepth;
				return score;
			}

		}
		//console.log(board);
		return score;
	}
	////////END CHECKING//////////


	else if(filled == false){
		//console.log(board);
		for(var k = 0; k < 3; k++){
			
			for(var l = 0; l < 3; l++)
			{
				var tmp = JSON.parse(JSON.stringify(board));
				var dep = xs + os;
				
				if(board[k][l] == ""){
					if(xs > os){
						tmp[k][l] = "O";
					}else if(xs <= os){
						tmp[k][l] = "X";
					}
					if(dep == 1){
					//console.log("k:"+ k +" l:"+l + "\t" + tmp +"\t"+ board);	
					}
					
					score += minimax(tmp, rdepth + 1);
				}
			}
		}
		return score;
	}
}

function move(board){
	var pts = 0;
	var bmove =[50,50];
	for(var i = 0; i < 3; i++)
	{
		for(var j = 0; j< 3; j++)
		{
			console.log("row: " + i + "col" + j);
			if(board[i][j] == "")
			{
				var tmp = JSON.parse(JSON.stringify(board));
				tmp[i][j] = "X";
				var tpts = minimax(tmp);
				if(tpts > pts)
				{
					pts = tpts;
					bmove = [i, j, pts];
				}

			}
		}
	}
	console.log(pts);
	return bmove;

}

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.get('/', function(req, res){
	res.sendFile(__dirname + "/index.html");
});

app.post('/ajax', function(req, res){
	console.log(req.body.b);
	var mv = move(JSON.parse(req.body.b));
	res.send(mv);
});

app.listen(8080);