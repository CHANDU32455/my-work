# main.py

from kivymd.app import MDApp
from kivy.uix.boxlayout import BoxLayout

from first_step import is_first_run, WelcomeScreen, LoginScreen
from locker_ui import MainLockerUI

class MainApp(MDApp):
    def build(self):
        self.container = BoxLayout(orientation='vertical')
        if is_first_run():
            self.container.add_widget(WelcomeScreen(on_done_callback=self.reload))
        else:
            self.container.add_widget(LoginScreen(on_success_callback=self.launch_main_ui))
        return self.container

    def reload(self):
        self.container.clear_widgets()
        self.container.add_widget(LoginScreen(on_success_callback=self.launch_main_ui))

    def launch_main_ui(self):
        self.container.clear_widgets()
        self.container.add_widget(MainLockerUI())

if __name__ == '__main__':
    MainApp().run()
