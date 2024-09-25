from kivy.app import App
from kivy.uix.boxlayout import BoxLayout
from kivy.uix.button import Button
from kivy.uix.textinput import TextInput
from kivy.uix.label import Label
from kivy.uix.filechooser import FileChooserListView
from pytube import YouTube
from pytube.exceptions import RegexMatchError
from pydub import AudioSegment
from kivy.uix.popup import Popup
from kivy.uix.modalview import ModalView
import os

class YouTubeDownloaderApp(App):
    def build(self):
        self.layout = BoxLayout(orientation='vertical', spacing=10, padding=10)

        self.url_label = Label(text="Enter YouTube URL:")
        self.layout.add_widget(self.url_label)

        self.url_input = TextInput(multiline=False)
        self.layout.add_widget(self.url_input)

        self.destination_label = Label(text="Selected download folder:")
        self.layout.add_widget(self.destination_label)

        self.filename_input = TextInput(multiline=False, hint_text="Enter filename (without extension)")
        self.layout.add_widget(self.filename_input)

        self.path_output_label = Label(text="")
        self.layout.add_widget(self.path_output_label)

        self.destination_button = Button(text="Select Destination", on_press=self.select_destination)
        self.layout.add_widget(self.destination_button)

        self.download_button = Button(text="Download", on_press=self.download)
        self.layout.add_widget(self.download_button)

        return self.layout

    def show_popup(self, title, content):
        popup = Popup(title=title, content=Label(text=content), size_hint=(None, None), size=(400, 200))
        popup.open()

    def select_destination(self, instance):
        modal = ModalView(size_hint=(0.9, 0.9))
        file_chooser = FileChooserWithBackAndChooseButtons(modal=modal, app=self)
        file_chooser.bind(on_submit=self.update_destination)
        modal.add_widget(file_chooser)
        modal.open()

    def update_destination(self, instance):
        selected_path = instance.selection and instance.selection[0] or '.'
        self.destination_label.text = f"Selected download folder: {selected_path}"
        self.path_output_label.text = f"This is your selected folder: {selected_path}"
        instance.parent.dismiss()  # Close the modal (path selection) window

    def download_audio(self, yt, destination, filename):
        try:
            audio_stream = yt.streams.filter(only_audio=True).first()
            audio_path = os.path.join(destination, f"{filename}.mp3")
            audio_stream.download(output_path=destination, filename=f"{filename}.mp3")
            self.show_popup("Success", "Audio downloaded successfully!")
            self.path_output_label.text = f"Audio downloaded to: {audio_path}"

            # Automatically close the download options dialogue box
            self.dismiss_popup()

        except Exception as e:
            self.show_popup("Error", f"An error occurred: {str(e)}")

    def download_video(self, yt, destination, filename):
        try:
            video_stream = yt.streams.filter(file_extension="mp4").first()
            video_path = os.path.join(destination, f"{filename}.mp4")
            video_stream.download(output_path=destination, filename=f"{filename}.mp4")
            self.show_popup("Success", "Video downloaded successfully!")
            self.path_output_label.text = f"Video downloaded to: {video_path}"

            # Automatically close the download options dialogue box
            self.dismiss_popup()

        except Exception as e:
            self.show_popup("Error", f"An error occurred: {str(e)}")

    def download(self, instance):
        url = self.url_input.text
        destination = self.destination_label.text.replace("Selected download folder: ", "")
        filename = self.filename_input.text.strip()
        
        if not filename:
            self.show_popup("Error", "Please enter a valid filename.")
            return

        try:
            yt = YouTube(url)
            
            options_layout = BoxLayout(orientation='vertical', spacing=10, padding=10)
            options_label = Label(text="Select an option:")
            options_layout.add_widget(options_label)
    
            audio_button = Button(text="Download Audio", on_press=lambda instance: self.download_audio(yt, destination, filename))
            options_layout.add_widget(audio_button)
    
            video_button = Button(text="Download Video", on_press=lambda instance: self.download_video(yt, destination, filename))
            options_layout.add_widget(video_button)
    
            popup = Popup(title='Download Options', content=options_layout, size_hint=(None, None), size=(300, 200))
            popup.open()
    
        except RegexMatchError:
            self.show_popup("Error", "Invalid YouTube URL.")
        except Exception as e:
            self.show_popup("Error", f"An error occurred: {str(e)}")

    def dismiss_popup(self):
        # Dismiss the Popup
        self.popup.dismiss()

class FileChooserWithBackAndChooseButtons(FileChooserListView):
    def __init__(self, modal, app, **kwargs):
        self.modal = modal
        self.app = app
        super(FileChooserWithBackAndChooseButtons, self).__init__(**kwargs)

        # Create a box layout for buttons
        buttons_layout = BoxLayout(size_hint_y=None, height=44)

        # Back button
        back_button = Button(text='Back', size_hint=(None, 1))
        back_button.bind(on_press=self.navigate_to_parent)
        buttons_layout.add_widget(back_button)

        # Choose button
        choose_button = Button(text='Choose', size_hint=(None, 1))
        choose_button.bind(on_press=self.choose_current)
        buttons_layout.add_widget(choose_button)

        # Add the buttons layout to the main layout
        self.add_widget(buttons_layout)

    def is_hidden(self, fn):
        try:
            # Filter out specific system-related files
            if os.path.basename(fn) in ['DumpStack.log.tmp', 'hiberfil.sys', 'pagefile.sys', 'swapfile.sys']:
                return True
            return super(FileChooserWithBackAndChooseButtons, self).is_hidden(fn)
        except:
            return True

    def navigate_to_parent(self, instance):
        parent = os.path.dirname(self.path)
        self.path = parent

    def choose_current(self, instance):
        self.app.update_destination(self)
        self.modal.dismiss()  # Close the modal (path selection) window

if __name__ == '__main__':
    YouTubeDownloaderApp().run()

#  https://youtu.be/SESWAIfcw7Q?si=_labvqkTURygCFAD   ---omkareshwari yt  video link
    