//author:eric
//webff666@163.com
var destroy = {
	state: 0, //游戏状态
	timer: null, //游戏引擎，主定时器
	level: 1, //等级
	sc: 0, //积分
	many: 0, //消除的个数
	MANYS: 20, //升级需要消除的个数
	interval: 500, //红色生成的速度
	LINTERVAL: 50, //红色生成速度加快
	MIN: 100, //生成红色的最快速度
	READY: 0, //就绪状态
	RUNNING: 1, //正在游戏中
	PAUSE: 2, //暂停状态
	GAMEOVER: 3, //游戏结束
	//就绪状态
	ready: function() {
		this.state = this.READY; //就绪状态
		this.sc = 0; //游戏初始化
		this.many = 0; //游戏初始化
		this.level = 1; //游戏初始化
		this.interval = 500; //游戏初始化
		esc.style.color = '#00ffff';
		go.innerHTML = 'ready';
		go.style.background = '#f7f7f7';
		go.style.display = 'block';
		go.onclick = function() {
			go.innerHTML = ' ';
			go.style.display = 'none';
			destroy.start();
			destroy.playAudio();
		}
		score.innerHTML = 'SCORE:' + this.sc;
		level.innerHTML = 'LEVEL:' + this.level;
	},
	//游戏进行中
	start: function() {
		this.state = this.RUNNING;
		var ds = document.getElementById("key").querySelectorAll('div');
		var ds_len = ds.length;
		this.timer = setInterval(function() {
			var white = document.querySelectorAll("div.white");
			var tmp = white.length;
			var n = parseInt(Math.random() * tmp);
			var red = document.querySelectorAll("div.red");
			var red_len = red.length;
			if(tmp > 0) {
				white[n].className = "red";
			}
			if(red_len == ds_len) {
				destroy.gameOver();
			}
			for(var r = 0; r < ds.length; r++) {
				ds[r].style.transform = '';
			}
		}, this.interval);
		esc.onclick = function() {
			destroy.pause();
			destroy.playAudio();
		}
		document.onkeydown = function(e) {
			switch(e.keyCode) {
				case 27:
					esc.style.color = '#f00';
					destroy.pause();
					destroy.playAudio();
					break;
				case 219:
					if(ds[10].className != 'white') {
						ds[10].className = 'white';
						ds[10].style.transform = 'rotate(30deg)';
						destroy.createLevel();
						destroy.playAudio();
					}
					break;
				case 221:
					if(ds[11].className != 'white') {
						ds[11].className = 'white';
						ds[11].style.transform = 'rotate(30deg)';
						destroy.createLevel();
						destroy.playAudio();
					}
					break;
				case 186:
					if(ds[21].className != 'white') {
						ds[21].className = 'white';
						ds[21].style.transform = 'rotate(30deg)';
						destroy.createLevel();
						destroy.playAudio();
					}
					break;
				case 222:
					if(ds[22].className != 'white') {
						ds[22].className = 'white';
						ds[22].style.transform = 'rotate(30deg)';
						destroy.createLevel();
						destroy.playAudio();
					}
					break;
				case 188:
					if(ds[30].className != 'white') {
						ds[30].className = 'white';
						ds[30].style.transform = 'rotate(30deg)';
						destroy.createLevel();
						destroy.playAudio();
					}
					break;
				case 190:
					if(ds[31].className != 'white') {
						ds[31].className = 'white';
						ds[31].style.transform = 'rotate(30deg)';
						destroy.createLevel();
						destroy.playAudio();
					}
					break;
				case 191:
					if(ds[32].className != 'white') {
						ds[32].className = 'white';
						ds[32].style.transform = 'rotate(30deg)';
						destroy.createLevel();
						destroy.playAudio();
					}
					break;
	
			}
			for(var i = 0; i < ds.length; i++) {
				if(String.fromCharCode(e.which).toLowerCase() == ds[i].innerHTML) {
					if(ds[i].className != 'white') {
						ds[i].className = 'white';
						ds[i].style.transform = 'scale(1.8)';
						destroy.createLevel();
						destroy.playAudio();
					}
				}
			}
			var num = e.keyCode; //检测
			var en = String.fromCharCode(e.which); //检测
			console.log(num); //检测
			console.log(String(en)); //检测
		}
	
	},
	//暂停状态
	pause: function() {
		this.state = this.PAUSE; //暂停状态
		go.innerHTML = 'psuse';
		go.style.opacity = 0.5;
		go.style.display = 'block';
		go.style.background = '#fff';
		clearInterval(this.timer);
		document.onkeydown = function(e) {
			switch(e.keyCode) {
				case 27:
					esc.style.color = '#00ffff';
					go.style.display = 'none';
					destroy.start();
					destroy.playAudio();
			}
		}
	},
	//游戏结束
	gameOver: function() {
		this.state = this.GAMEOVER;
		clearInterval(this.timer);
		go.style.opacity = 1;
		go.innerHTML = ' ';
		go.style.display = 'block';
		go.style.background = 'url(img/game-over.png) no-repeat 136px 0';
		this.sc = 0; //游戏初始化
		this.level = 1; //游戏初始化
		this.interval = 500; //游戏初始化
		this.many = 0; //游戏初始化
		document.onkeydown = function(e) {
			switch(e.keyCode) {
				case 83:
					go.style.display = 'none';
					var ds = document.getElementById("key").querySelectorAll('div');
					for(var i = 0; i < ds.length; i++) {
						ds[i].className = 'white';
					}
					score.innerHTML = 'SCORE:' + 0;
					level.innerHTML = 'LEVEL:' + 1;
					destroy.start();
					destroy.playAudio();
			}
		}
	},
	//等级得分机制
	createLevel: function() {
		this.sc += 5;
		this.many++;
		if(this.many == this.MANYS) {
			this.many = 0;
			this.level++;
			if(this.interval >= this.MIN) {
				this.interval -= this.LINTERVAL;
				clearInterval(this.timer); //清除定时器
				destroy.start(); //重新启动定时器
			}
	
		}
		score.innerHTML = 'SCORE:' + this.sc;
		level.innerHTML = 'LEVEL:' + this.level;
		if(this.level >= 10) {
			level.innerHTML = '您已打破世界纪录';
		}
	},
	//音频
	playAudio: function() {
		aud1.pause();
		aud1.load();
		aud1.play();
	},
}
//运行
window.onload = function() {
	destroy.ready();
}
  //动画特效
  var canvas,
  	ctx,
  	width,
  	height,
  	size,
  	lines,
  	tick;

  function line() {
  	this.path = [];
  	this.speed = rand(10, 20);
  	this.count = randInt(10, 30);
  	this.x = width / 2, +1;
  	this.y = height / 2 + 1;
  	this.target = {
  		x: width / 2,
  		y: height / 2
  	};
  	this.dist = 0;
  	this.angle = 0;
  	this.hue = tick / 5;
  	this.life = 1;
  	this.updateAngle();
  	this.updateDist();
  }

  line.prototype.step = function(i) {
  	this.x += Math.cos(this.angle) * this.speed;
  	this.y += Math.sin(this.angle) * this.speed;

  	this.updateDist();

  	if(this.dist < this.speed) {
  		this.x = this.target.x;
  		this.y = this.target.y;
  		this.changeTarget();
  	}

  	this.path.push({
  		x: this.x,
  		y: this.y
  	});
  	if(this.path.length > this.count) {
  		this.path.shift();
  	}

  	this.life -= 0.001;

  	if(this.life <= 0) {
  		this.path = null;
  		lines.splice(i, 1);
  	}
  };

  line.prototype.updateDist = function() {
  	var dx = this.target.x - this.x,
  		dy = this.target.y - this.y;
  	this.dist = Math.sqrt(dx * dx + dy * dy);
  }

  line.prototype.updateAngle = function() {
  	var dx = this.target.x - this.x,
  		dy = this.target.y - this.y;
  	this.angle = Math.atan2(dy, dx);
  }

  line.prototype.changeTarget = function() {
  	var randStart = randInt(0, 3);
  	switch(randStart) {
  		case 0: // up
  			this.target.y = this.y - size;
  			break;
  		case 1: // right
  			this.target.x = this.x + size;
  			break;
  		case 2: // down
  			this.target.y = this.y + size;
  			break;
  		case 3: // left
  			this.target.x = this.x - size;
  	}
  	this.updateAngle();
  };

  line.prototype.draw = function(i) {
  	ctx.beginPath();
  	var rando = rand(0, 10);
  	for(var j = 0, length = this.path.length; j < length; j++) {
  		ctx[(j === 0) ? 'moveTo' : 'lineTo'](this.path[j].x + rand(-rando, rando), this.path[j].y + rand(-rando, rando));
  	}
  	ctx.strokeStyle = 'hsla(' + rand(this.hue, this.hue + 30) + ', 80%, 55%, ' + (this.life / 3) + ')';
  	ctx.lineWidth = rand(0.1, 2);
  	ctx.stroke();
  };

  function rand(min, max) {
  	return Math.random() * (max - min) + min;
  }

  function randInt(min, max) {
  	return Math.floor(min + Math.random() * (max - min + 1));
  };

  function init() {
  	canvas = document.getElementById('canvas');
  	ctx = canvas.getContext('2d');
  	size = 30;
  	lines = [];
  	reset();
  	loop();
  }

  function reset() {
  	width = Math.ceil(window.innerWidth / 2) * 2;
  	height = Math.ceil(window.innerHeight / 2) * 2;
  	tick = 0;

  	lines.length = 0;
  	canvas.width = width;
  	canvas.height = height;
  }

  function create() {
  	if(tick % 10 === 0) {
  		lines.push(new line());
  	}
  }

  function step() {
  	var i = lines.length;
  	while(i--) {
  		lines[i].step(i);
  	}
  }

  function clear() {
  	ctx.globalCompositeOperation = 'destination-out';
  	ctx.fillStyle = 'hsla(0, 0%, 0%, 0.1';
  	ctx.fillRect(0, 0, width, height);
  	ctx.globalCompositeOperation = 'lighter';
  }

  function draw() {
  	ctx.save();
  	ctx.translate(width / 2, height / 2);
  	ctx.rotate(tick * 0.001);
  	var scale = 0.8 + Math.cos(tick * 0.02) * 0.2;
  	ctx.scale(scale, scale);
  	ctx.translate(-width / 2, -height / 2);
  	var i = lines.length;
  	while(i--) {
  		lines[i].draw(i);
  	}
  	ctx.restore();
  }

  function loop() {
  	requestAnimationFrame(loop);
  	create();
  	step();
  	clear();
  	draw();
  	tick++;
  }

  function onresize() {
  	reset();
  }

  window.addEventListener('resize', onresize);

  init();