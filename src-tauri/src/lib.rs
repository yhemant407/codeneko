use rdev::{listen, EventType};
use tauri::{ActivationPolicy, Manager, WebviewUrl};
use tauri_nspanel::{
    tauri_panel,
    CollectionBehavior,
    PanelBuilder,
    PanelLevel,
    StyleMask,
};

tauri_panel! {
    panel!(NekoPanel {
        config: {
            can_become_key_window: false,
            can_become_main_window: false,
            is_floating_panel: true,
            hides_on_deactivate: false
        }
    })
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_nspanel::init())
        .plugin(tauri_plugin_opener::init())
        .setup(|app| {
            app.set_activation_policy(ActivationPolicy::Accessory);
            std::thread::spawn(|| {
                if let Err(error) = listen( |event| {
                    if let EventType::KeyPress(key) = event.event_type {
                        println!("KEY PRESSED: {:?}", key);
                    }
                }) {
                    println!("Global keyboard listener error: {:?}", error);
                }
            });
            let panel = PanelBuilder::<_, NekoPanel>::new(
                app.handle(),
                "neko-panel",
            )
            .url(WebviewUrl::App("index.html".into()))
            .level(PanelLevel::Status)
            .floating(true)
            .no_activate(true)
            .transparent(true)
            .has_shadow(false)
            .hides_on_deactivate(false)
            .style_mask(
                StyleMask::empty()
                    .borderless()
                    .nonactivating_panel()
            )
            .collection_behavior(
                CollectionBehavior::new()
                    .can_join_all_spaces()
                    .full_screen_auxiliary()
                    .stationary()
                    .ignores_cycle()
            )
            .with_window(|window| {
                window
                    .decorations(false)
                    .transparent(true)
                    .always_on_top(true)
                    .skip_taskbar(true)
                    .resizable(false)
                    .inner_size(200.0, 200.0)
            })
            .build()?;

            panel.show();

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}