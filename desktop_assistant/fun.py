import pyttsx3
import speech_recognition as sr
import pygame
import time
import webbrowser
# -----------------------------initializing pygame for music playing ----------------------------
pygame.init()

def play_music(filepath):
    pygame.mixer.music.load(filepath)
    pygame.mixer.music.play()

# --------------------------------------------initiating pyttsx3 engine here----------------------
engine = pyttsx3.init('sapi5')
voices = engine.getProperty('voices')
engine.setProperty('voice', voices[1].id)

def speak(text):
    engine.say(text)
    engine.runAndWait()

print('Activating fun mode....')
speak('Activating fun mode....')
# ---------------------------------------- speech recognition  for taking commands----------------------------------
def takeCommand():
    r = sr.Recognizer()
    with sr.Microphone() as source:
        print("Listening...")
        r.adjust_for_ambient_noise(source, duration=3)
        audio = r.listen(source)
        try:
            statement = r.recognize_google(audio, language='en-in')
            print(f"user said: {statement}\n")
        except Exception:
            speak("Sorry, I didn't catch that. Could you please repeat?")
            return "None"
        return statement

print('Listening....')
# -----------------------------------------------------------------------------------------
if __name__ == '__main__':
    while True:
        speak("Hello sir. How can I help you now?")
        statement = takeCommand().lower()
        if statement == 0:
            continue

        elif "goodbye" in statement or "bye" in statement:
            speak('Your personal assistant JARVIS is shutting down. Goodbye.')
            break

        elif "can i kiss you ?" in statement or "can you kiss me" in statement or "i love you"  in statement:
            play_music('plays/proudsesingle.mp3')
            # Put engine to sleep while the music is playing
            while pygame.mixer.music.get_busy():
                time.sleep(1)
            # Wake up pyttsx3 engine after the music is finished playing
            speak(" Yeah darling! , whats next?")

        elif 'how are you' in statement:
            speak('I am fine sir, what about you?')

        elif 'what about a date' in statement or "shall we go for a date" in statement:
            speak("Sure darling, what time do you want to go for a date?")
        elif "open youtube" in statement:
            speak("opening youtube")
            webbrowser.open_new_tab("https://www.youtube.com")
            time.sleep(5)
        else:
            speak("Sorry, I didn't catch that. Could you please repeat?")

# ========================================================================================================
# ========================================================================================================
