import Carousel from './components/carousel/Carousel';

function App() {

  let imageSrcList = getImageSrcList();

  return (
    <>
      {
        typeof imageSrcList !== undefined && imageSrcList !== null && imageSrcList.length > 0
          ? <Carousel imageSrcList={imageSrcList} />
          : <p className='text'>No Images Available to display :(</p>
      }
    </>
  );
}

function getImageSrcList() {

  let imageSrcList = [];

  for (let index = 1; index <= 10; index++) {
    let imageSrc = index.toString() + '.png';
    imageSrcList.push(imageSrc);
  }

  return imageSrcList;

}

export default App;
