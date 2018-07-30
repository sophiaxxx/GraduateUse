//express web framework
var express = require('express');
//讀取 posts.json
var fs = require('fs');
var app = express();  
var http = require('http').Server(app);
var path = require('path');
var os = require('os');
var cors = require('cors');
var moment = require('moment');
var io = require('socket.io')(http);

//HTML VIEW
var engine = require('consolidate');
var bodyParser = require('body-parser');
var _users = [
];
var _news = [
];
var _unreturn = [
];

//UDP Socket
var PORT = 3333;
var MULTICAST_ADDR = '224.4.4.4';
var dgram = require('dgram');
var client = dgram.createSocket('udp4');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse application/json

app.use(express.static('web'));
app.use(express.static('public'));

app.use(cors({
	methods: ['GET', 'POST', 'PATCH', 'OPTION', 'DELETE'],
	credentials: true,
	origin: true
}));

app.set('views', __dirname + '/public/web');
app.engine('html', engine.mustache);
app.set('view engine', 'html');


//multicast setting
client.on('listening', function () {
    var address = client.address();
    console.log('UDP Client listening on ' + address.address + ":" + address.port);
});

client.bind(PORT, function () {
    client.addMembership(MULTICAST_ADDR);
});

/**
 * init log file, normal version
 */
if (fs.existsSync('./users.log')) {
	_users = fs.readFileSync('./users.log');
	if (_users == '') {
		initUsers();
	} else {
		_users = JSON.parse(_users);
	}
} else {
	initUsers();
}

// get news data
if (fs.existsSync('./news.log')) {
	_news = fs.readFileSync('./news.log');
	if (_news == '') {
		
	} else {
		_news = JSON.parse(_news);
	}
}
// get news data
if (fs.existsSync('./unreturn.log')) {
	_unreturn = fs.readFileSync('./unreturn.log');
	if (_unreturn == '') {
		
	} else {
		_unreturn = JSON.parse(_unreturn);
	}
}

//multicast 接收到的訊息 傳到 _AddUser
client.on('message', function (message, rinfo) {
    console.log('Message from: ' + rinfo.address + ':' + rinfo.port);
    var usrprofile = message.toString();
	usrReq = usrprofile.split(",");
	_PostUser(usrReq, rinfo);
});

//add user to dataLog
function _PostUser(req, res) {
	console.log(req.toString());
	if (req !== null) {
		var	name = req[0];
		var	age = req[1];
		var	gender = req[2];
		var	isMember = req[3];
		var	hometown = req[4];
		var id = ((new Date()) * Math.random()).toString(16).replace(/\./g, Math.round((Math.random() * 1000)).toString(8));
		var created_at = moment();
		var updated_at = null;
		var index = null;
		var isExit = null;
		for (let i = 0; i < _users.length; i++) {
			//有過記錄到_PatchUpdateTime
			if (_users[i].name == name && _users[i].isMember == isMember)
			{
				_PatchUpdateTime(_users[i]);
				index = i;
				break;
			}
		}
		if(index == null){
			var user = {
				id, 
				name, 
				age, 
				gender, 
				isMember, 
				hometown, 
				created_at,
				updated_at,
				isExit
			};

			_users = [..._users, user];
			writeFile('users', _users);
		}

		_GetUser();
		console.log("_AddUser OK");

	} else {
		console.log("_AddUser Not OK");
	}
}

//Update Time
function _PatchUpdateTime(user){
	var {id, name, age, gender, isMember, 
				hometown, created_at, updated_at, isExit} = user;
	var index = null;

	for (let i = 0; i < _users.length; i++) {
		if (_users[i].id == id) {
			updated_at = moment();
			index = i;
			break;
		}
	}
	if (index !== null) {
		_users[index] = Object.assign({}, _users[index], 
			{name, age, gender, isMember, hometown, created_at, updated_at, isExit});
		writeFile('users', _users);
		
	}
}

//(1)Get user (2)檢視user index 靠前者 &&updateTime 三分鐘以內
app.get('/user', function (req, res) {
	console.log(" Get /User");
	if (_users != '') {
		var getUser;
		for (let i = 0; i < _users.length; i++) {
			if(_users[i].updated_at != null){
				var LastUpdateTime = new Date(_users[i].updated_at);
			    var NowTime = new Date(moment());
			    var diffTime = parseInt(NowTime - LastUpdateTime)/1000/60;

				if (diffTime < 1 && _users[i].isExit != true) {
					getUser = _users[i];
					break;
				}
			}			
		}
		res.json(getUser);
		
	} else {
		res.status(401).json({
			msg: 'no user'
		});
		console.log("Not Get User");
	}
});

//Get School News
app.get('/news', function (req, res) {
	res.json(_news);
});

//Get User Unreturn Book
app.get('/UnReturnBook', function (req, res) {
	res.json(_unreturn);
});

//Update Exit Status
app.patch('/exit/:id', function (req, res) {
	console.log("Start Exit:" + req.params.id);
	var id, name, age, gender, isMember, 
				hometown, created_at, updated_at, isExit;
	var id = req.params.id;
	var index = null;
	for (let i = 0; i < _users.length; i++) {
		if (_users[i].id == id) {
			console.log("Exit 002");
			id = _users[i].id;
			name = _users[i].name;
			age = _users[i].age;
			gender = _users[i].gender;
			isMember = _users[i].isMember;
			hometown = _users[i].hometown;
			created_at = _users[i].created_at;
			updated_at = _users[i].updated_at;
			isExit = true;
			index = i;
			break;
		}
	}
	if (index !== null) {
		_users[index] = Object.assign({}, _users[index], 
		{name, age, gender, isMember, hometown, created_at, updated_at, isExit});
	writeFile('users', _users);
	res.json(_users[index]);
	console.log("Exit Success");
	}
});

function writeFile(fileName, content) {
	fs.writeFile(`./${fileName}.log`, JSON.stringify(content), function (err) {
		if (err) {
			console.error(err);
			return;
		}
	});
}


app.get('/UserFiles', function (req, res) {
   fs.readFile( __dirname + "/" + "users.log", 'utf8', function (err, data) {
       console.log( data );
       res.end( data );
   });
})

function initUsers() {
	_users = [];
	
	writeFile('users', _users);
}

// WebSocket Start
io.on('connection', function(socket) {
    console.log('A new WebSocket connection has been established');
});

function _GetUser() {
	var stockprice = Math.floor(Math.random() * 1000);
  	io.emit('Update User', stockprice);
}

//網頁主進入點
app.get('/', function(req, res){
  res.render('index.html');
});


http.listen(3000);
console.log('app is listening at localhost:3000...');