const locale = {
    // Login screen
    login_email: "Ваша пошта",
    login_password: "Пароль",
    login_button: "Увійти",
    dont_have_an_account: "Нема акаунту?",

    // Register screen
    register_button: "Зареєструватись",
    confirm_register_password: "Підтвердіть пароль",
    already_have_account: "Вже є акаунт?",
    register_username: "Відображуване ім'я",

    // Error localization

    basic_error: "Помилка реєстрації",
    unknown_error: "Невідома помилка реєстрації",

    // Profile screen
    profile_welcome: "Привіт",
    profile_removed_message: "було видалено з вашої збірки",
    profile_done: "Зроблено!",
    profile_add_button: "Додати +",
    profile_edit_button: "Змінити",
    profile_not_selected: "Не обрано",
    profile_not_selected_2: "",
    profile_build_price: "Ціна збірки:",

    // Localized components list
    component_cpu: "Процесор",
    component_gpu: "Відеокарту",
    component_motherboard: "Материнську плату",
    component_ram: "Оперативну пам'ять",
    component_ssd: "SSD",
    component_hdd: "Жорсткий диск",
    component_psu: "Блок живлення",
    component_case: "Корпус",

    basic_component_cpu: "Процесор",
    basic_component_gpu: "Відеокарта",
    basic_component_motherboard: "Материнська плата",
    basic_component_ram: "Оперативна пам'ять",
    basic_component_ssd: "SSD",
    basic_component_hdd: "Жорсткий диск",
    basic_component_psu: "Блок живлення",
    basic_component_case: "Корпус",

    // Settings
    settings_header: "Налаштування",
    settings_logout: "Вийти з акаунту",
    settings_delete_account: "Видалити акаунт",

    build_placeholder: "Назва вашої збірки",
    settings_your_builds: "Ваші збірки",
    no_builds_yet: "У вас ще немає зборок.",
    get_build_from_database: "Загрузити збірку",
    set_build_to_database: "Зберегти збірку",
    remove_build_from_database: "Видалити збірку",

    // Firebase Toast errors
    firebase_login_error_header: "Помилка входу",
    firebase_missing: "Заповніть вказані поля",
    firebase_user_not_found: "Користувача не знайдено",
    firebase_invalid_email: "Користувача з вказаною поштою не знайдено",
    firebase_invalid_password: "Вказаний пароль невірний",
    firebase_account_disabled: "Доступ до акаунту тимчасово було обмежено.",
    firebase_too_weak_password: "Пароль повинен містити як мінімум 6 символів",
    firebase_password_not_matching: "Паролі не співпадають",

    // Delete account alert
    alert_delete_header: "Ви впевнені що хочете видалити акаунт?",
    alert_delete_text: "Натиснувши видалити шляху назад немає",
    alert_delete_button: "Видалити",

    // Delete account Toast
    account_was_removed_toast: "Акаунт було видалено",

    // Logout Alert
    alert_logout_header: "Ви впевнені?",
    alert_logout_text: "Ви можете втратити незбережені дані",
    alert_logout_cancel: "Скасувати",
    alert_logout_confirm: "Вийти",

    // CPU related screen strings

    cpu_screen_header: "Обрати процессор",
    cpu_toast_header: "Хороший вибір",
    cpu_toast_added_text_1: "Додано",
    cpu_toast_added_text_2: "у вашу збірку",
    cpu_cores: "ядер",
    cpu_no_socket: "Відсутній сокет",
    cpu_filter_button: "Допомога",

    search_placeholder: "Пошук",

    // GPU Related Screen strings
    gpu_screen_header: "Обрати відеокарту",

    // SSD Related Screen Strings
    ssd_screen_header: "Дискові накопичувачі",

    // Motherboard Related Screen strings
    select_motherboard: "Обрати мат. плату",
    motherboard_socket: "Пошук по сокету материнської пам'яті:",
    motherboard_note:
        "Примітка: пошук по сокету або форм фактору має виконуватись тільки на англійській (наприклад:",
    motherboard_form_factor: "Пошук по форм-фактору, наприклад:",

    // RAM Related Screen strings
    select_ram: "Обрати оперативну пам'ять",

    // GPU helper

    gpu_helper_memory_search: "Пошук по об'єму пам'яті:",

    // PSU Related Screen Strings

    select_psu: "Блоки живлення",

    psu_helper_note:
        "Примітка: пошук по ємкості блоку живлення повинне виконуватись на англійській мові незалежно від мови додатку (наприклад: ",

    case_screen_header: "Корпуси",

    // Case Related Screen Strings

    case_size_search: "Пошук по розміру корпусу: ",

    // Search related text

    search_no_results_found_1: "Пошук по",
    search_no_results_found_2: " не дав результату",

    loading_indicate_text: "Завантажуємо...",

    cpu_helper_header: "Допомога до пошуку",
    cpu_helper_note:
        "Примітка: пошук по ядрам або сокету має бути на англійській мові незалежно від мови програми (тобто ",
    cpu_helper_or: "або",
    cpu_helper_basic_search: "Звичайний пошук по назві, наприклад:",
    cpu_helper_basic_search_2:
        "або, можете скористуватись одним з запропонованих тегів",
    cpu_helper_socket_search: "Пошук по сокету процессора, наприклад:",
    cpu_helper_core_count_search:
        "Пошук по кількості ядер процессора, наприклад:",
    cpu_helper_min_price_search: "Пошук по мінімальній ціні, наприклад:",
    cpu_helper_min_price_search_note:
        "(буде відображено тільки ті компоненти, що коштують дороже 999 UAH)",
    cpu_helper_max_price_search: "Пошук по максимальній ціні, наприклад:",
    cpu_helper_max_price_search_note:
        "(буде відображено компоненти котрі коштують не більше 24000 UAH)",
    cpu_helper_search_note_1:
        "Змушений сказати, що пошук по декільком тегам, наприклад",
    cpu_helper_search_note_2: "нажаль неможливий",

    // GPU helper strings

    gpu_helper_note:
        "Примітка: пошук по кількості пам'яті має робитись тільки на англійській мові (наприклад: ",

    // Wrote build strings

    settings_wrote_build_1: "Зберегли збірку під назвою",
    settings_wrote_build_2: "",

    profile_build_price: "Збірка буде коштувати: ",
    uid_placeholder: "Введіть тут UID щоб імпортувати",
    uid_message:
        'Вводячи ID користувача ви імпортуєте його збірку під назвою "default"',

    cpu_compability: `Примітка: відображаються материнські плати тільки з `,
    cpu_compability_2: ` сокетом`,

    import_button: "Імпортувати збірку",
};

export default locale;
