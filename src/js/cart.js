document.addEventListener('DOMContentLoaded', function() {
    // Функция для получения курсов из DOM-дерева
    function getGoodsFromDOM() {
        const goods = [];
        const cartItems = document.querySelectorAll('.cart__item');

        cartItems.forEach(item => {
            const title = item.getAttribute('data-name');
            const id_element = item.getAttribute('data-id');
            
            goods.push({
                "title": title,
                "id_element": id_element
            });
        });

        return goods;
    }

    // Функция для инициализации данных из localStorage
    function initializeData() {
        return JSON.parse(localStorage.getItem('studentData')) || {
            "students": [],
            "goods": getGoodsFromDOM(),
            "allStudentsForAllCourses": false
        };
    }

    // Обработчик изменения состояния чекбокса "Одинаковые обучающиеся для всех курсов"
    function handleCheckboxChange() {
        const checkbox = document.querySelector('#all');
        const isChecked = checkbox.checked;
        let data = initializeData();

        if (isChecked) {
            // Показываем предупреждение пользователю
            const confirmMessage = "Все студенты будут привязаны ко всем курсам. Это действие нельзя будет отменить. Продолжить?";
            if (confirm(confirmMessage)) {
                // Привязываем всех студентов ко всем курсам
                data.students.forEach(student => {
                    student.courses = data.goods.map(course => course.id_element);
                });
                data.allStudentsForAllCourses = true;
            } else {
                // Если пользователь отказался, возвращаем состояние чекбокса в прежнее состояние
                checkbox.checked = false;
                return;
            }
        } else {
            data.allStudentsForAllCourses = false;
        }

        localStorage.setItem('studentData', JSON.stringify(data));
        renderStudents();
    }

    // Рендеринг списка студентов
    function renderStudents() {
        const data = initializeData();
        const allStudentsContainer = document.querySelector('.cart__student .cart-student__list');
        const courseContainers = document.querySelectorAll('.cart__item');
        const isChecked = data.allStudentsForAllCourses;

        // Очистка текущего вывода
        allStudentsContainer.innerHTML = '';
        courseContainers.forEach(container => {
            const courseList = container.querySelector('.cart-student__list');
            courseList.innerHTML = '';
        });

        if (isChecked) {
            // Если чекбокс активен, показываем общий блок студентов и скрываем студентов внутри курсов
            document.querySelector('.cart__student').style.display = ''; // Показываем блок всех студентов
            courseContainers.forEach(container => {
                container.querySelector('.cart-student').style.display = 'none'; // Скрываем студентов внутри курсов
            });

            data.students.forEach(student => {
                allStudentsContainer.innerHTML += `
                    <li class="cart-student__item" id="student-${student.id}">
                        <div class="cart-student__wrapper">
                            <p>${student.sname} ${student.name}</p>
                        </div>
                        <button class="btn btn--grey cart-student__btn">Удалить</button>
                    </li>`;
            });
        } else {
            // Если чекбокс неактивен, скрываем общий блок студентов и показываем студентов внутри каждого курса
            document.querySelector('.cart__student').style.display = 'none'; // Скрываем блок всех студентов
            courseContainers.forEach(container => {
                const courseId = container.getAttribute('data-id');
                const courseList = container.querySelector('.cart-student__list');

                container.querySelector('.cart-student').style.display = ''; // Показываем студентов внутри курсов

                data.students.forEach(student => {
                    if (student.courses.includes(courseId)) {
                        courseList.innerHTML += `
                            <li class="cart-student__item" id="student-${student.id}">
                                <div class="cart-student__wrapper">
                                    <p>${student.sname} ${student.name}</p>
                                </div>
                                <button class="btn btn--grey cart-student__btn">Удалить</button>
                            </li>`;
                    }
                });
            });
        }

        // Добавляем обработчики удаления студентов
        addDeleteStudentHandlers();
        addDeleteAllStudentsHandler();
    }

    // Удаление студентов по одному
    function addDeleteStudentHandlers() {
        const deleteButtons = document.querySelectorAll('.cart-student__btn');
        
        deleteButtons.forEach(button => {
            button.addEventListener('click', function() {
                const studentItem = this.closest('.cart-student__item');
                const studentId = parseInt(studentItem.getAttribute('id').replace('student-', ''), 10);

                // Поднимаемся по DOM до блока курса и получаем его id
                const courseItem = this.closest('.cart__item');
                const courseId = courseItem.getAttribute('data-id');
    
                // Удаляем курс из списка курсов студента
                let data = initializeData();
                let student = data.students.find(student => student.id === studentId);
                
                if (student) {
                    student.courses = student.courses.filter(course => course !== courseId);
                    
                    // Если у студента не осталось курсов, удаляем студента из списка
                    if (student.courses.length === 0) {
                        data.students = data.students.filter(student => student.id !== studentId);
                    }

                    // Сохраняем изменения
                    localStorage.setItem('studentData', JSON.stringify(data));

                    // Рендерим обновленный список студентов
                    renderStudents();
                }
            });
        });
    }

    // Удаление всех студентов
    function addDeleteAllStudentsHandler() {
        const deleteAllButtons = document.querySelectorAll('.cart-student__dlt');
    
        deleteAllButtons.forEach(button => {
            button.addEventListener('click', function() {
                let data = initializeData();
                const isAllChecked = data.allStudentsForAllCourses;

                if (isAllChecked) {
                    // Если чекбокс активен, удаляем всех студентов
                    data.students = [];
                } else {
                    // Если чекбокс не активен, получаем id текущего курса
                    const courseItem = this.closest('.cart__item');
                    const courseId = courseItem.getAttribute('data-id');
                    
                    // Удаляем указанный курс у всех студентов
                    data.students.forEach(student => {
                        student.courses = student.courses.filter(course => course !== courseId);
                    });

                    // Удаляем студентов, у которых больше нет курсов
                    data.students = data.students.filter(student => student.courses.length > 0);
                }
    
                // Сохраняем изменения
                localStorage.setItem('studentData', JSON.stringify(data));
    
                // Рендерим обновленный список студентов
                renderStudents();
            });
        });
    }

    // Обработчик для открытия модального окна и заполнения скрытых полей
    document.querySelectorAll('.cart-student__add').forEach(button => {
        button.addEventListener('click', function() {
            // Находим родительский элемент .cart__item
            const cartItem = this.closest('.cart__item');
            const courseId = cartItem.getAttribute('data-id');
            const courseTitle = cartItem.getAttribute('data-name');

            // Заполняем скрытые поля в форме
            const form = document.querySelector('.form-students');
            form.querySelector('input[name="id_element"]').value = courseId;
            form.querySelector('input[name="title"]').value = courseTitle;
        });
    });

    // Обработчик формы добавления студента
    document.querySelector('.form-students').addEventListener('submit', function(event) {
        event.preventDefault(); // предотвращаем отправку формы
    
        const formElements = this.elements;
    
        // Извлекаем существующие данные из localStorage, если они есть, или инициализируем новый объект
        let data = initializeData();
    
        // Пример разбора ФИО на name и sname
        let fio = formElements['fio'].value.trim().split(' ');
        let name = fio[1] || ''; // имя
        let sname = fio[0] || ''; // фамилия
    
        // Получаем значение чекбокса "Одинаковые обучающиеся для всех курсов"
        const isAllChecked = data.allStudentsForAllCourses;
    
        // Генерируем новый уникальный ID для студента
        const newId = data.students.length > 0 ? Math.max(...data.students.map(s => s.id)) + 1 : 1;
    
        let newStudent = {
            "id": newId,
            "name": name,
            "sname": sname,
            "mailing": formElements['mailing'].value,
            "phone": formElements['phone'].value,
            "doc": formElements['doc'].value,
            "email": formElements['email'].value,
            "work_place": formElements['work_place'].value,
            "date": formElements['date'].value,
            "position": formElements['position'].value,
            "snils": formElements['snils'].value,
            "psw": formElements['psw'].value,
            "courses": []
        };
    
        if (isAllChecked) {
            // Добавляем студента ко всем курсам
            data.goods.forEach(course => {
                newStudent.courses.push(course.id_element);
            });
    
            // Если ранее студенты были разделены по курсам, объединяем их под всеми курсами
            if (!data.allStudentsForAllCourses) {
                data.students.forEach(student => {
                    student.courses = data.goods.map(course => course.id_element);
                });
            }
    
            data.allStudentsForAllCourses = true;
        } else {
            // Привязка к конкретному курсу
            let selectedCourseId = formElements['id_element'].value; // Нужно динамически выбрать курс из формы
            newStudent.courses.push(selectedCourseId);
    
            // Если до этого студенты были объединены для всех курсов, нужно разделить их
            if (data.allStudentsForAllCourses) {
                data.students.forEach(student => {
                    student.courses = [selectedCourseId];
                });
            }
    
            data.allStudentsForAllCourses = false;
        }
    
        // Добавляем нового студента в массив
        data.students.push(newStudent);
    
        // Сохраняем данные обратно в localStorage
        localStorage.setItem('studentData', JSON.stringify(data));
    
        // Рендерим список студентов
        renderStudents();
    });

    // Инициализация рендера при загрузке страницы
    const data = initializeData();
    document.querySelector('#all').checked = data.allStudentsForAllCourses; // Устанавливаем состояние чекбокса
    renderStudents();

    // Обработчик изменения состояния чекбокса
    document.querySelector('#all').addEventListener('change', handleCheckboxChange);
    console.log(data)
});