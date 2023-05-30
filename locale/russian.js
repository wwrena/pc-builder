const locale = {
    // Login screen
    login_email: "Ваша почта",
    login_password: "Пароль",
    login_button: "Войти",
    dont_have_an_account: "Нет аккаунта?",

    // Register screen
    register_button: "Зарегестрироваться",
    confirm_register_password: "Подтвердите пароль",
    already_have_account: "Уже есть аккаунт?",
    register_username: "Отображаемое имя",

    // Error localization

    basic_error: "Ошибка регистрации",
    unknown_error: "Неизвестная ошибка регистрации",

    // Profile screen
    profile_welcome: "Привет",
    profile_removed_message: "Удалили",
    profile_removed_message_2: "из вашей сборки",
    profile_done: "Сделано!",
    profile_add_button: "Добавить +",
    profile_edit_button: "Изменить",
    profile_not_selected: "Не выбрали",
    profile_not_selected_2: "",
    profile_build_price: "Цена сборки:",

    // Localized components list
    component_cpu: "Процессор",
    component_gpu: "Видеокарту",
    component_motherboard: "Материнскую плату",
    component_ram: "Оперативную память",
    component_ssd: "SSD",
    component_hdd: "Жесткий диск",
    component_psu: "Блок питания",
    component_case: "Корпус",

    basic_component_cpu: "Процессор",
    basic_component_gpu: "Видеокарта",
    basic_component_motherboard: "Материнская плата",
    basic_component_ram: "Оперативная память",
    basic_component_ssd: "SSD",
    basic_component_hdd: "Жесткий диск",
    basic_component_psu: "Блок питания",
    basic_component_case: "Корпус",

    // Settings
    settings_header: "Настройки",
    settings_logout: "Выйти из аккаунта",
    settings_delete_account: "Удалить аккаунт",

    build_placeholder: "Имя вашей сборки",
    settings_your_builds: "Ваши сборки",
    no_builds_yet: "У вас еще нет сборок.",
    get_build_from_database: "Загрузить сборку",
    set_build_to_database: "Сохранить сборку",
    remove_build_from_database: "Удалить сборку",

    // Firebase Toast errors
    firebase_login_error_header: "Ошибка входа",
    firebase_missing: "Заполните указанные поля",
    firebase_user_not_found: "Пользователь не найден",
    firebase_invalid_email: "Пользователя с указаной почтой не найдено",
    firebase_invalid_password: "Указанный пароль неправильный",
    firebase_account_disabled: "Доступ к аккаунту был временно отключен.",
    firebase_too_weak_password:
        "Пароль должен содержать как минимум 6 символов",
    firebase_password_not_matching: "Пароли не совпадают",

    // Delete account alert
    alert_delete_header: "Вы уверены что хотите удалить аккаунт?",
    alert_delete_text: "Нажав удалить обратного пути нет",
    alert_delete_button: "Удалить",

    // Delete account Toast
    account_was_removed_toast: "Аккаунт был удален",

    // Logout Alert
    alert_logout_header: "Вы уверены?",
    alert_logout_text: "Вы можете потерять несохраненные данные",
    alert_logout_cancel: "Отмена",
    alert_logout_confirm: "Выйти",

    // CPU related screen strings

    cpu_screen_header: "Процессоры",
    cpu_toast_header: "Хороший выбор",
    cpu_toast_added_text_1: "Добавили",
    cpu_toast_added_text_2: "в вашу сборку",
    cpu_cores: "ядер",
    cpu_no_socket: "Отсутствует сокет",
    cpu_filter_button: "Помощь",

    search_placeholder: "Поиск",

    // GPU Related Screen strings
    gpu_screen_header: "Видеокарты",

    // SSD Related Screen strings

    ssd_screen_header: "Дисковые накопители",

    // Motherboard Related Screen strings
    select_motherboard: "Материнские платы",
    motherboard_socket: "Поиск по сокету материнской платы:",
    motherboard_note:
        "Примечание: поиск по сокету или форм фактору должно быть сделано только на английском (например:",
    motherboard_form_factor:
        "Поиск по форм-фактору материнской платы, например:",

    // RAM Related Screen strings
    select_ram: "Оперативная память",

    // gpu helper

    gpu_helper_memory_search: "Поиск по объему памяти:",

    // PSU Related Screen Strings

    select_psu: "Блоки питания",

    // PSU helper strings

    psu_helper_note:
        "Примечание: поиск по емкости блока питания должен производиться на английском языке независимо от языка приложения (например: ",

    case_screen_header: "Корпуса",

    // Case Related Screen Strings

    case_size_search: "Поиск по размеру корпуса: ",

    // Search related text

    search_no_results_found_1: "Поиск по",
    search_no_results_found_2: " не дал результата",

    loading_indicate_text: "Загружаем...",

    // CPU helper strings

    cpu_helper_header: "Помощь по поиску",
    cpu_helper_note:
        "Примечание: поиск по ядрам или сокету должен производиться на английском языке независимо от языка приложения (то есть ",
    cpu_helper_or: "или",
    cpu_helper_basic_search: "Обычный поиск по названию, например:",
    cpu_helper_basic_search_2:
        "или же, можете воспользоваться одним из предоставленных тегов",
    cpu_helper_socket_search: "Поиск по сокету процессора, например:",
    cpu_helper_core_count_search:
        "Поиск по количеству ядер процессора, например:",
    cpu_helper_min_price_search: "Поиск по минимальной цене, например:",
    cpu_helper_min_price_search_note:
        "(отобразятся только те компоненты которые дороже 999 UAH)",
    cpu_helper_max_price_search: "Поиск по максимальной цене, например:",
    cpu_helper_max_price_search_note:
        "(отобразятся компоненты которые не дороже 24000 UAH)",
    cpu_helper_search_note_1:
        "В любом случае, должен отметить что поиск по нескольким критериям, например",
    cpu_helper_search_note_2: "к сожалению невозможен",

    // GPU helper strings

    gpu_helper_note:
        "Примечание: поиск по количеству памяти должен быть только на английском языке (например: ",

    // Wrote build strings

    settings_wrote_build_1: "Сохранили сборку под названием",
    settings_wrote_build_2: "",

    profile_build_price: "Сборка будет стоить: ",
    uid_placeholder: "Введите UID который хотите импортировать",
    uid_message:
        'Вводя ID пользователя вы импортируете его сборку под названием "default"',

    cpu_compability: `Примечание: отображаются материнские платы только с `,
    cpu_compability_2: ` сокетом`,

    import_button: "Импортировать сборку",
};

export default locale;
