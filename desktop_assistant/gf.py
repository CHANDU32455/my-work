import pyttsx3
import speech_recognition as sr
import pygame
import time

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

print('Activating GF mode....')
speak('Activating GF mode....')
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
            speak(" Daaarling !!!  please repeat it.")
            return "None"
        return statement

print('Listening....')

# -----------------------------------------------------------------------------------------
def activate_gf_mode():
    while True:
        speak("Hello. How can I help you now?")
        statement = takeCommand().lower()
        if statement == 0:
            continue
        elif "stop girlfriend mode" in statement:
            speak("Ok, Lets breakup. Goodbye.")
            break

        elif "goodbye" in statement or "bye" in statement:
            speak('Goodbye ? ok, its over. Goodbye.')
            break

        elif "can i kiss you" in statement or "can you kiss me" in statement or "i love you"  in statement:
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
        else : 
            speak("i cant get you. Try again")

# ========================================================================================================
# ========================================================================================================
            
activate_gf_mode()