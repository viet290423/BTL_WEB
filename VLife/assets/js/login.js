document.addEventListener("DOMContentLoaded", function () {
  const signUpForm = document.querySelector('.form-container.sign-up-container form');

  signUpForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Lấy giá trị từ các trường nhập liệu
    const name = signUpForm.querySelector('input[name="name"]').value;
    const email = signUpForm.querySelector('input[name="email"]').value;
    const password = signUpForm.querySelector('input[name="password"]').value;
    const gender = document.getElementById("gender").value;
    const birthday = signUpForm.querySelector('input[name="birthday"]').value;

    // Lấy ngày hôm nay
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1; // Tháng trong JavaScript bắt đầu từ 0
    const year = today.getFullYear();

    // Tạo dữ liệu JSON từ giá trị
    const data = {
      Name: name,
      Email: email,
      Password: password,
      Day: day,
      Month: month,
      Year: year,
      birthday: birthday,
      gender: gender
    };

    // Thực hiện yêu cầu POST tới sheetdb.io
    fetch("https://sheetdb.io/api/v1/hlp3n9hzuwey4", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(data => {
        // Xử lý kết quả sau khi gửi dữ liệu
        console.log("Dữ liệu đã được gửi thành công:", data);
        // Thêm thông báo "thành công"
        alert("Đăng ký thành công!");
        // Làm mới các trường nhập liệu
        signUpForm.reset();
      })
      .catch(error => {
        console.error("Lỗi khi gửi dữ liệu:", error);
        // Xử lý lỗi nếu cần
      });
  });
});
 // logn in
 document.addEventListener("DOMContentLoaded", function () {
    const signInButton = document.getElementById('signInButton');

    signInButton.addEventListener('click', function (e) {
        e.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        if (email === "admin@gmail.com" && password === "admin") {
          window.location.href = "admin.html";
      } else{

        fetch("https://sheetdb.io/api/v1/hlp3n9hzuwey4")
            .then(response => response.json())
            .then(data => {
                const user = data.find(entry => entry.Email === email && entry.Password === password);
                if (user) {
                    window.location.href = "home.html";
                } else {
                    alert("Thông tin đăng nhập không hợp lệ. Vui lòng thử lại.");
                }
            })
            .catch(error => {
                console.error("Lỗi khi kiểm tra đăng nhập:", error);
            });
      }

    });
});