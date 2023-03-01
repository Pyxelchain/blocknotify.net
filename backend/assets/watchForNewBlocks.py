#!python
# To get each new block as they are mined in Ethereum using Python, you can use the Web3.py library and subscribe to new block events using the WebSocketProvider. Here's an example:

from web3 import Web3
from web3.middleware import geth_poa_middleware

# connect to an Ethereum node using WebSocketProvider
w3 = Web3(Web3.WebsocketProvider('wss://mainnet.infura.io/ws/v3/YOUR-PROJECT-ID'))

# add middleware for POA networks like xDai
w3.middleware_onion.inject(geth_poa_middleware, layer=0)

# define a callback function to handle new block events
def on_new_block(block):
    print(f"New block received: {block['number']}")

# subscribe to new block events
subscription = w3.eth.subscribe('new_block_headers', on_new_block)

# keep the script running indefinitely
while True:
    pass
