<html>
  <head>
    <!-- Load TensorFlow.js -->
    <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@1.2"></script>
    <!-- Load BodyPix -->
    <script src="https://cdn.jsdelivr.net/npm/@tensorflow-models/body-pix@2.0"></script>
 </head>

  <body>
    <img id='image' src='https://i.imgur.com/E52ALln.jpeg' crossorigin='anonymous'/>
    <canvas id='canvas' />
  
  <!-- Place your code in the script tag below. You can also use an external .js file -->
  <script>
    async function loadAndPredict() {
      
      const img = document.getElementById('image');

      const net = await bodyPix.load();
      const segmentation = await net.segmentPerson(img);

      // The mask image is an binary mask image with a 1 where there is a person and
      // a 0 where there is not.
      const coloredPartImage = bodyPix.toMask(segmentation);
      const opacity = 0.7;
      const flipHorizontal = false;
      const maskBlurAmount = 0;
      const canvas = document.getElementById('canvas');
      // Draw the mask image on top of the original image onto a canvas.
      // The colored part image will be drawn semi-transparent, with an opacity of
      // 0.7, allowing for the original image to be visible under.
      bodyPix.drawMask(canvas, img, coloredPartImage, opacity, maskBlurAmount, flipHorizontal);
          
    }
    loadAndPredict();
  </script>
  </body>
</html>
