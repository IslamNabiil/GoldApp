
// let avWeight = document.getElementById("totalWeight");
let date = document.getElementById("date");
let type = document.getElementById("type");
let kind = document.getElementById("kind");
let weight = document.getElementById("weight");
let price = document.getElementById("price");
let totalCost = document.getElementById('totalCost')
let paied = document.getElementById("paied");
let expensess = document.getElementById('expensess')
let health = document.getElementById("health");
let notes = document.getElementById('notes')
let submit = document.getElementById('submit')

function getTotal(){        //to get the total cost of the piece
    if(price != '' && weight != ''){
        let result = Math.round((+weight.value) * (+price.value))
        totalCost.innerHTML = result
        totalCost.style.backgroundColor ='green'
    }
}
function total(){           //to get the total paied
    if(paied != ''){
        let res = Math.round(+paied.value - totalCost.innerHTML)
        expensess.innerHTML = res
        expensess.style.backgroundColor ='green'
    }
}
function available(){       //to calc the available weight

}


let dataPro;
if(localStorage.product != null){
    dataPro = JSON.parse(localStorage.product)
}else{
    dataPro = [];
}

//collect the values
submit.onclick = function () {
    // التأكد من أن جميع الحقول المجبورة مليئة
    if (date.value === '' || type.value === '' || kind.value === '' || weight.value === '' || price.value === '' || paied.value === '') {
        alert("يرجى ملء جميع الحقول المطلوبة!");
        return;  // إذا كان هناك حقل فارغ، يتوقف الكود هنا ولا يضيف البيانات
    }

    // إذا كانت الحقول المجبورة مليئة، نقوم بجمع البيانات
    let newPro = {
        date: date.value,
        type: type.value,
        kind: kind.value,
        weight: weight.value,
        price: price.value,
        totalCost: totalCost.innerHTML,
        paied: paied.value,
        expensess: expensess.innerHTML,
        health: health.value,
        notes: notes.value,
    }

    // إضافة البيانات الجديدة إلى الـ dataPro
    dataPro.push(newPro);
    localStorage.setItem('product', JSON.stringify(dataPro));

    // عرض البيانات في الجدول
    showData();

    // مسح البيانات بعد الإرسال
    clear();

    // تحديث الوزن المتاح
    avWeight();
}


//clear data
function clear(){
    date.value = '';
    type.value = '';
    kind.value = '';
    weight.value = '';
    price.value = '';
    totalCost.innerHTML = '';
    paied.value = '';
    expensess.innerHTML = '';
    health.value = '';
    notes.value = '';
}
clear()

//show data
function showData(){
    let table = '';
    for(let i = 0 ; i < dataPro.length ; i++){
        table += `
            <tr>
                <td>${i+1}</td>
                <td>${dataPro[i].date}</td>
                <td>${dataPro[i].type}</td>
                <td>${dataPro[i].kind}</td>
                <td>${dataPro[i].weight}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].totalCost}</td>
                <td>${dataPro[i].expensess}</td>
                <td>${dataPro[i].paied}</td>
                <td>${dataPro[i].health}</td>
                <td>${dataPro[i].notes}</td>
                <td><button class="btn btn-warning" onclick="editData(${i})"><i class="fa-duotone fa-light fa-pen-to-square"></i></button></td>
                <td><button class="btn btn-danger" onclick="deleteData(${i})"><i class="fa-duotone fa-light fa-trash"></i></button></td>
            </tr>
        `
    } 
    document.getElementById('tbody').innerHTML = table;
}
showData()

//delete data
function deleteData(index) {
    // عرض نافذة تأكيد للمستخدم
    const confirmDelete = confirm("هل أنت متأكد أنك تريد مسح هذه البيانات؟");
    
    if (confirmDelete) {
        // إذا وافق المستخدم على الحذف، يتم مسح البيانات
        dataPro.splice(index, 1);
        localStorage.setItem('product', JSON.stringify(dataPro));
        showData();
        avWeight();
    }
}

// Edit data
function editData(index) {
    // عرض البيانات الحالية في الحقول
    date.value = dataPro[index].date;
    type.value = dataPro[index].type;
    kind.value = dataPro[index].kind;
    weight.value = dataPro[index].weight;
    price.value = dataPro[index].price;
    totalCost.innerHTML = dataPro[index].totalCost;
    paied.value = dataPro[index].paied;
    expensess.innerHTML = dataPro[index].expensess;
    health.value = dataPro[index].health;
    notes.value = dataPro[index].notes;

    // عند حفظ البيانات المعدلة، استبدال البيانات القديمة بالمعدلة في نفس المكان
    submit.onclick = function () {
        // التأكد من أن جميع الحقول المجبورة مليئة
        if (date.value === '' || type.value === '' || kind.value === '' || weight.value === '' || price.value === '' || paied.value === '') {
            alert("يرجى ملء جميع الحقول المطلوبة!");
            return;
        }

        // تحديث العنصر المحدد في الـ dataPro
        dataPro[index] = {
            date: date.value,
            type: type.value,
            kind: kind.value,
            weight: weight.value,
            price: price.value,
            totalCost: totalCost.innerHTML,
            paied: paied.value,
            expensess: expensess.innerHTML,
            health: health.value,
            notes: notes.value,
        };

        // تحديث البيانات في localStorage
        localStorage.setItem('product', JSON.stringify(dataPro));

        // عرض البيانات في الجدول
        showData();

        // مسح البيانات بعد الإرسال
        clear();

        // تحديث الوزن المتاح
        avWeight();
    };
}




function avWeight() {
    let newDataProP = [];
    let newDataProM = [];
    let totalWeight = 0;

    // جمع الأوزان الخاصة بالمشتريات
    for (let i = 0; i < dataPro.length; i++) {
        if (dataPro[i].type == "شراء") {
            newDataProP.push(dataPro[i].weight);
        }
        if (dataPro[i].type == "بيع") {
            newDataProM.push(dataPro[i].weight);
        }
    }

    // حساب الوزن المتاح إذا كان يوجد بيع وشراء
    if (newDataProP.length > 0 || newDataProM.length > 0) {
        let x = newDataProP.reduce((a, b) => +a + +b, 0);
        let z = newDataProM.reduce((a, b) => +a + +b, 0);
        totalWeight = (x - z).toFixed(2) + " جرام";
    } else {
        totalWeight = "لا توجد بيانات بيع أو شراء";
    }

    // عرض الوزن المتاح
    document.getElementById("totalWeight").innerHTML = totalWeight;
}

avWeight()



// Backup Functionality
document.getElementById("backup").addEventListener("click", () => {
    const data = localStorage.getItem("product");
    if (!data) {
        alert("No data found to backup!");
        return;
    }
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    const date = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
    a.download = `backup_${date}.json`;
    a.click();
    URL.revokeObjectURL(url);
    alert("Backup created successfully!");
});


// Restore Functionality
document.getElementById("restore").addEventListener("click", () => {
    // إنشاء عنصر لاختيار الملف
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "application/json";

    input.onchange = (event) => {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = (e) => {
                try {
                    // قراءة البيانات من الملف
                    const data = JSON.parse(e.target.result);

                    // ** التحقق من أن البيانات ليست فارغة أو تالفة **
                    if (!data || !Array.isArray(data) || data.length === 0) {
                        alert("ملف النسخ الاحتياطي فارغ أو غير صالح!");
                        return;
                    }

                    // حفظ البيانات في Local Storage حتى لو كانت فارغة سابقًا
                    localStorage.setItem("product", JSON.stringify(data));
                    alert("تمت استعادة البيانات بنجاح!");

                    // تحديث البيانات في البرنامج وعرضها
                    dataPro = data; // تحديث المتغير المسؤول عن البيانات
                    showData(); // عرض البيانات في الجدول

                    // تحديث الصفحة بعد ثانية لضمان تحميل البيانات الجديدة
                    setTimeout(() => location.reload(), 1000);

                } catch (error) {
                    alert("خطأ في قراءة الملف! تأكد أنه ملف JSON صالح.");
                }
            };

            reader.readAsText(file);
        } else {
            alert("لم يتم اختيار أي ملف!");
        }
    };

    input.click();
});


// دالة لحساب سعر الذهب بناءً على إجمالي الوزن المتاح
async function getGoldPrice() {
    const apiKey = 'goldapi-k2derlpzb7zo5-io'; // مفتاح الـ API
    const url = `https://www.goldapi.io/api/XAU/EGP`; // استخدام API للحصول على سعر الذهب

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'x-access-token': apiKey, // مفتاح الـ API في الهيدر
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        
        if (data.price_gram_21k) {
            const goldPrice = data.price_gram_21k; // سعر الذهب لعيار 21 بالجنيه المصري
            document.getElementById('goldPrice').innerHTML = `${Math.floor(goldPrice)} جنيه`;

            // بعد جلب سعر الذهب، نقوم بحساب ناتج ضربه في الوزن المتاح
            avWeightAndGoldValue(goldPrice);
        } else {
            alert('حدث خطأ أثناء جلب سعر الذهب');
        }
    } catch (error) {
        console.error('Error fetching gold price:', error);
        alert('حدث خطأ أثناء الاتصال بمصدر البيانات');
    }
}

// دالة لحساب إجمالي الوزن المتاح مع إضافة القيمة الناتجة من ضرب سعر الذهب في الوزن
function avWeightAndGoldValue(goldPrice) {
    let newDataProP = [];
    let newDataProM = [];
    let totalWeight = 0;

    // جمع الأوزان الخاصة بالمشتريات والبيع
    for (let i = 0; i < dataPro.length; i++) {
        if (dataPro[i].type == "شراء") {
            newDataProP.push(dataPro[i].weight);
        }
        if (dataPro[i].type == "بيع") {
            newDataProM.push(dataPro[i].weight);
        }
    }

    // حساب الوزن المتاح
    if (newDataProP.length > 0 || newDataProM.length > 0) {
        let x = newDataProP.reduce((a, b) => +a + +b, 0);
        let z = newDataProM.reduce((a, b) => +a + +b, 0);
        totalWeight = (x - z).toFixed(2); // الوزن المتاح
    } else {
        totalWeight = "لا توجد بيانات بيع أو شراء";
    }

    // عرض الوزن المتاح
    document.getElementById("totalWeight").innerHTML = `${totalWeight} جرام`;

    // حساب القيمة الناتجة من ضرب سعر الذهب في إجمالي الوزن
    if (totalWeight !== "لا توجد بيانات بيع أو شراء") {
        const totalGoldValue = (goldPrice * totalWeight).toFixed(2); // ضرب سعر الذهب في الوزن المتاح
        document.getElementById("goldValue").innerHTML = `${Math.floor(totalGoldValue)} جنيه`;
    }
}

// استدعاء الدالة عند تحميل الصفحة أو تحديث البيانات
getGoldPrice();



