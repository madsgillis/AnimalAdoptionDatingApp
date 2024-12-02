import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Modal from 'react-bootstrap/Modal';
import StatusTag from '../helpers/StatusTag'

const AnimalProfile = ({selectedAnimal, show, onClose, handleClose}) => {
    console.info("animal profile", selectedAnimal);
  return (
    <Modal bg="dark" show={show} onHide={handleClose}>
        <Modal.Dialog className="modal-dialog-centered">
            <Modal.Header closeButton>
                <Modal.Title><strong>{selectedAnimal?.animal_name}</strong></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Card border="primary" style={{ width: '25rem' }}>
                    <Card.Img variant="top" src={selectedAnimal.photo} />
                    <Card.Body>
                        <Card.Title><strong>Fun Facts About Me</strong></Card.Title>
                        <Card.Text>
                        {selectedAnimal.description}
                        </Card.Text>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                        <ListGroup.Item><strong>Status:</strong> <StatusTag status={selectedAnimal.availability}/></ListGroup.Item>
                        <ListGroup.Item><strong>Species:</strong> {selectedAnimal.species}</ListGroup.Item>
                        <ListGroup.Item><strong>Age:</strong> {selectedAnimal.age}</ListGroup.Item>
                        <ListGroup.Item><strong>Sex:</strong> {selectedAnimal.animal_sex}</ListGroup.Item>
                        <ListGroup.Item><strong>Traits:</strong> {selectedAnimal.dispositions}</ListGroup.Item>
                        <ListGroup.Item><strong>Profile Start Date:</strong> {selectedAnimal.date}</ListGroup.Item>
                    </ListGroup>
                </Card>
            </Modal.Body>
        </Modal.Dialog>
    </Modal>
  );
}

export default AnimalProfile;