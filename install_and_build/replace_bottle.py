import os
import sys
import shutil
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

# Get the current python's path. If you have multiple pythons, run this code with the python you wish to use.
PYTHON_PATH = os.path.dirname(sys.executable)

# Navigate to bottle.py in site packages
BOTTLE_PATH = PYTHON_PATH + r'\Lib\site-packages\bottle.py'

# Overwrite the current bottle.py with the bottle.py we have here.
shutil.copy2(os.path.dirname(os.path.realpath(__file__)) + '\\bottle.py', BOTTLE_PATH)