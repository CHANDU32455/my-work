from kivymd.uix.card import MDCard
from kivymd.uix.boxlayout import MDBoxLayout
from kivymd.uix.label import MDLabel
from kivymd.uix.button import MDFlatButton
from kivymd.uix.dialog import MDDialog
from kivymd.uix.list import IconLeftWidget
from kivy.properties import StringProperty, ObjectProperty


class FileTile(MDCard):
    filename = StringProperty()
    filepath = StringProperty()
    metadata = ObjectProperty()

    def __init__(self, filename, filepath, metadata, on_open_callback, on_delete_callback, **kwargs):
        super().__init__(**kwargs)
        self.filename = filename
        self.filepath = filepath
        self.metadata = metadata
        self.on_open_callback = on_open_callback
        self.on_delete_callback = on_delete_callback

        self.size_hint_y = None
        self.height = "100dp"
        self.elevation = 3
        self.padding = "10dp"
        self.spacing = "10dp"

        layout = MDBoxLayout(orientation='horizontal', spacing="10dp")

        icon = IconLeftWidget(icon="file-document")
        layout.add_widget(icon)

        content = MDBoxLayout(orientation='vertical')
        content.add_widget(MDLabel(text=filename, font_style="Subtitle1"))
        content.add_widget(MDLabel(text=f"Size: {metadata.get('size', 'N/A')}", font_style="Caption"))

        layout.add_widget(content)

        # Add button box
        button_box = MDBoxLayout(orientation='vertical', size_hint_x=0.3)
        open_btn = MDFlatButton(text="Open", on_release=lambda x: self.on_open_callback(self.filepath, self.metadata))
        delete_btn = MDFlatButton(text="Delete", on_release=lambda x: self.on_delete_callback(self.filename))
        button_box.add_widget(open_btn)
        button_box.add_widget(delete_btn)

        layout.add_widget(button_box)
        self.add_widget(layout)

    def on_double_tap(self, instance, touch):
        if self.collide_point(*touch.pos) and touch.is_double_tap:
            self.on_open_callback(self.filepath, self.metadata)
            return True
        return False


class FileViewerDialog(MDDialog):
    def __init__(self, content, on_dismiss=None, **kwargs):
        super().__init__(
            title="File Viewer",
            type="custom",
            content_cls=content,
            size_hint=(0.9, 0.9),
            buttons=[
                MDFlatButton(text="CLOSE", on_release=self.dismiss)
            ],
            **kwargs
        )
        if on_dismiss:
            self.bind(on_dismiss=on_dismiss)
