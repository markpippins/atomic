use std::fs;
use std::path::Path;
use std::collections::HashMap;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Clone)]
pub struct FileSystemNode {
    pub name: String,
    #[serde(rename = "type")]
    pub node_type: String, // 'folder' or 'file'
    pub modified: String,
    pub children: Option<Vec<FileSystemNode>>,
    pub children_loaded: Option<bool>,
    pub content: Option<String>,
}

#[derive(Serialize, Deserialize)]
pub struct SearchResultNode {
    pub name: String,
    #[serde(rename = "type")]
    pub node_type: String, // 'folder' or 'file'
    pub modified: String,
    pub path: Vec<String>,
}

#[derive(Serialize, Deserialize)]
pub struct ItemReference {
    pub name: String,
    #[serde(rename = "type")]
    pub item_type: String, // 'folder' or 'file'
}

fn resolve_path(relative_path: Vec<String>) -> Result<String, String> {
    use std::path::PathBuf;
    let home_dir = std::env::var("HOME").unwrap_or_else(|_| ".".to_string());
    let mut full_path = PathBuf::from(&home_dir);

    for segment in relative_path {
        full_path.push(segment);
    }

    let resolved_path = full_path.canonicalize()
        .map_err(|e| format!("Failed to canonicalize path: {}", e))?;

    let home_path = PathBuf::from(&home_dir);
    if !resolved_path.starts_with(&home_path) {
        return Err("Access denied: path is outside the allowed root directory.".to_string());
    }

    Ok(resolved_path.to_string_lossy().to_string())
}

#[tauri::command]
async fn get_file_system_contents(current_path: Vec<String>) -> Result<Vec<FileSystemNode>, String> {
    let dir_path = resolve_path(current_path).map_err(|e| e.to_string())?;
    let path = std::path::Path::new(&dir_path);

    let entries = fs::read_dir(path)
        .map_err(|e| format!("Failed to read directory: {}", e))?;

    let mut items = Vec::new();
    for entry in entries {
        let entry = entry.map_err(|e| format!("Failed to read entry: {}", e))?;
        let file_type = entry.file_type()
            .map_err(|e| format!("Failed to get file type: {}", e))?;

        let metadata = entry.metadata()
            .map_err(|e| format!("Failed to get metadata: {}", e))?;

        let modified = metadata.modified()
            .map_err(|e| format!("Failed to get modified time: {}", e))?
            .duration_since(std::time::UNIX_EPOCH)
            .map_err(|e| format!("Failed to convert time: {}", e))?;

        let modified_str = format!("{}", modified.as_secs());
        let file_name = entry.file_name().to_string_lossy().to_string();

        let node_type = if file_type.is_file() {
            "file"
        } else if file_type.is_dir() {
            "folder"
        } else {
            "file" // default to file for other types
        };

        let node = FileSystemNode {
            name: file_name,
            node_type: node_type.to_string(),
            modified: modified_str,
            children: if file_type.is_dir() { Some(Vec::new()) } else { None },
            children_loaded: Some(file_type.is_dir()),
            content: None,
        };

        items.push(node);
    }

    Ok(items)
}

#[tauri::command]
async fn get_folder_tree() -> Result<FileSystemNode, String> {
    let home_dir = std::env::var("HOME").unwrap_or_else(|_| ".".to_string());
    let path = std::path::Path::new(&home_dir);

    let metadata = path.metadata()
        .map_err(|e| format!("Failed to get metadata: {}", e))?;

    let modified = metadata.modified()
        .map_err(|e| format!("Failed to get modified time: {}", e))?
        .duration_since(std::time::UNIX_EPOCH)
        .map_err(|e| format!("Failed to convert time: {}", e))?;

    let modified_str = format!("{}", modified.as_secs());

    Ok(FileSystemNode {
        name: "My Computer".to_string(),
        node_type: "folder".to_string(),
        modified: modified_str,
        children: Some(Vec::new()), // Initialize with empty children
        children_loaded: Some(false),
        content: None,
    })
}

#[tauri::command]
async fn create_directory(dir_path: Vec<String>, name: String) -> Result<(), String> {
    let base_path = resolve_path(dir_path).map_err(|e| e.to_string())?;
    let new_dir_path = std::path::Path::new(&base_path).join(&name);
    fs::create_dir(&new_dir_path)
        .map_err(|e| format!("Failed to create directory: {}", e))?;
    Ok(())
}

#[tauri::command]
async fn remove_directory(dir_path: Vec<String>, name: String) -> Result<(), String> {
    let base_path = resolve_path(dir_path).map_err(|e| e.to_string())?;
    let target_path = std::path::Path::new(&base_path).join(&name);
    fs::remove_dir_all(&target_path)
        .map_err(|e| format!("Failed to remove directory: {}", e))?;
    Ok(())
}

#[tauri::command]
async fn create_file(dir_path: Vec<String>, name: String) -> Result<(), String> {
    let base_path = resolve_path(dir_path).map_err(|e| e.to_string())?;
    let new_file_path = std::path::Path::new(&base_path).join(&name);
    fs::write(&new_file_path, "")
        .map_err(|e| format!("Failed to create file: {}", e))?;
    Ok(())
}

#[tauri::command]
async fn delete_file(dir_path: Vec<String>, name: String) -> Result<(), String> {
    let base_path = resolve_path(dir_path).map_err(|e| e.to_string())?;
    let target_path = std::path::Path::new(&base_path).join(&name);
    fs::remove_file(&target_path)
        .map_err(|e| format!("Failed to delete file: {}", e))?;
    Ok(())
}

#[tauri::command]
async fn rename_file_or_directory(dir_path: Vec<String>, old_name: String, new_name: String) -> Result<(), String> {
    let base_path = resolve_path(dir_path).map_err(|e| e.to_string())?;
    let old_path = std::path::Path::new(&base_path).join(&old_name);
    let new_path = std::path::Path::new(&base_path).join(&new_name);
    fs::rename(&old_path, &new_path)
        .map_err(|e| format!("Failed to rename: {}", e))?;
    Ok(())
}

#[tauri::command]
async fn search_files(query: String) -> Result<Vec<SearchResultNode>, String> {
    let home_dir = std::env::var("HOME").unwrap_or_else(|_| ".".to_string());
    let mut results = Vec::new();
    let lower_query = query.to_lowercase();

    fn find_recursive(
        current_dir: &Path,
        current_path: Vec<String>,
        query: &str,
        results: &mut Vec<SearchResultNode>,
    ) -> Result<(), String> {
        let entries = fs::read_dir(current_dir)
            .map_err(|e| format!("Error reading directory: {}", e))?;

        for entry in entries {
            let entry = entry.map_err(|e| format!("Error reading entry: {}", e))?;
            let file_name = entry.file_name().to_string_lossy().to_string();

            if file_name.to_lowercase().contains(query) {
                let file_type = if entry.file_type()
                    .map_err(|e| format!("Error getting file type: {}", e))?
                    .is_file() {
                    "file"
                } else {
                    "folder"
                };

                let metadata = entry.metadata()
                    .map_err(|e| format!("Error getting metadata: {}", e))?;

                let modified = metadata.modified()
                    .map_err(|e| format!("Error getting modified time: {}", e))?
                    .duration_since(std::time::UNIX_EPOCH)
                    .map_err(|e| format!("Error converting time: {}", e))?;

                results.push(SearchResultNode {
                    name: file_name.clone(),
                    node_type: file_type.to_string(),
                    modified: modified.as_secs().to_string(),
                    path: current_path.clone(),
                });
            }

            if entry.file_type()
                .map_err(|e| format!("Error getting file type: {}", e))?
                .is_dir() {
                let mut new_path = current_path.clone();
                new_path.push(file_name);
                
                find_recursive(entry.path().as_path(), new_path, query, results)?;
            }
        }
        Ok(())
    }

    find_recursive(Path::new(&home_dir), vec![], &lower_query, &mut results)?;
    Ok(results)
}

#[tauri::command]
async fn get_file_content(current_path: Vec<String>, name: String) -> Result<String, String> {
    let dir_path = resolve_path(current_path).map_err(|e| e.to_string())?;
    let file_path = std::path::Path::new(&dir_path).join(&name);
    
    let content = fs::read_to_string(&file_path)
        .map_err(|e| format!("Failed to read file: {}", e))?;

    // Convert to base64 for transmission
    use base64::{Engine as _, engine::general_purpose};
    let base64_content = general_purpose::STANDARD.encode(&content);
    
    // Determine MIME type based on extension
    let ext = file_path.extension()
        .and_then(|s| s.to_str())
        .unwrap_or("")
        .to_lowercase();

    let mime_type = match ext.as_str() {
        "txt" => "text/plain",
        "json" => "application/json",
        "html" | "htm" => "text/html",
        "css" => "text/css",
        "js" => "application/javascript",
        "png" => "image/png",
        "jpg" | "jpeg" => "image/jpeg",
        "gif" => "image/gif",
        "svg" => "image/svg+xml",
        "webp" => "image/webp",
        "bmp" => "image/bmp",
        _ => "application/octet-stream",
    };

    Ok(format!("data:{};base64,{}", mime_type, base64_content))
}

#[tauri::command]
async fn move_items(source_path: Vec<String>, dest_path: Vec<String>, items: Vec<ItemReference>) -> Result<(), String> {
    for item in items {
        let source_dir = resolve_path(source_path.clone())?;
        let dest_dir = resolve_path(dest_path.clone())?;
        let source_item_path = std::path::Path::new(&source_dir).join(&item.name);
        let dest_item_path = std::path::Path::new(&dest_dir).join(&item.name);
        
        fs::rename(&source_item_path, &dest_item_path)
            .map_err(|e| format!("Failed to move item: {}", e))?;
    }
    Ok(())
}

#[tauri::command]
async fn copy_items(source_path: Vec<String>, dest_path: Vec<String>, items: Vec<ItemReference>) -> Result<(), String> {
    for item in items {
        let source_dir = resolve_path(source_path.clone())?;
        let dest_dir = resolve_path(dest_path.clone())?;
        let source_item_path = std::path::Path::new(&source_dir).join(&item.name);
        let dest_item_path = std::path::Path::new(&dest_dir).join(&item.name);
        
        if source_item_path.is_file() {
            fs::copy(&source_item_path, &dest_item_path)
                .map_err(|e| format!("Failed to copy file: {}", e))?;
        } else if source_item_path.is_dir() {
            // For directories, we need to copy recursively
            copy_dir_recursive(&source_item_path, &dest_item_path)?;
        }
    }
    Ok(())
}

fn copy_dir_recursive(src: &std::path::Path, dst: &std::path::Path) -> Result<(), String> {
    if !dst.exists() {
        std::fs::create_dir_all(dst)
            .map_err(|e| format!("Failed to create directory: {}", e))?;
    }

    for entry in std::fs::read_dir(src)
        .map_err(|e| format!("Error reading directory: {}", e))? {
        
        let entry = entry.map_err(|e| format!("Error reading entry: {}", e))?;
        let src_path = entry.path();
        let dst_path = dst.join(entry.file_name());

        if src_path.is_dir() {
            copy_dir_recursive(&src_path, &dst_path)?;
        } else {
            std::fs::copy(&src_path, &dst_path)
                .map_err(|e| format!("Failed to copy file: {}", e))?;
        }
    }
    Ok(())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            get_file_system_contents,
            get_folder_tree, 
            create_directory,
            remove_directory,
            create_file,
            delete_file,
            rename_file_or_directory,
            search_files,
            get_file_content,
            move_items,
            copy_items
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
