import React from 'react';
import ErrorHandler from './ErrorHandler';
import {ErrorBoundary} from 'react-error-boundary';
import Footer from './Footer';
import Header from './Header';
import {useChain} from './ChainContext';
import {ethers} from 'ethers';
import {Messages, useStatus} from './StatusContext';
import {Buffer} from "buffer";
import axios from "axios";
import env from "react-dotenv";

function getMessageToSign(message) {
    return Buffer.from(message, 'utf-8');
}

function SignForm(props) {
    const {addError, addAPIError, addMessage} = useStatus();
    const {state: chainState} = useChain();
    const [challenge, setChallenge] = React.useState('');
    const [signature, setSignature] = React.useState('');

    React.useEffect(() => {
        if (signature && signature !== "") {
            axios
                .post(`${env.BACKEND_URL}/api/verify`, {
                    "challenge": challenge, "signature": signature
                })
                .then((res) => {
                    // TODO: now what? we are registered? how do we switch the router from Register to Verify?
                    addMessage("Success! Phone is now verified.", 'success')
                    props.onReload("exists")
                    // addMessage(<pre>{JSON.stringify(res, null, 4)}</pre>, 'primary')
                    // TODO: figure out how to reload the app now... it doesn't auto-redirect them
                    // ReactDOM.render(<App/>);
                })
                .catch((err) => addAPIError(err, 'danger', 20000)); // milliseconds
        }
    }, [signature]);

    const sign = () => {
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            signer
                .signMessage(getMessageToSign(challenge))
                .then((signedMessage) => {
                    setSignature(signedMessage);
                })
                .catch((error) => addError(error));
        } catch (error) {
            addError(error);
        }
    };
    const keyHandler = (event) => {
        if (event.keyCode === 13) {
            sign();
        }
    }
    if (chainState.connected) {
        return (<div className="row align-middle">
            <div className="input-group w-100 mb-1">
                    <span className="input-group-text" id="basic-addon1">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-pen"
                            viewBox="0 0 16 16"
                        >
                            <path
                                d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"></path>
                        </svg>
                    </span>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Challenge Code"
                    aria-label="Challenge Code"
                    aria-describedby="basic-addon1"
                    value={challenge}
                    onChange={(e) => setChallenge(e.target.value)}
                    onKeyDown = {keyHandler}     
                />
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={sign}
                >
                    Sign to Verify
                </button>
            </div>
            <div className="input-group w-100 mb-1">
                    <span className="input-group-text" id="basic-addon2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-key"
                            viewBox="0 0 16 16"
                        >
                            <path
                                d="M0 8a4 4 0 0 1 7.465-2H14a.5.5 0 0 1 .354.146l1.5 1.5a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0L13 9.207l-.646.647a.5.5 0 0 1-.708 0L11 9.207l-.646.647a.5.5 0 0 1-.708 0L9 9.207l-.646.647A.5.5 0 0 1 8 10h-.535A4 4 0 0 1 0 8zm4-3a3 3 0 1 0 2.712 4.285A.5.5 0 0 1 7.163 9h.63l.853-.854a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.793-.793-1-1h-6.63a.5.5 0 0 1-.451-.285A3 3 0 0 0 4 5z"></path>
                            <path d="M4 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"></path>
                        </svg>
                    </span>
                <input
                    type="text"
                    className="form-control"
                    value={signature}
                    placeholder="Signed message data output"
                    aria-label="Signed message data output"
                    aria-describedby="basic-addon2"
                    readOnly={true}
                />
            </div>
        </div>);
    } else {
        return <></>;
    }
}

export default function Verify(props) {
    return (<div className="claim">
        <ErrorBoundary FallbackComponent={ErrorHandler}>
            <Header/>
            <div className="container" id="content">
                <SignForm onReload={props.onReload}/>
            </div>
            <Footer/>
            <Messages/>
        </ErrorBoundary>
    </div>);
}
