// دالة لجلب بيانات البرامج من ملف JSON بناءً على الفئة المحددة
function fetchProgramsByCategory(category) {
    const categoryFiles = {
        su: 'data/su.json',
        csr: 'data/csr.json',
        stories: 'data/stories.json',
        ai: 'data/ai.json',
        ej: 'data/ej.json'
    };

    const file = categoryFiles[category];

    fetch(file)
        .then(response => {
            // التأكد من أن الاستجابة كانت ناجحة
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            loadPrograms(data); // تحميل البيانات في الصفحة
        })
        .catch(error => {
            console.error('Error fetching programs:', error);
            // تحميل بيانات فارغة في حالة حدوث خطأ
            loadPrograms([]);
        });
}

// دالة لتحميل البرامج في الصفحة
function loadPrograms(programs) {
    let programHTML = '';

    // التحقق مما إذا كانت القائمة فارغة
    if (programs.length === 0) {
        programHTML = `
            <div class="col-12">
                <p class="text-center text-muted">لا توجد برامج متاحة في هذه الفئة حاليًا.</p>
            </div>
        `;
    } else {
        // إنشاء بطاقات البرامج إذا كانت البيانات متوفرة
        programs.forEach(program => {
            programHTML += createProgramCard(program);
        });
    }

    // إدراج المحتوى في الصفحة
    document.getElementById('program-list').innerHTML = programHTML;
}

// دالة لإنشاء البطاقة
function createProgramCard(program) {
    return `
        <div class="col-md-6 mb-4 filter-item" data-category="${program.category}">
            <div class="card">
                <img src="${program.image}" alt="${program.title}">
                <div class="card-body">
                    <h5 class="card-title">${program.title}</h5>
                    <p class="card-text">${program.text}</p>
                    <a href="${program.link}">استكشف المزيد</a>
                </div>
            </div>
        </div>
    `;
}

// دالة لتصفية البرامج بناءً على الفئة المحددة
function filterPrograms(category) {
    // تفعيل الزر المحدد
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(button => {
        button.classList.toggle('active', button.getAttribute('onclick').includes(category));
    });

    // جلب البرامج من الفئة المحددة
    fetchProgramsByCategory(category);
}

// تحميل البرامج الخاصة بالاستدامة عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    filterPrograms('su');
});
