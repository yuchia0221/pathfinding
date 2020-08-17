// 導覽列的顏色，有很大的bug
var units = "T";
$(".nav-link").mousedown(function () {
    if (units == "F") {
        $(this).css("background-color", "#090d35");
        $(this).css("color", "rgba(255, 255, 255, 0.904)");
        units = "T";
        console.log("yes");
    } else {
        $(this).css("background-color", "#f4bc2b");
        $(this).css("color", "#333");
        units = "F";
        console.log("no");
    }
});
$(".btnColor").mousedown(function () {
    $(".nav-link").css("background-color", "#090d35");
    $(".nav-link").css("color", "rgba(255, 255, 255, 0.904)");
    units = "T";
    console.log("yes");
});

// 按鈕：視覺化時所展示的演算法
// $("#actualStartButton").click(function () {
//     $("this").text("");
// });

// 演算法的速度
$("#speedFast").click(function () {
    $("#adjustspeed").text($(this).text());
});
$("#speedAverage").click(function () {
    $("#adjustspeed").text($(this).text());
});
$("#speedSlow").click(function () {
    $("#adjustspeed").text($(this).text());
});
