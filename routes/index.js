exports.index = function(req, res){
    res.sendfile(__dirname + '/../views/index.html');
}

exports.teis = function(req, res){
    res.send('Hello Teis');
}