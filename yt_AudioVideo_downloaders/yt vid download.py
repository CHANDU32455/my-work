from tkinter import *
from pytube import YouTube
import threading
from tkinter import filedialog  # Import the filedialog module

root = Tk()
root.state('zoomed')  # Maximize the window
root.title("YouTube Video Downloader")

Label(root, text='Copy the link of the video you want to download from YouTube',
      font='arial 15 bold').pack()

# Enter link
link = StringVar()

Label(root, text='Paste Link Here:', font='arial 15 bold').place(x=270, y=60)
Entry(root, width=80, textvariable=link).place(x=32, y=90)

# Status label
status_label = Label(root, text='', font='arial 15')
status_label.place(x=270, y=210)


# Function to check the link
def check_link():
    url_text = link.get()
    if url_text:
        try:
            url = YouTube(url_text)
            status_label.config(text='Link is valid')
            download_video_button.config(state=NORMAL)
            download_audio_button.config(state=NORMAL)
        except Exception as e:
            status_label.config(text='Invalid Link')
            download_video_button.config(state=DISABLED)
            download_audio_button.config(state=DISABLED)
    else:
        status_label.config(text='Enter a valid URL')
        download_video_button.config(state=DISABLED)
        download_audio_button.config(state=DISABLED)


# Button to check link
check_button = Button(root, text='Check URL', font='arial 15 bold', bg='white', padx=2, command=check_link)
check_button.place(x=150, y=150)


# Function to download video in the background
def download_video():
    status_label.config(text='Video Download started...')
    root.update()  # Update the GUI to show the message
    url = YouTube(str(link.get()))

    # Use filedialog to ask the user for the download folder
    folder = filedialog.askdirectory(title="Select Folder to Save Video")
    if folder:
        video = url.streams.filter(progressive=True, file_extension='mp4').order_by('resolution').desc().first()
        video.download(output_path=folder)  # Specify the folder where the video will be saved
        status_label.config(text='Video Downloaded to ' + folder)
    else:
        status_label.config(text='Video Download Canceled')


# Function to download audio in the background
def download_audio():
    status_label.config(text='Audio Download started...')
    root.update()  # Update the GUI to show the message
    url = YouTube(str(link.get()))

    # Use filedialog to ask the user for the download folder
    folder = filedialog.askdirectory(title="Select Folder to Save Audio")
    if folder:
        audio_stream = url.streams.filter(only_audio=True).first()
        audio_stream.download(output_path=folder)  # Specify the folder where the audio will be saved
        status_label.config(text='Audio Downloaded to ' + folder)
    else:
        status_label.config(text='Audio Download Canceled')


# Button to download video in the background
download_video_button = Button(root, text='Download Video', font='arial 15 bold', bg='white', padx=2, state=DISABLED,
                               command=download_video)
download_video_button.place(x=280, y=250)

# Button to download audio in the background
download_audio_button = Button(root, text='Download Audio', font='arial 15 bold', bg='white', padx=2, state=DISABLED,
                               command=download_audio)
download_audio_button.place(x=400, y=350)

root.mainloop()


--------------------------------------------------------------------------------------------------------------------
Before we start building our YouTube video downloader, you should have a basic understanding of Python and the following libraries:

pytube: a library for downloading YouTube videos
tkinter: a GUI library for building desktop applications
threading:Threading is used in our code to perform actions in the background. 

You can install these libraries using pip, a package manager for Python, by running the following command in your terminal:

pip install tkinter
pip install pytube
