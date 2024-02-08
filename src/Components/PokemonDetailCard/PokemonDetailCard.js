import { Col, Row } from 'reactstrap';
import './PokemonDetailCard.css';
import TypeLabel from '../TypeLabel/TypeLabel';
import { forwardRef } from 'react';

const PokemonDetailCard = forwardRef( (props, pokemonDetailCardRef) => {

    return (
        <div className={props.className} ref={pokemonDetailCardRef}>
            <div className="pokemon-detail-card">
                <div className="pokemon">
                    <div id='image-background-bar' style={{ position: 'absolute', height: '110px', backgroundColor: '#616161', width: '200px', top: '80px', zIndex: '9' }}></div>
                    <img src={'data:image;base64,'+props?.pokemonDetails?.pokemonImageSetDetails[0]?.pokemonImage} alt="" />
                    <div className="description">
                        <div className='description-header container-fluid'>
                            <Row>
                                <Col style={{ textAlign: 'left' }}>
                                    <span>{props.pokemonDetails.name}</span>
                                </Col>
                                <Col style={{ textAlign: 'right', paddingRight: '25px' }}>
                                    <span>{props.pokemonDetails.base_total}</span>
                                </Col>
                            </Row>
                        </div>
                        <div className='container-fluid'>
                            <Row style={{paddingBottom: '7px'}}>
                                <Col xs="3" style={{textAlign: 'left'}}>
                                    <span className='description-sub-details'>Type</span>
                                </Col>
                                <Col style={ {textAlign: 'left'}}>
                                    <TypeLabel type={props.pokemonDetails.type_one}></TypeLabel>
                                     {
                                        props.pokemonDetails.type_one !==props.pokemonDetails.type_two ?
                                        <TypeLabel type={props.pokemonDetails.type_two}></TypeLabel> : ''
                                     }
                                    {/* <span className="type-label background-color-bug">Bug</span> */}
                                </Col>
                            </Row>
                            <Row>
                                <Col xs="3" style={{textAlign: 'left'}}>
                                    <span className='description-sub-details'>Abilities</span>
                                </Col>
                                <Col style={ {textAlign: 'left'}}>
                                    <span className='description-sub-details'>{props.pokemonDetails.abilities.length > 46 ? props.pokemonDetails.abilities.substring(0, 45) + '...' : props.pokemonDetails.abilities}</span>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default PokemonDetailCard;