// Biểu đồ số lượng đk theo ngày
// Hàm lấy dữ liệu từ sheetdb.io
async function fetchData() {
    const response = await fetch("https://sheetdb.io/api/v1/26iu7y7qm5xq4");
    const data = await response.json();
    return data;
}

// Hàm tính tổng số dữ liệu day trong 31 ngày
function calculateData(data) {
    const dayCounts = Array(31).fill(0); // Mảng 31 phần tử ban đầu là 0

    data.forEach(item => {
        const day = item.Day;
        if (day >= 1 && day <= 31) {
            dayCounts[day - 1]++; // Tăng giá trị tương ứng trong mảng
        }
    });

    return dayCounts;
}

// Hàm tạo biểu đồ cột
function createBarChart(dayCounts) {
    const ctx = document.getElementById('barChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Array.from({ length: 31 }, (_, i) => i + 1), // Labels từ 1 đến 31
            datasets: [{
                label: 'Số lượng dữ liệu',
                data: dayCounts,
                backgroundColor: 'rgba(255, 255, 255, 0.2)', // Màu trắng
                borderColor: 'rgba(0, 128, 0, 1)', // Màu xanh lá cây
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Chạy hàm lấy dữ liệu, tính toán và tạo biểu đồ cột
fetchData().then(data => {
    const dayCounts = calculateData(data);
    createBarChart(dayCounts);
});

const myBtn = document.querySelector('#my_btn');
const accountAction = document.querySelector('.account-action');

myBtn.addEventListener('click', () => {
if (accountAction.style.display === 'block') {
    accountAction.style.display = 'none'; // Nếu đang hiển thị, thì ẩn nó
} else {
    accountAction.style.display = 'block'; // Nếu không hiển thị, thì hiển thị nó
}
});
const quality = document.querySelector("#soluong");
const chart = document.querySelector(".notification-box");

quality.addEventListener('click', () => {
    if(chart.style.display == 'block'){
        chart.style.display = 'none';
    }
    else{
        chart.style.display = 'block';
    }
})