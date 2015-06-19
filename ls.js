"use strict";

var builtins = Object.create(null);
builtins['+'] = function(x,y) { y = y || 0; return [(+x)+(+y)] };

var tokens = JSON.parse(process.argv[2].replace(/[()]/g, function(match) {
    return match === '(' ? '[' : ']';
}).replace(/\s/g, ',').replace(/[^,\[\]]/g, function(match) {
    return '"'+match+'"';
}));


function parse(tokens) {
    var act, ctx = [];
    tokens.forEach(function(token) {
        if (token in builtins) {
            act = builtins[token];
        } else {
            if (token.map) {
                ctx.push(parse(token));
            } else {
                ctx.push(token);
            };
        } 
    });
    return act.apply(null, ctx)
}


console.log(parse(tokens));