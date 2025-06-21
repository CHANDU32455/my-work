# constants.py

import os

LOCKER_DIR = "locker"
METADATA_FILE = os.path.join(LOCKER_DIR, "metadata.json")
os.makedirs(LOCKER_DIR, exist_ok=True)
