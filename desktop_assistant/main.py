import speech_recognition as sr
import pyttsx3
import datetime
import wikipedia
import webbrowser
import os
import time
import subprocess
from ecapture import ecapture as ec
import wolframalpha
import requests

print('Loading your AI personal assistant - JARVIS')

engine = pyttsx3.init('sapi5')
voices = engine.getProperty('voices')
engine.setProperty('voice', 'voices[0].id')


def speak(text):
    engine.say(text)
    engine.runAndWait()


def wishMe():
    hour = datetime.datetime.now().hour
    if 0 <= hour < 12:
        speak("Hello,Good Morning")
        print("Hello,Good Morning")
    elif 12 <= hour < 18:
        speak("Hello,Good Afternoon")
        print("Hello,Good Afternoon")
    else:
        speak("Hello,Good Evening")
        print("Hello,Good Evening")

def playMusic():
    while True:
        speak("Sure, please tell me the name of the song you'd like to play.")
        song_name = takeCommand().lower()

        if song_name:
            music_dir = 'C://Users//Hi//Music'  # Change this path to your music directory
            songs = os.listdir(music_dir)
            song_found = False

            # Check if the song_name exists in your local music library
            for song in songs:
                if song_name in song.lower():
                    # Play the local music file
                    os.startfile(os.path.join(music_dir, song))
                    song_found = True
                    break

            if not song_found:
                print(f"Song '{song_name}' not found in the local library. Searching on YouTube...")
                web_search_query = f"{song_name} official music video"
                youtube_search_url = f"https://www.youtube.com/results?search_query={web_search_query}"
                webbrowser.open_new_tab(youtube_search_url)
                break
        else:
            speak("I didn't hear the name of the song. Please try again.")

def takeCommand():
    r = sr.Recognizer()
    with sr.Microphone() as source:
        print("Listening...")
        r.adjust_for_ambient_noise(source, duration=3)
        audio = r.listen(source)
        try:
            statement = r.recognize_google(audio, language='en-in')
            print(f"user said:{statement}\n")

        except Exception as e:
            speak("YEP BRO!. say that again.")
            return "None"
        return statement


speak("Loading your AI personal assistant JARVIS")
wishMe()


def speak(text):
    # Split the text into sentences based on full stops
    sentences = text.split('.')

    for sentence in sentences:
        # Speak each sentence
        engine.say(sentence.strip())
        engine.runAndWait()

        # Pause for a moment after each full stop
        time.sleep(0.05)  # You can adjust the sleep duration as needed


'''speak("Hello sir, we have some tasks to do today. Here are the top three."
      "1. Check your LINKED IN and spend half an hour learning something new."
      "2. Go to HACK THE BOX Learn Linux for half an hour and then practice."
      "dont forget to add a function to your AI code.")'''

if __name__ == '__main__':

    while True:
        speak("hello sir. How can i help you now?")
        statement = takeCommand().lower()
        if statement == 0:
            continue

        if "good bye" in statement or "ok bye" in statement or "stop" in statement:
            speak('your personal assistant JARVIS is shutting down,Good bye')
            print('your personal assistant JARVIS is shutting down,Good bye')
            break

        if 'wikipedia' in statement:
            speak('Searching Wikipedia...')
            statement = statement.replace("wikipedia", "")
            results = wikipedia.summary(statement, sentences=3)
            speak("According to Wikipedia")
            print(results)
            speak(results)

        elif 'play music' in statement:
              playMusic()

        elif 'open linkedin' in statement or 'go with linkedin' in statement:
            linkedin_path = r'C:\Users\Hi\Desktop\LinkedIn.lnk'
            os.startfile(linkedin_path)

        elif 'open hack the box' in statement or 'go with HTB' in statement or 'go with hack the box' in statement:
            htb_path = r'C:\Users\Hi\Desktop\HTB.lnk'  # Replace with the actual path to your LinkedIn shortcut
            os.startfile(htb_path)

        elif 'open youtube' in statement:
            webbrowser.open_new_tab("https://www.youtube.com")
            speak("youtube is open now")
            time.sleep(5)

        elif 'open google' in statement:
            webbrowser.open_new_tab("https://www.google.com")
            speak("Google chrome is open now")
            time.sleep(5)

        elif 'open gmail' in statement:
            webbrowser.open_new_tab("gmail.com")
            speak("Google Mail open now")
            time.sleep(5)

        elif "weather" in statement:
            api_key = "8ef61edcf1c576d65d836254e11ea420"
            base_url = "https://api.openweathermap.org/data/2.5/weather?"
            speak("whats the city name")
            city_name = takeCommand()
            complete_url = base_url + "appid=" + api_key + "&q=" + city_name
            response = requests.get(complete_url)
            x = response.json()
            if x["cod"] != "404":
                y = x["main"]
                current_temperature = y["temp"]
                current_humidiy = y["humidity"]
                z = x["weather"]
                weather_description = z[0]["description"]
                speak(" Temperature in kelvin unit is " +
                      str(current_temperature) +
                      "\n humidity in percentage is " +
                      str(current_humidiy) +
                      "\n description  " +
                      str(weather_description))
                print(" Temperature in kelvin unit = " +
                      str(current_temperature) +
                      "\n humidity (in percentage) = " +
                      str(current_humidiy) +
                      "\n description = " +
                      str(weather_description))
            else:
                speak(" City Not Found ")

        elif 'search' in statement:
            statement = statement.replace("search", "")
            webbrowser.open_new_tab(statement)
            time.sleep(5)

        elif 'time' in statement:
            strTime = datetime.datetime.now().strftime("%H:%M:%S")
            speak(f"the time is {strTime}")

        elif 'who are you' in statement or 'what can you do' in statement:
            speak('I am JARVIS version 2 point O. Your persoanal assistant. I am programmed to minor tasks like'
                  'opening youtube,google chrome,gmail and stackoverflow ,predict time,take a photo,search wikipedia,predict weather'
                  'in different cities , get top headline news from times of india and you can ask me computational or geographical questions too!')

        elif "who made you" in statement or "who created you" in statement or "who discovered you" in statement:
            speak("I was built by chandu")
            print("I was built by chandu")

        elif "open stackoverflow" in statement:
            webbrowser.open_new_tab("https://stackoverflow.com/login")
            speak("Here is stackoverflow")

        elif 'news' in statement:
            news = webbrowser.open_new_tab("https://timesofindia.indiatimes.com/home/headlines")
            speak('Here are some headlines from the Times of India,Happy reading')
            time.sleep(6)

        elif "camera" in statement or "take a photo" in statement:
            ec.capture(0, "robo camera", "img.jpg")

        elif 'ask' in statement:
            speak('I can answer to computational and geographical questions and what question do you want to ask now')
            question = takeCommand()
            app_id = "R2K75H-7ELALHR35X"
            client = wolframalpha.Client('R2K75H-7ELALHR35X')
            res = client.query(question)
            answer = next(res.results).text
            speak(answer)
            print(answer)

        elif "log off" in statement or "shutdown" in statement:
            speak("Ok , your pc will log off in 10 sec make sure you exit from all applications")
            subprocess.call(["shutdown", "/l"])

time.sleep(3)
