# dialogs.py

from kivymd.uix.dialog import MDDialog
from kivymd.uix.button import MDFlatButton

from kivymd.uix.dialog import MDDialog
from kivymd.uix.button import MDFlatButton

def show_error(parent, title, message):
    if getattr(parent, 'dialog', None):
        parent.dialog.dismiss()

    parent.dialog = MDDialog(
        title=title,
        text=message,
        buttons=[
            MDFlatButton(
                text="OK", 
                on_release=lambda x: parent.dialog.dismiss()
            )
        ]
    )
    parent.dialog.open()


