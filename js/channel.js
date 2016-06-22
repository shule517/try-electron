var mainCtrl = function($scope, $http) {

/*
  $http.get('/api/channels', {})
    .success(function(data, status, headers, config){
      console.log(status);
      $scope.channels = data;
    })
    .error(function(data, status, headers, config){
      console.log(status);
    });
*/

    $scope.channels = [];

    $http.get('http://temp.orz.hm/yp/index.txt', {})
        .success(function(data, status, headers, config) {
            console.log('success');
            let lines = data.split('\n');
            lines.forEach(function(line){
                if (line.length == 0) {
                    return;
                }
                var elements = line.split("<>");
                var channel = {
                    name:elements[0],
                    id:elements[1],
                    contactUrl:elements[3],
                    genre:elements[4],
                    details:elements[5]
                        .replace("&lt;", "<")
                        .replace("&gt;", ">"),
                    comments:elements[17],
                    icon:''
                };
                $scope.channels.push(channel);
            });
        })
        .error(function(data, status, headers, config) {
            console.log('error');
        });

    $scope.name = 'シュール';
    console.log('test');

    //   $scope.channels = {name:'シュール'};
}
