import os
import sys
import ctypes

def is_admin():
    try:
        return ctypes.windll.shell32.IsUserAnAdmin()
    except:
        return False

if not is_admin():
    # Re-run the script with elevated privileges
    ctypes.windll.shell32.ShellExecuteW(None, "runas", sys.executable, ' '.join(sys.argv), None, 1)
    sys.exit()

# Get the major and minor numbers of the current python version
PYTHON_VER = dict(zip(("major", "minor", "patch"), tuple(sys.version_info)[0:3]))

# If the python version is 3.12 or more, back out.
if PYTHON_VER['major'] >= 3 and PYTHON_VER['minor'] >= 12:
    raise Exception("Your python version must not exceed 3.11 due to compatibility issues with bottle.py (https://github.com/bottlepy/bottle/issues/1430)")

if PYTHON_VER['major'] == 3 and PYTHON_VER["minor"] == 10 and PYTHON_VER["patch"] == 0:
    raise Exception("Your python is 3.10.0 which is known to have issues with pyinstaller (https://github.com/pyinstaller/pyinstaller/issues/6301).")

# Install the dependencies
print("Installing dependencies")
os.system('cd .. && python -m pip install -r requirements.txt')

# Fix bottle.py ( refers to https://github.com/SuppliedOrange/VALORANT-Instalocker/issues/3 )
print("Fixing bottle.py")
os.system('python replace_bottle.py')

print("Installed!")