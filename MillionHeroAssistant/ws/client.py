import websocket
try:
    import thread
except ImportError:
    import _thread as thread
import time

def on_message(ws, message):
    print(message)

def on_error(ws, error):
    print(error)

def on_close(ws):
    print("### closed ###")

def on_open(ws):
    pass
    # def run(*args):
    #     ws.send("Hello, World from python")
    # thread.start_new_thread(run, ())

ws = websocket.WebSocketApp("ws://localhost:3000/ws/answer",
                          on_message = on_message,
                          on_error = on_error,
                          on_close = on_close)

def ws_start():
    # websocket.enableTrace(True)
    ws.on_open = on_open
    ws.run_forever()
