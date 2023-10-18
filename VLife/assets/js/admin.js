// Biểu đồ số lượng đk theo ngày
// Hàm lấy dữ liệu từ sheetdb.io
async function fetchData() {
    const response = await fetch("https://sheetdb.io/api/v1/9w8a8q92av0p5");
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

function getRandomHexColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
  
const getData = async () => {
    const url = 'https://sheetdb.io/api/v1/9w8a8q92av0p5';
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            }
        })
  
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
  
        const data = await response.json()
        return data
    }
    catch (error) {
        console.error("False Get:", error);
    }
}
  
  
  const canvasA = async () => {
    const canvas = document.getElementById('canvas');
  
    const existingChart = Chart.getChart(canvas);
    if (existingChart) {
        existingChart.destroy();
    }
    const labels = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
  
    const year = document.getElementById("yearInput").value;
    const numbersArray = year.split(',');
  
    // const yearInput = document.getElementById("yearInput").value;
  
    getData().then(
        async data => {
            const datasets = []
            numbersArray.forEach(yearInput => {
                const filteredUsers = data.filter(user => parseInt(user.Year) === parseInt(yearInput));
                const userCountByMonthCumulative = Array(12).fill(0);
                
                filteredUsers.forEach(user => {
                    if (user.userName === "admin"){
                        return
                    }

                    const month = user.Month - 1; // Trừ 1 vì mảng bắt đầu từ 0
                    for (let i = month; i < userCountByMonthCumulative.length; i++) {
                        userCountByMonthCumulative[i]++;
                    }
                });
                const color = getRandomHexColor()
  
                const dataTods = {
                    label: 'Người đăng ký năm ' + yearInput,
                    backgroundColor: color,
                    borderColor: color,
                    data: userCountByMonthCumulative,
                    tension: 0.4,
                }
  
                datasets.push(dataTods);
            });
  
  
            const dataToCanvas = {
                labels: labels,
                datasets: datasets
            };
            const configToCanvas = {
                type: 'line',
                data: dataToCanvas,
                options: {
                    scales: {
                        y: {
                            beginAtZero: true, // Đảm bảo bắt đầu từ 0 trên trục y
                        },
                    },
                },
            };
            const chart = new Chart(canvas, configToCanvas);
  
        }).catch(error => {
            console.error("Promise rejected:", error);
        });
  };
  
  const canvasC = async () => {
    const canvas = document.getElementById('canvas2');
    const existingChart = Chart.getChart(canvas);
    if (existingChart) {
        existingChart.destroy();
    }
    getData().then(data => {
        console.log(data)
        const countGender = {}
        data.forEach(user => {
            if (user.userName === "admin"){
                return
            }
            const gender = user.gender
            if (!countGender[gender]) {
                countGender[gender] = 0
            }
            countGender[gender]++;
        })
  
        const percentages = {};
        for (const key in countGender) {
            if (countGender.hasOwnProperty(key)) {
                percentages[key] = ((countGender[key] / data.length) * 100).toFixed(2);
            }
        }
  
        const labels = Object.keys(percentages)
        const values = Object.values(percentages)

        const dataToCanvas = {
            labels: labels,
            datasets: [
                {
                    label: "Giới tính",
                    data: values,
                    backgroundColor: ['blue', 'red']
                }
            ]
        }
  
        const config = {
            type: 'pie',
            data: dataToCanvas,
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
  
        }
        const chart = new Chart(canvas, config)
        console.log("xong")
  
    }).catch(error => {
        console.error("Promise rejected:", error);
    });
  }
  
  const canvasD = () => {
    getData().then(data=>{
        const listAge = {}
        data.forEach(user => {
            if (user.userName === "admin"){
                return
            }
            const currentDate = new Date();
            const currentYear = currentDate.getFullYear();
            const birthdayDate = new Date(user.birthday);
            const UserBirthYear = birthdayDate.getFullYear();
            const ageUser = parseInt(currentYear) - parseInt(UserBirthYear);
            if(!listAge[ageUser]){
                listAge[ageUser] = 0;
            }
            listAge[ageUser]++;
        });
        const labels = Object.keys(listAge);
        const values = Object.values(listAge);

        const dataToCanvas = {
            labels:labels,
            datasets: [
                {
                    label: "Độ tuổi",
                    data: values,
                    borderWidth: 1,
                    backgroundColor: getRandomHexColor()
                }
            ]

        }

        const config = {
            type: 'bar',
            data: dataToCanvas,
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }

        }

        const canvas = document.getElementById("canvas3")
        const chart = new Chart(canvas, config)
    })
}

const myBtn = document.querySelector('#my_btn');
const accountAction = document.querySelector('.account-action');

myBtn.addEventListener('click', () => {
if (accountAction.style.display === 'block') {
    accountAction.style.display = 'none'; // Nếu đang hiển thị, thì ẩn nó
} else {
    accountAction.style.display = 'block'; // Nếu không hiển thị, thì hiển thị nó
}
});

// const quality = document.querySelector("#soluong");
// const chart = document.querySelector(".notification-box");

// quality.addEventListener('click', () => {
//     const barChartContainer = chart.querySelector(".barChart");

//     if(barChartContainer.style.display == 'block'){
//         barChartContainer.style.display = 'none';
//     }
//     else{
//         barChartContainer.style.display = 'block';
//     }
// })

toggleChartDisplay(document.querySelector(".notification-box"))
const canvasYearlements = document.querySelectorAll('.canvasYear');
const barChart = document.querySelectorAll('.barChart');
const canvas2 = document.querySelectorAll('.canvas2');
const canvas3 = document.querySelectorAll('.canvas3');

// Lặp qua mảng các phần tử và ẩn chúng
canvasYearlements.forEach(element => {
    element.style.display = 'none';
});

barChart.forEach(element => {
    element.style.display = 'none';
});

canvas2.forEach(element => {
    element.style.display = 'none';
});

canvas3.forEach(element => {
    element.style.display = 'none';
});

function toggleChartDisplay(chartElement) {
    
    console.log(chartElement.style.display)
    if (chartElement.style.display === 'block') {
        chartElement.style.display = 'none';
    } else {
        chartElement.style.display = 'block';
    }
}

// Event listeners
const quality = document.querySelector("#soluong");
const gender = document.querySelector("#gender");
const ageDistribute = document.querySelector("#ageDistribute");
const numberUser = document.querySelector("#numberUser");

quality.addEventListener('click', () => {
    const barChart = document.querySelector(".barChart");

    if (barChart.style.display === 'block') {
        barChart.style.display = 'none';
    } else {
        barChart.style.display = 'block';
        fetchData().then(data => {
            const dayCounts = calculateData(data);
            createBarChart(dayCounts);
        });
    }
});
gender.addEventListener('click', () => {
    toggleChartDisplay(document.querySelector(".canvas2"));
    canvasC()
});
ageDistribute.addEventListener('click', () => {
    toggleChartDisplay(document.querySelector(".canvas3"))
    canvasD()
});
numberUser.addEventListener('click', () => {
    toggleChartDisplay(document.querySelector(".canvasYear"))
    canvasA()
});

let menuItem = document.querySelectorAll('.menu-item');

menuItem.forEach(item=>{ 
    item.addEventListener('click', ()=>{ 
        removeActive();
        item.classList.add('active');
    })
})
//active class remove
const removeActive = ()=>{
    menuItem.forEach(item=>{
        item.classList.remove('active')
    })
}