<html>
  <head>
    <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@1.2"></script>
    <script src="https://cdn.jsdelivr.net/npm/@tensorflow-models/body-pix@2.0"></script>
 </head>

  <body>
    <img id='image' src='https://i.imgur.com/E52ALln.jpeg' crossorigin='anonymous'/>
    <canvas id='canvas' /></canvas>
    <canvas id='canvas2' /></canvas>
  
  <script>
    async function cutPerson() {
      
      var img = document.getElementById('image');

      var net = await bodyPix.load();
      var segmentation = await net.segmentPerson(img);

      // The mask image is an binary mask image with a 1 where there is a person and
      // a 0 where there is not.
      var coloredPartImage = bodyPix.toMask(segmentation);
      var opacity = 0.99;
      var flipHorizontal = false;
      var maskBlurAmount = 0;
      var canvas = document.getElementById('canvas2');
      // Draw the mask image on top of the original image onto a canvas.
      // The colored part image will be drawn semi-transparent, with an opacity of
      // 0.7, allowing for the original image to be visible under.
      bodyPix.drawMask(canvas2, img, coloredPartImage, opacity, maskBlurAmount, flipHorizontal);
          
    }

    async function bodyParts() {
      
      var img = document.getElementById('image');
    await cutPerson();

    var net = await bodyPix.load();
    var partSegmentation = await net.segmentMultiPersonParts(img);

    // The colored part image is an rgb image with a corresponding color from the
    // rainbow colors for each part at each pixel, and black pixels where there is
    // no part.
    var coloredPartImage = bodyPix.toColoredPartMask(partSegmentation);
    var opacity = 0.7;
    var flipHorizontal = false;
    var maskBlurAmount = 0;
    var canvas2 = document.getElementById('canvas');
    // Draw the colored part image on top of the original image onto a canvas.
    // The colored part image will be drawn semi-transparent, with an opacity of
    // 0.7, allowing for the original image to be visible under.
    bodyPix.drawMask(
    canvas, img, coloredPartImage, opacity, maskBlurAmount,
    flipHorizontal);     
    }

    bodyParts();
    //cutPerson();
  </script>
  </body>
</html>
