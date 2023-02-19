import { useState } from 'react';
import ReactSimplyCarousel from 'react-simply-carousel';

function ReactSimplyCarouselExample() {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const carousel_obj = {
    width: '45vmin',
    height: '45vmin',
    alignItems: 'center',
    display: 'flex',
  }
  const img_prop = {
    width: '30vmin',
    height: '30vmin',
    margin: '2vmin 0 2vmin 0'
  }
  const desc_prop = {
    fontSize: '3vmin',
    textAlign: 'center'
  }

  return (
    <div>
      <ReactSimplyCarousel
        activeSlideIndex={activeSlideIndex}
        onRequestChange={setActiveSlideIndex}
        itemsToShow={1}
        itemsToScroll={1}
        forwardBtnProps={{
          children: <span><svg width="70" height="70" viewBox="0 0 40 39" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M14.5861 29.414C14.2111 29.0389 14.0005 28.5303 14.0005 28C14.0005 27.4697 14.2111 26.9611 14.5861 26.586L21.1721 20L14.5861 13.414C14.2217 13.0368 14.0202 12.5316 14.0247 12.0072C14.0293 11.4828 14.2396 10.9812 14.6104 10.6104C14.9812 10.2395 15.4829 10.0292 16.0073 10.0246C16.5317 10.0201 17.0369 10.2217 17.4141 10.586L25.4141 18.586C25.789 18.9611 25.9996 19.4697 25.9996 20C25.9996 20.5303 25.789 21.0389 25.4141 21.414L17.4141 29.414C17.039 29.7889 16.5304 29.9996 16.0001 29.9996C15.4697 29.9996 14.9611 29.7889 14.5861 29.414Z" fill='black'/>
          </svg></span>,
        }}
        backwardBtnProps={{
          children: <span><svg width="70" height="70" viewBox="0 0 40 39" fill="none" xmlns="http://www.w3.org/2000/svg" style={{transform:'rotate(180deg)'}}>
          <path fillRule="evenodd" clipRule="evenodd" d="M14.5861 29.414C14.2111 29.0389 14.0005 28.5303 14.0005 28C14.0005 27.4697 14.2111 26.9611 14.5861 26.586L21.1721 20L14.5861 13.414C14.2217 13.0368 14.0202 12.5316 14.0247 12.0072C14.0293 11.4828 14.2396 10.9812 14.6104 10.6104C14.9812 10.2395 15.4829 10.0292 16.0073 10.0246C16.5317 10.0201 17.0369 10.2217 17.4141 10.586L25.4141 18.586C25.789 18.9611 25.9996 19.4697 25.9996 20C25.9996 20.5303 25.789 21.0389 25.4141 21.414L17.4141 29.414C17.039 29.7889 16.5304 29.9996 16.0001 29.9996C15.4697 29.9996 14.9611 29.7889 14.5861 29.414Z" fill='black'/>
          </svg></span>,
        }}
        responsiveProps={[
          {
            itemsToShow: 1,
            itemsToScroll: 1,
            minWidth: 768,
          },
        ]}
        speed={400}
        easing="linear"
      >
        <div className='flex-col' style={carousel_obj}>
          <img src="assets/classroom.png" style={img_prop}/>
          <p className='font-sans font-bold' style={desc_prop}>
            Zazu is a multifunctional TA for your needs!
          </p>
        </div>
        <div className='flex-col' style={carousel_obj}>
          <img src="assets/contract.png" style={img_prop}/>
          <p className='font-sans font-bold' style={desc_prop}>
            At the end of every lecture, Zazu provides lecture summaries
          </p>
        </div>
        <div className='flex-col' style={carousel_obj}>
          <img src="assets/question.png" style={img_prop}/>
          <p className='font-sans font-bold' style={desc_prop}>
            Students can ask questions to Zazu regarding the lecture
          </p>
        </div>
        <div className='flex-col' style={carousel_obj}>
          <img src="assets/polling.png" style={img_prop}/>
          <p className='font-sans font-bold' style={desc_prop}>
            Zazu can poll students about the current lecture
          </p>
        </div>
        <div className='flex-col' style={carousel_obj}>
          <img src="assets/quiz.png" style={img_prop}/>
          <p className='font-sans font-bold' style={desc_prop}>
            Zazu can quiz students based on lecture material on command
          </p>
        </div>
      </ReactSimplyCarousel>
    </div>
  );
}

export default ReactSimplyCarouselExample;