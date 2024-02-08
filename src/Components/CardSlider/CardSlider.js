import { useEffect, useRef, useState } from 'react';
import PokemonDetailCard from '../PokemonDetailCard/PokemonDetailCard';
import './CardSlider.css';
import axios from 'axios';

const CardSlider = () => {

        const pokemonDetailsCardContainerRef = useRef();
        const previousButtonRef = useRef();
        const nextButtonRef = useRef();

        let [currentIndex, setCurrentIndex] = useState(2);
        let [currentTranslateValue, setCurrentTranslateValue] = useState(0);
        let limitParam = 10;
        let [offsetParam, setOffsetParam] = useState(0);
        // let imageCollection = document.getElementsByClassName('item-image');
        let imageCollection;
        let [pokemonExtensiveDetailsList, setPokemonExtensiveDetailsList] = useState([]);

        useEffect(()=>{
            imageCollection = pokemonDetailsCardContainerRef.current.children;
        });

        useEffect(() => {
            axios.get('http://localhost:8085/getPokemonExtensiveDetailsWithLimitAndOffset', { params: {limit: limitParam, offset: offsetParam} })
                    .then( response => {
                        setPokemonExtensiveDetailsList(response.data);
                        imageCollection = pokemonDetailsCardContainerRef.current.children;
                    })
                    .catch( error => {
                        console.error(error);
                    })
        }, []);
        function prevBtnHandler() {
            if(currentIndex > -1) {
                currentTranslateValue = currentTranslateValue + 202;
                setCurrentTranslateValue(currentTranslate => currentTranslate + 202);
                currentIndex = currentIndex - 1;
                setCurrentIndex(currIndex => currIndex - 1);
                for(let i=0; i < imageCollection.length; i++) {
                    if(i === currentIndex) {
                        imageCollection[i].classList.add('active');
                    } else {
                        if(imageCollection[i].classList.contains('active')) {
                            imageCollection[i].classList.remove('active');
                        }
                    }
                    i === currentIndex ? imageCollection[i].style.transform = 'translate('+(currentTranslateValue+29)+'px) scale(1.3)' 
                                       : i > currentIndex ? imageCollection[i].style.transform = 'translate('+(currentTranslateValue+59)+'px)'
                                                          : imageCollection[i].style.transform = 'translate('+currentTranslateValue+'px)'                        
                }
                
                if(currentIndex === 0) {
                    previousButtonRef.current.attributes.setNamedItem(document.createAttribute('disabled'));
                }
                if(currentIndex < imageCollection.length-2) {
                    if(nextButtonRef.current.attributes.getNamedItem('disabled')) {
                        nextButtonRef.current.attributes.removeNamedItem('disabled');
                    }
                }
            }
        }

        function nextBtnHandler() {
            if(currentIndex < imageCollection?.length-1) {
                currentTranslateValue = currentTranslateValue - 202;
                setCurrentTranslateValue(currTranslateVal => currTranslateVal - 202);
                currentIndex = currentIndex + 1;
                setCurrentIndex(currIndex => currIndex + 1);
                for(let i=0; i < imageCollection.length; i++) {
                    if(i === currentIndex) {
                        imageCollection[i].classList.add('active');
                    } else {
                        if(imageCollection[i].classList.contains('active')) {
                            imageCollection[i].classList.remove('active');
                        }
                    }
                    i === currentIndex ? imageCollection[i].style.transform = 'translate('+(currentTranslateValue+29)+'px) scale(1.3)' : 
                                        i > currentIndex ? imageCollection[i].style.transform = 'translate('+(currentTranslateValue+59)+'px)'
                                                           : imageCollection[i].style.transform = 'translate('+(currentTranslateValue)+'px)';
                }
                
                if(currentIndex === imageCollection.length-1) {
                    nextButtonRef.current.attributes.setNamedItem(document.createAttribute('disabled'));
                }
                if(currentIndex > -1) {
                    if(previousButtonRef.current.attributes.getNamedItem('disabled')) {
                        previousButtonRef.current.attributes.removeNamedItem('disabled');
                    }
                }
                if(currentIndex > limitParam + offsetParam - 6) {
                    axios.get('http://localhost:8085/getPokemonExtensiveDetailsWithLimitAndOffset', { params: {limit: limitParam, offset: offsetParam + 10} })
                    .then( response => {
                        setPokemonExtensiveDetailsList(oldArray => [...oldArray, ...response.data]);
                        imageCollection = document.getElementsByClassName('item-image-container')[0].children;
                        setOffsetParam( currOffsetParam => currOffsetParam + 10);
                    })
                    .catch( error => {
                        console.error(error);
                    });
                }
            }
        }

    return(
        <div className="carousel-slider">
            <button ref={previousButtonRef} id="prevBtn" className="prev-btn" onClick={prevBtnHandler}>
                <img alt='' src="/assets/slider-btns-left.png" />
            </button>
            <button ref={nextButtonRef} id="nextBtn" className="next-btn" onClick={nextBtnHandler}>
                <img alt='' src="/assets/slider-btns-right.png" />
            </button>
            <div className="carousel-slider-items">
                <div ref={pokemonDetailsCardContainerRef} className="item-image-container" style={{display: 'flex'}}>
                    { 
                        pokemonExtensiveDetailsList.map( 
                        pokemonDetails => <PokemonDetailCard pokemonDetails={pokemonDetails} className='item-image' />)
                    }
                </div>
            </div>
        </div>
    )
}
export default CardSlider;