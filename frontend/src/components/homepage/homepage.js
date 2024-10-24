import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Button from 'react-bootstrap/Button';

import lincolnImage from '../images/lincoln.jpg';
import whiskersImage from '../images/whiskers.jpg';
import LilyImage from '../images/pexels-charles.jpg';

function AnimalCards() {
    return (
        <CardGroup>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={lincolnImage} />
                <Card.Body>
                    <Card.Title>Lincoln</Card.Title>
                    <Card.Text>
                        Animal information goes here
                    </Card.Text>
                    <Button variant="primary">Find out more about me!</Button>
                </Card.Body>
            </Card>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={whiskersImage} />
                <Card.Body>
                    <Card.Title>Whiskers</Card.Title>
                    <Card.Text>
                        Animal information goes here
                    </Card.Text>
                    <Button variant="primary">Find out more about me!</Button>
                </Card.Body>
            </Card>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={LilyImage} />
                <Card.Body>
                    <Card.Title>Lily</Card.Title>
                    <Card.Text>
                        Animal information goes here
                    </Card.Text>
                    <Button variant="primary">Find out more about me!</Button>
                </Card.Body>
            </Card>
        </CardGroup>
    );
}

export default AnimalCards;