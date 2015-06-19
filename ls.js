"use strict";

function LSJS(input) {
    this.input = input || process.argv[2];
    
    this.builtins = Object.create(null);
    this.builtins['+'] = function(x,y) { y = y || 0; return [(+x)+(+y)] };
}

LSJS.prototype.toArray = function() {
    return JSON.parse(this.input.replace(/[()]/g, function(match) {
        return match === '(' ? '[' : ']';
    }).replace(/\s/g, ',').replace(/[^,\[\]]/g, function(match) {
        return '"'+match+'"';
    }));
}
    
LSJS.prototype.parse = function(tokenlist) {
    var act, ctx = [];
    tokenlist.forEach(function(token) {
        if (token in this.builtins) {
            act = this.builtins[token];
        } else {
            if (token.map) {
                ctx.push(this.parse(token));
            } else {
                ctx.push(token);
            };
        } 
    }, this);
    return act.apply(null, ctx)
}

LSJS.prototype.compiled = function() {
    return this.parse(this.toArray(this.input));
}

const lsjs = new LSJS;
console.log(lsjs.compiled());