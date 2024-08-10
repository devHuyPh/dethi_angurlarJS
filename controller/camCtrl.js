var api = "http://localhost:3000/Camera/";

function validateFields(fields, obj) {
    let errors = {};
    let isValid = true;

    for (let key in fields) {
        if (!obj[key]) {
            errors[key] = fields[key] + " không được để trống";
            isValid = false;
        }
    }

    if (obj.gia && (isNaN(obj.gia) || obj.gia <= 0)) {
        errors.gia = "Giá phải là một số dương hợp lệ";
        isValid = false;
    }

    return { isValid, errors };
}

// Controller listCtrl
app.controller("listCtrl", function ($scope, $http) {
    $scope.listCam = [];

    $http.get(api).then(function (res) {
        $scope.listCam = res.data;
        console.log($scope.listCam);
    }, function () {
        alert("Lỗi dữ liệu");
    });

    $scope.deleteSp = function (id) {
        let msg = window.confirm("Có chắc chắn xóa không?");
        if (msg) {
            $http.delete(api + id).then(function () {
                alert('Xóa thành công');
                // Xóa camera khỏi danh sách hiện tại
                $scope.listCam = $scope.listCam.filter(cam => cam.id !== id);
            }, function () {
                alert('Xóa thất bại');
            });
        }
    };
});

// Controller addCtrl
app.controller("addCtrl", function ($scope, $http) {
    $scope.addSp = function () {
        const fields = {
            tenMay: "Tên máy",
            viTriLap: "Vị trí lắp",
            nguoiLap: "Người lắp",
            gia: "Giá",
            trangThai: "Trạng thái"
        };
        

        const validation = validateFields(fields, $scope);
        $scope.errors = validation.errors;

        if (!validation.isValid) {
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
            .then(function () {
                alert("Thêm thành công");
                document.location = "#!list-camera";
            })
            .catch(function () {
                alert("Thêm thất bại");
            });
    };
});

// Controller detailCtrl
app.controller("detailCtrl", function ($scope, $http, $routeParams) {
    $scope.Objcam = {};

    $http.get(api + $routeParams.id).then(function (res) {
        $scope.Objcam = res.data;
        console.log($scope.Objcam);
    }, function () {
        alert("Lỗi dữ liệu");
    });
});

// Controller editCtrl
app.controller("editCtrl", function ($scope, $http, $routeParams) {
    $http.get(api + $routeParams.id)
        .then(function (res) {
            $scope.Objcam = res.data;
        })
        .catch(function () {
            alert("Không thể tải dữ liệu sản phẩm.");
        });

    $scope.editSp = function () {
        const fields = {
            tenMay: "Tên máy",
            viTriLap: "Vị trí lắp",
            nguoiLap: "Người lắp",
            gia: "Giá",
            trangThai: "Trạng thái"
        };

        const validation = validateFields(fields, $scope.Objcam);
        $scope.errors = validation.errors;

        if (!validation.isValid) {
            return;
        }

        $http.put(api + $routeParams.id, $scope.Objcam)
            .then(function () {
                alert("Cập nhật thành công");
                document.location = "#!list-camera";
            })
            .catch(function () {
                alert("Cập nhật thất bại");
            });
    };
});
