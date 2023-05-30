const locale = {
    // Login screen
    login_email: "Email",
    login_password: "Password",
    login_button: "Login",
    dont_have_an_account: "Don't have an account?",

    // Register screen
    register_button: "Register",
    confirm_register_password: "Confirm password",
    already_have_account: "Already have account?",
    register_username: "Username",

    // Error localization

    basic_error: "Register error",
    unknown_error: "Unknown register error",

    // Profile screen
    profile_welcome: "Hello",
    profile_removed_message: "was removed from your build",
    profile_done: "Done!",
    profile_add_button: "Add +",
    profile_edit_button: "Edit",
    profile_not_selected: "No",
    profile_not_selected_2: "selected",
    profile_build_price: "Build price:",

    // Localized components list
    component_cpu: "CPU",
    component_gpu: "GPU",
    component_motherboard: "Motherboard",
    component_ram: "RAM",
    component_ssd: "SSD",
    component_hdd: "HDD",
    component_psu: "PSU",
    component_case: "Case",

    basic_component_cpu: "CPU",
    basic_component_gpu: "GPU",
    basic_component_motherboard: "Motherboard",
    basic_component_ram: "RAM",
    basic_component_ssd: "SSD",
    basic_component_hdd: "HDD",
    basic_component_psu: "PSU",
    basic_component_case: "Case",

    // Settings
    settings_header: "Settings",
    settings_logout: "Logout",
    settings_delete_account: "Delete account",

    build_placeholder: "Your build name",
    settings_your_builds: "Your builds",
    no_builds_yet: "You don't have any builds yet.",
    get_build_from_database: "Get build",
    remove_build_from_database: "Delete build",
    set_build_to_database: "Save build",

    // Firebase Toast errors
    firebase_login_error_header: "Login error",
    firebase_missing: "No email or password provided",
    firebase_user_not_found: "User not found",
    firebase_invalid_email: "Incorrect email provided",
    firebase_invalid_password: "Your password is wrong",
    firebase_account_disabled:
        "Access to this account has been temporarily disabled.",
    firebase_too_weak_password: "Password should be at least 6 characters",
    firebase_password_not_matching: "Passwords not matching",

    // Delete account alert
    alert_delete_header: "Are you sure you want to delete your account?",
    alert_delete_text: "Pressing delete there is no way back",
    alert_delete_button: "Delete",

    // Delete account Toast
    account_was_removed_toast: "Account was deleted",

    // Logout Alert
    alert_logout_header: "Are you sure?",
    alert_logout_text: "You may lose your unsaved data",
    alert_logout_cancel: "Cancel",
    alert_logout_confirm: "Logout",

    // Search placeholder
    search_placeholder: "Search",

    // CPU related screen strings

    cpu_screen_header: "Select CPU",
    cpu_toast_header: "Good choice",
    cpu_toast_added_text_1: "Added",
    cpu_toast_added_text_2: "to your build",
    cpu_cores: "cores",
    cpu_no_socket: "No socket",
    cpu_filter_button: "Help",

    // GPU Related Screen strings
    gpu_screen_header: "Select GPU",

    // Motherboard Related Screen strings
    select_motherboard: "Select Motherboard",
    motherboard_socket: "Searching by motherboard socket",
    motherboard_note:
        "Note: searching by socket or form factor must be done only in english (for example:",
    motherboard_form_factor:
        "Searching by motherboard form factor, for example:",

    // RAM Related Screen strings
    select_ram: "Select RAM",

    // SSD Related Screen strings
    ssd_screen_header: "Select Drive",

    // GPU helper strings

    gpu_helper_note:
        "Note: searching by memory size must be done only in english (for example: ",
    gpu_helper_memory_search: "Searching by memory size:",

    // PSU Related Screen Strings

    select_psu: "Select PSU",

    // PSU helper strings

    psu_helper_note:
        "Note: searching by PSU capacity must be done only in english (for example: ",

    case_screen_header: "Select Case",

    // Case Related Screen Strings

    case_size_search: "Search by case size: ",

    // Search related text

    search_no_results_found_1: "No results found for",
    search_no_results_found_2: "",

    loading_indicate_text: "Loading...",

    // CPU helper strings

    cpu_helper_header: "Search help",
    cpu_helper_note:
        "Note: searching by core count or socket must be done only in english (for example: ",
    cpu_helper_or: "or",
    cpu_helper_basic_search: "Basic search by name, for example:",
    cpu_helper_basic_search_2: "or you can use one of prebuilt tags",
    cpu_helper_socket_search: "Searching by CPU socket, for example:",
    cpu_helper_core_count_search: "Searching by core count:",
    cpu_helper_min_price_search: "Searching by minimal price:",
    cpu_helper_min_price_search_note:
        "(only items that worth more than 999 UAH will be displayed)",
    cpu_helper_max_price_search: "Searching by maximum price, for example:",
    cpu_helper_max_price_search_note:
        "(only items that worth more than 24000 UAH will be displayed)",
    cpu_helper_search_note_1:
        "However, have to mention that searching by multiple criteria, for example",
    cpu_helper_search_note_2: "unfortunetly, is not possible",

    // Wrote build strings

    settings_wrote_build_1: "Wrote",
    settings_wrote_build_2: "to Firebase",

    profile_build_price: "Build will cost: ",
    uid_placeholder: "Type here UID to import from",
    uid_message:
        'By entering user ID you will import their build called "default"',
    cpu_compability: `Note: only `,
    cpu_compability_2: ` motherboards are displayed`,

    import_button: "Import build",
};

export default locale;
