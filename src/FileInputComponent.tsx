import React from "react";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";

type FileInputComponentProps = {
    show:boolean,
    onFileInput:(event: React.ChangeEvent<HTMLInputElement>) => void,
}

type FileInputComponentState = {
    show:boolean
}



class FileInputComponent extends React.Component<FileInputComponentProps, FileInputComponentState> {

    state = {
        show: this.props.show
    }

    handleShow() {
        let state = this.state;
        state.show = true;
        this.setState(state);
    }
    
    handleHide() {
        let state = this.state;
        state.show = false;
        this.setState(state);
    }

    render() {
        return (
            <Container>
                <Modal
                    show={this.state.show}
                    backdrop="static"
                    keyboard={false}
                    centered
                    size="lg"
                >
                    <Modal.Header closeButton onHide={()=>this.handleHide()}>
                        <Modal.Title>Site Clearing Simulator</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <p>Select Simulation File:</p>
                        <input type="file" onChange={this.props.onFileInput} />
                    </Modal.Body>
                </Modal>
            </Container>
        );
    }
}
  
export default FileInputComponent;