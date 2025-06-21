#  first_step.py 


import os
import hashlib
import json
from kivymd.uix.boxlayout import MDBoxLayout
from kivymd.uix.button import MDFlatButton
from kivymd.uix.textfield import MDTextField
from kivymd.uix.label import MDLabel
from kivymd.uix.dialog import MDDialog
from kivy.uix.screenmanager import Screen

PASSWORD_FILE = ".passwd"
LOCKER_DIR = "locker"
os.makedirs(LOCKER_DIR, exist_ok=True)

def hash_password(password):
    return hashlib.sha256(password.encode()).hexdigest()

def save_password(password):
    with open(PASSWORD_FILE, "w") as f:
        f.write(hash_password(password))

def check_password(input_pwd):
    if not os.path.exists(PASSWORD_FILE):
        return False
    with open(PASSWORD_FILE, "r") as f:
        saved_hash = f.read().strip()
    return saved_hash == hash_password(input_pwd)

def is_first_run():
    return not os.path.exists(PASSWORD_FILE)

class WelcomeScreen(Screen):
    def __init__(self, on_done_callback, **kwargs):
        super().__init__(**kwargs)
        self.on_done_callback = on_done_callback
        self.dialog = None

        layout = MDBoxLayout(orientation='vertical', padding=40, spacing=20)
        layout.add_widget(MDLabel(
            text="🔐 Welcome to Secure File Locker", 
            halign='center', 
            font_style='H5'
        ))
        layout.add_widget(MDLabel(
            text="Set a master password to begin.", 
            halign='center'
        ))

        self.password_input = MDTextField(
            hint_text="Enter Password", 
            password=True, 
            mode="rectangle"
        )
        layout.add_widget(self.password_input)

        self.confirm_input = MDTextField(
            hint_text="Confirm Password", 
            password=True, 
            mode="rectangle"
        )
        layout.add_widget(self.confirm_input)

        btn = MDFlatButton(
            text="Set Password", 
            pos_hint={"center_x": 0.5}
        )
        btn.bind(on_release=self.set_password)
        layout.add_widget(btn)

        self.add_widget(layout)

    def set_password(self, instance):
        pwd = self.password_input.text.strip()
        confirm = self.confirm_input.text.strip()

        if not pwd or not confirm:
            self.show_dialog("Error", "Fields cannot be empty.")
        elif pwd != confirm:
            self.show_dialog("Error", "Passwords do not match.")
        else:
            save_password(pwd)
            self.show_dialog("Success", "Password set successfully!", self.on_done_callback)

    def show_dialog(self, title, msg, callback=None):
        if self.dialog:
            self.dialog.dismiss()

        self.dialog = MDDialog(
            title=title,
            text=msg,
            buttons=[
                MDFlatButton(
                    text="OK",
                    on_release=lambda x: (
                        self.dialog.dismiss(), 
                        callback() if callback else None
                    )
                )
            ]
        )
        self.dialog.open()

class LoginScreen(Screen):
    def __init__(self, on_success_callback, **kwargs):
        super().__init__(**kwargs)
        self.on_success_callback = on_success_callback
        self.dialog = None

        layout = MDBoxLayout(orientation='vertical', padding=40, spacing=20)
        layout.add_widget(MDLabel(
            text="🔓 Enter your password", 
            halign='center', 
            font_style='H5'
        ))

        self.password_input = MDTextField(
            hint_text="Master Password", 
            password=True, 
            mode="rectangle"
        )
        layout.add_widget(self.password_input)

        btn = MDFlatButton(
            text="Unlock", 
            pos_hint={"center_x": 0.5}
        )
        btn.bind(on_release=self.validate)
        layout.add_widget(btn)

        self.add_widget(layout)

    def validate(self, instance):
        if check_password(self.password_input.text.strip()):
            self.on_success_callback()
        else:
            self.show_dialog("Access Denied", "Incorrect password")

    def show_dialog(self, title, msg):
        if self.dialog:
            self.dialog.dismiss()

        self.dialog = MDDialog(
            title=title,
            text=msg,
            buttons=[
                MDFlatButton(
                    text="OK",
                    on_release=lambda x: self.dialog.dismiss()
                )
            ]
        )
        self.dialog.open()