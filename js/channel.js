function mainCtrl($scope, $http) {

    $scope.channels = [];
    $http.get('http://temp.orz.hm/yp/index.txt', {})
        .success((data, status, headers, config) => {
            console.log('success');
            let lines = data.split('\n');
            lines.forEach((line) => {
                if (line.length == 0) {
                    return;
                }
                let elements = line.split("<>");
                let channel = {
                    name:elements[0],
                    id:elements[1],
                    tip:elements[2],
                    contactUrl:elements[3],
                    genre:elements[4],
                    details:elements[5]
                        .replace("&lt;", "<")
                        .replace("&gt;", ">"),
                    comments:elements[17],
                    icon:'./img/peca.png'
                };
                $scope.channels.push(channel);
            });
        })
        .error((data, status, headers, config) => {
            console.log('error');
        });

    $scope.play = function (channel) {
        /*
        exec(path + "/実行ファイルまでのパス", ["オプション"],
        　　function(err:any, stdout:any, stderr:any){
        });
        */
        const exec = require('child_process').execFile;
        console.log('play:' + channel.name);

        let streamUrl = 'http://localhost:7146/pls/' + channel.id + '?tip=' + channel.tip + '}';
        console.log(streamUrl);
        if (channel.type == 'FLV') {
            exec('peerstplayer/peerstplayer.exe', [streamUrl, 'FLV', channel.name], (err, stdout, stderr) => console.log('error'));
        } else {
            exec('peerstplayer/peerstplayer.exe', [streamUrl, 'WMV', channel.name], (err, stdout, stderr) => console.log('error'));
        }
    }
}
