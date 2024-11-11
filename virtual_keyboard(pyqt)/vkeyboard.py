import sys
from PyQt5.QtWidgets import (
    QApplication, QMainWindow, QLineEdit, QVBoxLayout, QHBoxLayout, QWidget,
    QGridLayout, QPushButton, QMessageBox
)
from PyQt5.QtCore import Qt

class VirtualKeyboard(QWidget):
    def __init__(self):
        super().__init__()
        self.target_field = None
        self.caps_active = False
        self.shift_active = False
        self.setWindowTitle("Virtual Keyboard")
        self.setFixedSize(700, 350)

        self.layout = QGridLayout(self)
        self.create_keyboard()
        print("VirtualKeyboard initialized with Shift and Caps Lock functionality.")

    def create_keyboard(self):
        """Creates the keyboard layout and connects buttons."""
        # Keyboard layout rows
        self.keys_layout = [
            ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
            ['Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', '\\'],
            ['Caps', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', "'", 'Enter'],
            ['Shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/', 'Shift'],
            ['Space']
        ]
        # Symbols for shifted keys
        self.secondary_symbols = {
            '1': '!', '2': '@', '3': '#', '4': '$', '5': '%',
            '6': '^', '7': '&', '8': '*', '9': '(', '0': ')',
            '`': '~', '-': '_', '=': '+', '[': '{', ']': '}',
            '\\': '|', ';': ':', "'": '"', ',': '<', '.': '>', '/': '?'
        }

        # Add the buttons to the layout
        for row_idx, key_row in enumerate(self.keys_layout):
            for col_idx, key in enumerate(key_row):
                button = QPushButton(self.get_key_label(key))
                button.setMinimumSize(40, 40)  # Default size for normal keys
                if key == 'Space':
                    button.setMinimumSize(180, 40)  # Spacebar size (centered)
                elif key in ['Shift', 'Caps', 'Backspace', 'Tab', 'Enter']:
                    button.setMinimumSize(60, 40)  # Special keys with extra space around them
                button.clicked.connect(self.handle_key_press)
                self.layout.addWidget(button, row_idx, col_idx, 1, 1)
        print("Keyboard layout created with Caps Lock and Shift functionality.")

    def get_key_label(self, key):
        """Returns the label to display on each key."""
        if key in self.secondary_symbols:
            return f"{key}\n{self.secondary_symbols.get(key, '')}"
        return key

    def toggle_caps_lock(self):
        """Toggles Caps Lock state and updates the key colors."""
        self.caps_active = not self.caps_active
        print(f"Caps Lock toggled: {'On' if self.caps_active else 'Off'}")
        self.update_key_color('Caps', self.caps_active)

    def toggle_shift(self):
        """Toggles Shift state and updates the key colors."""
        self.shift_active = not self.shift_active
        print(f"Shift toggled: {'On' if self.shift_active else 'Off'}")
        self.update_key_color('Shift', self.shift_active)

    def update_key_color(self, key, active):
        """Updates the color of Shift and Caps Lock keys."""
        for button in self.findChildren(QPushButton):
            if button.text() == key:
                if active:
                    button.setStyleSheet("background-color: skyblue; color: black;")
                else:
                    button.setStyleSheet("color: black;")

    def update_keyboard(self):
        """Updates the keyboard layout based on Caps Lock and Shift states."""
        for i in range(self.layout.count()):
            button = self.layout.itemAt(i).widget()
            key = button.text().split('\n')[0]  # Get the key (ignore second line if present)
            button.setText(self.get_key_label(key))

    def handle_key_press(self):
        """Handles the key press logic."""
        if not self.target_field:
            return

        key = self.sender().text().split('\n')[0]  # Only take the first part (actual key value)
        print(f"Key pressed: {key}")

        # Handle special keys
        if key == 'Space':
            self.target_field.insert(' ')
        elif key == 'Backspace':
            current_text = self.target_field.text()
            self.target_field.setText(current_text[:-1])
        elif key == 'Enter':
            self.hide()
        elif key == 'Tab':
            self.target_field.insert("    ")
        elif key == 'Caps':
            self.toggle_caps_lock()
        elif key == 'Shift':
            self.toggle_shift()
        else:
            # Insert appropriate character based on Shift and Caps Lock states
            if self.shift_active and key in self.secondary_symbols:
                self.target_field.insert(self.secondary_symbols[key])
                self.toggle_shift()
            else:
                char = key.upper() if (self.caps_active or self.shift_active) else key.lower()
                self.target_field.insert(char)

                if self.shift_active:
                    self.toggle_shift()

    def set_target_field(self, field):
        """Sets the target QLineEdit field for the virtual keyboard."""
        self.target_field = field
        print(f"Target field set to: {self.target_field}")

class MainWindow(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("Virtual Keyboard Example")
        self.setFixedSize(900, 800)  # Increase main window size

        central_widget = QWidget(self)
        self.setCentralWidget(central_widget)

        # Main layout with center alignment and added margins
        main_layout = QVBoxLayout(central_widget)
        main_layout.setAlignment(Qt.AlignCenter)
        main_layout.setContentsMargins(150, 150, 150, 150)  # Add margin to prevent elements touching the walls

        # Create container widget to hold the fields and buttons
        container = QWidget(self)
        container_layout = QVBoxLayout(container)

        # Add padding and space between elements inside the container
        container_layout.setSpacing(20)  # Increased space between elements
        container_layout.setContentsMargins(30, 30, 30, 30)  # Add padding around the container

        self.fields = []
        self.keyboard = VirtualKeyboard()
        self.keyboard.move(100, 100)

        # Create input fields and add them to the container
        for i in range(3):
            field = QLineEdit(self)
            field.setPlaceholderText(f"Input Field {i+1}")
            field.setFocusPolicy(Qt.StrongFocus)
            field.installEventFilter(self)
            container_layout.addWidget(field)
            self.fields.append(field)

        # Submit Button
        submit_button = QPushButton("Submit")
        submit_button.setMaximumSize(150, 50)  # Limit the size of the submit button
        submit_button.clicked.connect(self.show_values)
        container_layout.addWidget(submit_button)

        # Add the container to the main layout
        main_layout.addWidget(container)

        # Create Show Virtual Keyboard Button with custom position and size
        self.show_keyboard_button = QPushButton("Show Virtual Keyboard")
        self.show_keyboard_button.setFixedSize(200, 50)  # Set custom size (Width: 200px, Height: 50px)
        self.show_keyboard_button.clicked.connect(self.toggle_keyboard)

        # Position the "Show Virtual Keyboard" button at the top-right
        self.show_keyboard_button.move(self.width() - self.show_keyboard_button.width() - 30, 20)

        # Add the button to the main layout (this is optional if you are placing it manually)
        central_widget.layout().addWidget(self.show_keyboard_button)

    def eventFilter(self, source, event):
        """Handles events related to focus changes for QLineEdits."""
        if isinstance(source, QLineEdit):
            if event.type() == event.FocusIn:
                self.keyboard.set_target_field(source)
                self.keyboard.raise_()
                self.keyboard.show()
                print(f"Keyboard shown for field: {source.placeholderText()}")
            elif event.type() == event.FocusOut:
                if self.keyboard.isActiveWindow():
                    return True
                self.keyboard.set_target_field(None)
                print(f"Keyboard target cleared for field: {source.placeholderText()}")
        return super().eventFilter(source, event)

    def toggle_keyboard(self):
        """Toggles the visibility of the virtual keyboard."""
        if self.keyboard.isVisible():
            self.keyboard.hide()
            print("Keyboard hidden.")
        else:
            self.keyboard.show()
            self.keyboard.raise_()
            print("Keyboard shown.")

    def show_values(self):
        """Shows the values entered in the input fields."""
        values = [field.text() for field in self.fields]
        values_text = "\n".join(f"Field {i+1}: {value}" for i, value in enumerate(values))
        print("Showing input values.")
        QMessageBox.information(self, "Input Values", values_text)

    def closeEvent(self, event):
        """Handles close event for cleanup."""
        self.keyboard.close()
        event.accept()

if __name__ == "__main__":
    app = QApplication(sys.argv)
    window = MainWindow()
    window.show()
    sys.exit(app.exec_())
