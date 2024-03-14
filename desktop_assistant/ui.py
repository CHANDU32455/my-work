import tkinter as tk
from tkinter import ttk
from PIL import Image, ImageTk
from plyer import notification 
from tkinter import ttk
from tkcalendar import  DateEntry  # Import the DateEntry widget from tkcalendar


class UI:
    def __init__(self):
        self.root = tk.Tk()
        self.root.title("Personal Assistant")

        # Get screen width and height
        screen_width = self.root.winfo_screenwidth()
        screen_height = self.root.winfo_screenheight()

        # Set the size of the window
        window_width = 600
        window_height = 400
        x_position = (screen_width - window_width) // 2
        y_position = (screen_height - window_height) // 2
        self.root.geometry(f"{window_width}x{window_height}+{x_position}+{y_position}")

        # Create a frame to hold the elements
        self.frame = ttk.Frame(self.root)
        self.frame.pack(fill=tk.BOTH, expand=True)

        # Create the text field
        self.text_field = ttk.Entry(self.frame)
        self.text_field.place(x=800, y=50, width=450, height=700)

        # Load the GIF
        gif_path = "uistuff/loading.gif"  # Update the path accordingly

        # Open the GIF file and create a sequence of frames
        gif_image = Image.open(gif_path)
        self.frames = []
        try:
            while True:
                self.frames.append(ImageTk.PhotoImage(gif_image.copy()))
                gif_image.seek(len(self.frames))  # Move to the next frame
        except EOFError:
            pass  # End of sequence

        # Create a label to display the GIF
        self.label_gif = ttk.Label(self.frame, width=600)
        self.label_gif.place(x=400, y=350, anchor=tk.CENTER)
        self.update_label(0)  # Start the animation

        # Create a settings button
        self.settings_button = ttk.Button(self.frame, text="Settings", command=self.open_settings)
        self.settings_button.place(x=50, y=10)
    
    def update_label(self, frame_num):
        frame = self.frames[frame_num]
        self.label_gif.configure(image=frame)
        self.label_gif.image = frame
        self.root.after(50, self.update_label, (frame_num + 1) % len(self.frames))
    def notify(self, title, message):
        notification.notify(
            title=title,
            message=message,
            app_icon="uistuff/notify.ico",
            timeout=10
    )

    def open_settings(self):
        # Create a new window for settings
        settings_window = tk.Toplevel(self.root, width=400, height=300)
        settings_window.title("Settings")

        # Create a button named "Add App"
        add_app_button = tk.Button(settings_window, text="Add App", command=self.add_app_window)
        add_app_button.place(x=50, y=30)

        # create a butten named "notification"
        notification_button = tk.Button(settings_window, text="Notification", command = self.add_notification_window)
        notification_button.place(x=50, y=60)

    def add_app_window(self):
        def save_app():
            name = name_entry.get()
            path = path_entry.get()
            with open("app_paths.txt", "a") as file:
                file.write(f"{name},{path}\n")
            add_app_window.destroy()

        # Create a new window for adding apps
        add_app_window = tk.Toplevel(self.root)
        add_app_window.title("Add App")

        # Create labels and entry fields for name and path
        ttk.Label(add_app_window, text="Name:").grid(row=0, column=0, padx=5, pady=5, sticky="e")
        name_entry = ttk.Entry(add_app_window)
        name_entry.grid(row=0, column=1, padx=5, pady=5)
        ttk.Label(add_app_window, text="Path:").grid(row=1, column=0, padx=5, pady=5, sticky="e")
        path_entry = ttk.Entry(add_app_window)
        path_entry.grid(row=1, column=1, padx=5, pady=5)

        # Create a Save button
        save_button = ttk.Button(add_app_window, text="Save", command=save_app)
        save_button.grid(row=2, column=0, columnspan=2, pady=10)
    def add_notification_window(self):
        def save_notification():
            message = message_entry.get()
            time = time_entry.get()  # Get the time from the DateEntry widget
            with open("notifications.txt", "a") as file:
                file.write(f"{message},{time}\n")
            self.notify(message, time)
            add_notification_window.destroy()

        # Create a new window for adding notifications
        add_notification_window = tk.Toplevel(self.root)
        add_notification_window.title("Add Notification")

        # Create labels and entry fields for message and time
        ttk.Label(add_notification_window, text="Message:").grid(row=0, column=0, padx=5, pady=5, sticky="e")
        message_entry = ttk.Entry(add_notification_window)
        message_entry.grid(row=0, column=1, padx=5, pady=5)

        ttk.Label(add_notification_window, text="Time:").grid(row=1, column=0, padx=5, pady=5, sticky="e")
        time_entry = DateEntry(add_notification_window, width=12, background='darkblue', foreground='white', borderwidth=2)
        time_entry.grid(row=1, column=1, padx=5, pady=5)

        # Create a Save button
        save_button = ttk.Button(add_notification_window, text="Save", command=save_notification)
        save_button.grid(row=2, column=0, columnspan=2, pady=10)


    def run(self):
        self.root.mainloop()

if __name__ == "__main__":
    ui = UI()
    ui.run()

