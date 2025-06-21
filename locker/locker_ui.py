import os
import json
import hashlib

from kivymd.uix.boxlayout import MDBoxLayout
from kivymd.uix.button import MDFloatingActionButton, MDFlatButton
from kivymd.uix.label import MDLabel
from kivymd.uix.dialog import MDDialog
from kivymd.uix.list import MDList
from kivy.uix.filechooser import FileChooserListView
from kivy.uix.popup import Popup
from kivy.uix.scrollview import ScrollView
from kivy.uix.screenmanager import Screen
from kivy.uix.floatlayout import FloatLayout

from constants import LOCKER_DIR
from encryption_utils import encrypt_file, decrypt_file
from ui_components import FileTile
from dialogs import show_error


class MainLockerUI(Screen):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.dialog = None
        self.pending_lock = None

        float_layout = FloatLayout()
        vertical_layout = MDBoxLayout(orientation='vertical', size_hint=(1, 1))

        self.title_label = MDLabel(
            text="\U0001F512 Secure Locker",
            halign='center',
            font_style='H5',
            size_hint_y=None,
            height="50dp"
        )
        vertical_layout.add_widget(self.title_label)

        scroll = ScrollView(size_hint=(1, 1))
        self.file_list = MDList()
        scroll.add_widget(self.file_list)
        vertical_layout.add_widget(scroll)

        float_layout.add_widget(vertical_layout)

        self.fab = MDFloatingActionButton(
            icon="plus",
            pos_hint={'right': 0.95, 'y': 0.02},
            on_release=self.show_file_chooser
        )
        float_layout.add_widget(self.fab)

        self.add_widget(float_layout)
        self.update_file_list()

    def update_file_list(self):
        self.file_list.clear_widgets()
        files = [f for f in os.listdir(LOCKER_DIR) if f.endswith(".meta.json")]

        if not files:
            self.file_list.add_widget(
                MDLabel(
                    text="No files locked yet.\nClick the + button to add files.",
                    halign='center',
                    theme_text_color='Hint',
                    size_hint_y=None,
                    height="100dp"
                )
            )
            return

        for meta_file in files:
            try:
                with open(os.path.join(LOCKER_DIR, meta_file), 'r') as f:
                    metadata = json.load(f)

                filename = metadata['original_name']
                enc_name = metadata['encrypted_filename']
                filepath = os.path.join(LOCKER_DIR, enc_name)

                tile = FileTile(
                    filename=filename,
                    filepath=filepath,
                    metadata=metadata,
                    on_open_callback=self.open_file,
                    on_delete_callback=self.delete_file
                )
                self.file_list.add_widget(tile)
            except Exception as e:
                print(f"Skipping invalid metadata: {meta_file} → {e}")

    def show_file_chooser(self, instance):
        content = MDBoxLayout(orientation='vertical')

        file_chooser = FileChooserListView(
            filters=['*.txt', '*.doc', '*.docx', '*.pdf'],
            size_hint_y=0.85
        )
        content.add_widget(file_chooser)

        self.popup = Popup(
            title="Select file to lock",
            content=content,
            size_hint=(0.9, 0.9)
        )

        def on_submit(chooser, selected, touch):
            if selected:
                self.pending_lock = (chooser.path, selected[0])
                self.popup.dismiss()
                self.confirm_lock_file()

        file_chooser.bind(on_submit=on_submit)
        self.popup.open()

    def confirm_lock_file(self):
        if not self.pending_lock:
            return
        path, filename = self.pending_lock
        self.pending_lock = None
        self.lock_file(path, filename)

    def lock_file(self, path, filename):
        try:
            full_path = os.path.join(path, filename)
            enc_filename, metadata_entry = encrypt_file(full_path)
            meta_path = os.path.join(LOCKER_DIR, f"{os.path.splitext(enc_filename)[0]}.meta.json")
            with open(meta_path, 'w') as f:
                json.dump(metadata_entry, f)
            self.update_file_list()
        except Exception as e:
            show_error(self, "Error", f"Failed to lock file: {str(e)}")

    def open_file(self, filepath, metadata):
        try:
            tmp_path = decrypt_file(filepath, metadata)
            if tmp_path is None:
                show_error(self, "Error", "Decryption failed.")
                return
            self.show_file_content(tmp_path, metadata['original_name'])
        except Exception as e:
            show_error(self, "Error", f"Failed to open file: {str(e)}")

    def delete_file(self, filename):
        hash_name = hashlib.sha256(filename.encode()).hexdigest()[:16]
        enc_file = f"enc_{hash_name}.locked"
        meta_file = f"enc_{hash_name}.meta.json"

        enc_path = os.path.join(LOCKER_DIR, enc_file)
        meta_path = os.path.join(LOCKER_DIR, meta_file)

        def confirm_delete(*_):
            try:
                if os.path.exists(enc_path):
                    os.remove(enc_path)
                if os.path.exists(meta_path):
                    os.remove(meta_path)
                self.update_file_list()
                self.dialog.dismiss()
            except Exception as e:
                show_error(self, "Error", f"Failed to delete file: {str(e)}")

        self.dialog = MDDialog(
            title="Confirm Deletion",
            text=f"Delete '{filename}' permanently?",
            buttons=[
                MDFlatButton(text="CANCEL", on_release=lambda x: self.dialog.dismiss()),
                MDFlatButton(text="DELETE", on_release=confirm_delete)
            ]
        )
        self.dialog.open()

    def show_file_content(self, filepath, filename):
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                preview = f.read(500)
        except UnicodeDecodeError:
            with open(filepath, 'rb') as f:
                preview = str(f.read(100))
        finally:
            os.remove(filepath)

        self.dialog = MDDialog(
            title=f"\U0001F4C2 {filename}",
            type="custom",
            content_cls=MDLabel(text=preview, theme_text_color="Secondary"),
            buttons=[
                MDFlatButton(text="OK", on_release=lambda x: self.dialog.dismiss())
            ]
        )
        self.dialog.open()
