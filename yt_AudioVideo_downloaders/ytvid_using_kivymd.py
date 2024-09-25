from kivy.lang import Builder
from kivymd.app import MDApp
from kivymd.uix.button import MDRaisedButton, MDFlatButton
from kivymd.uix.dialog import MDDialog
from kivymd.uix.filemanager import MDFileManager
from pytube import YouTube
from pytube.exceptions import RegexMatchError
import os

KV = '''
BoxLayout:
    orientation: "vertical"
    spacing: "12dp"
    padding: "10dp"
    
    MDTextField:
        id: url_input
        hint_text: "Enter YouTube URL"
        mode: "rectangle"
        icon_right: "youtube"
        size_hint_y: None
        height: "48dp"

    MDTextField:
        id: filename_input
        hint_text: "Enter filename (without extension)"
        mode: "rectangle"
        icon_right: "file"
        size_hint_y: None
        height: "48dp"
        
    MDTextField:
        id: destination_input
        hint_text: "Selected download folder"
        mode: "rectangle"
        icon_right: "folder"
        size_hint_y: None
        height: "48dp"
        on_focus: if self.focus: app.file_manager_open()

    MDRaisedButton:
        text: "Download"
        size_hint_y: None
        height: "48dp"
        on_release: app.download()
'''

class YouTubeDownloaderApp(MDApp):
    def build(self):
        self.root = Builder.load_string(KV)
        self.file_manager = MDFileManager(
            exit_manager=self.exit_manager,
            select_path=self.select_path,
        )
        return self.root

    def file_manager_open(self):
        self.file_manager.show('/')

    def select_path(self, path):
        self.root.ids.destination_input.text = path
        self.exit_manager()

    def exit_manager(self, *args):
        self.file_manager.close()

    def download_audio(self, yt, destination, filename):
        try:
            audio_stream = yt.streams.filter(only_audio=True).first()
            audio_path = os.path.join(destination, f"{filename}.mp3")
            audio_stream.download(output_path=destination, filename=f"{filename}.mp3")
            self.show_alert("Success", "Audio downloaded successfully!")
            self.clear_inputs()
        except Exception as e:
            self.show_alert("Error", f"An error occurred: {str(e)}")

    def download_video(self, yt, destination, filename):
        try:
            video_stream = yt.streams.filter(file_extension="mp4").first()
            video_path = os.path.join(destination, f"{filename}.mp4")
            video_stream.download(output_path=destination, filename=f"{filename}.mp4")
            self.show_alert("Success", "Video downloaded successfully!")
            self.clear_inputs()
        except Exception as e:
            self.show_alert("Error", f"An error occurred: {str(e)}")

    def download(self):
        url = self.root.ids.url_input.text
        destination = self.root.ids.destination_input.text
        filename = self.root.ids.filename_input.text.strip()

        if not url:
            self.show_alert("Error", "Please enter a valid YouTube URL.")
            return None
        
        if not filename:
            self.show_alert("Error", "Please enter a valid filename.")
            return None

        try:
            yt = YouTube(url)
            self.show_options(yt, destination, filename)
        except RegexMatchError:
            self.show_alert("Error", "Invalid YouTube URL.")
        except Exception as e:
            self.show_alert("Error", f"An error occurred: {str(e)}")

    def show_options(self, yt, destination, filename):
        dialog = MDDialog(
            title="Download Options",
            text="Select an option:",
            buttons=[
                MDFlatButton(
                    text="Download Audio",
                    on_release=lambda x: self.download_audio_and_dismiss(dialog, yt, destination, filename)
                ),
                MDFlatButton(
                    text="Download Video",
                    on_release=lambda x: self.download_video_and_dismiss(dialog, yt, destination, filename)
                ),
            ]
        )
        dialog.open()

    def download_audio_and_dismiss(self, dialog, yt, destination, filename):
        dialog.dismiss()
        self.download_audio(yt, destination, filename)

    def download_video_and_dismiss(self, dialog, yt, destination, filename):
        dialog.dismiss()
        self.download_video(yt, destination, filename)

    def show_alert(self, title, text):
        alert = MDDialog(
            title=title,
            text=text,
            buttons=[
                MDFlatButton(
                    text="OK",
                    on_release=lambda x: alert.dismiss()
                ),
            ]
        )
        alert.open()

    def clear_inputs(self):
        self.root.ids.url_input.text = ""
        self.root.ids.filename_input.text = ""

if __name__ == '__main__':
    YouTubeDownloaderApp().run()
