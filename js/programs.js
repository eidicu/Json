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
        .then(response => response.json())
        .then(data => {
            loadPrograms(data); // تحميل البيانات في الصفحة
        })
        .catch(error => console.error('Error fetching programs:', error));
}

// دالة لتحميل البرامج في الصفحة
function loadPrograms(programs) {
    let programHTML = '';

    programs.forEach(program => {
        programHTML += createProgramCard(program);
    });

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
    fetchProgramsByCategory(category);

    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(button => {
        button.classList.toggle('active', button.getAttribute('onclick').includes(category));
    });
}

// تحميل البرامج الخاصة بالاستدامة عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    filterPrograms('su');
});
