import os
import base64
import hashlib
import tempfile

from Crypto.Cipher import AES
from Crypto.Protocol.KDF import PBKDF2
from Crypto.Random import get_random_bytes

from constants import LOCKER_DIR

# fixed password and salt used internally (you can randomize once and hardcode if needed)
FIXED_PASSWORD = "secure-default-passphrase"
FIXED_SALT = b"fixed_salt_for_locker"

def _get_key():
    return PBKDF2(FIXED_PASSWORD, FIXED_SALT, dkLen=32, count=100000)

def encrypt_file(filepath):
    key = _get_key()

    with open(filepath, 'rb') as f:
        file_data = f.read()

    # PKCS7 padding
    pad_len = 16 - (len(file_data) % 16)
    file_data += bytes([pad_len] * pad_len)

    cipher = AES.new(key, AES.MODE_CBC)
    encrypted_data = cipher.iv + cipher.encrypt(file_data)

    base_name = os.path.basename(filepath)
    enc_filename = f"enc_{hashlib.sha256(base_name.encode()).hexdigest()[:16]}.locked"
    enc_filepath = os.path.join(LOCKER_DIR, enc_filename)

    with open(enc_filepath, 'wb') as f:
        f.write(encrypted_data)

    metadata_entry = {
        'original_name': base_name,
        'encrypted_filename': enc_filename,
        'size': f"{len(file_data) / 1024:.1f} KB",
        'iv': base64.b64encode(cipher.iv).decode('utf-8')
    }

    return enc_filename, metadata_entry

def decrypt_file(filepath, metadata):
    with open(filepath, 'rb') as f:
        encrypted_data = f.read()

    if len(encrypted_data) < 16:
        raise ValueError("Encrypted file too short or corrupted.")

    try:
        iv = base64.b64decode(metadata['iv'])
    except Exception as e:
        raise ValueError("Missing or corrupt IV in metadata.")

    key = _get_key()
    cipher = AES.new(key, AES.MODE_CBC, iv=iv)

    decrypted_data = cipher.decrypt(encrypted_data[16:])

    if not decrypted_data or len(decrypted_data) == 0:
        raise ValueError("Failed to decrypt or file is empty.")

    pad_len = decrypted_data[-1]
    if not (1 <= pad_len <= 16):
        raise ValueError("Invalid padding.")

    decrypted_data = decrypted_data[:-pad_len]

    with tempfile.NamedTemporaryFile(delete=False) as tmp:
        tmp.write(decrypted_data)
        return tmp.name
