var api = "http://localhost:3000/Camera/"

app.controller("listCtrl", function ($scope, $http) {
    $scope.listCam = []

    $http.get(api).then(function (res) {
        $scope.listCam = res.data
        console.log($scope.listCam);

    }, function () {
        alert("lỗi dưcx lieu")
    })

    $scope.deleteSp = function (id) {
        let msg = window.confirm("co chac chan xoa kh")
        if (msg) {
            $http.delete(api + id).then(function (res) {
                alert('xoa thanh cong')
                $scope.listCam = res.data
            }, function () {
                alert('xoa that bai')
            })
        }
    }
})


//add 
app.controller("addCtrl", function ($scope, $http) {
    $scope.addSp = function () {
        const fields = {
            tenMay: "Tên máy",
            viTriLap: "Vị trí lắp",
            nguoiLap: "Người lắp",
            gia: "Giá",
            trangThai: "Trạng thái"
        };

        $scope.errors = {};

        let isValid = true;

        // Validate fields
        for (let key in fields) {
            if (!$scope[key]) {
                $scope.errors[key] = fields[key] + " không được để trống";
                isValid = false;
            }
        }

        // Validate price separately
        if ($scope.gia && (isNaN($scope.gia) || $scope.gia <= 0)) {
            $scope.errors.gia = "Giá phải là một số dương hợp lệ";
            isValid = false;
        }

        if (!isValid) {
            return;
        }

        const cameraData = {
            tenMay: $scope.tenMay,
            gia: $scope.gia,
            viTriLap: $scope.viTriLap,
            nguoiLap: $scope.nguoiLap,
            trangThai: $scope.trangThai,
        };

        $http.post(api, cameraData)
            .then(function (res) {
                alert("Thêm thành công");
                document.location = "#!list-camera";
            })
            .catch(function () {
                alert("Thêm thất bại");
            });
    };
});


//detail

app.controller("detailCtrl",function($scope,$http,$routeParams){
    $scope.Objcam={}
    $http.get(api+$routeParams.id).then(function(res){
        $scope.Objcam=res.data
        console.log($scope.Objcam);
        
    },function(){
        alert('lỗi du lieu')
    })
})
