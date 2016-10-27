require("./mlayer.less");

;(function (win, doc) {
	let $ = function (s, parent) {
		return (parent || document).querySelectorAll(s);
	}

	let crtEle = function (s) {
		return document.createElement(s);
	}

	let index = 0 ,
		clsName = "layer",
		loop = function () {},
		timer = {};

	function mLayer(opts) {
		this.settings = {
			shadow: true,
			type: 1,
			shadowClose: true, 
			init: loop,
			yes: loop,
			cancel: loop,
			end: loop,
		}
		for (let key in opts) {
			this.settings[key] = opts[key];
		}
		this.render();
	}

	mLayer.prototype.render = function () {
		this.index = index;
		let settings = this.settings;

		// 主体
		let layerBox = this.layerBox = crtEle("div");
		this.id = layerBox.id = clsName + index;
		layerBox.className = clsName + " " + clsName + settings.type;

		// 阴影
		let shadeEle = settings.shadow ? "<div class='" + clsName + "-mask layer-fadeIn'></div>" : "";
		let titleEle = settings.title ? "<div class='" + clsName + "-title" + "'> " + settings.title + " </div>": "";
		let contentEle = this.contentEle = settings.content ? "<div class='layer-content'>" + settings.content + "</div>" : "";

		if (settings.type === 2) {
			let msgEle = "<div class='layer-msg layer-fadeIn'>" + settings.content + "</div>";
			this.layerBox.innerHTML = shadeEle + msgEle;
			this.show();
			return
		}

		if (settings.type === 3) {
			let loadEle = "<div class='layer-loading layer-fadeIn'></div>";
			this.layerBox.innerHTML = shadeEle + loadEle;
			this.show();
			return
		}

		let btnsEle = "";
		if (settings.btns) {
			typeof settings.btns === "string" && (settings.btns = [settings.btns]);
			let btnEle = "<span class='layer-btn layer-btn-yes'>" + settings.btns[0] + "</span>";
			if (settings.btns.length >= 2) {
				btnEle += "<span class='layer-btn layer-btn-no'>" + settings.btns[1] + "</span>";
			}
			btnsEle = "<div class='layer-btns'>" + btnEle + "</div>" 
		}

		layerBox.innerHTML = shadeEle + "<div class='layer-main layer-scaleIn'>" + titleEle + contentEle + btnsEle + "</div>";

		this.show();
	}

	mLayer.prototype.show = function () {
		

		this.settings.init();

		document.body.appendChild(this.layerBox);
		this.ele = $("#" + clsName + index)[0];

		this.action();
	}
	
	mLayer.prototype.action = function () {
		let that = this;
		let settings = this.settings;

		if (settings.time) {
			timer[this.index] = setTimeout(layer.close, settings.time, this);
		}

		this.shadowEle = $(".layer-mask", this.ele)[0];
		this.yesBtn = $(".layer-btn-yes", this.ele)[0];
		this.noBtn = $(".layer-btn-no", this.ele)[0];

		if (settings.shadowClose && this.shadowEle) {
			this.shadowEle.addEventListener("click", function () {
				let cliked  = this.getAttribute('click');

				if (!cliked) {
					settings.cancel(that);
					mlayer.close(that);
				}

				this.setAttribute("click", "clicked")
			});
		}

		if (this.yesBtn) {
			this.yesBtn.addEventListener("click", function (e) {
				let cliked  = this.getAttribute('click');

				if (!cliked) {
					settings.yes(that);
					mlayer.close(that);
				}
				
				this.setAttribute("click", "clicked")
			});
		}
		
		if (this.noBtn) {
			this.noBtn.addEventListener("click", function (e) {
				let cliked  = this.getAttribute('click');

				if (!cliked) {
					settings.cancel(that);
					mlayer.close(that);
				}
				
				this.setAttribute("click", "clicked")
			});
		}
	}

	win.mlayer = {
		open (opts) {
			return new mLayer(opts);
		},
		close (layer) {
			clearTimeout(timer[layer.index]);

			layer.ele.innerHTML = "";
			document.body.removeChild(layer.ele);
			layer.settings.end(layer);
		}
	}
})(window, document);
