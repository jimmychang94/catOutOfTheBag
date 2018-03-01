
(function() {
  var selfieCam, takeSelfie, imageProcessor, selfies, takeSelfieButton;
  function startup(){
    selfieCam = document.getElementById('selfie-cam');
    takeSelfieButton = document.getElementById('takeSelfieButton'),
    imageProcessor = document.getElementById('image-processor');
    selfies = document.getElementById('selfies');

    imageProcessor.width = 640;
    imageProcessor.height = 480;

    navigator.getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);

    if (navigator.getUserMedia) {
      navigator.getUserMedia({
        video:true,
        audio:false
      }, function (stream) {
        window.URL = window.URL || webkitURL;
        var streamURL = window.URL.createObjectURL(stream);
        selfieCam.src = streamURL;
        selfieCam.play();
      }, function (error) {
        console.log(error);
      });
    }

    takeSelfieButton.addEventListener('click', takeSelfie);
  }
  function takeSelfie() {
    var context = imageProcessor.getContext('2d');
    console.log(selfieCam);
    context.drawImage(selfieCam, 0, 0, 640, 480);
    var imageURL = imageProcessor.toDataURL();

    var img = document.createElement('img');
    img.setAttribute('src', imageURL);
		console.log();
		
    selfies.appendChild(img);
  }
  window.addEventListener('load', startup);
})();