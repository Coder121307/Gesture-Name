Prediction1= "";
Prediction2= "";

Webcam.set({
    width:350,
    height:300,
    image_format: 'png',
    png_qualitiy: 90
});


camera = document.getElementById("Camera");

Webcam.attach('#camera');

function take_Snapshot(){

    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'">';
    });

}

console.log('ml5 version',ml5.version);
Classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/HEGKyRNop/model.json',modelLoaded);

function modelLoaded(){
    console.log("Model Loaded");
}


function speak(){
    var synth = window.speechSynthesis;
    speak_data_1 = "The first prediction is "+ Prediction1;
    speak_data_2 = "The second prediction is"+ Prediction2;
     var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
     utterThis.rate = 0.5; 
     synth.speak(utterThis);
}

function check()
{
    img = document.getElementById('captured_image');
    Classifier.classify(img, gotResult);
}

function gotResult(error, results)
    {
       if (error){
           console.error(error);
       }
       else{
           console.log(results);
           document.getElementById("result_gesture").innerHTML = results[0].label;
           document.getElementById("result_gesture_name2").innerHTML = results[1].label;
           Prediction1 = results[0].label;
           Prediction2 = results[1].label;
           speak();
           if(results[0].label == "Peace"){
            document.getElementById("update_gesture").innerHTML = "&#9996;";
        }
           if(results[0].label == "Nice"){
            document.getElementById("update_gesture").innerHTML = "&#128076;";
           }
           if(results[0].label == "Thumps Up"){
            document.getElementById("update_gesture").innerHTML = "&#128077;";
           }

           if(results[1].label == "Peace"){
            document.getElementById("update_gesture").innerHTML = "&#9996;";
        }
           if(results[1].label == "Nice"){
            document.getElementById("update_gesture").innerHTML = "&#128076;";
           }
           if(results[1].label == "Thumps Up"){
            document.getElementById("update_gesture").innerHTML = "&#128077;";
           }
           
        
           

       }
    }
