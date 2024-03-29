"use strict";
var Player = /** @class */ (function () {
    function Player(config) {
        this.initEnd = false;
        var default_config = {
            name: "No Name",
            duration: 1000,
            delay: 100,
            engine: "dot" /* dot */,
            log: false
        }; //@ts-ignore
        this.config = Object.assign(default_config, config);
        this.frames = [];
        this.playing = false;
        this.at = 0;
    }
    /** push frame */
    Player.prototype.push = function (frame) {
        this.frames.push(frame);
    };
    /** get frame */
    Player.prototype.get = function (idx) {
        return this.frames[idx];
    };
    /** dump data */
    Player.prototype.dump = function () {
        return JSON.stringify({
            config: this.config,
            frames: this.frames
        });
    };
    Player.prototype.dumpFile = function (name) {
        if (name === void 0) { name = "dump.json"; }
        if (typeof window == 'undefined') {
            var fs = require("fs");
            fs.writeFileSync(name, this.dump(), { encoding: 'utf-8' });
        }
    };
    /** load data */
    Player.prototype.load = function (dump) {
        if (typeof dump == "string")
            dump = JSON.parse(dump);
        Object.assign(this, dump);
    };
    /** 初始化 */
    Player.prototype.init = function (callback) {
        var self = this;
        this.graphviz = d3.select("#graph").graphviz()
            .transition(function () {
            return d3.transition("main")
                .ease(d3.easeLinear)
                .delay(self.config.delay || 100)
                .duration(self.config.duration || 1000);
        })
            .logEvents(self.config.log || false)
            .engine(this.config.engine)
            .on("initEnd", function () {
            console.log("initEnd");
            self.initEnd = true;
            if (callback)
                callback();
        });
    };
    Player.prototype.play_frame_at = function (idx) {
        this.playing = true;
        var self = this;
        this.graphviz.renderDot(this.frames[idx].dot_src).on('end', function () { self.playing = false, self.at = idx; });
    };
    Player.prototype.auto_player = function () {
        var length = this.frames.length;
        var self = this;
        var dot = this.frames[self.at].dot_src;
        self.graphviz.renderDot(dot)
            .on('end', function () {
            self.at = (self.at + 1) % length;
            if (self.at == 0)
                return;
            self.auto_player();
        });
    };
    return Player;
}());
function __export(name, O) {
    if (typeof window != 'undefined') {
        window[name] = O;
    }
    else
        exports[name] = O;
}
__export('Player', Player);
