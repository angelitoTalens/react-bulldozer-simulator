import React from "react";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";

type FileInputComponentProps = {
    show:boolean,
    onFileInput:(event: React.ChangeEvent<HTMLInputElement>) => void,
}

function FileInputComponent(props: FileInputComponentProps) {
    return (
        <Container>
            <Modal
                show={props.show}
                backdrop="static"
                keyboard={false}
                centered
                size="lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Site Clearing Simulator</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>Select Simulation File:</p>
                    <input type="file" onChange={props.onFileInput} />
                </Modal.Body>
            </Modal>
        </Container>
    );
}
  
export default FileInputComponent;